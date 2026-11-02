import React from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  AlertCircle,
  Check,
  ChevronDown,
  Sparkles,
  GitMerge,
  FileCode,
  ShieldCheck,
  Loader2,
  Send,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PullRequest, AcademicRepo, UserPersona } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';
import { reviewCode, AiCodeReviewResult } from '../../services/geminiService';

interface PullRequestsTabProps {
  repo: AcademicRepo;
  pullRequests: PullRequest[];
  currentPersona: UserPersona;
  onUpdatePr: (pr: PullRequest) => void;
  onCreatePr: (pr: Partial<PullRequest>) => void;
}

export const PullRequestsTab: React.FC<PullRequestsTabProps> = ({
  repo,
  pullRequests,
  currentPersona,
  onUpdatePr,
  onCreatePr,
}) => {
  const [filterState, setFilterState] = React.useState<'open' | 'closed'>('open');
  const [selectedPrId, setSelectedPrId] = React.useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = React.useState<'conversation' | 'commits' | 'checks' | 'diff'>('conversation');
  const [mergeStrategy, setMergeStrategy] = React.useState<'merge' | 'squash' | 'rebase'>('merge');
  const [diffViewMode, setDiffViewMode] = React.useState<'unified' | 'split'>('unified');

  // AI Code review state
  const [isReviewing, setIsReviewing] = React.useState(false);
  const [aiReviewResult, setAiReviewResult] = React.useState<AiCodeReviewResult | null>(null);

  // New review comment
  const [reviewComment, setReviewComment] = React.useState('');

  const selectedPr = pullRequests.find((pr) => pr.id === selectedPrId) || null;

  const openCount = pullRequests.filter((pr) => pr.state === 'open').length;
  const closedCount = pullRequests.filter((pr) => pr.state !== 'open').length;

  const filteredPrs = pullRequests.filter((pr) => {
    if (filterState === 'open') return pr.state === 'open';
    return pr.state === 'merged' || pr.state === 'closed';
  });

  // Handle running AI Code Review
  const handleRunAiReview = async () => {
    if (!selectedPr) return;
    setIsReviewing(true);
    try {
      const diffSnippet = selectedPr.diffFiles
        .map((f) => `File: ${f.filename}\n` + f.chunks.map((c) => c.lines.map((l) => l.content).join('\n')).join('\n'))
        .join('\n');

      const result = await reviewCode(selectedPr.title, selectedPr.body, diffSnippet, repo.name);
      setAiReviewResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewing(false);
    }
  };

  // Submit Peer Review
  const handleSubmitReview = (status: 'approved' | 'changes_requested') => {
    if (!selectedPr) return;

    const existingReviewers = selectedPr.reviewers.filter((r) => r.user.id !== currentPersona.id);
    const updatedReviewers = [
      ...existingReviewers,
      {
        user: currentPersona,
        status,
        comment: reviewComment || (status === 'approved' ? 'Approved! Looks solid.' : 'Changes requested.'),
      },
    ];

    onUpdatePr({
      ...selectedPr,
      reviewers: updatedReviewers,
    });
    setReviewComment('');
  };

  // Merge PR
  const handleMerge = () => {
    if (!selectedPr) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    onUpdatePr({
      ...selectedPr,
      state: 'merged',
      mergeStrategy,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {selectedPr ? (
        /* PR Detail View */
        <div className="space-y-5">
          {/* PR Header */}
          <div className="border-b border-[#30363d] pb-4">
            <button
              onClick={() => {
                setSelectedPrId(null);
                setAiReviewResult(null);
              }}
              className="text-xs text-[#58a6ff] hover:underline font-semibold mb-2 inline-flex items-center gap-1 cursor-pointer"
            >
              ← Back to all pull requests
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl md:text-2xl font-semibold text-[#e6edf3]">
                {selectedPr.title}{' '}
                <span className="text-[#848d97] font-normal font-mono">
                  #{selectedPr.id}
                </span>
              </h1>

              {/* Action */}
              <button
                onClick={handleRunAiReview}
                disabled={isReviewing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1f6feb]/20 hover:bg-[#1f6feb]/30 border border-[#1f6feb]/50 text-xs font-semibold text-[#58a6ff] transition cursor-pointer"
              >
                {isReviewing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isReviewing ? 'Running Gemini Review...' : 'Run Gemini AI Review'}</span>
              </button>
            </div>

            {/* Branch banner */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#848d97]">
              <span
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                  selectedPr.state === 'merged'
                    ? 'bg-[#8957e5]'
                    : selectedPr.state === 'open'
                    ? 'bg-[#238636]'
                    : 'bg-[#da3633]'
                }`}
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span className="capitalize">{selectedPr.state}</span>
              </span>

              <span className="font-semibold text-[#e6edf3]">
                @{selectedPr.author.username}
              </span>
              <span>wants to merge {selectedPr.commitsCount} commits into</span>
              <span className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#58a6ff] font-mono border border-[#30363d]">
                {selectedPr.targetBranch}
              </span>
              <span>from</span>
              <span className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#58a6ff] font-mono border border-[#30363d]">
                {selectedPr.sourceBranch}
              </span>
            </div>

            {/* Sub-tabs: Conversation, Commits, Checks, Files Changed */}
            <div className="flex items-center gap-2 border-b border-[#30363d] mt-4 pt-1">
              <button
                onClick={() => setActiveSubTab('conversation')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeSubTab === 'conversation'
                    ? 'border-[#f78166] text-[#e6edf3]'
                    : 'border-transparent text-[#848d97] hover:text-[#e6edf3]'
                }`}
              >
                Conversation
              </button>
              <button
                onClick={() => setActiveSubTab('commits')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeSubTab === 'commits'
                    ? 'border-[#f78166] text-[#e6edf3]'
                    : 'border-transparent text-[#848d97] hover:text-[#e6edf3]'
                }`}
              >
                <span>Commits</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#21262d] text-[#848d97] text-[10px]">
                  {selectedPr.commitsCount}
                </span>
              </button>
              <button
                onClick={() => setActiveSubTab('checks')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeSubTab === 'checks'
                    ? 'border-[#f78166] text-[#e6edf3]'
                    : 'border-transparent text-[#848d97] hover:text-[#e6edf3]'
                }`}
              >
                <span>Checks</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#238636]/20 text-[#3fb950] text-[10px] font-mono">
                  {selectedPr.checks.length}
                </span>
              </button>
              <button
                onClick={() => setActiveSubTab('diff')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeSubTab === 'diff'
                    ? 'border-[#f78166] text-[#e6edf3]'
                    : 'border-transparent text-[#848d97] hover:text-[#e6edf3]'
                }`}
              >
                <span>Files changed</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#21262d] text-[#848d97] text-[10px]">
                  {selectedPr.changedFilesCount}
                </span>
                <span className="text-[#3fb950] font-mono text-[10px]">+{selectedPr.additions}</span>
                <span className="text-[#f85149] font-mono text-[10px]">-{selectedPr.deletions}</span>
              </button>
            </div>
          </div>

          {/* Sub-tab 1: Conversation */}
          {activeSubTab === 'conversation' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left 3 cols: Description, AI Review result, CI checks, Merge Box */}
              <div className="lg:col-span-3 space-y-5">
                {/* AI Review Banner */}
                {aiReviewResult && (
                  <div className="p-4 rounded-md bg-[#161b22] border border-[#1f6feb]/40 shadow-lg text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-[#58a6ff]">
                        <Sparkles className="w-4 h-4" />
                        <span>Gemini AI Staff Code Review</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] font-mono font-semibold">
                        Quality Score: {aiReviewResult.qualityScore}/100
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-[#0d1117] border border-[#30363d] space-y-2">
                      <div className="text-[#e6edf3]">
                        <strong>Security Analysis:</strong> {aiReviewResult.securityNotes}
                      </div>
                      <div className="text-[#848d97]">
                        <strong>Performance Analysis:</strong> {aiReviewResult.performanceNotes}
                      </div>
                    </div>

                    <div className="text-[#3fb950] font-medium bg-[#238636]/10 p-2.5 rounded border border-[#238636]/30">
                      {aiReviewResult.approvalComment}
                    </div>
                  </div>
                )}

                {/* PR Description */}
                <div className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden text-xs">
                  <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedPr.author.avatar}
                        alt={selectedPr.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-[#e6edf3]">
                        @{selectedPr.author.username}
                      </span>
                      <span className="text-[#848d97]">commented</span>
                    </div>
                    <span className="text-[#848d97] text-[11px]">Author</span>
                  </div>
                  <div className="p-4 text-[#e6edf3] leading-relaxed whitespace-pre-wrap">
                    {selectedPr.body}
                  </div>
                </div>

                {/* Review comments timeline */}
                {selectedPr.reviewers.map((rev, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden text-xs"
                  >
                    <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.user.avatar}
                          alt={rev.user.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-[#e6edf3]">
                          @{rev.user.username}
                        </span>
                        <span className="text-[#848d97]">submitted review</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          rev.status === 'approved'
                            ? 'bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40'
                            : 'bg-[#da3633]/20 text-[#f85149] border border-[#da3633]/40'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </div>
                    <div className="p-3 text-[#e6edf3]">
                      {rev.comment || 'Code changes approved.'}
                    </div>
                  </div>
                ))}

                {/* CI Checks Box */}
                <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-[#e6edf3]">
                      <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                      <span>All checks have passed</span>
                    </div>
                    <span className="text-[#848d97] font-mono text-[11px]">
                      {selectedPr.checks.length} successful checks
                    </span>
                  </div>

                  <div className="divide-y divide-[#21262d] border border-[#30363d] rounded-md bg-[#0d1117]">
                    {selectedPr.checks.map((chk, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <Check className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                          <span className="font-semibold text-[#e6edf3] truncate">
                            {chk.name}
                          </span>
                          <span className="text-[#848d97] truncate hidden sm:inline">
                            — {chk.description}
                          </span>
                        </div>
                        <span className="text-[#848d97] font-mono text-[11px] shrink-0">
                          {chk.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Peer Review Box (If not author) */}
                {selectedPr.state === 'open' && (
                  <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-3 text-xs space-y-2.5">
                    <div className="font-semibold text-[#e6edf3] flex items-center justify-between">
                      <span>Submit Peer Code Review as @{currentPersona.username}</span>
                      <span className="text-[11px] text-[#848d97]">
                        Required for GitFlow Capstone grade
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Leave review comments, suggestions, or approvals..."
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSubmitReview('changes_requested')}
                        className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f85149] border border-[#da3633]/40 font-semibold cursor-pointer"
                      >
                        Request changes
                      </button>
                      <button
                        onClick={() => handleSubmitReview('approved')}
                        className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold cursor-pointer"
                      >
                        Approve Pull Request
                      </button>
                    </div>
                  </div>
                )}

                {/* Merge Box */}
                {selectedPr.state === 'open' ? (
                  <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4 text-xs space-y-3">
                    <div className="flex items-start gap-3">
                      <GitMerge className="w-5 h-5 text-[#3fb950] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-[#e6edf3]">
                          This branch has no conflicts with the base branch
                        </div>
                        <div className="text-[#848d97] text-[11px] mt-0.5">
                          Merging can be performed automatically into{' '}
                          <code className="text-[#58a6ff]">{selectedPr.targetBranch}</code>.
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {/* Merge Strategy Select */}
                      <select
                        value={mergeStrategy}
                        onChange={(e) => setMergeStrategy(e.target.value as any)}
                        className="bg-[#21262d] border border-[#30363d] text-[#e6edf3] px-2.5 py-1.5 rounded-md font-semibold text-xs"
                      >
                        <option value="merge">Create a merge commit</option>
                        <option value="squash">Squash and merge</option>
                        <option value="rebase">Rebase and merge</option>
                      </select>

                      {/* Merge Button */}
                      <button
                        onClick={handleMerge}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold transition cursor-pointer shadow-sm shadow-[#238636]/30"
                      >
                        <GitMerge className="w-3.5 h-3.5" />
                        <span>Merge pull request</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-md bg-[#8957e5]/15 border border-[#8957e5]/40 text-xs flex items-center gap-3 text-[#e6edf3]">
                    <GitMerge className="w-5 h-5 text-[#8957e5]" />
                    <div>
                      <div className="font-semibold text-sm text-[#e6edf3]">
                        Pull request successfully merged and closed
                      </div>
                      <div className="text-[#848d97] text-[11px]">
                        The changes have been merged into{' '}
                        <code className="text-[#58a6ff]">{selectedPr.targetBranch}</code>.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right sidebar */}
              <div className="space-y-4 text-xs text-[#848d97]">
                <div className="border-b border-[#30363d] pb-3">
                  <div className="font-semibold text-[#e6edf3] mb-2">Reviewers</div>
                  <div className="space-y-1.5">
                    {selectedPr.reviewers.map((r, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={r.user.avatar}
                            alt={r.user.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span className="text-[#e6edf3]">@{r.user.username}</span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold ${
                            r.status === 'approved' ? 'text-[#3fb950]' : 'text-[#f85149]'
                          }`}
                        >
                          {r.status === 'approved' ? '✓ Approved' : 'Changes req.'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-[#30363d] pb-3">
                  <div className="font-semibold text-[#e6edf3] mb-2">Milestone</div>
                  <div className="text-[#e6edf3]">{selectedPr.milestone || 'None'}</div>
                </div>

                <div>
                  <div className="font-semibold text-[#e6edf3] mb-2">Labels</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPr.labels.map((l) => (
                      <span
                        key={l.name}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor: `${l.color}25`,
                          color: l.color,
                          border: `1px solid ${l.color}50`,
                        }}
                      >
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 2: Commits */}
          {activeSubTab === 'commits' && (
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] divide-y divide-[#21262d] text-xs">
              <div className="p-3 bg-[#161b22] font-semibold text-[#e6edf3]">
                Commits on {selectedPr.sourceBranch}
              </div>
              <div className="p-3 flex items-center justify-between hover:bg-[#161b22] transition">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedPr.author.avatar}
                    alt={selectedPr.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#e6edf3]">{selectedPr.title}</span>
                </div>
                <span className="font-mono text-[#58a6ff] bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d]">
                  9f2a41d
                </span>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Checks */}
          {activeSubTab === 'checks' && (
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] divide-y divide-[#21262d] text-xs">
              <div className="p-3 bg-[#161b22] font-semibold text-[#e6edf3]">
                CI/CD Status Checks Matrix
              </div>
              {selectedPr.checks.map((chk, i) => (
                <div key={i} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3fb950]" />
                    <span className="font-semibold text-[#e6edf3]">{chk.name}</span>
                    <span className="text-[#848d97]">— {chk.description}</span>
                  </div>
                  <span className="font-mono text-[#848d97]">{chk.duration}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sub-tab 4: Diff Viewer */}
          {activeSubTab === 'diff' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#848d97]">
                  Showing <strong>{selectedPr.diffFiles.length} changed files</strong> with{' '}
                  <strong className="text-[#3fb950]">+{selectedPr.additions} additions</strong> and{' '}
                  <strong className="text-[#f85149]">-{selectedPr.deletions} deletions</strong>.
                </span>

                <div className="flex items-center gap-1 bg-[#21262d] p-1 rounded-md border border-[#30363d]">
                  <button
                    onClick={() => setDiffViewMode('unified')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                      diffViewMode === 'unified' ? 'bg-[#161b22] text-[#e6edf3]' : 'text-[#848d97]'
                    }`}
                  >
                    Unified
                  </button>
                  <button
                    onClick={() => setDiffViewMode('split')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                      diffViewMode === 'split' ? 'bg-[#161b22] text-[#e6edf3]' : 'text-[#848d97]'
                    }`}
                  >
                    Split
                  </button>
                </div>
              </div>

              {/* Diff Files list */}
              {selectedPr.diffFiles.map((diffFile, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden text-xs"
                >
                  <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono">
                      <FileCode className="w-3.5 h-3.5 text-[#848d97]" />
                      <span className="font-semibold text-[#e6edf3]">{diffFile.filename}</span>
                    </div>
                    <div className="font-mono text-[11px] space-x-2">
                      <span className="text-[#3fb950]">+{diffFile.additions}</span>
                      <span className="text-[#f85149]">-{diffFile.deletions}</span>
                    </div>
                  </div>

                  <div className="font-mono text-[11px] overflow-x-auto">
                    {diffFile.chunks.map((chunk, cIdx) => (
                      <div key={cIdx}>
                        <div className="bg-[#161b22]/70 text-[#848d97] px-3 py-1 border-y border-[#21262d]">
                          {chunk.header}
                        </div>
                        <table className="w-full border-collapse">
                          <tbody>
                            {chunk.lines.map((line, lIdx) => (
                              <tr
                                key={lIdx}
                                className={
                                  line.type === 'add'
                                    ? 'bg-[#238636]/15 hover:bg-[#238636]/25 text-[#7ee787]'
                                    : line.type === 'delete'
                                    ? 'bg-[#da3633]/15 hover:bg-[#da3633]/25 text-[#ffa198]'
                                    : 'hover:bg-[#161b22] text-[#e6edf3]'
                                }
                              >
                                <td className="w-8 px-2 py-0.5 select-none text-right text-[#484f58] border-r border-[#21262d]">
                                  {line.oldLineNo || ''}
                                </td>
                                <td className="w-8 px-2 py-0.5 select-none text-right text-[#484f58] border-r border-[#21262d]">
                                  {line.newLineNo || ''}
                                </td>
                                <td className="px-3 py-0.5 whitespace-pre">
                                  {line.type === 'add' ? '+' : line.type === 'delete' ? '-' : ' '}{' '}
                                  {line.content}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* PRs List View */
        <div className="space-y-4">
          <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117] text-xs">
            {/* Header: Open / Closed tabs */}
            <div className="bg-[#161b22] border-b border-[#30363d] p-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFilterState('open')}
                  className={`flex items-center gap-1.5 font-semibold cursor-pointer ${
                    filterState === 'open' ? 'text-[#e6edf3]' : 'text-[#848d97] hover:text-[#e6edf3]'
                  }`}
                >
                  <GitPullRequest className="w-4 h-4 text-[#3fb950]" />
                  <span>{openCount} Open</span>
                </button>

                <button
                  onClick={() => setFilterState('closed')}
                  className={`flex items-center gap-1.5 font-semibold cursor-pointer ${
                    filterState === 'closed'
                      ? 'text-[#e6edf3]'
                      : 'text-[#848d97] hover:text-[#e6edf3]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#8957e5]" />
                  <span>{closedCount} Closed</span>
                </button>
              </div>

              <div className="text-[11px] text-[#848d97]">
                GitFlow: Feature branch to develop/main PR review requirement
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-[#21262d]">
              {filteredPrs.length === 0 ? (
                <div className="p-8 text-center text-[#848d97]">
                  No pull requests found.
                </div>
              ) : (
                filteredPrs.map((pr) => (
                  <div
                    key={pr.id}
                    onClick={() => setSelectedPrId(pr.id)}
                    className="p-3.5 hover:bg-[#161b22] flex items-start gap-3 transition cursor-pointer group"
                  >
                    <span className="mt-0.5 shrink-0">
                      {pr.state === 'merged' ? (
                        <GitMerge className="w-4 h-4 text-[#8957e5]" />
                      ) : pr.state === 'open' ? (
                        <GitPullRequest className="w-4 h-4 text-[#3fb950]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#da3633]" />
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-[#e6edf3] group-hover:text-[#58a6ff]">
                          {pr.title}
                        </span>

                        {/* Labels */}
                        {pr.labels.map((l) => (
                          <span
                            key={l.name}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{
                              backgroundColor: `${l.color}25`,
                              color: l.color,
                              border: `1px solid ${l.color}50`,
                            }}
                          >
                            {l.name}
                          </span>
                        ))}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#848d97]">
                        <span className="font-mono">#{pr.id}</span>
                        <span>
                          by @{pr.author.username} into{' '}
                          <code className="text-[#58a6ff]">{pr.targetBranch}</code> from{' '}
                          <code className="text-[#848d97]">{pr.sourceBranch}</code>
                        </span>

                        {/* Review status */}
                        {pr.reviewers.some((r) => r.status === 'approved') && (
                          <span className="text-[#3fb950] font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Approved
                          </span>
                        )}

                        {/* CI status */}
                        <span className="text-[#3fb950] font-mono">
                          {pr.checks.length}/{pr.checks.length} checks passed
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <img
                        src={pr.author.avatar}
                        alt={pr.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
