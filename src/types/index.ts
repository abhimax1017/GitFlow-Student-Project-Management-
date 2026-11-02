export type UserPersona = {
  id: 'abhinav-lead' | 'sathwik-dev';
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  specialties: string[];
};

export type AcademicRepo = {
  id: string;
  name: string;
  course: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  isPrivate: boolean;
  defaultBranch: string;
  branches: string[];
  primaryLanguage: string;
  languageColor: string;
  linesOfCode: number;
  openIssuesCount: number;
  openPrCount: number;
  demoUrl?: string;
  license: string;
};

export type RepoFile = {
  path: string;
  name: string;
  type: 'file' | 'dir';
  size?: string;
  updatedAt: string;
  lastCommitMessage: string;
  language?: string;
  content?: string;
  children?: RepoFile[];
};

export type IssueLabel = {
  name: string;
  color: string;
  description?: string;
};

export type IssueComment = {
  id: string;
  author: UserPersona;
  createdAt: string;
  body: string;
  isAiAnalysis?: boolean;
};

export type Issue = {
  id: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  author: UserPersona;
  assignees: UserPersona[];
  labels: IssueLabel[];
  milestone?: string;
  createdAt: string;
  updatedAt: string;
  comments: IssueComment[];
  clarityScore?: number;
  aiTriageSummary?: string;
  acceptanceCriteria?: { text: string; done: boolean }[];
  priority?: 'low' | 'medium' | 'high' | 'critical';
};

export type PrCheck = {
  name: string;
  status: 'passed' | 'failed' | 'in_progress' | 'queued';
  duration: string;
  description: string;
};

export type PrDiffFile = {
  filename: string;
  additions: number;
  deletions: number;
  oldPath?: string;
  newPath?: string;
  chunks: {
    header: string;
    lines: {
      type: 'add' | 'delete' | 'context';
      oldLineNo?: number;
      newLineNo?: number;
      content: string;
    }[];
  }[];
};

export type PullRequest = {
  id: number;
  title: string;
  body: string;
  state: 'open' | 'merged' | 'closed';
  sourceBranch: string;
  targetBranch: string;
  author: UserPersona;
  assignees: UserPersona[];
  reviewers: {
    user: UserPersona;
    status: 'approved' | 'changes_requested' | 'commented' | 'pending';
    comment?: string;
  }[];
  labels: IssueLabel[];
  milestone?: string;
  createdAt: string;
  updatedAt: string;
  checks: PrCheck[];
  diffFiles: PrDiffFile[];
  commitsCount: number;
  changedFilesCount: number;
  additions: number;
  deletions: number;
  mergeStrategy?: 'merge' | 'squash' | 'rebase';
  aiReview?: {
    qualityScore: number;
    securityNotes: string;
    performanceNotes: string;
    approvalComment: string;
  };
};

export type KanbanCard = {
  id: string;
  title: string;
  columnId: 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
  issueNumber?: number;
  prNumber?: number;
  assignee: UserPersona;
  priority: 'low' | 'medium' | 'high' | 'critical';
  labels: string[];
  milestone: string;
  estimatePoints?: number;
};

export type WorkflowStep = {
  name: string;
  status: 'completed' | 'in_progress' | 'queued' | 'failed';
  duration: string;
  logs: string[];
};

export type ActionRun = {
  id: string;
  name: string;
  event: 'push' | 'pull_request' | 'workflow_dispatch';
  status: 'success' | 'in_progress' | 'failed' | 'queued';
  branch: string;
  commitSha: string;
  commitMessage: string;
  author: UserPersona;
  startedAt: string;
  duration: string;
  steps: WorkflowStep[];
};

export type HeatmapDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type RubricCriterion = {
  id: string;
  category: string;
  name: string;
  weight: number;
  maxScore: number;
  earnedScore: number;
  status: 'passed' | 'warning' | 'needs_work';
  details: string;
};
