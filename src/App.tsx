/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { RepoHeader, TabKey } from './components/common/RepoHeader';
import { CodeTab } from './components/code/CodeTab';
import { IssuesTab } from './components/issues/IssuesTab';
import { PullRequestsTab } from './components/pullRequests/PullRequestsTab';
import { ProjectsTab } from './components/projects/ProjectsTab';
import { ActionsTab } from './components/actions/ActionsTab';
import { InsightsTab } from './components/insights/InsightsTab';
import { TerminalTab } from './components/terminal/TerminalTab';
import { GuideTab } from './components/guide/GuideTab';
import { GitHubSyncModal } from './components/githubSync/GitHubSyncModal';

import {
  UserPersona,
  AcademicRepo,
  Issue,
  PullRequest,
  KanbanCard,
  ActionRun,
  RepoFile,
} from './types';
import {
  TEAM_MEMBERS,
  ACADEMIC_REPOS,
  MOCK_REPO_FILES,
  MOCK_ISSUES,
  MOCK_PULL_REQUESTS,
  MOCK_KANBAN_CARDS,
  MOCK_ACTIONS_RUNS,
} from './data/mockData';
import { GitHubUserProfile, GitHubApiRepo } from './services/githubService';

export default function App() {
  // Active Persona (Abhinav by default, can switch to Sathwik)
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(TEAM_MEMBERS.abhinav);

  // Active Repository
  const [allRepos, setAllRepos] = useState<AcademicRepo[]>(ACADEMIC_REPOS);
  const [currentRepo, setCurrentRepo] = useState<AcademicRepo>(ACADEMIC_REPOS[0]);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<TabKey>('code');

  // Active Branch
  const [currentBranch, setCurrentBranch] = useState<string>(ACADEMIC_REPOS[0].defaultBranch || 'develop');

  // Star status
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [starCountOffset, setStarCountOffset] = useState<number>(0);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // GitHub Live PAT Sync Modal
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [isGitHubConnected, setIsGitHubConnected] = useState<boolean>(true);
  const [connectedUser, setConnectedUser] = useState<string | null>('abhimax1017');

  // Repository-specific mutable datasets
  const [issuesMap, setIssuesMap] = useState<Record<string, Issue[]>>(MOCK_ISSUES);
  const [prsMap, setPrsMap] = useState<Record<string, PullRequest[]>>(MOCK_PULL_REQUESTS);
  const [kanbanMap, setKanbanMap] = useState<Record<string, KanbanCard[]>>(MOCK_KANBAN_CARDS);
  const [actionsMap, setActionsMap] = useState<Record<string, ActionRun[]>>(MOCK_ACTIONS_RUNS);

  // Live real-time notification banner
  const [liveNotification, setLiveNotification] = useState<{
    message: string;
    type: 'pr' | 'ci' | 'issue';
  } | null>({
    message: '🚀 Real GitHub Sync: @abhimax1017 active. Flagship project novaforge-urban-flood live at https://novaforge-urban-flood.vercel.app',
    type: 'pr',
  });

  // Keep dark class synced on root document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Dynamically load any additional public GitHub repositories for abhimax1017
  useEffect(() => {
    fetch('https://api.github.com/users/abhimax1017/repos?sort=updated')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((liveRepos: any[]) => {
        if (Array.isArray(liveRepos) && liveRepos.length > 0) {
          setAllRepos((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const newRepos: AcademicRepo[] = [];
            liveRepos.forEach((lr) => {
              if (!existingIds.has(lr.name)) {
                newRepos.push({
                  id: lr.name,
                  name: lr.name,
                  course: lr.name.includes('novaforge')
                    ? 'Smart India Hackathon (SIH 26085)'
                    : lr.name.includes('PBL')
                    ? 'Assignment 41 – Data Privacy'
                    : 'Academic Coursework',
                  description: lr.description || `Abhinav's GitHub project: ${lr.name}`,
                  stars: lr.stargazers_count || 12,
                  forks: lr.forks_count || 4,
                  watchers: lr.watchers_count || 8,
                  isPrivate: lr.private,
                  defaultBranch: lr.default_branch || 'main',
                  branches: ['main', 'develop'],
                  primaryLanguage: lr.language || 'JavaScript',
                  languageColor: lr.language === 'JavaScript' ? '#f1e05a' : '#3178c6',
                  linesOfCode: 15400,
                  openIssuesCount: lr.open_issues_count || 1,
                  openPrCount: 1,
                  demoUrl: lr.homepage || (lr.name === 'novaforge-urban-flood' ? 'https://novaforge-urban-flood.vercel.app' : undefined),
                  license: lr.license?.name || 'MIT License',
                });
              }
            });
            return [...prev, ...newRepos];
          });
        }
      })
      .catch((err) => {
        console.warn('Live GitHub fetch completed with local fallback:', err);
      });
  }, []);

  // Switch repo handler
  const handleSelectRepo = (repo: AcademicRepo) => {
    setCurrentRepo(repo);
    setCurrentBranch(repo.defaultBranch || 'main');
    setIsStarred(false);
    setStarCountOffset(0);
  };

  // Toggle star
  const handleToggleStar = () => {
    if (isStarred) {
      setIsStarred(false);
      setStarCountOffset((prev) => prev - 1);
    } else {
      setIsStarred(true);
      setStarCountOffset((prev) => prev + 1);
    }
  };

  // GitHub connection callbacks
  const handleGitHubConnect = (
    user: GitHubUserProfile,
    _repos: GitHubApiRepo[],
    _pat: string
  ) => {
    setIsGitHubConnected(true);
    setConnectedUser(user.login);
    setShowSyncModal(false);
    setLiveNotification({
      message: `Connected live GitHub account @${user.login}. Synced with https://api.github.com`,
      type: 'issue',
    });
  };

  const handleGitHubDisconnect = () => {
    setIsGitHubConnected(false);
    setConnectedUser(null);
    setShowSyncModal(false);
  };

  // Current repo collections
  const currentFiles: RepoFile[] = MOCK_REPO_FILES[currentRepo.id] || MOCK_REPO_FILES['smart-campus-portal'];
  const currentIssues: Issue[] = issuesMap[currentRepo.id] || [];
  const currentPrs: PullRequest[] = prsMap[currentRepo.id] || [];
  const currentKanban: KanbanCard[] = kanbanMap[currentRepo.id] || [];
  const currentActions: ActionRun[] = actionsMap[currentRepo.id] || [];

  // Issue handlers
  const handleCreateIssue = (newIssue: Partial<Issue>) => {
    const created: Issue = {
      id: Math.floor(Math.random() * 50) + 50,
      title: newIssue.title || 'New Untitled Issue',
      body: newIssue.body || '',
      state: 'open',
      author: newIssue.author || currentPersona,
      assignees: newIssue.assignees || [currentPersona],
      labels: newIssue.labels || [{ name: 'enhancement', color: '#a2eeef' }],
      milestone: newIssue.milestone || 'Sprint 2 - Core Engine',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      priority: newIssue.priority || 'medium',
      clarityScore: newIssue.clarityScore || 90,
      acceptanceCriteria: newIssue.acceptanceCriteria || [],
    };

    setIssuesMap((prev) => ({
      ...prev,
      [currentRepo.id]: [created, ...(prev[currentRepo.id] || [])],
    }));

    // Also add to Kanban To Do
    const newKanbanCard: KanbanCard = {
      id: `kb-${Date.now()}`,
      title: created.title,
      columnId: 'todo',
      issueNumber: created.id,
      assignee: currentPersona,
      priority: created.priority || 'high',
      labels: created.labels.map((l) => l.name),
      milestone: created.milestone || 'Sprint 2 - Core Engine',
      estimatePoints: 5,
    };

    setKanbanMap((prev) => ({
      ...prev,
      [currentRepo.id]: [newKanbanCard, ...(prev[currentRepo.id] || [])],
    }));

    setLiveNotification({
      message: `Issue #${created.id} created by @${currentPersona.username} and synced to Sprint Kanban`,
      type: 'issue',
    });
  };

  const handleUpdateIssue = (updated: Issue) => {
    setIssuesMap((prev) => ({
      ...prev,
      [currentRepo.id]: (prev[currentRepo.id] || []).map((i) =>
        i.id === updated.id ? updated : i
      ),
    }));
  };

  // PR handlers
  const handleUpdatePr = (updated: PullRequest) => {
    setPrsMap((prev) => ({
      ...prev,
      [currentRepo.id]: (prev[currentRepo.id] || []).map((pr) =>
        pr.id === updated.id ? updated : pr
      ),
    }));

    if (updated.state === 'merged') {
      setLiveNotification({
        message: `🎉 Pull Request #${updated.id} merged into ${updated.targetBranch}! Confetti triggered.`,
        type: 'pr',
      });
    }
  };

  const handleCreatePr = (newPr: Partial<PullRequest>) => {
    const created: PullRequest = {
      id: Math.floor(Math.random() * 30) + 20,
      title: newPr.title || 'feat: new branch changes',
      body: newPr.body || 'Implemented sprint feature.',
      state: 'open',
      sourceBranch: newPr.sourceBranch || currentBranch,
      targetBranch: 'develop',
      author: currentPersona,
      assignees: [currentPersona],
      reviewers: [
        {
          user:
            currentPersona.id === 'abhinav-lead'
              ? TEAM_MEMBERS.sathwik
              : TEAM_MEMBERS.abhinav,
          status: 'pending',
        },
      ],
      labels: [{ name: 'enhancement', color: '#a2eeef' }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      commitsCount: 1,
      changedFilesCount: 2,
      additions: 45,
      deletions: 3,
      checks: [
        { name: 'validate (ubuntu-latest)', status: 'passed', duration: '55s', description: 'Passed' },
        { name: 'unit-tests', status: 'passed', duration: '1m 12s', description: 'Passed' },
      ],
      diffFiles: [],
    };

    setPrsMap((prev) => ({
      ...prev,
      [currentRepo.id]: [created, ...(prev[currentRepo.id] || [])],
    }));

    setLiveNotification({
      message: `Pull Request #${created.id} opened by @${currentPersona.username} targeting develop`,
      type: 'pr',
    });
  };

  // Kanban handlers
  const handleUpdateKanban = (updatedCards: KanbanCard[]) => {
    setKanbanMap((prev) => ({
      ...prev,
      [currentRepo.id]: updatedCards,
    }));
  };

  // Actions handlers
  const handleDispatchAction = (newRun: ActionRun) => {
    setActionsMap((prev) => ({
      ...prev,
      [currentRepo.id]: [newRun, ...(prev[currentRepo.id] || [])],
    }));
    setLiveNotification({
      message: `CI Pipeline run [${newRun.id}] dispatched on branch ${newRun.branch}`,
      type: 'ci',
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d1117] text-[#e6edf3]' : 'bg-[#f6f8fa] text-[#1f2328]'}`}>
      {/* GitHub Primer Official Top Header */}
      <Header
        currentPersona={currentPersona}
        onSwitchPersona={(p) => {
          setCurrentPersona(p);
          setLiveNotification({
            message: `Switched active developer persona to @${p.username} (${p.role})`,
            type: 'issue',
          });
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenSyncModal={() => setShowSyncModal(true)}
        isGitHubConnected={isGitHubConnected}
        connectedUser={connectedUser}
        onNewIssueClick={() => setActiveTab('issues')}
        onNewPrClick={() => setActiveTab('pulls')}
      />

      {/* Real-time event ticker banner */}
      {liveNotification && (
        <div className="bg-[#1f6feb]/15 border-b border-[#1f6feb]/30 px-4 py-1.5 text-xs text-[#58a6ff] flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="truncate">{liveNotification.message}</span>
            <button
              onClick={() => setLiveNotification(null)}
              className="text-[#848d97] hover:text-white ml-2 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* GitHub Repository Header: Breadcrumb, Star/Fork, Primary Tabs */}
      <RepoHeader
        currentRepo={currentRepo}
        allRepos={allRepos}
        onSelectRepo={handleSelectRepo}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        starsCount={currentRepo.stars + starCountOffset}
        isStarred={isStarred}
        onToggleStar={handleToggleStar}
        openIssuesCount={currentIssues.filter((i) => i.state === 'open').length}
        openPrCount={currentPrs.filter((p) => p.state === 'open').length}
        kanbanCount={currentKanban.length}
      />

      {/* Tab View Routing */}
      <main className="flex-1">
        {activeTab === 'code' && (
          <CodeTab
            repo={currentRepo}
            files={currentFiles}
            currentBranch={currentBranch}
            onBranchChange={setCurrentBranch}
            currentPersona={currentPersona}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'issues' && (
          <IssuesTab
            repo={currentRepo}
            issues={currentIssues}
            currentPersona={currentPersona}
            onCreateIssue={handleCreateIssue}
            onUpdateIssue={handleUpdateIssue}
          />
        )}

        {activeTab === 'pulls' && (
          <PullRequestsTab
            repo={currentRepo}
            pullRequests={currentPrs}
            currentPersona={currentPersona}
            onUpdatePr={handleUpdatePr}
            onCreatePr={handleCreatePr}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTab
            repo={currentRepo}
            cards={currentKanban}
            currentPersona={currentPersona}
            onUpdateCards={handleUpdateKanban}
          />
        )}

        {activeTab === 'actions' && (
          <ActionsTab
            repo={currentRepo}
            runs={currentActions}
            currentPersona={currentPersona}
            onDispatchRun={handleDispatchAction}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsTab repo={currentRepo} />
        )}

        {activeTab === 'terminal' && (
          <TerminalTab
            repo={currentRepo}
            currentBranch={currentBranch}
            onBranchChange={setCurrentBranch}
            currentPersona={currentPersona}
          />
        )}

        {activeTab === 'guide' && (
          <GuideTab repo={currentRepo} />
        )}
      </main>

      {/* Footer (Authentic Primer Style) */}
      <footer className="border-t border-[#30363d] py-6 px-4 text-xs text-[#848d97] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#e6edf3]">GITFLOW Academic</span>
            <span>© 2026 Abhinav & Sathwik Engineering Systems</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('guide'); }} className="hover:text-[#58a6ff]">Academic Rubric</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('terminal'); }} className="hover:text-[#58a6ff]">Git CLI Simulator</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('actions'); }} className="hover:text-[#58a6ff]">CI/CD Actions</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowSyncModal(true); }} className="hover:text-[#58a6ff]">GitHub PAT Sync</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#58a6ff]">Primer Design System</a>
          </div>
        </div>
      </footer>

      {/* Live GitHub API Sync Modal */}
      <GitHubSyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        isGitHubConnected={isGitHubConnected}
        connectedUser={connectedUser}
        onConnect={handleGitHubConnect}
        onDisconnect={handleGitHubDisconnect}
      />
    </div>
  );
}
