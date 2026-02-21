# Firebase Storage setup (uploads from the app)

The app uploads asset images to Firebase Storage under:

`users/{userId}/assetFolders/{folderId}/{timestamp}_{filename}`

Because the app uses **Clerk** (not Firebase Auth), Storage sees requests as **unauthenticated**. Use the steps below so uploads work.

## 1. Storage rules

In [Firebase Console](https://console.firebase.google.com) → Storage → Rules, allow writes to that path.

**For local/dev (no auth):**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/assetFolders/{folderId}/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

**For production** you’d restrict by verifying the user (e.g. via a backend that checks Clerk and uses Admin SDK, or by using custom tokens).

## 2. CORS on the bucket

Browser uploads need CORS so the bucket accepts requests from your app’s origin.

**`cors.json` is already in the project root** with origins for localhost and the Firebase app URL.

### Option A: From your machine with a service account key (recommended)

1. **Get a key:** [Firebase Console](https://console.firebase.google.com) → your project → Project settings (gear) → Service accounts → **Generate new private key**.
2. **Run the script:**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-key.json"
   npm run storage:cors
   ```
   The script uses `cors.json` in the project root and applies it to your Storage bucket.

To verify (requires gsutil): `gsutil cors get gs://credigo-bc4c7.firebasestorage.app`.

### Option B: From Google Cloud Shell (no local install)

1. Open [Google Cloud Shell](https://shell.cloud.google.com) and ensure the project is `credigo-bc4c7`.
2. Create the config file:

```bash
cat > cors.json << 'EOF'
[
  {
    "origin": [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://credigo-bc4c7.firebaseapp.com"
    ],
    "method": ["GET", "HEAD", "PUT", "POST", "OPTIONS", "DELETE"],
    "responseHeader": [
      "Content-Type",
      "Content-Length",
      "x-goog-resumable",
      "x-goog-meta-*"
    ],
    "maxAgeSeconds": 3600
  }
]
EOF
```

3. Apply it:

```bash
gsutil cors set cors.json gs://credigo-bc4c7.firebasestorage.app
```

4. Check: `gsutil cors get gs://credigo-bc4c7.firebasestorage.app`

If CORS is missing or wrong, uploads can hang or fail with network/CORS errors in the console.

## 3. If uploads still time out

- Open DevTools → Network: see if the request to `firebasestorage.googleapis.com` is sent and what status/response it gets.
- Open DevTools → Console: after a timeout, check for `[Upload] underlying error:` — that is the real Firebase error (e.g. permission or CORS).
