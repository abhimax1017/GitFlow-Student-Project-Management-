import React from 'react';
import {
  PlayCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Terminal,
  ExternalLink,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { ActionRun, AcademicRepo, UserPersona } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';

interface ActionsTabProps {
  repo: AcademicRepo;
  runs: ActionRun[];
  currentPersona: UserPersona;
  onDispatchRun: (run: ActionRun) => void;
}

export const ActionsTab: React.FC<ActionsTabProps> = ({
  repo,
  runs,
  currentPersona,
  onDispatchRun,
}) => {
  const [selectedRunId, setSelectedRunId] = React.useState<string | null>(runs[0]?.id || null);
  const [expandedStepIndex, setExpandedStepIndex] = React.useState<number | null>(5); // default test step open
  const [isDispatching, setIsDispatching] = React.useState(false);

  const selectedRun = runs.find((r) => r.id === selectedRunId) || runs[0] || null;

  const workflows = [
    { name: 'GitFlow CI / CD Automated Verification', count: 108, active: true },
    { name: 'Gemini AI Security SAST & Git Hygiene Audit', count: 42, active: false },
    { name: 'Docker Containerization & Artifact Registry', count: 28, active: false },
    { name: 'Cloud Run Preview Deployment', count: 64, active: false },
  ];

  // Dispatch simulated new run
  const handleDispatchNewRun = () => {
    setIsDispatching(true);
    setTimeout(() => {
      const newRun: ActionRun = {
        id: `run-${Date.now().toString().slice(-4)}`,
        name: 'GitFlow CI / CD Automated Verification',
        event: 'workflow_dispatch',
        status: 'success',
        branch: 'develop',
        commitSha: 'a1c49e2',
        commitMessage: `chore(ci): automated dispatch verification by @${currentPersona.username}`,
        author: currentPersona,
        startedAt: 'Just now',
        duration: '2m 18s',
        steps: [
          {
            name: 'Set up job and runner environment',
            status: 'completed',
            duration: '3s',
            logs: ['Runner: Linux 8-core', 'Loaded Gemini 3.8 Flash auth credentials'],
          },
          {
            name: 'Checkout source code and submodules',
            status: 'completed',
            duration: '6s',
            logs: [`Syncing HEAD refs/heads/develop`, `Commit: a1c49e2`],
          },
          {
            name: 'Install dependencies (npm ci)',
            status: 'completed',
            duration: '24s',
            logs: ['648 packages audited, 0 vulnerabilities'],
          },
          {
            name: 'Execute Vitest Unit & Integration Test Suite',
            status: 'completed',
            duration: '48s',
            logs: [
              'PASS tests/auth.test.ts',
              'PASS tests/server.test.ts',
              'Test coverage: 95.1% statements covered (>85% required)',
            ],
          },
          {
            name: 'Gemini AI Security & Git Hygiene Audit',
            status: 'completed',
            duration: '22s',
            logs: [
              'Checking GitFlow branch hygiene...',
              'Peer review approvals verified for @abhinav-lead and @sathwik-dev',
              'PASSED: Grade A+ certified',
            ],
          },
          {
            name: 'Deploy Preview to Google Cloud Run',
            status: 'completed',
            duration: '35s',
            logs: [
              'Revision smart-campus-live-004 deployed',
              'Preview URL: https://ais-dev-portal.run.app',
            ],
          },
        ],
      };

      onDispatchRun(newRun);
      setSelectedRunId(newRun.id);
      setIsDispatching(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-[#e6edf3]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Workflows list & Dispatch action */}
        <div className="space-y-4">
          <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#e6edf3]">Workflows</span>
              <button
                onClick={handleDispatchNewRun}
                disabled={isDispatching}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white font-semibold text-[11px] cursor-pointer shadow-xs"
              >
                {isDispatching ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <PlayCircle className="w-3 h-3" />
                )}
                <span>Run workflow</span>
              </button>
            </div>

            <div className="space-y-1">
              {workflows.map((wf, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-md flex items-center justify-between cursor-pointer transition ${
                    idx === 0
                      ? 'bg-[#1f6feb]/15 text-[#58a6ff] border border-[#1f6feb]/30'
                      : 'hover:bg-[#21262d] text-[#848d97]'
                  }`}
                >
                  <span className="truncate pr-2 font-medium">{wf.name}</span>
                  <span className="font-mono text-[10px] text-[#848d97]">{wf.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Run Live Preview Card */}
          <div className="p-3 bg-[#161b22] border border-[#238636]/40 rounded-md text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#3fb950]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Preview Deployment Active</span>
            </div>
            <p className="text-[#848d97] text-[11px]">
              Latest commit automatically provisioned on Google Cloud Run container.
            </p>
            <a
              href="https://ais-dev-portal.run.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#58a6ff] hover:underline font-semibold"
            >
              <span>Visit https://ais-dev-portal.run.app</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right 3 Cols: Runs list & Selected Run Terminal Viewer */}
        <div className="lg:col-span-3 space-y-4">
          {/* Recent Runs list */}
          <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden text-xs">
            <div className="bg-[#161b22] p-3 border-b border-[#30363d] flex items-center justify-between">
              <span className="font-semibold text-xs text-[#e6edf3]">
                Recent Workflow Runs (GitFlow CI)
              </span>
              <span className="text-[11px] text-[#848d97] font-mono">
                {runs.length} recorded runs
              </span>
            </div>

            <div className="divide-y divide-[#21262d]">
              {runs.map((run) => (
                <div
                  key={run.id}
                  onClick={() => setSelectedRunId(run.id)}
                  className={`p-3 flex items-start justify-between gap-3 cursor-pointer transition ${
                    selectedRun?.id === run.id ? 'bg-[#161b22]' : 'hover:bg-[#161b22]/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="mt-0.5 shrink-0">
                      {run.status === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#da3633]" />
                      )}
                    </span>
                    <div>
                      <div className="font-semibold text-xs text-[#e6edf3] hover:text-[#58a6ff]">
                        {run.name}
                      </div>
                      <div className="text-[#848d97] text-[11px] mt-0.5 truncate max-w-md">
                        {run.commitMessage}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#848d97]">
                        <span className="font-mono text-[#58a6ff] bg-[#21262d] px-1.5 py-0.2 rounded border border-[#30363d]">
                          {run.branch}
                        </span>
                        <span className="font-mono">{run.commitSha}</span>
                        <span>•</span>
                        <span>by @{run.author.username}</span>
                        <span>•</span>
                        <span>{run.startedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#848d97] shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{run.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Step-by-Step Terminal View for Selected Run */}
          {selectedRun && (
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden text-xs">
              <div className="bg-[#161b22] p-3 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#58a6ff]" />
                  <span className="font-semibold text-xs text-[#e6edf3]">
                    Terminal Logs: {selectedRun.name} ({selectedRun.commitSha})
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#3fb950] px-2 py-0.5 rounded bg-[#238636]/20 border border-[#238636]/40">
                  Status: Completed Successfully ({selectedRun.duration})
                </span>
              </div>

              {/* Step Accordions */}
              <div className="divide-y divide-[#21262d]">
                {selectedRun.steps.map((step, sIdx) => {
                  const isExpanded = expandedStepIndex === sIdx;
                  return (
                    <div key={sIdx}>
                      <button
                        onClick={() => setExpandedStepIndex(isExpanded ? null : sIdx)}
                        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-[#161b22] transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                          <span className="font-semibold text-xs text-[#e6edf3]">
                            {step.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-[#848d97]">
                          <span>{step.duration}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronRight className="w-3 h-3" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-3 bg-[#0d1117] font-mono text-[11px] leading-relaxed text-[#7ee787] overflow-x-auto border-t border-[#21262d] max-h-60 overflow-y-auto">
                          {step.logs.map((logLine, lIdx) => (
                            <div key={lIdx} className="whitespace-pre">
                              <span className="text-[#484f58] select-none mr-3">
                                {new Date().toISOString().split('T')[1].slice(0, 8)}Z
                              </span>
                              {logLine}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
