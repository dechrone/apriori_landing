'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-stub';
import { apiFetch } from '@/lib/api';

interface ConnectionStatus {
  connected: boolean;
  figmaUserName?: string;
  figmaUserEmail?: string;
}

interface FigmaConnectionCardProps {
  /** Delay in ms before first fetch — useful after OAuth redirect to let DB commit */
  fetchDelay?: number;
}

export default function FigmaConnectionCard({ fetchDelay = 0 }: FigmaConnectionCardProps) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        console.warn('[FigmaCard] NEXT_PUBLIC_API_URL is not set — skipping connection check');
        setStatus({ connected: false });
        return;
      }

      const token = await getToken();
      if (!token) {
        console.warn('[FigmaCard] getToken() returned null — Firebase Auth may not be ready');
        setStatus({ connected: false });
        return;
      }
      // Log the first 20 chars of the token for debugging
      console.log('[FigmaCard] Fetching connection status with token:', token.substring(0, 20) + '…');
      console.log('[FigmaCard] URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/v1/figma/connection`);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/figma/connection`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('[FigmaCard] Response status:', res.status);

      if (!res.ok) {
        const errBody = await res.text();
        console.error('[FigmaCard] Error response body:', errBody);
        setStatus({ connected: false });
        return;
      }

      const data: ConnectionStatus = await res.json();
      console.log('[FigmaCard] Parsed response:', JSON.stringify(data));
      setStatus(data);

      // If backend says not connected but we just came from OAuth,
      // retry once more after a longer delay (DB propagation)
      if (!data.connected && fetchDelay > 0) {
        console.log('[FigmaCard] Not connected yet — will retry in 2s…');
        setTimeout(async () => {
          try {
            const retryToken = await getToken();
            if (!retryToken) return;
            const retryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/figma/connection`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${retryToken}`,
              },
            });
            console.log('[FigmaCard] Retry status:', retryRes.status);
            if (retryRes.ok) {
              const retryData: ConnectionStatus = await retryRes.json();
              console.log('[FigmaCard] Retry response:', JSON.stringify(retryData));
              setStatus(retryData);
            }
          } catch (retryErr) {
            console.error('[FigmaCard] Retry failed:', retryErr);
          }
        }, 2000);
      }
    } catch (err) {
      console.error('[FigmaCard] Connection check failed:', err);
      setStatus({ connected: false });
    }
  }, [getToken, fetchDelay]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    if (fetchDelay > 0) {
      const timer = setTimeout(fetchStatus, fetchDelay);
      return () => clearTimeout(timer);
    }

    fetchStatus();
  }, [isLoaded, isSignedIn, fetchDelay, fetchStatus]);

  const handleConnect = async () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error('[FigmaCard] NEXT_PUBLIC_API_URL is not set — cannot initiate Figma OAuth');
      return;
    }
    const token = await getToken();
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/figma/auth/initiate?firebase_token=${token}`;
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    try {
      const token = await getToken();
      if (!token) return;
      await apiFetch('/api/v1/figma/connection', token, { method: 'DELETE' });
      setStatus({ connected: false });
    } finally {
      setDisconnecting(false);
    }
  };

  /* ── Loading skeleton ─────────────────────────────────────────────── */
  if (!status) {
    return (
      <div className="bg-bg-secondary rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-card)] animate-pulse h-20" />
    );
  }

  /* ── Card ──────────────────────────────────────────────────────────── */
  return (
    <div className="bg-bg-secondary rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-card)] flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Figma logo placeholder */}
        <div className="w-9 h-9 bg-[#1E1E1E] rounded-lg flex items-center justify-center shrink-0">
          <svg width="16" height="24" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
              fill="#1ABCFE"
            />
            <path
              d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
              fill="#0ACF83"
            />
            <path
              d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
              fill="#FF7262"
            />
            <path
              d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
              fill="#F24E1E"
            />
            <path
              d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
              fill="#A259FF"
            />
          </svg>
        </div>

        <div>
          <p className="text-[15px] font-semibold text-text-primary">Figma</p>
          {status.connected ? (
            <p className="text-[13px] text-text-secondary mt-0.5">
              Connected as{' '}
              <span className="font-medium text-text-primary">
                {status.figmaUserName}
              </span>
              {status.figmaUserEmail && (
                <span className="text-text-tertiary">
                  {' '}({status.figmaUserEmail})
                </span>
              )}
            </p>
          ) : (
            <p className="text-[13px] text-text-secondary mt-0.5">
              Not connected
              <button
                onClick={fetchStatus}
                className="ml-2 text-accent-gold hover:underline cursor-pointer"
              >
                Check again
              </button>
            </p>
          )}
        </div>
      </div>

      {status.connected ? (
        <button
          onClick={handleDisconnect}
          disabled={disconnecting}
          className="text-[13px] text-[#EF4444] border border-[#EF4444]/20 px-3.5 py-1.5 rounded-lg
            hover:bg-[#EF4444]/5 disabled:opacity-50 transition-all font-medium cursor-pointer"
        >
          {disconnecting ? 'Disconnecting…' : 'Disconnect'}
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className="text-[13px] bg-accent-gold text-white px-4 py-1.5 rounded-lg
            hover:bg-accent-gold-hover hover:shadow-[var(--shadow-glow-gold)]
            transition-all font-semibold cursor-pointer"
        >
          Connect Figma
        </button>
      )}
    </div>
  );
}
