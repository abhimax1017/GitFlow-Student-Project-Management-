import React from 'react';
import {
  Code,
  CircleDot,
  GitPullRequest,
  LayoutGrid,
  PlayCircle,
  BarChart2,
  Terminal,
  BookOpen,
  Star,
  GitFork,
  Eye,
  ChevronDown,
  Layers,
  Check,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { AcademicRepo } from '../../types';

export type TabKey =
  | 'code'
  | 'issues'
  | 'pulls'
  | 'projects'
  | 'actions'
  | 'insights'
  | 'terminal'
  | 'guide';

interface RepoHeaderProps {
  currentRepo: AcademicRepo;
  allRepos: AcademicRepo[];
  onSelectRepo: (repo: AcademicRepo) => void;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  starsCount: number;
  isStarred: boolean;
  onToggleStar: () => void;
  openIssuesCount: number;
  openPrCount: number;
  kanbanCount: number;
}

export const RepoHeader: React.FC<RepoHeaderProps> = ({
  currentRepo,
  allRepos,
  onSelectRepo,
  activeTab,
  onTabChange,
  starsCount,
  isStarred,
  onToggleStar,
  openIssuesCount,
  openPrCount,
  kanbanCount,
}) => {
  const [showRepoDropdown, setShowRepoDropdown] = React.useState(false);

  const tabs: {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    { key: 'code', label: 'Code', icon: <Code className="w-4 h-4" /> },
    {
      key: 'issues',
      label: 'Issues',
      icon: <CircleDot className="w-4 h-4" />,
      count: openIssuesCount,
    },
    {
      key: 'pulls',
      label: 'Pull requests',
      icon: <GitPullRequest className="w-4 h-4" />,
      count: openPrCount,
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: <LayoutGrid className="w-4 h-4" />,
      count: kanbanCount,
    },
    { key: 'actions', label: 'Actions', icon: <PlayCircle className="w-4 h-4" /> },
    { key: 'insights', label: 'Insights', icon: <BarChart2 className="w-4 h-4" /> },
    { key: 'terminal', label: 'Terminal CLI', icon: <Terminal className="w-4 h-4" /> },
    { key: 'guide', label: 'Guide & Rubric', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#161b22] border-b border-[#30363d] pt-4 text-[#e6edf3]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top: Repo Breadcrumb + Project Switcher + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          {/* Breadcrumb & Project Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowRepoDropdown(!showRepoDropdown)}
                className="flex items-center gap-1.5 text-xs bg-[#21262d] hover:bg-[#30363d] px-2.5 py-1 rounded-md border border-[#30363d] text-[#58a6ff] font-semibold transition cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#848d97]" />
                <span>Switch Project</span>
                <ChevronDown className="w-3 h-3 text-[#848d97]" />
              </button>

              {showRepoDropdown && (
                <div className="absolute left-0 mt-1.5 w-80 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1 text-xs z-50">
                  <div className="px-3 py-1.5 border-b border-[#30363d] text-[11px] font-semibold text-[#848d97] uppercase tracking-wider">
                    Academic Showcase Repositories
                  </div>
                  {allRepos.map((repo) => (
                    <button
                      key={repo.id}
                      onClick={() => {
                        onSelectRepo(repo);
                        setShowRepoDropdown(false);
                      }}
                      className={`w-full flex items-start gap-2.5 px-3 py-2 text-left hover:bg-[#21262d] transition ${
                        currentRepo.id === repo.id ? 'bg-[#1f6feb]/10 text-[#58a6ff]' : 'text-[#e6edf3]'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: repo.languageColor }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs flex items-center justify-between">
                          <span className="truncate">{repo.name}</span>
                          {currentRepo.id === repo.id && <Check className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />}
                        </div>
                        <div className="text-[11px] text-[#848d97] truncate">{repo.course} • {repo.primaryLanguage}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-lg font-normal">
              <span className="text-[#58a6ff] hover:underline cursor-pointer">abhimax1017</span>
              <span className="text-[#848d97]">/</span>
              <span className="font-semibold text-[#58a6ff] hover:underline cursor-pointer">
                {currentRepo.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363d] text-[#848d97] bg-[#0d1117] font-medium ml-1">
                {currentRepo.isPrivate ? 'Private' : 'Public'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full border border-[#238636]/40 text-[#3fb950] bg-[#238636]/10 font-medium">
                {currentRepo.course}
              </span>
            </div>
          </div>

          {/* Action Buttons: Live Website, Watch, Fork, Star */}
          <div className="flex items-center gap-2">
            {/* Live Website Link */}
            {currentRepo.demoUrl && (
              <a
                href={currentRepo.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition shadow-xs cursor-pointer"
                title={`Open deployed application at ${currentRepo.demoUrl}`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Website</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            )}

            {/* Watch */}
            <div className="inline-flex rounded-md shadow-xs">
              <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] rounded-l-md transition cursor-pointer">
                <Eye className="w-3.5 h-3.5 text-[#848d97]" />
                <span>Watch</span>
              </button>
              <div className="px-2 py-1 text-xs font-mono font-semibold bg-[#0d1117] text-[#e6edf3] border-t border-b border-r border-[#30363d] rounded-r-md">
                {currentRepo.watchers}
              </div>
            </div>

            {/* Fork */}
            <div className="inline-flex rounded-md shadow-xs">
              <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] rounded-l-md transition cursor-pointer">
                <GitFork className="w-3.5 h-3.5 text-[#848d97]" />
                <span>Fork</span>
              </button>
              <div className="px-2 py-1 text-xs font-mono font-semibold bg-[#0d1117] text-[#e6edf3] border-t border-b border-r border-[#30363d] rounded-r-md">
                {currentRepo.forks}
              </div>
            </div>

            {/* Star with live toggle */}
            <div className="inline-flex rounded-md shadow-xs">
              <button
                onClick={onToggleStar}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border border-[#30363d] rounded-l-md transition cursor-pointer ${
                  isStarred
                    ? 'bg-[#e3b341]/20 text-[#e3b341] border-[#e3b341]/50'
                    : 'bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-[#e3b341] text-[#e3b341]' : 'text-[#848d97]'}`} />
                <span>{isStarred ? 'Starred' : 'Star'}</span>
              </button>
              <div className="px-2 py-1 text-xs font-mono font-semibold bg-[#0d1117] text-[#e6edf3] border-t border-b border-r border-[#30363d] rounded-r-md">
                {starsCount}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none mt-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#f78166] text-[#e6edf3]'
                    : 'border-transparent text-[#848d97] hover:text-[#e6edf3] hover:border-[#848d97]'
                }`}
              >
                <span className={isActive ? 'text-[#e6edf3]' : 'text-[#848d97]'}>{tab.icon}</span>
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                      isActive ? 'bg-[#30363d] text-[#e6edf3]' : 'bg-[#21262d] text-[#848d97]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
