const BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Authenticated fetch wrapper.
 * Pass the Firebase ID token obtained via `getToken()` from `useAuth()`.
 */
export async function apiFetch<T = unknown>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  if (!BASE) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      (data as Record<string, string>).code ??
        (data as Record<string, string>).detail ??
        `HTTP_${res.status}`,
    );
  }

  return res.json() as Promise<T>;
}
