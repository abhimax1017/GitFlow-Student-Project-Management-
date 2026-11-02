import React from 'react';
import {
  GitPullRequest,
  Search,
  Bell,
  Plus,
  Moon,
  Sun,
  Github,
  Check,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { UserPersona } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';

interface HeaderProps {
  currentPersona: UserPersona;
  onSwitchPersona: (persona: UserPersona) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSyncModal: () => void;
  isGitHubConnected: boolean;
  connectedUser: string | null;
  onNewIssueClick: () => void;
  onNewPrClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  onSwitchPersona,
  isDarkMode,
  onToggleDarkMode,
  onOpenSyncModal,
  isGitHubConnected,
  connectedUser,
  onNewIssueClick,
  onNewPrClick,
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = React.useState(false);
  const [showCreateMenu, setShowCreateMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#161b22] border-b border-[#30363d] px-4 py-2.5 text-[#e6edf3]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#238636] flex items-center justify-center text-white font-bold shadow-sm shadow-[#238636]/30">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-sm tracking-tight text-white">
                GITFLOW
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40">
                  Academic AI
                </span>
              </div>
              <div className="text-[11px] text-[#848d97] font-mono leading-none">
                Plan. Collaborate. Track. Deliver.
              </div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative max-w-xs w-full hidden md:block">
            <Search className="w-4 h-4 text-[#848d97] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Type '/' to search repositories, issues, PRs..."
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-8 pr-12 text-xs text-[#e6edf3] placeholder-[#848d97] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] border border-[#30363d] px-1 rounded text-[#848d97] bg-[#161b22]">
              /
            </span>
          </div>
        </div>

        {/* Right Actions: Persona Switcher, Live Sync, Create, Notifications, Profile */}
        <div className="flex items-center gap-2.5">
          {/* GitHub Live Sync Status Pill */}
          <button
            onClick={onOpenSyncModal}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition cursor-pointer font-medium ${
              isGitHubConnected
                ? 'bg-[#238636]/15 border-[#238636]/50 text-[#3fb950] hover:bg-[#238636]/25'
                : 'bg-[#21262d] border-[#30363d] text-[#848d97] hover:text-[#e6edf3] hover:border-[#848d97]'
            }`}
            title="Configure Live GitHub PAT & Collaborators"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isGitHubConnected ? `@${connectedUser || 'abhimax1017'}` : 'Connect GitHub PAT'}
            </span>
            {isGitHubConnected ? (
              <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            ) : (
              <span className="text-[10px] text-[#848d97] font-mono">(Offline Mock)</span>
            )}
          </button>

          {/* Create Button Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-1 bg-[#21262d] hover:bg-[#30363d] text-xs px-2 py-1.5 rounded-md border border-[#30363d] text-[#e6edf3] font-medium transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <ChevronDown className="w-3 h-3 text-[#848d97]" />
            </button>
            {showCreateMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-1 text-xs z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    onNewIssueClick();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#1f6feb]/20 hover:text-white flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>New issue (AI Assisted)</span>
                </button>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    onNewPrClick();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#1f6feb]/20 hover:text-white flex items-center gap-2"
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-[#8957e5]" />
                  <span>New pull request</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-1.5 rounded-md hover:bg-[#21262d] text-[#848d97] hover:text-[#e6edf3] transition cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1f6feb]" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-md hover:bg-[#21262d] text-[#848d97] hover:text-[#e6edf3] transition cursor-pointer"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Active Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-md hover:bg-[#21262d] border border-[#30363d] transition cursor-pointer group"
              title="Switch Active Developer Persona"
            >
              <div className="relative">
                <img
                  src={currentPersona.avatar}
                  alt={currentPersona.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#30363d]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#238636] border border-[#161b22]" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold leading-none text-[#e6edf3] flex items-center gap-1">
                  @{currentPersona.username}
                  <ChevronDown className="w-3 h-3 text-[#848d97] group-hover:text-white transition" />
                </div>
                <div className="text-[10px] text-[#848d97] leading-none mt-0.5 truncate max-w-[90px]">
                  {currentPersona.role.split('&')[0]}
                </div>
              </div>
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-1.5 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1.5 text-xs z-50">
                <div className="px-3 py-1.5 border-b border-[#30363d] text-[11px] text-[#848d97]">
                  Signed in as{' '}
                  <span className="font-semibold text-[#e6edf3]">
                    @{currentPersona.username}
                  </span>
                </div>
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#848d97] tracking-wider">
                  Switch Active Persona
                </div>

                {/* Abhinav */}
                <button
                  onClick={() => {
                    onSwitchPersona(TEAM_MEMBERS.abhinav);
                    setShowPersonaMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#21262d] transition ${
                    currentPersona.id === 'abhinav-lead' ? 'bg-[#1f6feb]/10 text-[#58a6ff]' : 'text-[#e6edf3]'
                  }`}
                >
                  <img
                    src={TEAM_MEMBERS.abhinav.avatar}
                    alt="Abhinav"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-xs flex items-center justify-between">
                      Abhinav (@abhinav-lead)
                      {currentPersona.id === 'abhinav-lead' && (
                        <Check className="w-3.5 h-3.5 text-[#58a6ff]" />
                      )}
                    </div>
                    <div className="text-[10px] text-[#848d97]">
                      Tech Lead • abhimax1017@gmail.com
                    </div>
                  </div>
                </button>

                {/* Sathwik */}
                <button
                  onClick={() => {
                    onSwitchPersona(TEAM_MEMBERS.sathwik);
                    setShowPersonaMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#21262d] transition ${
                    currentPersona.id === 'sathwik-dev' ? 'bg-[#1f6feb]/10 text-[#58a6ff]' : 'text-[#e6edf3]'
                  }`}
                >
                  <img
                    src={TEAM_MEMBERS.sathwik.avatar}
                    alt="Sathwik"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-xs flex items-center justify-between">
                      Sathwik (@sathwik-dev)
                      {currentPersona.id === 'sathwik-dev' && (
                        <Check className="w-3.5 h-3.5 text-[#58a6ff]" />
                      )}
                    </div>
                    <div className="text-[10px] text-[#848d97]">
                      Frontend Lead • sathwik.dev@campus.edu
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
