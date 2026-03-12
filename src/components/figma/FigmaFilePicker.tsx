'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-stub';
import { apiFetch } from '@/lib/api';
import { Link2, Loader2, AlertCircle } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  frameCount: number;
}

interface FileData {
  fileKey: string;
  name: string;
  pages: Page[];
}

export interface PageSelection {
  fileKey: string;
  fileName: string;
  pageId: string;
  pageName: string;
}

interface FigmaFilePickerProps {
  onPageSelected: (info: PageSelection) => void;
}

function extractFileKey(url: string): string | null {
  // Handles both /file/ and /design/ URL formats
  const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? null;
}

export default function FigmaFilePicker({ onPageSelected }: FigmaFilePickerProps) {
  const { getToken } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<FileData | null>(null);

  const handleFetchFile = async () => {
    const fileKey = extractFileKey(url);
    if (!fileKey) {
      setError('Please paste a valid Figma file URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');

      const data = await apiFetch<{ name: string; pages: Page[] }>(
        `/api/v1/figma/files/${fileKey}`,
        token,
      );
      setFile({ fileKey, name: data.name, pages: data.pages });
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'FIGMA_NOT_CONNECTED') {
        setError('Connect your Figma account in Settings first.');
      } else if (message === 'HTTP_403') {
        setError("You don't have access to this file in Figma.");
      } else {
        setError('Could not fetch file. Check the URL and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageSelect = (page: Page) => {
    if (!file) return;
    onPageSelected({
      fileKey: file.fileKey,
      fileName: file.name,
      pageId: page.id,
      pageName: page.name,
    });
  };

  return (
    <div className="space-y-5">
      {/* URL input */}
      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-text-primary block">
          Paste Figma file URL
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(null);
                setFile(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && url) handleFetchFile();
              }}
              placeholder="https://www.figma.com/file/…"
              className="w-full border border-border-medium rounded-lg pl-9 pr-3 py-2.5 text-[13px] font-mono
                bg-bg-input text-text-primary placeholder:text-text-tertiary
                focus:outline-none focus:ring-2 focus:ring-accent-gold/40 focus:border-accent-gold
                transition-all"
            />
          </div>
          <button
            onClick={handleFetchFile}
            disabled={loading || !url}
            className="bg-accent-gold text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold
              disabled:opacity-40 hover:bg-accent-gold-hover hover:shadow-[var(--shadow-glow-gold)]
              transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed
              flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Loading…
              </>
            ) : (
              'Open'
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-[13px] text-[#EF4444]">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Page list */}
      {file && (
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-text-primary">
            Select a page from{' '}
            <span className="text-accent-gold">{file.name}</span>
          </p>
          <div className="bg-bg-secondary rounded-[var(--radius-md)] border border-border-subtle overflow-hidden divide-y divide-border-subtle shadow-[var(--shadow-card)]">
            {file.pages.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageSelect(page)}
                className="w-full text-left px-4 py-3.5 hover:bg-bg-hover flex items-center justify-between
                  transition-colors cursor-pointer group"
              >
                <span className="text-[13px] text-text-primary font-medium group-hover:text-accent-gold transition-colors">
                  {page.name}
                </span>
                <span className="text-[12px] text-text-tertiary tabular-nums">
                  {page.frameCount} screen{page.frameCount !== 1 ? 's' : ''}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
