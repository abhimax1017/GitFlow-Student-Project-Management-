import React from 'react';
import {
  LayoutGrid,
  Plus,
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Milestone as MilestoneIcon,
  Layers,
} from 'lucide-react';
import { KanbanCard, AcademicRepo, UserPersona } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockData';

interface ProjectsTabProps {
  repo: AcademicRepo;
  cards: KanbanCard[];
  currentPersona: UserPersona;
  onUpdateCards: (cards: KanbanCard[]) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  repo,
  cards,
  currentPersona,
  onUpdateCards,
}) => {
  const [filterAssignee, setFilterAssignee] = React.useState<'all' | 'abhinav-lead' | 'sathwik-dev'>('all');
  const [filterPriority, setFilterPriority] = React.useState<string>('all');
  const [showAddModal, setShowAddModal] = React.useState(false);

  // New item inputs
  const [newTitle, setNewTitle] = React.useState('');
  const [newCol, setNewCol] = React.useState<KanbanCard['columnId']>('todo');
  const [newPriority, setNewPriority] = React.useState<KanbanCard['priority']>('high');
  const [newEstimate, setNewEstimate] = React.useState<number>(5);

  const columns: { id: KanbanCard['columnId']; title: string; color: string }[] = [
    { id: 'backlog', title: 'Backlog', color: '#848d97' },
    { id: 'todo', title: 'To Do', color: '#58a6ff' },
    { id: 'in_progress', title: 'In Progress', color: '#d29922' },
    { id: 'in_review', title: 'In Review', color: '#8957e5' },
    { id: 'done', title: 'Done', color: '#238636' },
  ];

  const filteredCards = cards.filter((card) => {
    if (filterAssignee !== 'all' && card.assignee.id !== filterAssignee) return false;
    if (filterPriority !== 'all' && card.priority !== filterPriority) return false;
    return true;
  });

  const totalPoints = cards.reduce((acc, c) => acc + (c.estimatePoints || 0), 0);
  const donePoints = cards
    .filter((c) => c.columnId === 'done')
    .reduce((acc, c) => acc + (c.estimatePoints || 0), 0);
  const completionPercent = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;

  // Move card left or right
  const moveCard = (cardId: string, direction: 'prev' | 'next') => {
    const colOrder: KanbanCard['columnId'][] = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];
    const updated = cards.map((card) => {
      if (card.id === cardId) {
        const curIdx = colOrder.indexOf(card.columnId);
        const nextIdx = direction === 'next' ? Math.min(curIdx + 1, colOrder.length - 1) : Math.max(curIdx - 1, 0);
        return { ...card, columnId: colOrder[nextIdx] };
      }
      return card;
    });
    onUpdateCards(updated);
  };

  const handleAddNewCard = () => {
    if (!newTitle.trim()) return;
    const newCard: KanbanCard = {
      id: `kb-${Date.now()}`,
      title: newTitle.trim(),
      columnId: newCol,
      priority: newPriority,
      assignee: currentPersona,
      milestone: 'Sprint 2 - Core Engine',
      labels: ['feature', 'gitflow'],
      estimatePoints: newEstimate,
    };
    onUpdateCards([...cards, newCard]);
    setShowAddModal(false);
    setNewTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-[#e6edf3]">
      {/* Top Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              GitHub Projects V2: Academic Capstone Sprint Board
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] font-mono border border-[#238636]/40">
              Active Sprint
            </span>
          </div>
          <div className="text-[#848d97] text-[11px]">
            GitFlow Kanban synchronization with automated PR linkage
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 bg-[#161b22] px-3 py-1.5 rounded-md border border-[#30363d]">
          <div className="text-[11px] text-[#848d97]">
            Sprint Velocity:{' '}
            <strong className="text-[#e6edf3]">
              {donePoints} / {totalPoints} pts
            </strong>{' '}
            ({completionPercent}%)
          </div>
          <div className="w-24 h-2 bg-[#21262d] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#238636] transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 p-2.5 rounded-md bg-[#161b22] border border-[#30363d]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#848d97]">
            <Filter className="w-3.5 h-3.5" />
            <span>Assignee:</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterAssignee('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                filterAssignee === 'all'
                  ? 'bg-[#1f6feb] text-white'
                  : 'bg-[#21262d] text-[#848d97] hover:text-[#e6edf3]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterAssignee('abhinav-lead')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                filterAssignee === 'abhinav-lead'
                  ? 'bg-[#1f6feb] text-white'
                  : 'bg-[#21262d] text-[#848d97] hover:text-[#e6edf3]'
              }`}
            >
              @abhinav-lead
            </button>
            <button
              onClick={() => setFilterAssignee('sathwik-dev')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                filterAssignee === 'sathwik-dev'
                  ? 'bg-[#1f6feb] text-white'
                  : 'bg-[#21262d] text-[#848d97] hover:text-[#e6edf3]'
              }`}
            >
              @sathwik-dev
            </button>
          </div>

          <div className="h-4 w-[1px] bg-[#30363d]" />

          <div className="flex items-center gap-1.5 text-[#848d97]">
            <span>Priority:</span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-[#21262d] border border-[#30363d] rounded px-2 py-0.5 text-[11px] text-[#e6edf3]"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#238636] hover:bg-[#2ea043] text-white font-semibold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add card</span>
        </button>
      </div>

      {/* Kanban 5 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-start">
        {columns.map((col, cIdx) => {
          const colCards = filteredCards.filter((c) => c.columnId === col.id);
          const colPoints = colCards.reduce((acc, c) => acc + (c.estimatePoints || 0), 0);

          return (
            <div
              key={col.id}
              className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="p-2.5 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="font-semibold text-xs text-[#e6edf3]">{col.title}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#21262d] text-[#848d97] text-[10px] font-mono">
                    {colCards.length}
                  </span>
                </div>
                <span className="text-[10px] text-[#848d97] font-mono">{colPoints} pts</span>
              </div>

              {/* Cards Container */}
              <div className="p-2 space-y-2 flex-1">
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff]/50 transition shadow-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-xs text-[#e6edf3] leading-snug">
                        {card.title}
                      </span>
                      {card.issueNumber && (
                        <span className="text-[10px] font-mono text-[#848d97] shrink-0">
                          #{card.issueNumber}
                        </span>
                      )}
                      {card.prNumber && (
                        <span className="text-[10px] font-mono text-[#8957e5] shrink-0">
                          !{card.prNumber}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          card.priority === 'critical'
                            ? 'bg-[#da3633]/20 text-[#f85149]'
                            : card.priority === 'high'
                            ? 'bg-[#d29922]/20 text-[#d29922]'
                            : 'bg-[#21262d] text-[#848d97]'
                        }`}
                      >
                        {card.priority}
                      </span>

                      {card.estimatePoints && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#21262d] text-[#58a6ff]">
                          {card.estimatePoints} pts
                        </span>
                      )}

                      <span className="text-[9px] text-[#848d97] truncate max-w-[90px]">
                        {card.milestone.split('-')[0]}
                      </span>
                    </div>

                    {/* Bottom row: Assignee avatar & Move arrows */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#21262d]">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={card.assignee.avatar}
                          alt={card.assignee.name}
                          className="w-4 h-4 rounded-full object-cover"
                          title={`Assigned to @${card.assignee.username}`}
                        />
                        <span className="text-[10px] text-[#848d97]">
                          @{card.assignee.username.split('-')[0]}
                        </span>
                      </div>

                      {/* Direction Move Arrows */}
                      <div className="flex items-center gap-1">
                        {cIdx > 0 && (
                          <button
                            onClick={() => moveCard(card.id, 'prev')}
                            className="p-1 rounded hover:bg-[#21262d] text-[#848d97] hover:text-white cursor-pointer"
                            title="Move left"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {cIdx < columns.length - 1 && (
                          <button
                            onClick={() => moveCard(card.id, 'next')}
                            className="p-1 rounded hover:bg-[#21262d] text-[#848d97] hover:text-white cursor-pointer"
                            title="Move right"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-md w-full p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
              <h3 className="font-semibold text-sm text-white">Add Item to Sprint Board</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#848d97] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task description..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-[#e6edf3]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold mb-1">Column</label>
                <select
                  value={newCol}
                  onChange={(e) => setNewCol(e.target.value as any)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3]"
                >
                  {columns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Story Points</label>
              <input
                type="number"
                min={1}
                max={21}
                value={newEstimate}
                onChange={(e) => setNewEstimate(Number(e.target.value))}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded bg-[#21262d] text-[#848d97]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewCard}
                className="px-4 py-1.5 rounded bg-[#238636] hover:bg-[#2ea043] text-white font-semibold"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
