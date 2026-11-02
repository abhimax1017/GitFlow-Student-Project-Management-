import React from 'react';
import {
  BookOpen,
  Users,
  CheckCircle2,
  GitBranch,
  Shield,
  FileText,
  Award,
} from 'lucide-react';
import { AcademicRepo } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';

interface GuideTabProps {
  repo: AcademicRepo;
}

export const GuideTab: React.FC<GuideTabProps> = ({ repo }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-xs text-[#e6edf3] space-y-8">
      {/* Hero Banner */}
      <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#58a6ff]">
          <BookOpen className="w-5 h-5" />
          <span>GITFLOW Academic Engineering Charter & Rubric Guide</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Team Engineering Agreement: Abhinav & Sathwik
        </h1>
        <p className="text-[#848d97] text-xs leading-relaxed max-w-3xl">
          This document establishes the official academic collaboration invariant for{' '}
          <strong className="text-white">{repo.course}</strong>. All branch merges, PR reviews,
          commit conventions, and automated CI pipelines are subject to programmatic grading
          auditing.
        </p>
      </div>

      {/* 2-Person Engineering Team Responsibilities */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-[#58a6ff]" />
          <span>Core Team Roles & Architecture Division</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Abhinav */}
          <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2.5">
            <div className="flex items-center gap-3">
              <img
                src={TEAM_MEMBERS.abhinav.avatar}
                alt="Abhinav"
                className="w-10 h-10 rounded-full object-cover border border-[#30363d]"
              />
              <div>
                <div className="font-semibold text-sm text-white">
                  Abhinav (@abhinav-lead)
                </div>
                <div className="text-[11px] text-[#848d97]">
                  Tech Lead & Principal Solutions Architect
                </div>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[#848d97] text-[11px]">
              <li>Core backend API gateway, Express, and microservice topologies</li>
              <li>Distributed consensus algorithms (Raft in Go, Redis token bucket)</li>
              <li>DevOps, GitHub Actions CI/CD matrix, and Cloud Run deployments</li>
              <li>Security SAST audits and zero-leak token credential management</li>
            </ul>
          </div>

          {/* Sathwik */}
          <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2.5">
            <div className="flex items-center gap-3">
              <img
                src={TEAM_MEMBERS.sathwik.avatar}
                alt="Sathwik"
                className="w-10 h-10 rounded-full object-cover border border-[#30363d]"
              />
              <div>
                <div className="font-semibold text-sm text-white">
                  Sathwik (@sathwik-dev)
                </div>
                <div className="text-[11px] text-[#848d97]">
                  Frontend Lead & MLOps Systems Engineer
                </div>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[#848d97] text-[11px]">
              <li>React 19, TypeScript, and GitHub Primer Design System fidelity</li>
              <li>Deep Learning architectures (PyTorch 3D Attention U-Net, BraTS 2024)</li>
              <li>Real-time WebSocket telemetry and live canvas data visualizations</li>
              <li>End-to-end component testing and cross-device responsive layout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Branching Invariant */}
      <div className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[#238636]" />
          <span>Official GitFlow Branching Model</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="font-mono text-[#58a6ff] font-semibold text-xs mb-1">main</div>
            <p className="text-[#848d97] text-[11px]">
              Production release branch. Protected. Direct commits strictly prohibited. Only merges
              from release PRs with verified passing CI and faculty tags.
            </p>
          </div>
          <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="font-mono text-[#3fb950] font-semibold text-xs mb-1">develop</div>
            <p className="text-[#848d97] text-[11px]">
              Sprint integration branch. Target for all completed feature branches. Requires peer
              review signoff from Abhinav or Sathwik.
            </p>
          </div>
          <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="font-mono text-[#d29922] font-semibold text-xs mb-1">feature/*</div>
            <p className="text-[#848d97] text-[11px]">
              Isolated student working branches (e.g. <code>feature/auth-jwt</code>). Must link to an
              active issue in GitHub Projects V2.
            </p>
          </div>
        </div>
      </div>

      {/* Conventional Commit Standards */}
      <div className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#d29922]" />
          <span>Conventional Commit Cheatsheet</span>
        </h2>
        <p className="text-[#848d97] text-[11px]">
          Commit messages must adhere strictly to the format:{' '}
          <code className="text-[#7ee787]">type(scope): description</code>.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
          <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
            <span className="text-[#58a6ff] font-bold">feat:</span>
            <div className="text-[#848d97] font-sans text-[10px]">New student feature</div>
          </div>
          <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
            <span className="text-[#f85149] font-bold">fix:</span>
            <div className="text-[#848d97] font-sans text-[10px]">Bug patch or hotfix</div>
          </div>
          <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
            <span className="text-[#3fb950] font-bold">docs:</span>
            <div className="text-[#848d97] font-sans text-[10px]">Documentation & report</div>
          </div>
          <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
            <span className="text-[#d29922] font-bold">perf:</span>
            <div className="text-[#848d97] font-sans text-[10px]">Performance optimization</div>
          </div>
        </div>
      </div>
    </div>
  );
};
