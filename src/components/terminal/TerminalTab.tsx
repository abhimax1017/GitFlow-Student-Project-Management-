import React from 'react';
import {
  Terminal,
  CheckCircle2,
  Circle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { AcademicRepo, UserPersona } from '../../types';

interface TerminalTabProps {
  repo: AcademicRepo;
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  currentPersona: UserPersona;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  commandHint: string;
  completed: boolean;
}

export const TerminalTab: React.FC<TerminalTabProps> = ({
  repo,
  currentBranch,
  onBranchChange,
  currentPersona,
}) => {
  const [history, setHistory] = React.useState<string[]>([
    'Welcome to GITFLOW Interactive Academic Git Terminal v2.4.0',
    `Connected workspace: ~/${repo.name} [Active branch: ${currentBranch}]`,
    'Type "help" to list supported Git commands, or complete the student missions on the right.',
    '',
  ]);

  const [inputVal, setInputVal] = React.useState('');
  const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = React.useState<number>(-1);
  const terminalEndRef = React.useRef<HTMLDivElement>(null);

  const [missions, setMissions] = React.useState<Mission[]>([
    {
      id: 'm1',
      title: 'Mission 1: Create Feature Branch',
      description: 'Isolate student changes by checking out a new feature branch.',
      commandHint: 'git checkout -b feature/biometric-gate',
      completed: false,
    },
    {
      id: 'm2',
      title: 'Mission 2: Conventional Commit',
      description: 'Stage and commit with conventional prefix (feat:, fix:, docs:, perf:).',
      commandHint: 'git commit -m "feat(gate): add WebAuthn biometric sensor"',
      completed: false,
    },
    {
      id: 'm3',
      title: 'Mission 3: Push to Remote & Trigger CI',
      description: 'Push feature branch to origin for peer review.',
      commandHint: `git push origin ${currentBranch}`,
      completed: false,
    },
  ]);

  React.useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const promptPrefix = `${currentPersona.username}@macbook:~/${repo.name} (${currentBranch}) $`;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const newLogs = [...history, `${promptPrefix} ${trimmed}`];

    const parts = trimmed.split(' ');
    const mainCmd = parts[0];

    if (mainCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (mainCmd === 'help') {
      newLogs.push(
        'Supported GitFlow CLI commands:',
        '  git status                      - Check status of working directory & branch',
        '  git branch                      - List local and remote branches',
        '  git checkout <branch>           - Switch branches',
        '  git checkout -b <new-branch>    - Create and switch to new feature branch',
        '  git commit -m "<message>"       - Commit with GitFlow conventional prefix',
        '  git push origin <branch>        - Push branch and trigger CI/CD pipeline',
        '  git log --oneline               - View recent commit history',
        '  git diff                        - Show modifications on current branch',
        '  whoami                          - Print active developer identity',
        '  clear                           - Clear the terminal screen'
      );
    } else if (mainCmd === 'whoami') {
      newLogs.push(
        `Active persona: @${currentPersona.username} (${currentPersona.name})`,
        `Role: ${currentPersona.role}`,
        `Email: ${currentPersona.email}`
      );
    } else if (mainCmd === 'git') {
      const subCmd = parts[1];

      if (subCmd === 'status') {
        newLogs.push(
          `On branch ${currentBranch}`,
          'Your branch is up to date with origin/develop.',
          '',
          'Changes to be committed:',
          '  (use "git restore --staged <file>..." to unstage)',
          '    modified:   src/auth/jwt.ts',
          '    new file:   tests/auth.test.ts',
          ''
        );
      } else if (subCmd === 'branch') {
        newLogs.push(
          ...repo.branches.map((b) => (b === currentBranch ? `* ${b}` : `  ${b}`))
        );
      } else if (subCmd === 'checkout') {
        if (parts[2] === '-b') {
          const newBranch = parts[3];
          if (!newBranch) {
            newLogs.push('fatal: missing branch name. Usage: git checkout -b <branch-name>');
          } else {
            onBranchChange(newBranch);
            newLogs.push(
              `Switched to a new branch '${newBranch}'`,
              '✓ GitFlow isolation verified: Branch conforms to feature/* naming convention.'
            );
            // Complete Mission 1
            setMissions((prev) =>
              prev.map((m) => (m.id === 'm1' ? { ...m, completed: true } : m))
            );
          }
        } else {
          const target = parts[2];
          if (!target) {
            newLogs.push('fatal: specify branch name.');
          } else {
            onBranchChange(target);
            newLogs.push(`Switched to branch '${target}'`);
          }
        }
      } else if (subCmd === 'commit') {
        const msgMatch = trimmed.match(/-m\s+["'](.*)["']/);
        if (!msgMatch || !msgMatch[1]) {
          newLogs.push('fatal: no commit message given. Usage: git commit -m "feat: description"');
        } else {
          const message = msgMatch[1];
          const hasConventionalPrefix = /^(feat|fix|docs|refactor|perf|test|chore)(\(.+\))?:\s.+/.test(
            message
          );

          if (hasConventionalPrefix) {
            newLogs.push(
              `[${currentBranch} 3b8c19f] ${message}`,
              ' 2 files changed, 142 insertions(+), 18 deletions(-)',
              '✓ Conventional commit verified: Compliant with Academic Grading Rubric.'
            );
            // Complete Mission 2
            setMissions((prev) =>
              prev.map((m) => (m.id === 'm2' ? { ...m, completed: true } : m))
            );
          } else {
            newLogs.push(
              `⚠️ Conventional Commit Warning: '${message}' lacks standard prefix.`,
              'Hint: Academic rubric requires "feat:", "fix:", "docs:", "perf:", or "test:".',
              `[${currentBranch} 3b8c19f] ${message}`
            );
          }
        }
      } else if (subCmd === 'push') {
        newLogs.push(
          `Enumerating objects: 7, done.`,
          `Counting objects: 100% (7/7), done.`,
          `Writing objects: 100% (4/4), 1.42 KiB | 1.42 MiB/s, done.`,
          `Total 4 (delta 2), reused 0 (delta 0), pack-reused 0`,
          `To https://github.com/abhimax1017/${repo.name}.git`,
          ` * [new branch]      ${currentBranch} -> ${currentBranch}`,
          `GitHub Actions: Triggered workflow 'GitFlow CI / CD Automated Verification'`,
          `PR Link: Open PR at https://github.com/abhimax1017/${repo.name}/pull/new/${currentBranch}`
        );
        // Complete Mission 3
        setMissions((prev) =>
          prev.map((m) => (m.id === 'm3' ? { ...m, completed: true } : m))
        );
      } else if (subCmd === 'log') {
        newLogs.push(
          '9f2a41d (HEAD -> ' + currentBranch + ') feat(auth): implement student JWT session rotation',
          '4c81a2e (origin/develop) feat(server): mount campus dining websocket gateway',
          '8d390ab chore(deps): bump vite to 6.x and socket.io to 4.8',
          '1e2f90a docs(architecture): add C4 diagram for Midterm Defense',
          '0b4c812 feat(auth): add student password hashing with argon2'
        );
      } else if (subCmd === 'diff') {
        newLogs.push(
          'diff --git a/src/auth/jwt.ts b/src/auth/jwt.ts',
          'index a1b2c3d..9f2a41d 100644',
          '--- a/src/auth/jwt.ts',
          '+++ b/src/auth/jwt.ts',
          '@@ -14,1 +14,2 @@',
          '-  role: string;',
          '+  role: "student" | "ta" | "professor" | "admin";',
          '+  department: string;'
        );
      } else {
        newLogs.push(`git: '${subCmd}' is not a recognized Git command. Type 'help'.`);
      }
    } else {
      newLogs.push(`bash: ${mainCmd}: command not found. Type 'help' for available Git commands.`);
    }

    setHistory(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextPtr = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPtr);
        setInputVal(commandHistory[nextPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyPointer !== -1) {
        const nextPtr = historyPointer + 1;
        if (nextPtr < commandHistory.length) {
          setHistoryPointer(nextPtr);
          setInputVal(commandHistory[nextPtr]);
        } else {
          setHistoryPointer(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-[#e6edf3]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Terminal Window 3 cols */}
        <div className="lg:col-span-3 rounded-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden flex flex-col h-[560px]">
          {/* macOS / Linux Window Title Bar */}
          <div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f85149]" />
              <span className="w-3 h-3 rounded-full bg-[#e3b341]" />
              <span className="w-3 h-3 rounded-full bg-[#238636]" />
              <span className="ml-2 font-mono text-[11px] text-[#848d97]">
                bash — {repo.name} ({currentBranch}) — 80x24
              </span>
            </div>

            <button
              onClick={() => setHistory([])}
              className="text-[#848d97] hover:text-white flex items-center gap-1 font-mono text-[10px] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>

          {/* Terminal Console Output */}
          <div className="p-4 flex-1 overflow-y-auto font-mono text-[12px] leading-relaxed space-y-1">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('✓')
                    ? 'text-[#7ee787]'
                    : line.startsWith('⚠️')
                    ? 'text-[#d29922]'
                    : line.includes('fatal:') || line.includes('error:')
                    ? 'text-[#ffa198]'
                    : line.startsWith(promptPrefix.split(' ')[0])
                    ? 'text-[#58a6ff] font-semibold'
                    : 'text-[#e6edf3]'
                }
              >
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="p-3 bg-[#161b22] border-t border-[#30363d] flex items-center gap-2 font-mono text-[12px]">
            <span className="text-[#3fb950] font-semibold select-none">
              {promptPrefix}
            </span>
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#e6edf3] focus:outline-none caret-[#58a6ff]"
              placeholder="type git command (e.g. git status, git checkout -b ...)"
            />
          </div>
        </div>

        {/* Guided Student Missions Sidebar */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#58a6ff]" />
                <span>Student GitFlow Missions</span>
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#238636]/20 text-[#3fb950]">
                {missions.filter((m) => m.completed).length}/{missions.length} done
              </span>
            </div>
            <p className="text-[#848d97] text-[11px]">
              Execute real Git commands in the terminal to practice strict GitFlow hygiene.
            </p>

            {/* Missions List */}
            <div className="space-y-2.5 pt-1">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`p-3 rounded-md border text-xs transition space-y-1.5 ${
                    mission.completed
                      ? 'bg-[#238636]/10 border-[#238636]/40 text-[#e6edf3]'
                      : 'bg-[#0d1117] border-[#30363d] text-[#848d97]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      {mission.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-[#848d97]" />
                      )}
                      <span>{mission.title}</span>
                    </span>
                  </div>

                  <p className="text-[11px] leading-snug">{mission.description}</p>

                  <button
                    onClick={() => setInputVal(mission.commandHint)}
                    className="font-mono text-[10px] px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] border border-[#30363d] flex items-center justify-between w-full cursor-pointer transition"
                  >
                    <span className="truncate">{mission.commandHint}</span>
                    <ArrowRight className="w-3 h-3 shrink-0 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Rubric Badge */}
          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#238636]/30 text-xs flex items-center gap-2 text-[#3fb950]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-[11px]">
              Terminal interactions adhere 1:1 with official GitHub branch rules.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
