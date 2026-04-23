'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-stub';
import { apiFetch } from '@/lib/api';

interface FigmaFile {
  key:           string;
  name:          string;
  thumbnail_url: string;
  last_modified: string;
  project_name?: string;
}

interface FigmaPage {
  id:          string;
  name:        string;
  frame_count: number;
}

interface FigmaTeam {
  id:   string;
  name: string;
}

type BrowserStep = 'files' | 'pages';

interface Props {
  onPageSelected: (info: {
    fileKey:  string;
    fileName: string;
    pageId:   string;
    pageName: string;
  }) => void;
}

export default function FigmaFileBrowser({ onPageSelected }: Props) {
  const { getToken } = useAuth();

  const [activeTab,    setActiveTab]    = useState<'recent' | 'team'>('recent');
  const [step,         setStep]         = useState<BrowserStep>('files');

  const [recentFiles,  setRecentFiles]  = useState<FigmaFile[]>([]);
  const [teamFiles,    setTeamFiles]    = useState<FigmaFile[]>([]);
  const [teams,        setTeams]        = useState<FigmaTeam[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<FigmaFile | null>(null);
  const [pages,        setPages]        = useState<FigmaPage[]>([]);

  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingPages, setLoadingPages] = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  // Load recent files + teams on mount
  useEffect(() => {
    loadRecentFiles();
    loadTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadRecentFiles() {
    setLoadingFiles(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await apiFetch<{ files: FigmaFile[]; message?: string }>('/api/v1/figma/recent-files', token);
      setRecentFiles(data.files);
      if (data.message && data.files.length === 0) {
        setError(data.message); // reuse error state for the notice
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'FIGMA_NOT_CONNECTED') {
        setError('Connect your Figma account in Settings first.');
      } else if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError("We couldn't reach the Figma integration. Please try again in a minute.");
      } else {
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Could not load your Figma files: ${msg}`);
      }
    } finally {
      setLoadingFiles(false);
    }
  }

  async function loadTeams() {
    try {
      const token = await getToken();
      if (!token) return;
      const data = await apiFetch<{ teams: FigmaTeam[] }>('/api/v1/figma/teams', token);
      setTeams(data.teams);
      // Auto-load first team's files
      if (data.teams.length > 0) {
        setActiveTeamId(data.teams[0].id);
        loadTeamFiles(data.teams[0].id);
      }
    } catch {
      // Teams are optional — fail silently, just hide the Team tab
    }
  }

  async function loadTeamFiles(teamId: string) {
    setLoadingFiles(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await apiFetch<{ files: FigmaFile[] }>(`/api/v1/figma/teams/${teamId}/files`, token);
      setTeamFiles(data.files);
    } catch {
      setError('Could not load team files.');
    } finally {
      setLoadingFiles(false);
    }
  }

  async function handleFileClick(file: FigmaFile) {
    setSelectedFile(file);
    setStep('pages');
    setLoadingPages(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await apiFetch<{ pages: FigmaPage[] }>(`/api/v1/figma/files/${file.key}`, token);
      setPages(data.pages);
    } catch {
      setError('Could not load pages for this file.');
      setStep('files');
      setSelectedFile(null);
    } finally {
      setLoadingPages(false);
    }
  }

  function handlePageClick(page: FigmaPage) {
    if (!selectedFile) return;
    onPageSelected({
      fileKey:  selectedFile.key,
      fileName: selectedFile.name,
      pageId:   page.id,
      pageName: page.name,
    });
  }

  function handleTeamChange(teamId: string) {
    setActiveTeamId(teamId);
    loadTeamFiles(teamId);
  }

  const activeFiles = activeTab === 'recent' ? recentFiles : teamFiles;

  // ─── Files grid ─────────────────────────────────────────────────────────────
  if (step === 'files') {
    return (
      <div className="space-y-4">

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border-subtle">
          <TabButton
            active={activeTab === 'recent'}
            onClick={() => setActiveTab('recent')}
          >
            Your Files
          </TabButton>
          {teams.length > 0 && (
            <TabButton
              active={activeTab === 'team'}
              onClick={() => setActiveTab('team')}
            >
              Team
            </TabButton>
          )}
        </div>

        {/* Team selector pill row */}
        {activeTab === 'team' && teams.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {teams.map(team => (
              <button
                key={team.id}
                onClick={() => handleTeamChange(team.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTeamId === team.id
                    ? 'bg-accent-gold text-black'
                    : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
                }`}
              >
                {team.name}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* File grid */}
        {loadingFiles ? (
          <FileGridSkeleton />
        ) : activeFiles.length === 0 ? (
          <div className="py-12 text-center text-sm text-text-secondary">
            No files found.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {activeFiles.map(file => (
              <FileCard
                key={file.key}
                file={file}
                onClick={() => handleFileClick(file)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── Pages list ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <button
        onClick={() => { setStep('files'); setSelectedFile(null); setPages([]); }}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        ← Back to files
      </button>

      <div>
        <p className="text-xs text-text-secondary">File</p>
        <h3 className="text-sm font-semibold text-text-primary mt-0.5">
          {selectedFile?.name}
        </h3>
      </div>

      <p className="text-sm text-text-secondary">Select a page to import screens from</p>

      {loadingPages ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      ) : pages.length === 0 ? (
        <p className="text-sm text-text-secondary py-6 text-center">
          No pages found in this file.
        </p>
      ) : (
        <div className="border border-border-subtle rounded-xl overflow-hidden divide-y divide-border-subtle">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => handlePageClick(page)}
              className="w-full text-left px-4 py-3 hover:bg-bg-secondary flex items-center justify-between transition-colors"
            >
              <span className="text-sm text-text-primary">{page.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">
                  {page.frame_count} screen{page.frame_count !== 1 ? 's' : ''}
                </span>
                <span className="text-text-secondary text-xs">→</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TabButton({
  active, onClick, children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        active
          ? 'border-accent-gold text-text-primary'
          : 'border-transparent text-text-secondary hover:text-text-primary'
      }`}
    >
      {children}
    </button>
  );
}

function FileCard({ file, onClick }: { file: FigmaFile; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl overflow-hidden border border-border-subtle hover:border-accent-gold transition-all group"
    >
      {/* Thumbnail */}
      <div className="bg-bg-secondary aspect-video overflow-hidden">
        {file.thumbnail_url ? (
          <img
            src={file.thumbnail_url}
            alt={file.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-text-secondary text-xs">No preview</span>
          </div>
        )}
      </div>
      {/* File info */}
      <div className="p-2.5">
        <p className="text-xs font-medium text-text-primary truncate leading-tight">
          {file.name}
        </p>
        {file.project_name && (
          <p className="text-xs text-text-secondary truncate mt-0.5">
            {file.project_name}
          </p>
        )}
        {file.last_modified && (
          <p className="text-xs text-text-secondary mt-0.5">
            {formatRelativeTime(file.last_modified)}
          </p>
        )}
      </div>
    </button>
  );
}

function FileGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-border-subtle animate-pulse">
          <div className="bg-bg-secondary aspect-video" />
          <div className="p-2.5 space-y-1.5">
            <div className="h-3 bg-bg-secondary rounded w-3/4" />
            <div className="h-2 bg-bg-secondary rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)   return `${days} days ago`;
  if (days < 30)  return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}
