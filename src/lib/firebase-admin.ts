import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // If a service-account JSON is provided via env var, use it.
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountJson) {
    try {
      const sa = JSON.parse(serviceAccountJson) as ServiceAccount;
      return initializeApp({ credential: cert(sa) });
    } catch (e) {
      console.error("[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", e);
    }
  }

  // Fallback: initialize with just the project ID.
  // Works on Google Cloud (App Engine, Cloud Run, Cloud Functions) where
  // Application Default Credentials are available, and also works for
  // Firestore operations when GOOGLE_APPLICATION_CREDENTIALS is set.
  return initializeApp({ projectId: "credigo-bc4c7" });
}

const adminApp = getAdminApp();
export const adminDb = getFirestore(adminApp);
