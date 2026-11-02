import React from 'react';
import {
  CircleDot,
  CheckCircle2,
  Sparkles,
  Tag,
  Milestone as MilestoneIcon,
  Search,
  Plus,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
  Loader2,
  Calendar,
  Send,
} from 'lucide-react';
import { Issue, AcademicRepo, UserPersona, IssueLabel } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';
import {
  generateAiTask,
  triageIssue,
  AiTaskResult,
  AiTriageResult,
} from '../../services/geminiService';

interface IssuesTabProps {
  repo: AcademicRepo;
  issues: Issue[];
  currentPersona: UserPersona;
  onCreateIssue: (newIssue: Partial<Issue>) => void;
  onUpdateIssue: (updated: Issue) => void;
}

export const IssuesTab: React.FC<IssuesTabProps> = ({
  repo,
  issues,
  currentPersona,
  onCreateIssue,
  onUpdateIssue,
}) => {
  const [filterState, setFilterState] = React.useState<'open' | 'closed'>('open');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);
  const [selectedIssueId, setSelectedIssueId] = React.useState<number | null>(null);

  // AI Task Generator Modal state
  const [showAiModal, setShowAiModal] = React.useState(false);
  const [aiRequirement, setAiRequirement] = React.useState('');
  const [isGeneratingTask, setIsGeneratingTask] = React.useState(false);
  const [generatedDraft, setGeneratedDraft] = React.useState<AiTaskResult | null>(null);

  // Manual New Issue Modal state
  const [showManualModal, setShowManualModal] = React.useState(false);
  const [manualTitle, setManualTitle] = React.useState('');
  const [manualBody, setManualBody] = React.useState('');
  const [manualMilestone, setManualMilestone] = React.useState('Sprint 2 - Core Engine');
  const [manualPriority, setManualPriority] = React.useState<'low' | 'medium' | 'high' | 'critical'>('high');

  // AI Triage in progress
  const [isTriaging, setIsTriaging] = React.useState(false);
  const [triageResult, setTriageResult] = React.useState<AiTriageResult | null>(null);

  // New comment
  const [commentText, setCommentText] = React.useState('');

  const selectedIssue = issues.find((i) => i.id === selectedIssueId) || null;

  const openCount = issues.filter((i) => i.state === 'open').length;
  const closedCount = issues.filter((i) => i.state === 'closed').length;

  const filteredIssues = issues.filter((issue) => {
    if (issue.state !== filterState) return false;
    if (selectedLabel && !issue.labels.some((l) => l.name === selectedLabel)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = issue.title.toLowerCase().includes(q);
      const matchBody = issue.body.toLowerCase().includes(q);
      const matchAuthor = issue.author.username.toLowerCase().includes(q);
      if (!matchTitle && !matchBody && !matchAuthor) return false;
    }
    return true;
  });

  // Handle generating task via Gemini
  const handleGenerateAiTask = async () => {
    if (!aiRequirement.trim()) return;
    setIsGeneratingTask(true);
    setGeneratedDraft(null);

    try {
      const res = await generateAiTask(
        aiRequirement,
        `${repo.course} Capstone: ${repo.description}`,
        repo.name
      );
      setGeneratedDraft(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTask(false);
    }
  };

  // Create issue from AI draft
  const handleCreateFromDraft = () => {
    if (!generatedDraft) return;

    const newIssue: Partial<Issue> = {
      title: generatedDraft.title,
      body: `### User Story\n${generatedDraft.userStory}\n\n### Acceptance Criteria\n${generatedDraft.acceptanceCriteria
        .map((c) => `- [ ] ${c}`)
        .join('\n')}\n\n### Testing & Verification\n${generatedDraft.testingNotes}\n\n*Estimated Effort:* ${generatedDraft.estimatedHours} hours`,
      state: 'open',
      author: currentPersona,
      assignees: [
        generatedDraft.suggestedAssignee === 'sathwik-dev'
          ? TEAM_MEMBERS.sathwik
          : TEAM_MEMBERS.abhinav,
      ],
      labels: generatedDraft.labels.map((l) => ({
        name: l,
        color: l.includes('security') ? '#b60205' : l.includes('ai') ? '#1f6feb' : '#a2eeef',
      })),
      milestone: 'Sprint 2 - Core Engine',
      priority: generatedDraft.priority,
      acceptanceCriteria: generatedDraft.acceptanceCriteria.map((c) => ({
        text: c,
        done: false,
      })),
    };

    onCreateIssue(newIssue);
    setShowAiModal(false);
    setGeneratedDraft(null);
    setAiRequirement('');
  };

  // Run AI Triage on current issue
  const handleRunTriage = async () => {
    if (!selectedIssue) return;
    setIsTriaging(true);
    try {
      const result = await triageIssue(selectedIssue.title, selectedIssue.body, repo.name);
      setTriageResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTriaging(false);
    }
  };

  // Post AI Triage result as comment to issue
  const handlePostTriageComment = () => {
    if (!selectedIssue || !triageResult) return;

    const triageCommentBody = `🤖 **Gemini AI Staff Architecture Triage**

- **Clarity Score:** ${triageResult.clarityScore} / 100
- **Scope Assessment:** ${triageResult.reproductionAssessment}

#### Technical Pitfalls & Risks
${triageResult.technicalRisks.map((r) => `- ⚠️ ${r}`).join('\n')}

#### Architectural Dependencies
${triageResult.architecturalDependencies.map((d) => `- 📦 \`${d}\``).join('\n')}

#### Recommended Implementation Steps
${triageResult.suggestedImplementationSteps.map((s) => `- ${s}`).join('\n')}

*Triage Summary:* ${triageResult.summary}`;

    const updatedLabels: IssueLabel[] = [...selectedIssue.labels];
    if (!updatedLabels.some((l) => l.name === 'ai:analyzed')) {
      updatedLabels.push({
        name: 'ai:analyzed',
        color: '#1f6feb',
        description: 'Triaged and validated by Gemini AI',
      });
    }

    const updated: Issue = {
      ...selectedIssue,
      clarityScore: triageResult.clarityScore,
      aiTriageSummary: triageResult.summary,
      labels: updatedLabels,
      comments: [
        ...selectedIssue.comments,
        {
          id: `triage-${Date.now()}`,
          author: {
            ...TEAM_MEMBERS.abhinav,
            username: 'gemini-ai-bot[bot]',
            name: 'Gemini AI Assistant',
            role: 'DevOps & Architecture AI',
            avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          },
          createdAt: new Date().toISOString(),
          body: triageCommentBody,
          isAiAnalysis: true,
        },
      ],
    };

    onUpdateIssue(updated);
    setTriageResult(null);
  };

  // Toggle acceptance criteria
  const handleToggleCriterion = (index: number) => {
    if (!selectedIssue || !selectedIssue.acceptanceCriteria) return;
    const updatedCriteria = [...selectedIssue.acceptanceCriteria];
    updatedCriteria[index] = {
      ...updatedCriteria[index],
      done: !updatedCriteria[index].done,
    };
    onUpdateIssue({
      ...selectedIssue,
      acceptanceCriteria: updatedCriteria,
    });
  };

  // Submit new comment
  const handleAddComment = () => {
    if (!selectedIssue || !commentText.trim()) return;

    const updated: Issue = {
      ...selectedIssue,
      comments: [
        ...selectedIssue.comments,
        {
          id: `c-${Date.now()}`,
          author: currentPersona,
          createdAt: new Date().toISOString(),
          body: commentText.trim(),
        },
      ],
    };

    onUpdateIssue(updated);
    setCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* If an issue is selected, render the Issue Detail View */}
      {selectedIssue ? (
        <div className="space-y-6">
          {/* Issue Header */}
          <div className="border-b border-[#30363d] pb-4">
            <button
              onClick={() => {
                setSelectedIssueId(null);
                setTriageResult(null);
              }}
              className="text-xs text-[#58a6ff] hover:underline font-semibold mb-2 inline-flex items-center gap-1 cursor-pointer"
            >
              ← Back to all issues
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl md:text-2xl font-semibold text-[#e6edf3]">
                {selectedIssue.title}{' '}
                <span className="text-[#848d97] font-normal font-mono">
                  #{selectedIssue.id}
                </span>
              </h1>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunTriage}
                  disabled={isTriaging}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1f6feb]/20 hover:bg-[#1f6feb]/30 border border-[#1f6feb]/50 text-xs font-semibold text-[#58a6ff] transition cursor-pointer"
                >
                  {isTriaging ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>{isTriaging ? 'Analyzing with Gemini...' : 'Analyze with Gemini AI'}</span>
                </button>

                <button
                  onClick={() => {
                    const nextState = selectedIssue.state === 'open' ? 'closed' : 'open';
                    onUpdateIssue({ ...selectedIssue, state: nextState });
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition cursor-pointer ${
                    selectedIssue.state === 'open'
                      ? 'bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border-[#30363d]'
                      : 'bg-[#238636] hover:bg-[#2ea043] text-white border-transparent'
                  }`}
                >
                  {selectedIssue.state === 'open' ? 'Close issue' : 'Reopen issue'}
                </button>
              </div>
            </div>

            {/* State Pill & Meta */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs text-[#848d97]">
              <span
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                  selectedIssue.state === 'open' ? 'bg-[#238636]' : 'bg-[#8957e5]'
                }`}
              >
                {selectedIssue.state === 'open' ? (
                  <CircleDot className="w-3.5 h-3.5" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>{selectedIssue.state === 'open' ? 'Open' : 'Closed'}</span>
              </span>

              <span className="font-semibold text-[#e6edf3]">
                @{selectedIssue.author.username}
              </span>
              <span>opened this issue on {new Date(selectedIssue.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{selectedIssue.comments.length} comments</span>

              {selectedIssue.clarityScore && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#238636]/15 border border-[#238636]/40 text-[#3fb950] font-mono text-[11px]">
                  <ShieldCheck className="w-3 h-3" />
                  Clarity: {selectedIssue.clarityScore}/100
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left 3 cols: Description, AI Triage result, Interactive criteria, Comments */}
            <div className="lg:col-span-3 space-y-5">
              {/* AI Triage Card (if generated) */}
              {triageResult && (
                <div className="p-4 rounded-md bg-[#161b22] border border-[#1f6feb]/40 shadow-lg text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-[#58a6ff]">
                      <Sparkles className="w-4 h-4" />
                      <span>Gemini AI Staff Architecture Triage Result</span>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#1f6feb]/20 text-[#58a6ff]">
                      Clarity Score: {triageResult.clarityScore}/100
                    </span>
                  </div>

                  <p className="text-[#e6edf3]">{triageResult.reproductionAssessment}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded bg-[#0d1117] border border-[#30363d]">
                      <div className="font-semibold text-[#f85149] mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Technical Risks</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[#848d97]">
                        {triageResult.technicalRisks.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded bg-[#0d1117] border border-[#30363d]">
                      <div className="font-semibold text-[#e6edf3] mb-1">
                        Architectural Dependencies
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[#848d97] font-mono text-[11px]">
                        {triageResult.architecturalDependencies.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-[#e6edf3] mb-1">
                      Suggested Implementation Steps:
                    </div>
                    <div className="space-y-1 text-[#848d97]">
                      {triageResult.suggestedImplementationSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <ArrowRight className="w-3.5 h-3.5 text-[#58a6ff] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={handlePostTriageComment}
                      className="px-3 py-1.5 rounded bg-[#238636] hover:bg-[#2ea043] text-white font-semibold cursor-pointer transition"
                    >
                      Post AI Triage to Issue Timeline
                    </button>
                    <button
                      onClick={() => setTriageResult(null)}
                      className="px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#848d97] cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Original Issue Description Card */}
              <div className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden text-xs">
                <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedIssue.author.avatar}
                      alt={selectedIssue.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-semibold text-[#e6edf3]">
                      @{selectedIssue.author.username}
                    </span>
                    <span className="text-[#848d97]">commented</span>
                  </div>
                  <span className="text-[#848d97] text-[11px]">Author</span>
                </div>

                <div className="p-4 space-y-4 text-[#e6edf3] leading-relaxed">
                  <div className="whitespace-pre-wrap">{selectedIssue.body}</div>

                  {/* Interactive Acceptance Criteria Checkboxes */}
                  {selectedIssue.acceptanceCriteria && selectedIssue.acceptanceCriteria.length > 0 && (
                    <div className="pt-3 border-t border-[#30363d]">
                      <div className="font-semibold text-[#e6edf3] mb-2 flex items-center justify-between">
                        <span>Acceptance Criteria Progress</span>
                        <span className="text-[#848d97] font-mono text-[11px]">
                          {selectedIssue.acceptanceCriteria.filter((c) => c.done).length} of{' '}
                          {selectedIssue.acceptanceCriteria.length} completed
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {selectedIssue.acceptanceCriteria.map((crit, idx) => (
                          <label
                            key={idx}
                            className="flex items-start gap-2 p-1.5 rounded hover:bg-[#161b22] cursor-pointer transition"
                          >
                            <input
                              type="checkbox"
                              checked={crit.done}
                              onChange={() => handleToggleCriterion(idx)}
                              className="mt-0.5 rounded border-[#30363d] text-[#238636] focus:ring-0 bg-[#0d1117]"
                            />
                            <span
                              className={
                                crit.done ? 'line-through text-[#848d97]' : 'text-[#e6edf3]'
                              }
                            >
                              {crit.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments Timeline */}
              {selectedIssue.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`rounded-md border text-xs overflow-hidden ${
                    comment.isAiAnalysis
                      ? 'border-[#1f6feb]/50 bg-[#0d1117]'
                      : 'border-[#30363d] bg-[#0d1117]'
                  }`}
                >
                  <div
                    className={`px-3 py-2 border-b flex items-center justify-between ${
                      comment.isAiAnalysis
                        ? 'bg-[#1f6feb]/15 border-[#1f6feb]/40'
                        : 'bg-[#161b22] border-[#30363d]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-[#e6edf3]">
                        @{comment.author.username}
                      </span>
                      <span className="text-[#848d97]">
                        commented on {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {comment.isAiAnalysis && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1f6feb]/20 text-[#58a6ff] text-[10px] font-semibold border border-[#1f6feb]/40">
                        AI Staff Triage
                      </span>
                    )}
                  </div>
                  <div className="p-4 whitespace-pre-wrap text-[#e6edf3] leading-relaxed">
                    {comment.body}
                  </div>
                </div>
              ))}

              {/* Add Comment Box */}
              <div className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden text-xs">
                <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] font-semibold text-[#e6edf3]">
                  Add a comment as @{currentPersona.username}
                </div>
                <div className="p-3">
                  <textarea
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Leave a comment or technical note..."
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-xs text-[#e6edf3] placeholder-[#848d97] focus:outline-none focus:border-[#58a6ff]"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-[#848d97]">
                      Markdown is supported
                    </span>
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white font-semibold cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar: Assignees, Labels, Milestone, Priority */}
            <div className="space-y-4 text-xs text-[#848d97]">
              {/* Assignees */}
              <div className="border-b border-[#30363d] pb-3">
                <div className="font-semibold text-[#e6edf3] mb-2">Assignees</div>
                <div className="space-y-1.5">
                  {selectedIssue.assignees.map((assignee) => (
                    <div key={assignee.id} className="flex items-center gap-2">
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span className="text-[#e6edf3] font-medium">@{assignee.username}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Labels */}
              <div className="border-b border-[#30363d] pb-3">
                <div className="font-semibold text-[#e6edf3] mb-2">Labels</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIssue.labels.map((label) => (
                    <span
                      key={label.name}
                      className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                      style={{
                        backgroundColor: `${label.color}20`,
                        color: label.color,
                        border: `1px solid ${label.color}50`,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestone */}
              <div className="border-b border-[#30363d] pb-3">
                <div className="font-semibold text-[#e6edf3] mb-1">Milestone</div>
                <div className="flex items-center gap-1.5 text-[#e6edf3]">
                  <MilestoneIcon className="w-3.5 h-3.5 text-[#848d97]" />
                  <span>{selectedIssue.milestone || 'No milestone'}</span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <div className="font-semibold text-[#e6edf3] mb-1">Priority</div>
                <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-[#da3633]/20 text-[#f85149] border border-[#da3633]/40">
                  {selectedIssue.priority || 'Medium'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Issues List View */
        <div className="space-y-4">
          {/* Header Action Bar: Search, Filters, New Issue, AI Task Generator */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="w-4 h-4 text-[#848d97] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter issues..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-9 pr-3 text-xs text-[#e6edf3] placeholder-[#848d97] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Gemini AI Task Generator Button */}
              <button
                onClick={() => setShowAiModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1f6feb]/20 hover:bg-[#1f6feb]/30 border border-[#1f6feb]/50 text-xs font-semibold text-[#58a6ff] transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Task Generator</span>
              </button>

              {/* Standard New Issue Button */}
              <button
                onClick={() => setShowManualModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white shadow-sm transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New issue</span>
              </button>
            </div>
          </div>

          {/* List Table Container */}
          <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117] text-xs">
            {/* Table Header: Open / Closed filter tabs */}
            <div className="bg-[#161b22] border-b border-[#30363d] p-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFilterState('open')}
                  className={`flex items-center gap-1.5 font-semibold cursor-pointer ${
                    filterState === 'open' ? 'text-[#e6edf3]' : 'text-[#848d97] hover:text-[#e6edf3]'
                  }`}
                >
                  <CircleDot className="w-4 h-4 text-[#3fb950]" />
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

              {/* Label quick tags filter */}
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-[11px] text-[#848d97]">Filter:</span>
                {['security', 'p0-blocker', 'enhancement', 'academic-milestone', 'ai:analyzed'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedLabel(selectedLabel === tag ? null : tag)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition cursor-pointer ${
                        selectedLabel === tag
                          ? 'bg-[#1f6feb] text-white border-transparent'
                          : 'bg-[#21262d] text-[#848d97] border-[#30363d] hover:text-[#e6edf3]'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Issue Rows */}
            <div className="divide-y divide-[#21262d]">
              {filteredIssues.length === 0 ? (
                <div className="p-8 text-center text-[#848d97]">
                  No issues found matching the criteria.
                </div>
              ) : (
                filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className="p-3.5 hover:bg-[#161b22] flex items-start gap-3 transition cursor-pointer group"
                  >
                    <span className="mt-0.5 shrink-0">
                      {issue.state === 'open' ? (
                        <CircleDot className="w-4 h-4 text-[#3fb950]" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#8957e5]" />
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-[#e6edf3] group-hover:text-[#58a6ff]">
                          {issue.title}
                        </span>

                        {/* Labels */}
                        {issue.labels.map((label) => (
                          <span
                            key={label.name}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{
                              backgroundColor: `${label.color}25`,
                              color: label.color,
                              border: `1px solid ${label.color}50`,
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#848d97]">
                        <span className="font-mono">#{issue.id}</span>
                        <span>opened by @{issue.author.username}</span>
                        {issue.milestone && (
                          <span className="flex items-center gap-1">
                            <MilestoneIcon className="w-3 h-3" />
                            {issue.milestone}
                          </span>
                        )}
                        {issue.clarityScore && (
                          <span className="text-[#3fb950] font-mono">
                            AI Score: {issue.clarityScore}/100
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side: Assignee & Comment Count */}
                    <div className="flex items-center gap-3 shrink-0">
                      {issue.assignees[0] && (
                        <img
                          src={issue.assignees[0].avatar}
                          alt={issue.assignees[0].name}
                          className="w-5 h-5 rounded-full object-cover"
                          title={`Assigned to @${issue.assignees[0].username}`}
                        />
                      )}
                      {issue.comments.length > 0 && (
                        <div className="flex items-center gap-1 text-[#848d97] text-[11px]">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{issue.comments.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Task Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-2xl w-full p-5 text-xs text-[#e6edf3] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#58a6ff]">
                <Sparkles className="w-4 h-4" />
                <span>Gemini AI GitFlow Task Generator</span>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-[#848d97] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Enter your requirement or academic deliverable in plain English:
              </label>
              <textarea
                rows={3}
                value={aiRequirement}
                onChange={(e) => setAiRequirement(e.target.value)}
                placeholder="e.g. Add rate limiting to student login endpoint using Redis token bucket with 5 req/min and exponential backoff"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />

              {/* Quick Template Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[11px] text-[#848d97] mr-1">Quick prompts:</span>
                {[
                  'Add rate limiting to student login endpoint',
                  'Implement 3D Dice Loss function for MRI slices',
                  'Handle Raft split votes with randomized election timeout backoff',
                  'Add polygon geofence validation for campus boundaries',
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setAiRequirement(prompt)}
                    className="text-[10px] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] px-2 py-0.5 rounded text-[#58a6ff] transition cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateAiTask}
              disabled={isGeneratingTask || !aiRequirement.trim()}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] disabled:opacity-50 text-white font-semibold cursor-pointer transition shadow-sm"
            >
              {isGeneratingTask ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Calling Gemini 3.8 Flash model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Complete GitHub Issue Spec</span>
                </>
              )}
            </button>

            {/* Generated Draft Preview */}
            {generatedDraft && (
              <div className="p-4 rounded-md bg-[#0d1117] border border-[#238636]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#3fb950] uppercase tracking-wider">
                    Generated Issue Draft
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] font-mono text-[10px]">
                    {generatedDraft.estimatedHours} hrs estimated
                  </span>
                </div>

                <div>
                  <div className="text-sm font-semibold text-white">
                    {generatedDraft.title}
                  </div>
                  <div className="text-[#848d97] mt-1">{generatedDraft.userStory}</div>
                </div>

                <div>
                  <div className="font-semibold text-[#e6edf3] mb-1">Acceptance Criteria:</div>
                  <ul className="list-disc list-inside space-y-1 text-[#848d97]">
                    {generatedDraft.acceptanceCriteria.map((ac, idx) => (
                      <li key={idx}>{ac}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#30363d]">
                  <span className="text-[11px] text-[#848d97]">
                    Assignee: <strong>@{generatedDraft.suggestedAssignee}</strong>
                  </span>
                  <span className="text-[11px] text-[#848d97]">
                    Priority: <strong className="uppercase">{generatedDraft.priority}</strong>
                  </span>
                </div>

                <button
                  onClick={handleCreateFromDraft}
                  className="w-full py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold transition cursor-pointer"
                >
                  Create Issue in Repository
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual New Issue Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-xl w-full p-5 text-xs text-[#e6edf3] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
              <h3 className="text-sm font-semibold text-white">Create New GitHub Issue</h3>
              <button
                onClick={() => setShowManualModal(false)}
                className="text-[#848d97] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block font-semibold mb-1">Issue Title (Conventional Prefix)</label>
              <input
                type="text"
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
                placeholder="feat(module): brief description..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Description / Acceptance Criteria</label>
              <textarea
                rows={5}
                value={manualBody}
                onChange={(e) => setManualBody(e.target.value)}
                placeholder="User story, reproduction steps, technical acceptance criteria..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Milestone</label>
                <select
                  value={manualMilestone}
                  onChange={(e) => setManualMilestone(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-xs text-[#e6edf3]"
                >
                  <option value="Sprint 1 - Foundations">Sprint 1 - Foundations</option>
                  <option value="Sprint 2 - Core Engine">Sprint 2 - Core Engine</option>
                  <option value="Midterm Evaluation">Midterm Evaluation</option>
                  <option value="Sprint 3 - Polish & Defense">Sprint 3 - Polish & Defense</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  value={manualPriority}
                  onChange={(e) => setManualPriority(e.target.value as any)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-xs text-[#e6edf3]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical (P0)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowManualModal(false)}
                className="px-3 py-1.5 rounded-md bg-[#21262d] text-[#848d97] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!manualTitle.trim()) return;
                  onCreateIssue({
                    title: manualTitle,
                    body: manualBody,
                    milestone: manualMilestone,
                    priority: manualPriority,
                    author: currentPersona,
                    assignees: [currentPersona],
                    labels: [{ name: 'enhancement', color: '#a2eeef' }],
                    state: 'open',
                  });
                  setShowManualModal(false);
                  setManualTitle('');
                  setManualBody('');
                }}
                className="px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold"
              >
                Submit new issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
