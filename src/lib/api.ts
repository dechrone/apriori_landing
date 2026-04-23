const BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Authenticated fetch wrapper.
 * Pass the Supabase access token obtained via
 * `useAuthContext().getAccessToken()` (or `useAuth().getToken()`).
 */
export async function apiFetch<T = unknown>(
  path: string,
  token: string | null | undefined,
  options: RequestInit = {},
): Promise<T> {
  if (!BASE) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }
  if (!token) {
    throw new Error('Not signed in');
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
