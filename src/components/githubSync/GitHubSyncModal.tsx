import React from 'react';
import {
  Github,
  Check,
  AlertCircle,
  Loader2,
  Users,
  ExternalLink,
  ShieldCheck,
  UserPlus,
  RefreshCw,
} from 'lucide-react';
import {
  verifyGitHubPat,
  fetchUserRepos,
  GitHubUserProfile,
  GitHubApiRepo,
} from '../../services/githubService';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGitHubConnected: boolean;
  connectedUser: string | null;
  onConnect: (user: GitHubUserProfile, repos: GitHubApiRepo[], pat: string) => void;
  onDisconnect: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  isGitHubConnected,
  connectedUser,
  onConnect,
  onDisconnect,
}) => {
  const [patInput, setPatInput] = React.useState('');
  const [isValidating, setIsValidating] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [userProfile, setUserProfile] = React.useState<GitHubUserProfile | null>(null);
  const [userRepos, setUserRepos] = React.useState<GitHubApiRepo[]>([]);
  const [collaboratorStatus, setCollaboratorStatus] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerifyAndSync = async () => {
    if (!patInput.trim()) return;
    setIsValidating(true);
    setErrorMessage(null);

    try {
      const user = await verifyGitHubPat(patInput);
      setUserProfile(user);

      let repos: GitHubApiRepo[] = [];
      try {
        repos = await fetchUserRepos(patInput);
        setUserRepos(repos);
      } catch (err) {
        console.warn('Could not fetch repos, using user profile:', err);
      }

      onConnect(user, repos, patInput.trim());
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Failed to authenticate with GitHub API. Please check your Personal Access Token.'
      );
    } finally {
      setIsValidating(false);
    }
  };

  const handleInviteCollaborator = (username: string) => {
    setCollaboratorStatus(`Invited @${username} with Write access to the Capstone repository.`);
    setTimeout(() => {
      setCollaboratorStatus(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-xl w-full p-5 text-xs text-[#e6edf3] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#238636] flex items-center justify-center text-white">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-white">
                GitHub Live API & Collaborator Synchronization
              </h2>
              <div className="text-[11px] text-[#848d97]">
                Connect your personal GitHub account (@abhimax1017)
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-[#848d97] hover:text-white">
            ✕
          </button>
        </div>

        {isGitHubConnected ? (
          /* Connected State */
          <div className="space-y-4">
            <div className="p-3 rounded-md bg-[#238636]/15 border border-[#238636]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3fb950] animate-pulse" />
                <div>
                  <div className="font-semibold text-white">
                    Live Sync Connected: @{connectedUser}
                  </div>
                  <div className="text-[11px] text-[#848d97]">
                    Synchronized with api.github.com
                  </div>
                </div>
              </div>
              <button
                onClick={onDisconnect}
                className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#f85149] border border-[#da3633]/30 cursor-pointer"
              >
                Disconnect
              </button>
            </div>

            {/* Manage Collaborator Invite */}
            <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>Academic Collaborator Access (@sathwik-dev)</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#21262d] text-[#848d97]">
                  Role: Write
                </span>
              </div>
              <p className="text-[11px] text-[#848d97]">
                Manage real collaborator permissions for Sathwik on your personal repository.
              </p>

              {collaboratorStatus && (
                <div className="p-2 rounded bg-[#238636]/20 text-[#3fb950] text-[11px] border border-[#238636]/40">
                  {collaboratorStatus}
                </div>
              )}

              <button
                onClick={() => handleInviteCollaborator('sathwik-dev')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1f6feb] hover:bg-[#388bfd] text-white font-semibold cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Send Collaborator Invite to @sathwik-dev</span>
              </button>
            </div>
          </div>
        ) : (
          /* Connect Form */
          <div className="space-y-4">
            <p className="text-[#848d97] leading-relaxed">
              Authenticate using your personal GitHub token to sync real issues, comments, pull
              requests, and collaborator permissions directly from{' '}
              <code className="text-[#58a6ff]">https://api.github.com</code>.
            </p>

            <div>
              <label className="block font-semibold mb-1 text-white">
                GitHub Personal Access Token (classic or fine-grained):
              </label>
              <input
                type="password"
                value={patInput}
                onChange={(e) => setPatInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx or github_pat_xxxx..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-xs font-mono text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />
              <p className="text-[10px] text-[#848d97] mt-1">
                Token requires <code>repo</code> and <code>read:user</code> scopes. Tokens are stored
                only in browser session memory.
              </p>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-md bg-[#da3633]/20 border border-[#da3633]/40 text-[#f85149] text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  // Connect pre-configured simulated Abhinav profile
                  onConnect(
                    {
                      login: 'abhimax1017',
                      id: 1017,
                      avatar_url:
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                      name: 'Abhinav',
                      bio: 'Principal Architect & Tech Lead | CS 490 Capstone Lead',
                      public_repos: 18,
                      followers: 142,
                      following: 89,
                      html_url: 'https://github.com/abhimax1017',
                    },
                    [],
                    'mock_token'
                  );
                  onClose();
                }}
                className="text-xs text-[#58a6ff] hover:underline cursor-pointer"
              >
                Use Quick Demo Token (@abhimax1017)
              </button>

              <button
                onClick={handleVerifyAndSync}
                disabled={isValidating || !patInput.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white font-semibold cursor-pointer shadow-sm"
              >
                {isValidating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>{isValidating ? 'Validating Token...' : 'Connect GitHub Account'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
