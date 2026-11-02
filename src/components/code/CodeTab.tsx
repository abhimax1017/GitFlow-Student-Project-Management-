import React from 'react';
import {
  GitBranch,
  FileCode,
  Folder,
  History,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Code2,
  Terminal,
  Shield,
  Users,
  Tag,
  BookOpen,
} from 'lucide-react';
import { AcademicRepo, RepoFile, UserPersona } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';

interface CodeTabProps {
  repo: AcademicRepo;
  files: RepoFile[];
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  currentPersona: UserPersona;
  onNavigateTab: (tab: any) => void;
}

export const CodeTab: React.FC<CodeTabProps> = ({
  repo,
  files,
  currentBranch,
  onBranchChange,
  currentPersona,
  onNavigateTab,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<RepoFile | null>(null);
  const [showBranchMenu, setShowBranchMenu] = React.useState(false);
  const [showCloneModal, setShowCloneModal] = React.useState(false);
  const [cloneProtocol, setCloneProtocol] = React.useState<'https' | 'ssh' | 'cli'>('https');
  const [hasCopiedClone, setHasCopiedClone] = React.useState(false);
  const [hasCopiedCode, setHasCopiedCode] = React.useState(false);
  const readmeFile = files.find((f) => f.name.toLowerCase() === 'readme.md');

  // When repo changes, reset selected file
  React.useEffect(() => {
    setSelectedFile(null);
  }, [repo.id]);

  const cloneUrls = {
    https: `https://github.com/abhimax1017/${repo.name}.git`,
    ssh: `git@github.com:abhimax1017/${repo.name}.git`,
    cli: `gh repo clone abhimax1017/${repo.name}`,
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneUrls[cloneProtocol]);
    setHasCopiedClone(true);
    setTimeout(() => setHasCopiedClone(false), 2000);
  };

  const handleCopyFileCode = () => {
    if (selectedFile?.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setHasCopiedCode(true);
      setTimeout(() => setHasCopiedCode(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main 3-column Left Content: Branches, Commits, File Tree, Viewer, Heatmap */}
        <div className="lg:col-span-3 space-y-4">
          {/* Controls Bar: Branch Selector, Branch count, Clone Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Branch Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowBranchMenu(!showBranchMenu)}
                  className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] px-3 py-1.5 rounded-md border border-[#30363d] text-xs font-semibold text-[#e6edf3] transition cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#848d97]" />
                  <span>{currentBranch}</span>
                  <span className="text-[10px] text-[#848d97] font-mono">▼</span>
                </button>

                {showBranchMenu && (
                  <div className="absolute left-0 mt-1.5 w-60 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1 text-xs z-50">
                    <div className="px-3 py-1.5 border-b border-[#30363d] text-[11px] font-semibold text-[#848d97] uppercase">
                      Switch branches/tags
                    </div>
                    {repo.branches.map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          onBranchChange(b);
                          setShowBranchMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#21262d] transition ${
                          currentBranch === b ? 'bg-[#1f6feb]/15 text-[#58a6ff] font-semibold' : 'text-[#e6edf3]'
                        }`}
                      >
                        <span className="truncate">{b}</span>
                        {currentBranch === b && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Branches count */}
              <div className="flex items-center gap-1.5 text-xs text-[#848d97] hover:text-[#58a6ff] cursor-pointer">
                <GitBranch className="w-3.5 h-3.5" />
                <span className="font-semibold text-[#e6edf3]">{repo.branches.length}</span> branches
              </div>

              {/* Tags count */}
              <div className="flex items-center gap-1.5 text-xs text-[#848d97] hover:text-[#58a6ff] cursor-pointer">
                <Tag className="w-3.5 h-3.5" />
                <span className="font-semibold text-[#e6edf3]">3</span> tags
              </div>
            </div>

            {/* Right: Code Clone Modal */}
            <div className="relative">
              <button
                onClick={() => setShowCloneModal(!showCloneModal)}
                className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] px-3 py-1.5 rounded-md text-xs font-semibold text-white shadow-sm transition cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code</span>
                <span className="text-[10px]">▼</span>
              </button>

              {showCloneModal && (
                <div className="absolute right-0 mt-1.5 w-80 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl p-3 text-xs z-50">
                  <div className="font-semibold text-[#e6edf3] mb-2 flex items-center justify-between">
                    <span>Clone repository</span>
                    <button
                      onClick={() => setShowCloneModal(false)}
                      className="text-[#848d97] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-[#30363d] mb-2.5">
                    {(['https', 'ssh', 'cli'] as const).map((proto) => (
                      <button
                        key={proto}
                        onClick={() => setCloneProtocol(proto)}
                        className={`px-3 py-1 font-semibold uppercase text-[11px] border-b-2 transition ${
                          cloneProtocol === proto
                            ? 'border-[#f78166] text-[#e6edf3]'
                            : 'border-transparent text-[#848d97] hover:text-[#e6edf3]'
                        }`}
                      >
                        {proto}
                      </button>
                    ))}
                  </div>

                  {/* URL Input with Copy */}
                  <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] rounded-md p-1.5 mb-2.5">
                    <input
                      type="text"
                      readOnly
                      value={cloneUrls[cloneProtocol]}
                      className="w-full bg-transparent text-[11px] font-mono text-[#e6edf3] focus:outline-none"
                    />
                    <button
                      onClick={handleCopyClone}
                      className="p-1 rounded hover:bg-[#21262d] text-[#848d97] hover:text-white cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {hasCopiedClone ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading archive for ${repo.name} (${currentBranch}).zip`);
                    }}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#21262d] text-[#e6edf3] transition"
                  >
                    <Download className="w-4 h-4 text-[#848d97]" />
                    <div>
                      <div className="font-semibold text-xs">Download ZIP</div>
                      <div className="text-[10px] text-[#848d97]">Latest snapshot of {currentBranch}</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Latest Commit Bar */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-t-md p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={TEAM_MEMBERS.abhinav.avatar}
                alt="Abhinav"
                className="w-5 h-5 rounded-full object-cover shrink-0"
              />
              <span className="font-semibold text-[#e6edf3] hover:underline cursor-pointer">
                abhinav-lead
              </span>
              <span className="text-[#848d97] truncate">
                feat(auth): implement student JWT session rotation with Redis blacklist
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-[#848d97] font-mono text-[11px]">
              <span className="bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d] text-[#58a6ff] hover:underline cursor-pointer">
                9f2a41d
              </span>
              <span>12 mins ago</span>
              <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                <History className="w-3.5 h-3.5" />
                <span className="font-sans font-semibold text-[#e6edf3]">148</span> commits
              </span>
            </div>
          </div>

          {/* File Explorer or Selected File Viewer */}
          {selectedFile ? (
            /* File Viewer */
            <div className="bg-[#0d1117] border border-[#30363d] rounded-b-md overflow-hidden text-xs">
              {/* File Header */}
              <div className="bg-[#161b22] border-b border-[#30363d] p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-[#58a6ff] hover:underline font-semibold"
                  >
                    {repo.name}
                  </button>
                  <ChevronRight className="w-3 h-3 text-[#848d97]" />
                  <span className="font-mono text-[#e6edf3] font-semibold">
                    {selectedFile.path}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#848d97] font-mono border border-[#30363d]">
                    {selectedFile.size || '3.2 KB'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyFileCode}
                    className="flex items-center gap-1 px-2 py-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded text-[11px] text-[#e6edf3] cursor-pointer transition"
                  >
                    {hasCopiedCode ? <Check className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3 text-[#848d97]" />}
                    <span>{hasCopiedCode ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="px-2 py-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded text-[11px] text-[#848d97] hover:text-white cursor-pointer"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>

              {/* Code Content with Line Numbers */}
              <div className="font-mono text-[12px] leading-relaxed p-4 overflow-x-auto bg-[#0d1117]">
                <table className="w-full border-collapse">
                  <tbody>
                    {(selectedFile.content || '// Empty file').split('\n').map((line, idx) => (
                      <tr key={idx} className="hover:bg-[#161b22]/50 group">
                        <td className="w-10 select-none text-right pr-4 text-[#484f58] group-hover:text-[#848d97] font-mono text-[11px]">
                          {idx + 1}
                        </td>
                        <td className="text-[#e6edf3] whitespace-pre font-mono">
                          {line}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* File List Table */
            <div className="bg-[#0d1117] border-x border-b border-[#30363d] rounded-b-md overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className="border-b border-[#21262d] last:border-b-0 hover:bg-[#161b22] cursor-pointer transition group"
                    >
                      <td className="py-2.5 px-3 w-64 text-[#e6edf3] font-medium flex items-center gap-2">
                        {file.type === 'dir' ? (
                          <Folder className="w-4 h-4 text-[#54aeff]" />
                        ) : (
                          <FileCode className="w-4 h-4 text-[#848d97] group-hover:text-[#58a6ff]" />
                        )}
                        <span className="group-hover:text-[#58a6ff] group-hover:underline">
                          {file.name}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[#848d97] truncate max-w-xs">
                        {file.lastCommitMessage}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#848d97] font-mono text-[11px] whitespace-nowrap">
                        {file.updatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* README.md Preview (Official GitHub Primer Standard) */}
          {!selectedFile && readmeFile && (
            <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden text-xs">
              <div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-[#e6edf3]">
                  <BookOpen className="w-4 h-4 text-[#848d97]" />
                  <span>README.md</span>
                </div>
                <button
                  onClick={() => setSelectedFile(readmeFile)}
                  className="text-[11px] text-[#58a6ff] hover:underline cursor-pointer"
                >
                  View file raw
                </button>
              </div>

              <div className="p-6 text-[#e6edf3] space-y-4 leading-relaxed">
                {repo.demoUrl && (
                  <div className="p-3.5 rounded-md bg-[#238636]/15 border border-[#238636]/40 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] animate-pulse" />
                      <div>
                        <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                          <span>Live Production Website is Active</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#238636]/30 text-[#3fb950] font-mono">
                            VERIFIED
                          </span>
                        </div>
                        <div className="text-[11px] text-[#848d97]">
                          Deployed application accessible at{' '}
                          <a
                            href={repo.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#58a6ff] hover:underline font-mono"
                          >
                            {repo.demoUrl}
                          </a>
                        </div>
                      </div>
                    </div>
                    <a
                      href={repo.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold shadow-xs transition"
                    >
                      <span>Open Deployed Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <h1 className="text-xl font-bold pb-2 border-b border-[#21262d] text-white">
                  🎓 {repo.name} ({repo.course})
                </h1>

                <blockquote className="border-l-4 border-[#30363d] pl-3 py-1 text-[#848d97] italic">
                  {repo.description}
                </blockquote>

                <div className="space-y-2 pt-1">
                  <h2 className="text-sm font-semibold text-white border-b border-[#21262d] pb-1">
                    👥 Engineering Team
                  </h2>
                  <ul className="list-disc list-inside space-y-1.5 text-[#848d97]">
                    <li>
                      <strong className="text-[#e6edf3]">Abhinav</strong> (
                      <code className="text-[#58a6ff] font-mono text-[11px]">@abhinav-lead</code>) — Tech Lead,
                      System Architecture, Auth & Redis, CI/CD Pipelines
                    </li>
                    <li>
                      <strong className="text-[#e6edf3]">Sathwik</strong> (
                      <code className="text-[#58a6ff] font-mono text-[11px]">@sathwik-dev</code>) — Frontend
                      Lead, GitHub Primer Design, Visualizations, MLOps
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-1">
                  <h2 className="text-sm font-semibold text-white border-b border-[#21262d] pb-1">
                    🌿 GitFlow Branching Model
                  </h2>
                  <ul className="list-disc list-inside space-y-1.5 text-[#848d97]">
                    <li>
                      <code className="text-[#58a6ff] font-mono text-[11px]">main</code> — Production releases
                      tagged with semver (e.g., v1.0.0). Direct commits disabled.
                    </li>
                    <li>
                      <code className="text-[#3fb950] font-mono text-[11px]">develop</code> — Sprint integration
                      branch. Requires passing CI checks and partner review signoff.
                    </li>
                    <li>
                      <code className="text-[#d29922] font-mono text-[11px]">feature/*</code> — Isolated student
                      working branches (e.g. <code>feature/auth-jwt</code>).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: About, Technologies, Active Collaborators, Live Deployment */}
        <div className="space-y-5 text-xs text-[#848d97]">
          {/* About */}
          <div>
            <h3 className="font-semibold text-sm text-[#e6edf3] mb-2">About</h3>
            <p className="text-[#848d97] leading-relaxed mb-3">
              {repo.description}
            </p>

            {repo.demoUrl && (
              <div className="mb-3">
                <a
                  href={repo.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#58a6ff] font-semibold hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{repo.demoUrl.replace('https://', '')}</span>
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="px-2 py-0.5 rounded-full bg-[#1f6feb]/15 text-[#58a6ff] text-[11px] font-medium border border-[#1f6feb]/30">
                {repo.course}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#238636]/15 text-[#3fb950] text-[11px] font-medium border border-[#238636]/30">
                gitflow-verified
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#21262d] text-[#848d97] text-[11px] font-medium border border-[#30363d]">
                gemini-triage
              </span>
            </div>
          </div>

          {/* Academic Collaborators */}
          <div className="border-t border-[#30363d] pt-4">
            <h3 className="font-semibold text-sm text-[#e6edf3] mb-3 flex items-center justify-between">
              <span>Collaborators</span>
              <span className="text-[11px] text-[#848d97] font-normal">2 Students</span>
            </h3>

            <div className="space-y-3">
              {/* Abhinav */}
              <div className="flex items-center gap-2.5 p-2 rounded-md bg-[#161b22] border border-[#30363d]">
                <img
                  src={TEAM_MEMBERS.abhinav.avatar}
                  alt="Abhinav"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#e6edf3] text-xs truncate">
                    Abhinav (@abhinav-lead)
                  </div>
                  <div className="text-[10px] text-[#848d97] truncate">
                    Tech Lead • Architecture
                  </div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] font-mono">
                  Lead
                </span>
              </div>

              {/* Sathwik */}
              <div className="flex items-center gap-2.5 p-2 rounded-md bg-[#161b22] border border-[#30363d]">
                <img
                  src={TEAM_MEMBERS.sathwik.avatar}
                  alt="Sathwik"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#e6edf3] text-xs truncate">
                    Sathwik (@sathwik-dev)
                  </div>
                  <div className="text-[10px] text-[#848d97] truncate">
                    Frontend Lead • MLOps
                  </div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1f6feb]/20 text-[#58a6ff] font-mono">
                  Dev
                </span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="border-t border-[#30363d] pt-4">
            <h3 className="font-semibold text-sm text-[#e6edf3] mb-2">Languages</h3>
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#21262d] mb-2">
              <div
                className="h-full"
                style={{
                  width: '82%',
                  backgroundColor: repo.languageColor,
                }}
              />
              <div className="h-full w-[12%] bg-[#e34c26]" />
              <div className="h-full w-[6%] bg-[#f1e05a]" />
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                />
                <span className="text-[#e6edf3] font-medium">{repo.primaryLanguage}</span>
                <span className="text-[#848d97]">82.4%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e34c26]" />
                <span className="text-[#e6edf3] font-medium">HTML/CSS</span>
                <span className="text-[#848d97]">12.1%</span>
              </div>
            </div>
          </div>

          {/* Academic Rubric Verified */}
          <div className="border-t border-[#30363d] pt-4">
            <div className="p-3 rounded-md bg-[#238636]/10 border border-[#238636]/30 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#3fb950] mb-1">
                <Shield className="w-4 h-4" />
                <span>Capstone Rubric Passed</span>
              </div>
              <div className="text-[11px] text-[#848d97]">
                Current audit grade: <strong className="text-white">A+ (98.5 / 100)</strong>. Peer reviews and conventional commit rules verified.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
