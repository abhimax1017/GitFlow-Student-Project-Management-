import {
  AcademicRepo,
  UserPersona,
  Issue,
  PullRequest,
  KanbanCard,
  ActionRun,
  HeatmapDay,
  RubricCriterion,
  RepoFile,
} from '../types';

export const TEAM_MEMBERS: Record<'abhinav' | 'sathwik', UserPersona> = {
  abhinav: {
    id: 'abhinav-lead',
    username: 'abhinav-lead',
    name: 'Abhinav',
    email: 'abhimax1017@gmail.com',
    role: 'Tech Lead & Solutions Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specialties: ['Distributed Systems', 'Backend APIs', 'Security', 'CI/CD Pipelines'],
  },
  sathwik: {
    id: 'sathwik-dev',
    username: 'sathwik-dev',
    name: 'Sathwik',
    email: 'sathwik.dev@campus.edu',
    role: 'Frontend Lead & MLOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialties: ['React & UI/UX Systems', 'Data Visualizations', 'PyTorch / MLOps', 'Primer Design'],
  },
};

export const ACADEMIC_REPOS: AcademicRepo[] = [
  {
    id: 'novaforge-urban-flood',
    name: 'novaforge-urban-flood',
    course: 'Smart India Hackathon (SIH 26085)',
    description: 'NovaForge: Urban Flood Nowcasting System (Drainage & Rainfall Coupling) with live MapLibre GL radar isochrones, stormwater surcharge telemetry, and Gemini AI disaster dispatch.',
    stars: 64,
    forks: 21,
    watchers: 38,
    isPrivate: false,
    defaultBranch: 'main',
    branches: ['main', 'develop', 'feature/coupled-hydrodynamics', 'feature/maplibre-radar', 'hotfix/isochrone-zindex'],
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    linesOfCode: 42150,
    openIssuesCount: 3,
    openPrCount: 2,
    demoUrl: 'https://novaforge-urban-flood.vercel.app',
    license: 'MIT License',
  },
  {
    id: 'PBL-privacy-shield',
    name: 'PBL-privacy-shield',
    course: 'Assignment 41 – Data Privacy',
    description: 'PrivacyShield: Secure Confidential Information Viewer with role-based reveal, temporary auto-hide, server-side data masking, and cryptographic access audit logging.',
    stars: 29,
    forks: 9,
    watchers: 14,
    isPrivate: false,
    defaultBranch: 'main',
    branches: ['main', 'develop', 'feature/rbac-masking', 'feature/audit-stream'],
    primaryLanguage: 'JavaScript',
    languageColor: '#f1e05a',
    linesOfCode: 12400,
    openIssuesCount: 2,
    openPrCount: 1,
    demoUrl: 'https://github.com/abhimax1017/PBL-privacy-shield',
    license: 'MIT License',
  },
  {
    id: 'smart-campus-portal',
    name: 'smart-campus-portal',
    course: 'CS 490 Capstone',
    description: 'Autonomous Student Life Operating System with real-time course scheduling, dining analytics & biometric gate access.',
    stars: 38,
    forks: 14,
    watchers: 22,
    isPrivate: false,
    defaultBranch: 'main',
    branches: ['main', 'develop', 'feature/auth-jwt', 'feature/dining-socket', 'hotfix/cors-patch'],
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    linesOfCode: 34280,
    openIssuesCount: 4,
    openPrCount: 2,
    demoUrl: 'https://smart-campus.demo.edu',
    license: 'MIT License',
  },
  {
    id: 'neuro-scan-ai',
    name: 'neuro-scan-ai',
    course: 'CS 482 Deep Learning',
    description: 'Volumetric 3D MRI Brain Lesion Segmentation using Attention U-Net & TensorRT inference acceleration.',
    stars: 62,
    forks: 23,
    watchers: 31,
    isPrivate: false,
    defaultBranch: 'main',
    branches: ['main', 'develop', 'feature/attention-unet', 'feature/dice-loss-cuda', 'refactor/dataloader'],
    primaryLanguage: 'Python',
    languageColor: '#3572A5',
    linesOfCode: 18920,
    openIssuesCount: 3,
    openPrCount: 1,
    demoUrl: 'https://neuroscan.ai.demo.edu',
    license: 'Apache-2.0',
  },
  {
    id: 'distributed-raft-kv',
    name: 'distributed-raft-kv',
    course: 'CS 474 Distributed Systems',
    description: 'High-availability partitioned key-value store with Raft consensus algorithm in Go, log compaction & snapshotting.',
    stars: 89,
    forks: 34,
    watchers: 45,
    isPrivate: false,
    defaultBranch: 'main',
    branches: ['main', 'develop', 'feature/leader-election', 'feature/log-compaction', 'test/chaos-jepsen'],
    primaryLanguage: 'Go',
    languageColor: '#00ADD8',
    linesOfCode: 14750,
    openIssuesCount: 2,
    openPrCount: 1,
    demoUrl: 'https://raft-kv.mesh.internal',
    license: 'BSD-3-Clause',
  },
  {
    id: 'ecoride-campus',
    name: 'ecoride-campus',
    course: 'CS 411 Mobile Cloud',
    description: 'Geofenced peer-to-peer campus ride sharing with real-time route optimization and zero-knowledge student verification.',
    stars: 27,
    forks: 8,
    watchers: 15,
    isPrivate: false,
    defaultBranch: 'main',
    branches: ['main', 'develop', 'feature/geofence-polygon', 'feature/fare-splitter'],
    primaryLanguage: 'Kotlin',
    languageColor: '#A97BFF',
    linesOfCode: 21600,
    openIssuesCount: 5,
    openPrCount: 2,
    demoUrl: 'https://ecoride.campus.app',
    license: 'MIT License',
  },
];

export const MOCK_REPO_FILES: Record<string, RepoFile[]> = {
  'novaforge-urban-flood': [
    {
      path: 'README.md',
      name: 'README.md',
      type: 'file',
      size: '4.8 KB',
      updatedAt: '2 hours ago',
      lastCommitMessage: 'docs(sih): add live website vercel deploy link and MapLibre architecture',
      language: 'markdown',
      content: `# 🌊 NovaForge: Urban Flood Nowcasting System

> **Problem Statement SIH26085**: Urban Flood Nowcasting System (Drainage and Rainfall Coupling) with live sensor telemetry and MapLibre GL geospatial isochrone visualization.

## 🚀 Live Production Deployment
- **Deployed Website**: [https://novaforge-urban-flood.vercel.app](https://novaforge-urban-flood.vercel.app)
- **GitHub Repository**: [https://github.com/abhimax1017/novaforge-urban-flood](https://github.com/abhimax1017/novaforge-urban-flood)

## 👥 Engineering Team
- **Abhinav** (\`@abhimax1017\` / \`@abhinav-lead\`) — System Architecture, 1D-2D Coupled Hydromechanics, Server Proxy
- **Sathwik** (\`@sathwik-dev\`) — Geospatial Telemetry, MapLibre Radar Isochrones, Primer UI

## 🌿 GitFlow Invariant
- \`main\` — Continuous production deployment to Vercel (https://novaforge-urban-flood.vercel.app).
- \`develop\` — Sprint integration branch with automated CI/CD checks.
- \`feature/*\` — Isolated hydrodynamic modules (e.g., \`feature/coupled-hydrodynamics\`).
`,
    },
    {
      path: 'src/types.ts',
      name: 'src/types.ts',
      type: 'file',
      size: '2.8 KB',
      updatedAt: '4 hours ago',
      lastCommitMessage: 'feat(types): add flood sensor telemetry and isochrone interfaces',
      language: 'typescript',
      content: `export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  rainfallIntensity: number;
  description: string;
}

export type SensorType = 
  | 'water_level' 
  | 'drain_flow' 
  | 'rain_gauge' 
  | 'soil_moisture' 
  | 'weather_station' 
  | 'cctv_camera' 
  | 'pump_telemetry';

export interface SensorData {
  id: string;
  name: string;
  type: SensorType;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: number;
  lastUpdated: string;
}
`,
    },
    {
      path: 'src/components/Map/FloodMap.tsx',
      name: 'src/components/Map/FloodMap.tsx',
      type: 'file',
      size: '5.2 KB',
      updatedAt: '6 hours ago',
      lastCommitMessage: 'feat(map): render real-time MapLibre rainfall depth isochrone layer',
      language: 'typescript',
      content: `import React, { useState } from 'react';
import { Map, Source, Layer } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface FloodMapProps {
  rainfallMm: number;
  drainageCapacityPercent: number;
}

export const FloodMap: React.FC<FloodMapProps> = ({ rainfallMm, drainageCapacityPercent }) => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-[#30363d] relative">
      <div className="absolute top-3 left-3 z-10 bg-[#161b22]/90 backdrop-blur px-3 py-1.5 rounded-md border border-[#30363d] text-xs">
        <span className="font-semibold text-white">NovaForge Live Nowcasting</span>
        <div className="text-[10px] text-[#848d97]">
          Precipitation: {rainfallMm} mm/hr | Drainage Surcharge: {drainageCapacityPercent}%
        </div>
      </div>
    </div>
  );
};
`,
    },
    {
      path: 'server.ts',
      name: 'server.ts',
      type: 'file',
      size: '3.6 KB',
      updatedAt: '1 day ago',
      lastCommitMessage: 'feat(api): mount Gemini nowcasting flood early-warning gateway',
      language: 'typescript',
      content: `import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// AI Flood Severity Assessment & Municipal Alert Dispatch
app.post('/api/novaforge/nowcast', async (req, res) => {
  const { rainfall, waterLevel, drainageLoad } = req.body;
  const prompt = \`Analyze urban flood risks for SIH26085: Rainfall \${rainfall}mm, Water Level \${waterLevel}m, Drainage Load \${drainageLoad}%. Return immediate safety actions and triage alert.\`;
  const result = await ai.models.generateContent({ model: 'gemini-3.8-flash', contents: prompt });
  res.json({ analysis: result.text, status: 'dispatched' });
});

export default app;
`,
    },
    {
      path: 'package.json',
      name: 'package.json',
      type: 'file',
      size: '1.4 KB',
      updatedAt: '2 days ago',
      lastCommitMessage: 'chore(deps): configure @vis.gl/react-maplibre and vercel deployment',
      language: 'json',
      content: `{
  "name": "novaforge-urban-flood",
  "version": "1.0.0",
  "private": true,
  "homepage": "https://novaforge-urban-flood.vercel.app",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
`,
    },
  ],
  'PBL-privacy-shield': [
    {
      path: 'README.md',
      name: 'README.md',
      type: 'file',
      size: '3.4 KB',
      updatedAt: '3 days ago',
      lastCommitMessage: 'docs(readme): add assignment 41 data privacy specification',
      language: 'markdown',
      content: `# 🛡️ PBL – PrivacyShield: Secure Confidential Information Viewer

> **Assignment 41 – Data Privacy**: Show/hide confidential user information in the UI with role-authorized reveal, temporary auto-hide, server-side data masking, and cryptographic audit logging.

## 👥 Engineering Team
- **Abhinav** (\`@abhimax1017\`) — Core Architecture, Server-Side Masking Engine, Audit Log
- **Sathwik** (\`@sathwik-dev\`) — Frontend UI/UX, Primer Privacy Toggles

## 🚀 Key Specifications
- Sensitive fields masked by default (SSN, credit card, phone).
- Role-based authorization guard before unmasking.
- Auto-masking timeout after 15 seconds of inactivity.
- Tamper-proof audit trails for every access event.
`,
    },
    {
      path: 'server.js',
      name: 'server.js',
      type: 'file',
      size: '3.1 KB',
      updatedAt: '4 days ago',
      lastCommitMessage: 'feat(masking): server-side regex transformation for PII fields',
      language: 'javascript',
      content: `const express = require('express');
const app = express();

function maskSensitiveField(val, type) {
  if (!val) return '';
  if (type === 'ssn') return '***-**-' + val.slice(-4);
  if (type === 'email') return val[0] + '***@' + val.split('@')[1];
  return '••••••••';
}

app.get('/api/confidential-data', (req, res) => {
  const role = req.headers['x-user-role'];
  // Role-based authorization
  res.json({ status: 'ok', role });
});
`,
    },
  ],
  'smart-campus-portal': [
    {
      path: '.github/workflows/ci.yml',
      name: '.github/workflows/ci.yml',
      type: 'file',
      size: '2.4 KB',
      updatedAt: '3 hours ago',
      lastCommitMessage: 'ci(workflows): add Vitest matrix and Gemini SAST security scanner',
      language: 'yaml',
      content: `name: GitFlow CI / CD Automated Verification

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x, 22.x]
    steps:
      - name: Checkout source code
        uses: actions/checkout@v4

      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint & TypeScript compile check
        run: npm run lint

      - name: Execute Vitest Unit Test Suite
        run: npm test -- --coverage

      - name: Gemini AI Security & Git Hygiene Audit
        run: npm run audit:gitflow
`,
    },
    {
      path: 'src/auth/jwt.ts',
      name: 'src/auth/jwt.ts',
      type: 'file',
      size: '3.8 KB',
      updatedAt: '2 days ago',
      lastCommitMessage: 'feat(auth): implement student JWT session rotation with Redis blacklist',
      language: 'typescript',
      content: `import jwt from 'jsonwebtoken';
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL });
const JWT_SECRET = process.env.JWT_SECRET || 'campus-super-secret-key-490';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'campus-refresh-secret-490';

export interface StudentPayload {
  studentId: string;
  email: string;
  role: 'student' | 'ta' | 'professor' | 'admin';
  department: string;
}

export async function generateTokenPair(payload: StudentPayload) {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ studentId: payload.studentId }, REFRESH_SECRET, { expiresIn: '7d' });

  // Store refresh token in Redis with TTL for instant revocation
  await redisClient.setEx(\`refresh:\${payload.studentId}\`, 7 * 86400, refreshToken);

  return { accessToken, refreshToken };
}

export async function revokeToken(studentId: string) {
  await redisClient.del(\`refresh:\${studentId}\`);
}
`,
    },
    {
      path: 'src/server.ts',
      name: 'src/server.ts',
      type: 'file',
      size: '4.2 KB',
      updatedAt: '5 hours ago',
      lastCommitMessage: 'feat(server): mount campus dining websocket gateway',
      language: 'typescript',
      content: `import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime(), version: '2.4.0' });
});

io.on('connection', (socket) => {
  console.log('[WebSocket] Student connected:', socket.id);
  socket.on('dining:subscribe', (hallId) => {
    socket.join(\`dining:\${hallId}\`);
  });
});

export { app, server };
`,
    },
    {
      path: 'README.md',
      name: 'README.md',
      type: 'file',
      size: '5.1 KB',
      updatedAt: '1 day ago',
      lastCommitMessage: 'docs(readme): add Capstone architecture diagram and GitFlow rubric',
      language: 'markdown',
      content: `# 🎓 Smart Campus Portal (CS 490 Capstone)

> Autonomous Student Life Operating System with real-time course scheduling, dining analytics & biometric gate access.

## 👥 Engineering Team
- **Abhinav** (\`@abhinav-lead\`) — System Architecture, Auth, Redis, CI/CD
- **Sathwik** (\`@sathwik-dev\`) — Frontend Systems, Real-time Visualizations, Socket.IO

## 🌿 GitFlow Branching Invariant
- \`main\` — Production releases tagged with semver (e.g., \`v1.0.0\`).
- \`develop\` — Integration branch for sprint deliverables.
- \`feature/*\` — Isolated student features requiring PR + peer review signoff.
`,
    },
    {
      path: 'package.json',
      name: 'package.json',
      type: 'file',
      size: '1.2 KB',
      updatedAt: '2 days ago',
      lastCommitMessage: 'chore(deps): bump vite to 6.x and socket.io to 4.8',
      language: 'json',
      content: `{
  "name": "smart-campus-portal",
  "version": "2.4.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src/ --ext .ts,.tsx",
    "test": "vitest run --coverage"
  }
}`,
    },
  ],
  'neuro-scan-ai': [
    {
      path: 'models/attention_unet.py',
      name: 'models/attention_unet.py',
      type: 'file',
      size: '4.7 KB',
      updatedAt: '1 day ago',
      lastCommitMessage: 'feat(model): implement 3D spatial attention gating block',
      language: 'python',
      content: `import torch
import torch.nn as nn

class AttentionGate3D(nn.Module):
    def __init__(self, F_g, F_l, F_int):
        super(AttentionGate3D, self).__init__()
        self.W_g = nn.Sequential(
            nn.Conv3d(F_g, F_int, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm3d(F_int)
        )
        self.W_x = nn.Sequential(
            nn.Conv3d(F_l, F_int, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm3d(F_int)
        )
        self.psi = nn.Sequential(
            nn.Conv3d(F_int, 1, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm3d(1),
            nn.Sigmoid()
        )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, g, x):
        g1 = self.W_g(g)
        x1 = self.W_x(x)
        psi = self.relu(g1 + x1)
        psi = self.psi(psi)
        return x * psi
`,
    },
  ],
  'distributed-raft-kv': [
    {
      path: 'raft/consensus.go',
      name: 'raft/consensus.go',
      type: 'file',
      size: '6.2 KB',
      updatedAt: '3 days ago',
      lastCommitMessage: 'feat(raft): implement randomized election timeout backoff',
      language: 'go',
      content: `package raft

import (
	"math/rand"
	"sync"
	"time"
)

type NodeState int

const (
	Follower NodeState = iota
	Candidate
	Leader
)

type RaftNode struct {
	mu        sync.Mutex
	peers     []string
	nodeId    string
	currentTerm int
	votedFor  string
	state     NodeState
	heartbeat time.Duration
}

func (rn *RaftNode) RequestVote(term int, candidateId string) bool {
	rn.mu.Lock()
	defer rn.mu.Unlock()
	if term > rn.currentTerm && (rn.votedFor == "" || rn.votedFor == candidateId) {
		rn.currentTerm = term
		rn.votedFor = candidateId
		rn.state = Follower
		return true
	}
	return false
}
`,
    },
  ],
  'ecoride-campus': [
    {
      path: 'src/main/kotlin/RoutingService.kt',
      name: 'src/main/kotlin/RoutingService.kt',
      type: 'file',
      size: '3.1 KB',
      updatedAt: '4 days ago',
      lastCommitMessage: 'feat(geo): implement polygon geofencing for campus perimeter',
      language: 'kotlin',
      content: `package com.campus.ecoride

data class Coordinate(val lat: Double, val lng: Double)

class GeofenceValidator(private val campusBoundary: List<Coordinate>) {
    fun isInsideCampus(point: Coordinate): Boolean {
        var inside = false
        var j = campusBoundary.size - 1
        for (i in campusBoundary.indices) {
            if ((campusBoundary[i].lat > point.lat) != (campusBoundary[j].lat > point.lat) &&
                point.lng < (campusBoundary[j].lng - campusBoundary[i].lng) * 
                (point.lat - campusBoundary[i].lat) / (campusBoundary[j].lat - campusBoundary[i].lat) + campusBoundary[i].lng) {
                inside = !inside
            }
            j = i
        }
        return inside
    }
}
`,
    },
  ],
};

export const MOCK_ISSUES: Record<string, Issue[]> = {
  'novaforge-urban-flood': [
    {
      id: 14,
      title: 'feat(hydrology): implement 1D-2D coupled hydrodynamic drainage and rainfall nowcasting',
      body: `### User Story
As an emergency response and municipal disaster lead (SIH26085), I need 1D storm drain pipe flow coupled with 2D overland flood propagation to predict localized waterlogging 60 minutes in advance.

### Acceptance Criteria
- [x] Implement Manning-Strickler equation for open channel storm conduits
- [x] Couple drainage nodal overflow with 2D grid surface ponding
- [ ] Render dynamic water depth isochrones on MapLibre GL radar map
- [ ] Connect Gemini 3.8 Flash automated early-warning emergency alert dispatch
- [ ] Verify live production telemetry feed at https://novaforge-urban-flood.vercel.app`,
      state: 'open',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [
        { name: 'enhancement', color: '#a2eeef', description: 'Core hydrology coupling' },
        { name: 'p0-blocker', color: '#d93f0b', description: 'SIH26085 milestone' },
        { name: 'ai:analyzed', color: '#1f6feb', description: 'Triaged and validated by Gemini AI' },
      ],
      milestone: 'SIH Final Defense',
      createdAt: '2026-10-30T10:00:00Z',
      updatedAt: '2026-11-01T14:30:00Z',
      clarityScore: 98,
      aiTriageSummary: 'Premier SIH26085 deliverable. 1D-2D hydrodynamic coupling verified with sensor telemetry. Production site active at https://novaforge-urban-flood.vercel.app.',
      priority: 'critical',
      acceptanceCriteria: [
        { text: 'Implement Manning-Strickler equation for open channel storm conduits', done: true },
        { text: 'Couple drainage nodal overflow with 2D grid surface ponding', done: true },
        { text: 'Render dynamic water depth isochrones on MapLibre GL radar map', done: false },
        { text: 'Connect Gemini 3.8 Flash automated early-warning emergency alert dispatch', done: false },
        { text: 'Verify live production telemetry feed at novaforge-urban-flood.vercel.app', done: false },
      ],
      comments: [
        {
          id: 'nf-c1',
          author: TEAM_MEMBERS.sathwik,
          createdAt: '2026-10-31T09:15:00Z',
          body: 'MapLibre GL tile layers are hooked up on the frontend! The Vercel preview deployment looks super smooth at https://novaforge-urban-flood.vercel.app.',
        },
      ],
    },
    {
      id: 11,
      title: 'feat(map): render real-time MapLibre rainfall depth isochrone layer with color ramp',
      body: `### User Story
As a field rescue team coordinator, I want to see color-coded rainfall intensity (0-100mm/hr) overlaid on urban street grids so safe evacuation corridors can be planned.

### Acceptance Criteria
- [x] Configure MapLibre GeoJSON heatmap source
- [x] Apply standard warning palette (Green <15mm, Amber 15-40mm, Crimson >40mm)
- [ ] Add interactive sensor tooltip on click`,
      state: 'open',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.sathwik],
      labels: [
        { name: 'enhancement', color: '#a2eeef' },
        { name: 'academic-milestone', color: '#0e8a16' },
      ],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-28T14:00:00Z',
      updatedAt: '2026-10-31T16:00:00Z',
      clarityScore: 94,
      priority: 'high',
      comments: [],
    },
    {
      id: 7,
      title: 'chore(deploy): configure Vercel production edge caching and custom domain routing',
      body: 'Verified production domain https://novaforge-urban-flood.vercel.app with automated Git push deployment from main branch.',
      state: 'closed',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [{ name: 'documentation', color: '#0075ca' }],
      milestone: 'Sprint 1 - Foundations',
      createdAt: '2026-10-15T08:00:00Z',
      updatedAt: '2026-10-20T12:00:00Z',
      clarityScore: 96,
      comments: [],
    },
  ],
  'PBL-privacy-shield': [
    {
      id: 5,
      title: 'feat(masking): implement role-based access control (RBAC) server-side data masking',
      body: 'Sensitive customer fields (SSN, credit card, phone) must be masked by default and require authorized token headers to reveal.',
      state: 'open',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [{ name: 'security', color: '#b60205' }],
      milestone: 'Assignment 41 Final Submission',
      createdAt: '2026-10-25T11:00:00Z',
      updatedAt: '2026-10-29T15:00:00Z',
      priority: 'critical',
      comments: [],
    },
    {
      id: 3,
      title: 'feat(ui): add 15-second temporary auto-hide timeout with progress indicator',
      body: 'When authorized user reveals confidential field, start 15s countdown before automatically re-masking data.',
      state: 'open',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.sathwik],
      labels: [{ name: 'enhancement', color: '#a2eeef' }],
      milestone: 'Assignment 41 Final Submission',
      createdAt: '2026-10-26T14:00:00Z',
      updatedAt: '2026-10-30T10:00:00Z',
      priority: 'high',
      comments: [],
    },
  ],
  'smart-campus-portal': [
    {
      id: 42,
      title: 'feat(auth): implement token bucket rate limiting on /api/v1/login endpoint',
      body: `### User Story
As an infrastructure and security lead, I need rate limiting on student credential validation endpoints to protect the campus database against credential stuffing attacks.

### Acceptance Criteria
- [x] Configure Redis token bucket middleware with 5 requests/minute per IP
- [x] Return standard HTTP 429 Too Many Requests with \`Retry-After\` header
- [ ] Implement exponential backoff penalty for repeated failed attempts
- [ ] Add Prometheus metric counter \`auth_ratelimit_drops_total\`
- [ ] Write integration test verifying token replenish mechanics

### Technical Specifications
- Path: \`/src/middleware/rateLimiter.ts\`
- Dependencies: \`ioredis\`, \`express-rate-limit\``,
      state: 'open',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [
        { name: 'security', color: '#b60205', description: 'Vulnerability prevention & security hardening' },
        { name: 'p0-blocker', color: '#d93f0b', description: 'High priority sprint milestone' },
        { name: 'ai:analyzed', color: '#1f6feb', description: 'Triaged and validated by Gemini AI' },
      ],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-29T14:22:00Z',
      updatedAt: '2026-10-31T18:10:00Z',
      clarityScore: 95,
      aiTriageSummary: 'Critical security requirement with clear Redis token bucket specifications. Recommended for immediate merge after automated test validation.',
      priority: 'critical',
      acceptanceCriteria: [
        { text: 'Configure Redis token bucket middleware with 5 req/min per IP', done: true },
        { text: 'Return standard HTTP 429 with Retry-After header', done: true },
        { text: 'Implement exponential backoff penalty for repeated failed attempts', done: false },
        { text: 'Add Prometheus metric counter auth_ratelimit_drops_total', done: false },
        { text: 'Write integration test verifying token replenish mechanics', done: false },
      ],
      comments: [
        {
          id: 'c1',
          author: TEAM_MEMBERS.sathwik,
          createdAt: '2026-10-30T10:15:00Z',
          body: 'I tested the mock token bucket from the student app frontend; we should make sure the JSON response contains an error message key formatted as `{ error: "RATE_LIMIT_EXCEEDED", retryAfterSec: 60 }` so our Primer Toast shows a countdown timer.',
        },
        {
          id: 'c2',
          author: TEAM_MEMBERS.abhinav,
          createdAt: '2026-10-30T11:45:00Z',
          body: 'Good call @sathwik-dev! I updated the RFC to include that payload format. Opening PR shortly.',
        },
      ],
    },
    {
      id: 39,
      title: 'feat(ui): design Primer-compliant dining hall occupancy visualizer with WebSockets',
      body: `### User Story
As a campus student, I want to see real-time student dining hall density on a live dashboard so I can avoid long wait lines during peak hours.

### Acceptance Criteria
- [x] Subscribe to \`dining:occupancy\` WebSocket channel
- [x] Render GitHub Primer counter badges with green/yellow/red occupancy states
- [ ] Add 60-minute historical moving average chart
- [ ] Mobile responsive layout tested on iOS Safari and Android Chrome`,
      state: 'open',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.sathwik],
      labels: [
        { name: 'enhancement', color: '#a2eeef', description: 'New feature or enhancement' },
        { name: 'academic-milestone', color: '#0e8a16', description: 'Capstone deliverable requirement' },
      ],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-27T09:12:00Z',
      updatedAt: '2026-10-30T16:04:00Z',
      clarityScore: 91,
      priority: 'high',
      acceptanceCriteria: [
        { text: 'Subscribe to dining:occupancy WebSocket channel', done: true },
        { text: 'Render GitHub Primer counter badges with green/yellow/red occupancy', done: true },
        { text: 'Add 60-minute historical moving average chart', done: false },
        { text: 'Mobile responsive layout tested on iOS and Android', done: false },
      ],
      comments: [],
    },
    {
      id: 35,
      title: 'docs(architecture): compile System Architecture & Threat Model for Midterm Defense',
      body: `### Deliverable
Compile the full academic capstone dossier containing:
- C4 container diagram (React frontend, Node API gateway, Redis cache, PostgreSQL)
- STRIDE threat modeling matrix
- GitFlow branching rules & peer review audit log`,
      state: 'closed',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav, TEAM_MEMBERS.sathwik],
      labels: [
        { name: 'documentation', color: '#0075ca', description: 'Academic papers & project docs' },
        { name: 'academic-milestone', color: '#0e8a16', description: 'Capstone deliverable' },
      ],
      milestone: 'Midterm Evaluation',
      createdAt: '2026-10-15T08:00:00Z',
      updatedAt: '2026-10-22T17:30:00Z',
      clarityScore: 98,
      priority: 'high',
      comments: [
        {
          id: 'c3',
          author: TEAM_MEMBERS.abhinav,
          createdAt: '2026-10-22T17:28:00Z',
          body: 'Completed and submitted to Professor. Received 100/100 on Midterm documentation rubric!',
        },
      ],
    },
    {
      id: 31,
      title: 'fix(cors): patch wildcard origin header on WebSocket handshake in staging',
      body: 'Staging environment blocked WebSocket connections due to missing CORS origin credentials parameter.',
      state: 'closed',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [{ name: 'bug', color: '#d73a4a', description: 'Fix for unexpected defect' }],
      milestone: 'Sprint 1 - Foundations',
      createdAt: '2026-10-10T12:00:00Z',
      updatedAt: '2026-10-11T09:15:00Z',
      clarityScore: 88,
      comments: [],
    },
  ],
  'neuro-scan-ai': [
    {
      id: 18,
      title: 'feat(loss): implement 3D Generalized Dice Loss with Focal penalty for imbalanced lesions',
      body: 'Brain lesions occupy <1.2% of the total 3D MRI volume. Cross-entropy loss collapses to background. Implement Generalized Dice Loss.',
      state: 'open',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.sathwik],
      labels: [
        { name: 'enhancement', color: '#a2eeef' },
        { name: 'academic-milestone', color: '#0e8a16' },
      ],
      milestone: 'Midterm Evaluation',
      createdAt: '2026-10-28T11:00:00Z',
      updatedAt: '2026-10-31T15:00:00Z',
      priority: 'high',
      comments: [],
    },
  ],
  'distributed-raft-kv': [
    {
      id: 24,
      title: 'feat(election): handle split votes with exponential jittered election timer',
      body: 'Nodes in partitioned networks must avoid simultaneous term increment collisions.',
      state: 'open',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [{ name: 'enhancement', color: '#a2eeef' }],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-29T16:00:00Z',
      updatedAt: '2026-10-31T12:00:00Z',
      priority: 'critical',
      comments: [],
    },
  ],
  'ecoride-campus': [
    {
      id: 12,
      title: 'feat(geofence): enforce zero-knowledge proof of student enrollment before dispatch',
      body: 'Verify student status using anonymous cryptographic credentials without storing government IDs.',
      state: 'open',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      labels: [{ name: 'security', color: '#b60205' }],
      milestone: 'Sprint 1 - Foundations',
      createdAt: '2026-10-25T14:00:00Z',
      updatedAt: '2026-10-30T10:00:00Z',
      priority: 'high',
      comments: [],
    },
  ],
};

export const MOCK_PULL_REQUESTS: Record<string, PullRequest[]> = {
  'novaforge-urban-flood': [
    {
      id: 8,
      title: 'feat(telemetry): stream sensor storm drainage metrics via MapLibre GL radar',
      body: `## Summary of Changes
- Connects live precipitation radar tiles with MapLibre GL isochrone layer.
- Implements dynamic color transitions from safe green to severe crimson.
- Verified live deployment at https://novaforge-urban-flood.vercel.app.

Closes #11. Reviewed by @sathwik-dev.`,
      state: 'open',
      sourceBranch: 'feature/maplibre-radar',
      targetBranch: 'develop',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      reviewers: [
        {
          user: TEAM_MEMBERS.sathwik,
          status: 'approved',
          comment: 'Approved! Verified on production deployment at https://novaforge-urban-flood.vercel.app. Radar tiles render with 60 FPS.',
        },
      ],
      labels: [
        { name: 'enhancement', color: '#a2eeef' },
        { name: 'academic-milestone', color: '#0e8a16' },
      ],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-31T09:00:00Z',
      updatedAt: '2026-11-01T15:00:00Z',
      commitsCount: 3,
      changedFilesCount: 2,
      additions: 124,
      deletions: 14,
      checks: [
        { name: 'vercel-build', status: 'passed', duration: '48s', description: 'Vercel preview deployed successfully' },
        { name: 'maplibre-render-test', status: 'passed', duration: '1m 15s', description: 'All tile layers verified' },
        { name: 'gemini-nowcast-audit', status: 'passed', duration: '32s', description: 'Zero prompt security risks' },
      ],
      diffFiles: [
        {
          filename: 'src/components/Map/FloodMap.tsx',
          additions: 86,
          deletions: 8,
          chunks: [
            {
              header: '@@ -12,8 +12,24 @@ export const FloodMap',
              lines: [
                { type: 'context', oldLineNo: 12, newLineNo: 12, content: 'export const FloodMap: React.FC<FloodMapProps> = ({ rainfallMm }) => {' },
                { type: 'delete', oldLineNo: 13, content: '-  // Mock canvas rendering' },
                { type: 'add', newLineNo: 13, content: '+  // Connected to live Vercel telemetry gateway' },
                { type: 'add', newLineNo: 14, content: '+  const isochroneSource = generateIsochroneGeoJSON(rainfallMm);' },
                { type: 'context', oldLineNo: 14, newLineNo: 15, content: '  return (' },
              ],
            },
          ],
        },
      ],
      aiReview: {
        qualityScore: 98,
        securityNotes: 'Map tile endpoints properly sanitized. GeoJSON bounds verified. No memory leaks detected on MapLibre unmount.',
        performanceNotes: 'Web worker handles isochrone geometry calculations off the main UI thread.',
        approvalComment: '✨ **Gemini AI Review**: Code architecture adheres strictly to GitFlow and SIH26085 standards. Live website at https://novaforge-urban-flood.vercel.app verified. Ready to merge!',
      },
    },
    {
      id: 4,
      title: 'chore(sih): initial SIH26085 project scaffolding and MapLibre integration',
      body: 'Initial release with Vite, React 19, and Vercel edge deployment configuration.',
      state: 'merged',
      sourceBranch: 'feature/initial-setup',
      targetBranch: 'main',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      reviewers: [{ user: TEAM_MEMBERS.sathwik, status: 'approved', comment: 'Approved.' }],
      labels: [{ name: 'documentation', color: '#0075ca' }],
      milestone: 'Sprint 1 - Foundations',
      createdAt: '2026-09-10T10:00:00Z',
      updatedAt: '2026-09-12T11:30:00Z',
      commitsCount: 2,
      changedFilesCount: 4,
      additions: 380,
      deletions: 0,
      checks: [{ name: 'build', status: 'passed', duration: '40s', description: 'Passed' }],
      diffFiles: [],
    },
  ],
  'PBL-privacy-shield': [
    {
      id: 2,
      title: 'feat(masking): server-side data sanitization before HTTP response dispatch',
      body: 'Ensures masked data is never leaked in raw JSON payloads to prevent inspect-element bypass.',
      state: 'open',
      sourceBranch: 'feature/rbac-masking',
      targetBranch: 'develop',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      reviewers: [{ user: TEAM_MEMBERS.sathwik, status: 'approved', comment: 'Security verified.' }],
      labels: [{ name: 'security', color: '#b60205' }],
      milestone: 'Assignment 41 Final Submission',
      createdAt: '2026-10-27T10:00:00Z',
      updatedAt: '2026-10-29T12:00:00Z',
      commitsCount: 1,
      changedFilesCount: 1,
      additions: 65,
      deletions: 4,
      checks: [{ name: 'security-audit', status: 'passed', duration: '20s', description: 'Passed' }],
      diffFiles: [],
    },
  ],
  'smart-campus-portal': [
    {
      id: 14,
      title: 'feat(auth): implement student JWT session rotation with Redis blacklist',
      body: `## Summary of Changes
- Implements refresh token rotation to prevent token replay attacks.
- Configures Redis TTL key expiration for instant session revocation upon password change.
- Enforces strict TypeScript interface types for student department claims.

## Testing & Quality Validation
- [x] Unit test suite covering \`generateTokenPair\` and \`revokeToken\` passing.
- [x] Linting and TypeScript strict check pass without warnings.
- [x] Tested against simulated Redis disconnection with graceful degradation.

Closes #42. Requesting review from @sathwik-dev.`,
      state: 'open',
      sourceBranch: 'feature/auth-jwt',
      targetBranch: 'develop',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      reviewers: [
        {
          user: TEAM_MEMBERS.sathwik,
          status: 'approved',
          comment: 'LGTM! Clean Redis TTL integration and error boundaries. Approved for develop merge.',
        },
      ],
      labels: [
        { name: 'security', color: '#b60205' },
        { name: 'enhancement', color: '#a2eeef' },
      ],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-30T14:00:00Z',
      updatedAt: '2026-10-31T17:20:00Z',
      commitsCount: 3,
      changedFilesCount: 2,
      additions: 142,
      deletions: 18,
      checks: [
        {
          name: 'validate (ubuntu-latest, Node 20.x)',
          status: 'passed',
          duration: '1m 24s',
          description: 'Lint and TypeScript type checks completed successfully.',
        },
        {
          name: 'unit-tests (Vitest)',
          status: 'passed',
          duration: '2m 10s',
          description: '28 / 28 unit tests passed with 94.2% statement coverage.',
        },
        {
          name: 'gemini-security-audit',
          status: 'passed',
          duration: '42s',
          description: 'Zero high/critical security vulnerabilities detected.',
        },
        {
          name: 'preview-deployment',
          status: 'passed',
          duration: '55s',
          description: 'Preview deployed at https://ais-dev-portal.run.app',
        },
      ],
      diffFiles: [
        {
          filename: 'src/auth/jwt.ts',
          additions: 114,
          deletions: 12,
          chunks: [
            {
              header: '@@ -12,14 +12,32 @@ export interface StudentPayload {',
              lines: [
                { type: 'context', oldLineNo: 12, newLineNo: 12, content: 'export interface StudentPayload {' },
                { type: 'context', oldLineNo: 13, newLineNo: 13, content: '  studentId: string;' },
                { type: 'delete', oldLineNo: 14, content: '-  role: string;' },
                { type: 'add', newLineNo: 14, content: '+  role: "student" | "ta" | "professor" | "admin";' },
                { type: 'add', newLineNo: 15, content: '+  department: string;' },
                { type: 'context', oldLineNo: 15, newLineNo: 16, content: '}' },
                { type: 'context', oldLineNo: 16, newLineNo: 17, content: '' },
                { type: 'add', newLineNo: 18, content: '+export async function generateTokenPair(payload: StudentPayload) {' },
                { type: 'add', newLineNo: 19, content: '+  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });' },
                { type: 'add', newLineNo: 20, content: '+  const refreshToken = jwt.sign({ studentId: payload.studentId }, REFRESH_SECRET, { expiresIn: "7d" });' },
                { type: 'add', newLineNo: 21, content: '+  await redisClient.setEx(`refresh:${payload.studentId}`, 7 * 86400, refreshToken);' },
                { type: 'add', newLineNo: 22, content: '+  return { accessToken, refreshToken };' },
                { type: 'add', newLineNo: 23, content: '+}' },
              ],
            },
          ],
        },
        {
          filename: 'tests/auth.test.ts',
          additions: 28,
          deletions: 6,
          chunks: [
            {
              header: '@@ -1,6 +1,28 @@ import { describe, it, expect } from "vitest";',
              lines: [
                { type: 'context', oldLineNo: 1, newLineNo: 1, content: 'import { describe, it, expect } from "vitest";' },
                { type: 'add', newLineNo: 2, content: '+import { generateTokenPair, revokeToken } from "../src/auth/jwt";' },
                { type: 'add', newLineNo: 3, content: '+describe("Student Auth Session Rotation", () => {' },
                { type: 'add', newLineNo: 4, content: '+  it("should generate valid access and refresh token pair", async () => {' },
                { type: 'add', newLineNo: 5, content: '+    const tokens = await generateTokenPair({ studentId: "s101", email: "s@campus.edu", role: "student", department: "CS" });' },
                { type: 'add', newLineNo: 6, content: '+    expect(tokens.accessToken).toBeDefined();' },
                { type: 'add', newLineNo: 7, content: '+    expect(tokens.refreshToken).toBeDefined();' },
                { type: 'add', newLineNo: 8, content: '+  });' },
                { type: 'add', newLineNo: 9, content: '+});' },
              ],
            },
          ],
        },
      ],
      aiReview: {
        qualityScore: 96,
        securityNotes: 'Excellent token rotation pattern. Redis TTL aligns with 7-day refresh interval. Cryptographic signatures use HS256 with strong secrets.',
        performanceNotes: 'Redis setEx is O(1) memory complexity. Low latency overhead (<2ms).',
        approvalComment: '✨ **Gemini AI Review**: Code architecture adheres strictly to GitFlow and Primer standards. All 4 CI checks passed. Ready to merge.',
      },
    },
    {
      id: 12,
      title: 'feat(dining): integrate WebSocket gateway for live campus occupancy counter',
      body: `## Summary of Changes
- Connects dining hall occupancy sensors to Socket.IO room subscriptions.
- Displays live student count with Primer status badges (Low, Moderate, Full).

Reviewed and tested by @abhinav-lead.`,
      state: 'open',
      sourceBranch: 'feature/dining-socket',
      targetBranch: 'develop',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.sathwik],
      reviewers: [
        {
          user: TEAM_MEMBERS.abhinav,
          status: 'approved',
          comment: 'Approved! Tested real-time connection failover and memory leak checks. Great work Sathwik.',
        },
      ],
      labels: [{ name: 'enhancement', color: '#a2eeef' }],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-28T16:00:00Z',
      updatedAt: '2026-10-30T11:00:00Z',
      commitsCount: 2,
      changedFilesCount: 1,
      additions: 89,
      deletions: 4,
      checks: [
        { name: 'validate', status: 'passed', duration: '1m 10s', description: 'Passed' },
        { name: 'unit-tests', status: 'passed', duration: '1m 45s', description: 'Passed' },
      ],
      diffFiles: [
        {
          filename: 'src/server.ts',
          additions: 89,
          deletions: 4,
          chunks: [
            {
              header: '@@ -18,4 +18,22 @@ io.on("connection", (socket) => {',
              lines: [
                { type: 'context', oldLineNo: 18, newLineNo: 18, content: 'io.on("connection", (socket) => {' },
                { type: 'add', newLineNo: 19, content: '+  socket.on("dining:subscribe", (hallId) => {' },
                { type: 'add', newLineNo: 20, content: '+    socket.join(`dining:${hallId}`);' },
                { type: 'add', newLineNo: 21, content: '+  });' },
                { type: 'context', oldLineNo: 19, newLineNo: 22, content: '});' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 9,
      title: 'docs(spec): add Capstone project proposal and grading rubric matrix',
      body: 'Official academic deliverable covering milestone timeline and Git hygiene rules.',
      state: 'merged',
      sourceBranch: 'feature/proposal-docs',
      targetBranch: 'main',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav, TEAM_MEMBERS.sathwik],
      reviewers: [
        {
          user: TEAM_MEMBERS.sathwik,
          status: 'approved',
          comment: 'Approved.',
        },
      ],
      labels: [{ name: 'documentation', color: '#0075ca' }],
      milestone: 'Sprint 1 - Foundations',
      createdAt: '2026-10-12T10:00:00Z',
      updatedAt: '2026-10-14T15:00:00Z',
      commitsCount: 1,
      changedFilesCount: 1,
      additions: 150,
      deletions: 0,
      checks: [{ name: 'markdown-lint', status: 'passed', duration: '12s', description: 'Passed' }],
      diffFiles: [],
    },
  ],
  'neuro-scan-ai': [
    {
      id: 6,
      title: 'feat(model): implement 3D spatial attention gating block in Attention U-Net',
      body: 'Integrates soft attention mechanism to suppress irrelevant regions in brain MRI volumes.',
      state: 'open',
      sourceBranch: 'feature/attention-unet',
      targetBranch: 'develop',
      author: TEAM_MEMBERS.sathwik,
      assignees: [TEAM_MEMBERS.sathwik],
      reviewers: [
        {
          user: TEAM_MEMBERS.abhinav,
          status: 'approved',
          comment: 'Tensor shapes verified. Excellent mathematical formulation.',
        },
      ],
      labels: [{ name: 'enhancement', color: '#a2eeef' }],
      milestone: 'Midterm Evaluation',
      createdAt: '2026-10-29T10:00:00Z',
      updatedAt: '2026-10-31T11:00:00Z',
      commitsCount: 4,
      changedFilesCount: 2,
      additions: 180,
      deletions: 12,
      checks: [
        { name: 'pytorch-test', status: 'passed', duration: '3m 12s', description: 'Passed' },
      ],
      diffFiles: [],
    },
  ],
  'distributed-raft-kv': [
    {
      id: 8,
      title: 'feat(raft): implement randomized election timeout backoff to avoid split votes',
      body: 'Heartbeat interval set to 150ms, election timeout randomly chosen between 150ms - 300ms.',
      state: 'open',
      sourceBranch: 'feature/leader-election',
      targetBranch: 'develop',
      author: TEAM_MEMBERS.abhinav,
      assignees: [TEAM_MEMBERS.abhinav],
      reviewers: [
        {
          user: TEAM_MEMBERS.sathwik,
          status: 'approved',
          comment: 'Jepsen split-brain simulation passed cleanly with 0 stale reads.',
        },
      ],
      labels: [{ name: 'enhancement', color: '#a2eeef' }],
      milestone: 'Sprint 2 - Core Engine',
      createdAt: '2026-10-30T09:00:00Z',
      updatedAt: '2026-10-31T14:00:00Z',
      commitsCount: 2,
      changedFilesCount: 1,
      additions: 95,
      deletions: 14,
      checks: [
        { name: 'go-test', status: 'passed', duration: '45s', description: 'Passed' },
      ],
      diffFiles: [],
    },
  ],
  'ecoride-campus': [],
};

export const MOCK_KANBAN_CARDS: Record<string, KanbanCard[]> = {
  'novaforge-urban-flood': [
    {
      id: 'kb-nf-1',
      title: '1D-2D coupled hydrodynamic drainage and rainfall nowcasting',
      columnId: 'in_progress',
      issueNumber: 14,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['sih26085', 'hydrology'],
      milestone: 'SIH Final Defense',
      estimatePoints: 13,
    },
    {
      id: 'kb-nf-2',
      title: 'Stream sensor storm drainage metrics via MapLibre GL radar',
      columnId: 'in_review',
      prNumber: 8,
      issueNumber: 11,
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'high',
      labels: ['maplibre', 'radar'],
      milestone: 'Sprint 2 - Core Engine',
      estimatePoints: 8,
    },
    {
      id: 'kb-nf-3',
      title: 'Configure Vercel edge deployment at novaforge-urban-flood.vercel.app',
      columnId: 'done',
      issueNumber: 7,
      prNumber: 4,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'high',
      labels: ['devops', 'vercel'],
      milestone: 'Sprint 1 - Foundations',
      estimatePoints: 5,
    },
    {
      id: 'kb-nf-4',
      title: 'Automated Gemini emergency broadcast sirens for municipal flood zones',
      columnId: 'todo',
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['ai', 'emergency'],
      milestone: 'SIH Final Defense',
      estimatePoints: 8,
    },
  ],
  'PBL-privacy-shield': [
    {
      id: 'kb-pbl-1',
      title: 'Role-based access control (RBAC) server-side data masking',
      columnId: 'in_progress',
      issueNumber: 5,
      prNumber: 2,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['security', 'masking'],
      milestone: 'Assignment 41 Final Submission',
      estimatePoints: 8,
    },
    {
      id: 'kb-pbl-2',
      title: '15-second temporary auto-hide timeout with progress indicator',
      columnId: 'todo',
      issueNumber: 3,
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'high',
      labels: ['ui', 'privacy'],
      milestone: 'Assignment 41 Final Submission',
      estimatePoints: 5,
    },
  ],
  'smart-campus-portal': [
    {
      id: 'kb-1',
      title: 'Implement token bucket rate limiting on /api/v1/login',
      columnId: 'in_progress',
      issueNumber: 42,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['security', 'p0-blocker'],
      milestone: 'Sprint 2 - Core Engine',
      estimatePoints: 5,
    },
    {
      id: 'kb-2',
      title: 'Design Primer-compliant dining hall occupancy visualizer with WebSockets',
      columnId: 'in_review',
      issueNumber: 39,
      prNumber: 12,
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'high',
      labels: ['enhancement', 'ui'],
      milestone: 'Sprint 2 - Core Engine',
      estimatePoints: 8,
    },
    {
      id: 'kb-3',
      title: 'Student JWT session rotation with Redis blacklist',
      columnId: 'in_review',
      prNumber: 14,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['security', 'auth'],
      milestone: 'Sprint 2 - Core Engine',
      estimatePoints: 5,
    },
    {
      id: 'kb-4',
      title: 'Configure automated PostgreSQL database snapshot backups to S3',
      columnId: 'todo',
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'medium',
      labels: ['devops', 'infra'],
      milestone: 'Sprint 3 - Polish & Defense',
      estimatePoints: 3,
    },
    {
      id: 'kb-5',
      title: 'Implement biometric WebAuthn passkey login for campus iOS app',
      columnId: 'backlog',
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'low',
      labels: ['feature', 'mobile'],
      milestone: 'Sprint 3 - Polish & Defense',
      estimatePoints: 8,
    },
    {
      id: 'kb-6',
      title: 'System Architecture & Threat Model Dossier for Midterm Defense',
      columnId: 'done',
      issueNumber: 35,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'high',
      labels: ['documentation', 'academic-milestone'],
      milestone: 'Midterm Evaluation',
      estimatePoints: 5,
    },
    {
      id: 'kb-7',
      title: 'CORS patch for WebSocket handshake in staging environment',
      columnId: 'done',
      issueNumber: 31,
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'high',
      labels: ['bug', 'hotfix'],
      milestone: 'Sprint 1 - Foundations',
      estimatePoints: 2,
    },
  ],
  'neuro-scan-ai': [
    {
      id: 'kb-n1',
      title: '3D Spatial Attention Gating Block in Attention U-Net',
      columnId: 'in_review',
      prNumber: 6,
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'critical',
      labels: ['ml', 'pytorch'],
      milestone: 'Midterm Evaluation',
      estimatePoints: 8,
    },
    {
      id: 'kb-n2',
      title: 'Generalized 3D Dice Loss with Focal Penalty',
      columnId: 'in_progress',
      issueNumber: 18,
      assignee: TEAM_MEMBERS.sathwik,
      priority: 'high',
      labels: ['loss-fn', 'mlops'],
      milestone: 'Midterm Evaluation',
      estimatePoints: 5,
    },
    {
      id: 'kb-n3',
      title: 'TensorRT FP16 quantization inference pipeline on A100 GPU',
      columnId: 'todo',
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'medium',
      labels: ['optimization', 'gpu'],
      milestone: 'Sprint 3 - Polish & Defense',
      estimatePoints: 8,
    },
  ],
  'distributed-raft-kv': [
    {
      id: 'kb-r1',
      title: 'Randomized election timeout backoff',
      columnId: 'in_review',
      prNumber: 8,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['consensus', 'raft'],
      milestone: 'Sprint 2 - Core Engine',
      estimatePoints: 8,
    },
    {
      id: 'kb-r2',
      title: 'Handle split votes with exponential jittered election timer',
      columnId: 'in_progress',
      issueNumber: 24,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'critical',
      labels: ['raft'],
      milestone: 'Sprint 2 - Core Engine',
      estimatePoints: 5,
    },
  ],
  'ecoride-campus': [
    {
      id: 'kb-e1',
      title: 'Zero-knowledge proof student enrollment check',
      columnId: 'todo',
      issueNumber: 12,
      assignee: TEAM_MEMBERS.abhinav,
      priority: 'high',
      labels: ['zkp', 'privacy'],
      milestone: 'Sprint 1 - Foundations',
      estimatePoints: 13,
    },
  ],
};

export const MOCK_ACTIONS_RUNS: Record<string, ActionRun[]> = {
  'novaforge-urban-flood': [
    {
      id: 'run-nf-01',
      name: 'Vercel Production Deployment & MapLibre Verification',
      event: 'push',
      status: 'success',
      branch: 'main',
      commitSha: '6e2f18a',
      commitMessage: 'feat(deploy): automated production deployment to https://novaforge-urban-flood.vercel.app',
      author: TEAM_MEMBERS.abhinav,
      startedAt: '45 mins ago',
      duration: '1m 42s',
      steps: [
        {
          name: 'Vercel CLI Production Deploy',
          status: 'completed',
          duration: '38s',
          logs: [
            'Building project for Vercel Edge Network...',
            'Compiling TypeScript modules and MapLibre assets...',
            'Generated static and serverless edge functions: 14',
            '✓ Deployment Live: https://novaforge-urban-flood.vercel.app',
          ],
        },
        {
          name: 'MapLibre GL Radar Tile Integration Test',
          status: 'completed',
          duration: '24s',
          logs: [
            'Fetching storm drain geometry vectors...',
            'Precipitation isochrone render test: 60 FPS verified',
            '✓ Geospatial test suite passed',
          ],
        },
        {
          name: 'Gemini 3.8 Flash Emergency Alert Pipeline Test',
          status: 'completed',
          duration: '18s',
          logs: [
            'Simulating 75mm/hr extreme cloudburst scenario...',
            'Gemini severity triage score: 98/100 (HIGH ALERT)',
            'Dispatched automated emergency SMS template to municipal authorities',
          ],
        },
      ],
    },
    {
      id: 'run-nf-02',
      name: 'Hydrodynamic 1D-2D Matrix Scan',
      event: 'pull_request',
      status: 'success',
      branch: 'feature/coupled-hydrodynamics',
      commitSha: '8d41a0e',
      commitMessage: 'feat(hydrology): implement 1D-2D coupled hydrodynamic drainage and rainfall nowcasting',
      author: TEAM_MEMBERS.abhinav,
      startedAt: '3 hours ago',
      duration: '3m 10s',
      steps: [
        {
          name: 'Coupled Hydrodynamics Solver Validation',
          status: 'completed',
          duration: '2m 10s',
          logs: ['Manning-Strickler equation convergence: 0.002s', 'Zero mass conservation error detected'],
        },
      ],
    },
  ],
  'PBL-privacy-shield': [
    {
      id: 'run-pbl-01',
      name: 'Data Privacy Masking & RBAC Audit',
      event: 'push',
      status: 'success',
      branch: 'main',
      commitSha: '2c918fa',
      commitMessage: 'feat(masking): server-side regex transformation for PII fields',
      author: TEAM_MEMBERS.abhinav,
      startedAt: '1 day ago',
      duration: '1m 12s',
      steps: [
        {
          name: 'PII Leak Prevention Scanner',
          status: 'completed',
          duration: '32s',
          logs: ['Scanning HTTP responses for unmasked SSNs/emails...', '0 plaintext exposures detected'],
        },
      ],
    },
  ],
  'smart-campus-portal': [
    {
      id: 'run-108',
      name: 'GitFlow CI / CD Automated Verification',
      event: 'pull_request',
      status: 'success',
      branch: 'feature/auth-jwt',
      commitSha: '9f2a41d',
      commitMessage: 'feat(auth): implement student JWT session rotation with Redis blacklist',
      author: TEAM_MEMBERS.abhinav,
      startedAt: '12 minutes ago',
      duration: '4m 12s',
      steps: [
        {
          name: 'Set up job and runner environment',
          status: 'completed',
          duration: '4s',
          logs: [
            'Operating System: Ubuntu 24.04.1 LTS',
            'Virtual Environment: GitHub Hosted Linux Runner 8-core x86_64',
            'Resolving runner secret tokens for Gemini API & GitHub PAT...',
          ],
        },
        {
          name: 'Run actions/checkout@v4',
          status: 'completed',
          duration: '8s',
          logs: [
            'Syncing repository: abhimax1017/smart-campus-portal',
            'Fetching remote refs/pull/14/head...',
            'HEAD is now at 9f2a41d (feat(auth): implement student JWT session rotation)',
          ],
        },
        {
          name: 'Setup Node.js 20.x environment',
          status: 'completed',
          duration: '6s',
          logs: ['Found in cache: /opt/hostedtoolcache/node/20.12.0/x64', 'Node.js version: v20.12.0', 'npm version: 10.5.0'],
        },
        {
          name: 'Install dependencies (npm ci)',
          status: 'completed',
          duration: '32s',
          logs: [
            'added 648 packages in 28s',
            'audit check: 0 vulnerabilities found',
          ],
        },
        {
          name: 'Run ESLint & TypeScript strict compile check',
          status: 'completed',
          duration: '18s',
          logs: [
            '$ tsc --noEmit',
            '$ eslint src/ --ext .ts,.tsx',
            '✓ 42 files checked, 0 errors, 0 warnings',
          ],
        },
        {
          name: 'Execute Vitest Unit & Integration Test Suite',
          status: 'completed',
          duration: '1m 24s',
          logs: [
            ' ✓ tests/auth.test.ts (6 tests) [passed]',
            ' ✓ tests/dining.test.ts (4 tests) [passed]',
            ' ✓ tests/schedule.test.ts (8 tests) [passed]',
            ' ✓ tests/security.test.ts (10 tests) [passed]',
            '-------------------|---------|----------|---------|---------|',
            'File               | % Stmts | % Branch | % Funcs | % Lines |',
            '-------------------|---------|----------|---------|---------|',
            'All files          |   94.22 |    89.47 |   95.12 |   94.18 |',
            ' src/auth/jwt.ts   |   96.15 |    90.00 |  100.00 |   96.15 |',
            ' src/server.ts     |   92.30 |    87.50 |   90.90 |   92.30 |',
            '-------------------|---------|----------|---------|---------|',
          ],
        },
        {
          name: 'Gemini AI Security & Git Hygiene Audit',
          status: 'completed',
          duration: '40s',
          logs: [
            'Connecting to Gemini 3.8 Flash model via aistudio-build proxy...',
            'Evaluating conventional commit conformance: 100% compliant (feat:, fix:, docs:)',
            'Static AST vulnerability analysis: No SQL injection or token leakage paths found.',
            '✓ GitFlow Academic Standards: PASSED (Grade A+)',
          ],
        },
        {
          name: 'Deploy Preview to Google Cloud Run',
          status: 'completed',
          duration: '1m 00s',
          logs: [
            'Building container image: gcr.io/academic-capstone/smart-campus:9f2a41d',
            'Deploying revision to Cloud Run service [smart-campus-preview]...',
            'Service URL: https://ais-dev-portal.run.app',
            'Routing 100% traffic to revision smart-campus-00042-xyz',
          ],
        },
      ],
    },
    {
      id: 'run-107',
      name: 'GitFlow CI / CD Automated Verification',
      event: 'push',
      status: 'success',
      branch: 'develop',
      commitSha: '4c81a2e',
      commitMessage: 'feat(server): mount campus dining websocket gateway',
      author: TEAM_MEMBERS.sathwik,
      startedAt: '5 hours ago',
      duration: '3m 48s',
      steps: [
        { name: 'Set up job', status: 'completed', duration: '5s', logs: ['Runner initialized'] },
        { name: 'Run lint and tests', status: 'completed', duration: '2m 15s', logs: ['All 26 tests passed'] },
        { name: 'Deploy to Staging', status: 'completed', duration: '1m 28s', logs: ['Staging deployment live'] },
      ],
    },
    {
      id: 'run-106',
      name: 'Scheduled Nightly Security Audit & Dependency Check',
      event: 'workflow_dispatch',
      status: 'success',
      branch: 'main',
      commitSha: '8d390ab',
      commitMessage: 'chore(deps): nightly automated dependency vulnerability scan',
      author: TEAM_MEMBERS.abhinav,
      startedAt: '1 day ago',
      duration: '2m 14s',
      steps: [
        { name: 'npm audit and snyk security scan', status: 'completed', duration: '2m 14s', logs: ['0 high or critical CVEs detected'] },
      ],
    },
  ],
  'neuro-scan-ai': [
    {
      id: 'run-n1',
      name: 'PyTorch 3D Attention U-Net Validation & GPU Benchmark',
      event: 'pull_request',
      status: 'success',
      branch: 'feature/attention-unet',
      commitSha: '7e2b9c1',
      commitMessage: 'feat(model): implement 3D spatial attention gating block',
      author: TEAM_MEMBERS.sathwik,
      startedAt: '1 day ago',
      duration: '6m 20s',
      steps: [
        { name: 'Setup CUDA 12.2 environment', status: 'completed', duration: '45s', logs: ['NVIDIA Driver 535.129.03, CUDA 12.2 active'] },
        { name: 'Run BraTS 2024 validation dataset sample', status: 'completed', duration: '4m 30s', logs: ['Dice score: 0.912 on validation slice batch'] },
      ],
    },
  ],
  'distributed-raft-kv': [
    {
      id: 'run-r1',
      name: 'Jepsen Split-Brain Chaos Mesh Simulation',
      event: 'push',
      status: 'success',
      branch: 'develop',
      commitSha: '3a1f89d',
      commitMessage: 'feat(raft): implement randomized election timeout backoff',
      author: TEAM_MEMBERS.abhinav,
      startedAt: '2 days ago',
      duration: '5m 10s',
      steps: [
        { name: 'Simulate 5-node cluster partition', status: 'completed', duration: '3m 40s', logs: ['Leader isolated, term advanced to 4, new leader elected without stale writes'] },
      ],
    },
  ],
  'ecoride-campus': [],
};

// Generate 52 weeks (364 days) of realistic commit activity
export function generate52WeekHeatmap(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date('2026-11-01T09:44:46Z');
  
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday

    // Bias higher activity on weekdays and in recent sprint weeks
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let count = 0;
    const random = Math.random();

    if (i < 40) {
      // Recent intense sprint
      count = isWeekend ? (random > 0.4 ? Math.floor(random * 6) + 1 : 0) : Math.floor(random * 12) + 2;
    } else if (i < 120) {
      // Midterm period
      count = isWeekend ? (random > 0.6 ? Math.floor(random * 4) : 0) : Math.floor(random * 9);
    } else {
      // Earlier foundation
      count = random > 0.4 ? Math.floor(random * 6) : 0;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 8) level = 4;
    else if (count >= 5) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;

    days.push({
      date: dateStr,
      count,
      level,
    });
  }
  return days;
}

export const ACADEMIC_RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'rubric-1',
    category: 'GitFlow & Branching Discipline',
    name: 'Strict Feature Branch Isolation',
    weight: 20,
    maxScore: 20,
    earnedScore: 20,
    status: 'passed',
    details: '100% of commits developed on feature/* branches; zero direct commits to main or develop.',
  },
  {
    id: 'rubric-2',
    category: 'GitFlow & Branching Discipline',
    name: 'Conventional Commit Format Compliance',
    weight: 15,
    maxScore: 15,
    earnedScore: 14.8,
    status: 'passed',
    details: '98.7% conventional commit compliance (feat:, fix:, docs:, perf:, test:).',
  },
  {
    id: 'rubric-3',
    category: 'Code Quality & Peer Review',
    name: 'Mandatory Two-Person Peer Code Review',
    weight: 25,
    maxScore: 25,
    earnedScore: 25,
    status: 'passed',
    details: 'All Pull Requests strictly require approving review from opposite engineering partner (Abhinav <-> Sathwik).',
  },
  {
    id: 'rubric-4',
    category: 'Automated Testing & CI/CD',
    name: 'Automated Unit Test Coverage (>85%)',
    weight: 20,
    maxScore: 20,
    earnedScore: 19.5,
    status: 'passed',
    details: 'Current suite achieves 94.2% statement coverage verified by automated Vitest matrix.',
  },
  {
    id: 'rubric-5',
    category: 'Security & DevOps',
    name: 'Automated SAST & Secret Leak Scanner',
    weight: 10,
    maxScore: 10,
    earnedScore: 10,
    status: 'passed',
    details: 'GitHub Actions workflow runs Gemini SAST analysis on every PR; 0 CVEs detected.',
  },
  {
    id: 'rubric-6',
    category: 'Project Tracking & Agile',
    name: 'Sprint Backlog & Kanban Traceability',
    weight: 10,
    maxScore: 10,
    earnedScore: 9.2,
    status: 'passed',
    details: 'Every commit and PR links directly to an active Issue in GitHub Projects V2.',
  },
];
