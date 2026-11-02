import React from 'react';
import {
  BarChart2,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  GitCommit,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { AcademicRepo, RubricCriterion } from '../../types';
import {
  TEAM_MEMBERS,
  ACADEMIC_RUBRIC_CRITERIA,
  generate52WeekHeatmap,
} from '../../data/mockData';

interface InsightsTabProps {
  repo: AcademicRepo;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ repo }) => {
  const heatmapDays = React.useMemo(() => generate52WeekHeatmap(), []);

  const totalScore = ACADEMIC_RUBRIC_CRITERIA.reduce((acc, c) => acc + c.earnedScore, 0);
  const maxPossible = ACADEMIC_RUBRIC_CRITERIA.reduce((acc, c) => acc + c.maxScore, 0);
  const scorePercent = ((totalScore / maxPossible) * 100).toFixed(1);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#0e4429]';
      case 2:
        return 'bg-[#006d32]';
      case 3:
        return 'bg-[#26a641]';
      case 4:
        return 'bg-[#39d353]';
      default:
        return 'bg-[#161b22]';
    }
  };

  const handleExportAudit = () => {
    const auditData = {
      project: repo.name,
      course: repo.course,
      team: ['Abhinav (Lead)', 'Sathwik (Dev)'],
      finalGrade: 'A+ (98.5 / 100)',
      date: new Date().toISOString(),
      rubricCriteria: ACADEMIC_RUBRIC_CRITERIA,
    };
    const blob = new Blob([JSON.stringify(auditData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-rubric-audit-${repo.name}.json`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-[#e6edf3] space-y-6">
      {/* Top Banner: Academic Grade A+ */}
      <div className="p-5 rounded-md bg-[#161b22] border border-[#238636]/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#238636]/20 border border-[#238636]/50 flex items-center justify-center text-[#3fb950]">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                Academic Project Grade: A+ ({scorePercent} / 100)
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] font-mono text-[11px] font-bold">
                AUDIT VERIFIED
              </span>
            </div>
            <p className="text-[#848d97] text-[11px] mt-0.5">
              Verified by Automated GitFlow Rubric Analyzer on {repo.course} Capstone
            </p>
          </div>
        </div>

        <button
          onClick={handleExportAudit}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-semibold cursor-pointer transition shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Academic Rubric Audit</span>
        </button>
      </div>

      {/* Grid: 52-Week Heatmap & Contributor Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2 Cols: 52-Week Commit Activity */}
        <div className="lg:col-span-2 p-4 rounded-md bg-[#161b22] border border-[#30363d] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#e6edf3] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#58a6ff]" />
              <span>52-Week Commit Activity Heatmap (1,248 commits)</span>
            </h3>
            <span className="text-[11px] text-[#848d97]">Oct 2025 – Nov 2026</span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-[3px]">
              {heatmapDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`w-[11px] h-[11px] rounded-xs cursor-pointer ${getLevelColor(
                    day.level
                  )}`}
                  title={`${day.count} commits on ${day.date}`}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#30363d] flex items-center justify-between text-[11px] text-[#848d97]">
            <span>Consistent daily frequency across all 4 sprint cycles</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#161b22]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0e4429]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#006d32]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#26a641]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#39d353]" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* 1 Col: Contributor Workload Distribution */}
        <div className="p-4 rounded-md bg-[#161b22] border border-[#30363d] space-y-4">
          <h3 className="font-semibold text-sm text-[#e6edf3] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#58a6ff]" />
            <span>Team Workload Split</span>
          </h3>

          {/* Abhinav */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={TEAM_MEMBERS.abhinav.avatar}
                  alt="Abhinav"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold text-[#e6edf3]">Abhinav (Lead)</span>
              </div>
              <span className="font-mono text-[#58a6ff]">674 commits (54%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#21262d] overflow-hidden">
              <div className="h-full bg-[#58a6ff] w-[54%]" />
            </div>
            <div className="text-[10px] text-[#848d97]">
              Backend, Auth Gateway, Raft Consensus, Redis, CI/CD
            </div>
          </div>

          {/* Sathwik */}
          <div className="space-y-1.5 pt-2 border-t border-[#21262d]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={TEAM_MEMBERS.sathwik.avatar}
                  alt="Sathwik"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold text-[#e6edf3]">Sathwik (Dev)</span>
              </div>
              <span className="font-mono text-[#3fb950]">574 commits (46%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#21262d] overflow-hidden">
              <div className="h-full bg-[#3fb950] w-[46%]" />
            </div>
            <div className="text-[10px] text-[#848d97]">
              React 19 Frontend, Primer UI, Attention U-Net, WebSockets
            </div>
          </div>
        </div>
      </div>

      {/* Academic Rubric Criteria Table */}
      <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
        <div className="bg-[#161b22] p-3 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3fb950]" />
            <span className="font-semibold text-xs text-[#e6edf3]">
              Academic Grading Rubric Verification Checklist
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#3fb950]">
            Total: {totalScore} / {maxPossible} Points
          </span>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#21262d] text-[11px] text-[#848d97] bg-[#161b22]/50">
              <th className="py-2 px-3 font-semibold">Category & Criteria</th>
              <th className="py-2 px-3 font-semibold">Verification Audit Evidence</th>
              <th className="py-2 px-3 font-semibold text-right">Score</th>
              <th className="py-2 px-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {ACADEMIC_RUBRIC_CRITERIA.map((crit) => (
              <tr key={crit.id} className="hover:bg-[#161b22]/50 transition">
                <td className="py-3 px-3">
                  <div className="font-semibold text-[#e6edf3]">{crit.name}</div>
                  <div className="text-[10px] text-[#848d97]">{crit.category}</div>
                </td>
                <td className="py-3 px-3 text-[#848d97] max-w-md">{crit.details}</td>
                <td className="py-3 px-3 text-right font-mono font-semibold text-[#e6edf3]">
                  {crit.earnedScore} / {crit.maxScore}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Passed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
