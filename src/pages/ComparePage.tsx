import { useState } from 'react';
import {
  Scale,
  X,
  Plus,
  ArrowRight,
  GraduationCap,
  Clock,
  Zap,
  Wallet,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import * as LucideIcons from 'lucide-react';
import type { Career, PageId } from '@/types';
import { careers } from '@/data/careers';

interface ComparePageProps {
  compareList: string[];
  onToggleCompare: (careerId: string) => void;
  onClearCompare: () => void;
  onSelectCareer: (careerId: string) => void;
  onNavigate: (page: PageId) => void;
  onAddComparison: (careerIds: string[]) => void;
}

export function ComparePage({
  compareList,
  onToggleCompare,
  onClearCompare,
  onSelectCareer,
  onNavigate,
  onAddComparison,
}: ComparePageProps) {
  const [showPicker, setShowPicker] = useState(false);

  const selectedCareers = compareList
    .map((id) => careers.find((c) => c.id === id))
    .filter(Boolean) as Career[];

  const availableCareers = careers.filter((c) => !compareList.includes(c.id));

  const comparisonRows: {
    label: string;
    icon: typeof Scale;
    getValues: (c: Career) => string[];
  }[] = [
    {
      label: 'Category',
      icon: Briefcase,
      getValues: (c) => [c.category],
    },
    {
      label: 'Qualifications',
      icon: GraduationCap,
      getValues: (c) => c.qualifications,
    },
    {
      label: 'Study Duration',
      icon: Clock,
      getValues: (c) => [c.studyDuration],
    },
    {
      label: 'Key Skills',
      icon: Zap,
      getValues: (c) => c.skills,
    },
    {
      label: 'Est. Cost',
      icon: Wallet,
      getValues: (c) => [c.estimatedCost || 'Varies'],
    },
    {
      label: 'Work Activities',
      icon: Briefcase,
      getValues: (c) => c.workActivities,
    },
    {
      label: 'Learning Pathways',
      icon: BookOpen,
      getValues: (c) => c.learningPathways,
    },
  ];

  const handleSaveComparison = () => {
    if (selectedCareers.length >= 2) {
      onAddComparison(selectedCareers.map((c) => c.id));
    }
  };

  if (selectedCareers.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
          <Scale className="w-8 h-8 text-white/40" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-3">Compare Careers</h1>
        <p className="text-white/50 mb-8">
          Add 2 or 3 careers to compare them side by side \u2014 qualifications, costs, skills, and work activities.
        </p>
        <Button size="lg" icon={Plus} onClick={() => onNavigate('recommendations')}>
          Browse Careers to Compare
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display mb-1">Compare Careers</h1>
          <p className="text-white/50 text-sm">Side-by-side comparison of {selectedCareers.length} career{selectedCareers.length > 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          {selectedCareers.length < 3 && (
            <Button size="sm" variant="secondary" icon={Plus} onClick={() => setShowPicker(true)}>
              Add Career
            </Button>
          )}
          {selectedCareers.length >= 2 && (
            <Button size="sm" variant="outline" onClick={handleSaveComparison}>
              Save Comparison
            </Button>
          )}
          <Button size="sm" variant="ghost" icon={X} onClick={onClearCompare}>
            Clear All
          </Button>
        </div>
      </div>

      {selectedCareers.length === 1 && (
        <Card className="p-4 mb-6 border-amber-400/20">
          <div className="flex items-center gap-2 text-sm text-amber-300/70">
            <AlertTriangle className="w-4 h-4" />
            Add at least one more career to compare. You can compare up to 3 at a time.
          </div>
        </Card>
      )}

      {/* Comparison table */}
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[768px]">
          {/* Career headers */}
          <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${selectedCareers.length}, 1fr)` }}>
            <div />
            {selectedCareers.map((career) => {
              const Icon = (LucideIcons[career.icon as keyof typeof LucideIcons] as typeof Scale) || Scale;
              return (
                <Card key={career.id} glow className="p-5 relative">
                  <button
                    onClick={() => onToggleCompare(career.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-white/40" />
                  </button>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <h3 className="font-semibold mb-2 pr-6">{career.title}</h3>
                  <Badge variant="purple">{career.category}</Badge>
                  <button
                    onClick={() => onSelectCareer(career.id)}
                    className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 mt-3 transition-colors"
                  >
                    View details <ArrowRight className="w-3 h-3" />
                  </button>
                </Card>
              );
            })}
          </div>

          {/* Comparison rows */}
          {comparisonRows.map((row, idx) => {
            const RowIcon = row.icon;
            return (
              <div
                key={idx}
                className="grid gap-4 mb-2"
                style={{ gridTemplateColumns: `200px repeat(${selectedCareers.length}, 1fr)` }}
              >
                <div className="flex items-center gap-2 p-4 text-sm font-medium text-white/70">
                  <RowIcon className="w-4 h-4 text-cyan-300" />
                  {row.label}
                </div>
                {selectedCareers.map((career) => (
                  <Card key={career.id} className="p-4">
                    <div className="space-y-1.5">
                      {row.getValues(career).map((val, i) => (
                        <div key={i} className="text-sm text-white/60 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 shrink-0 mt-1.5" />
                          {val}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            );
          })}

          {/* Advantages row */}
          <div className="grid gap-4 mb-2" style={{ gridTemplateColumns: `200px repeat(${selectedCareers.length}, 1fr)` }}>
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-white/70">
              <CheckCircle2 className="w-4 h-4 text-green-300" /> Advantages
            </div>
            {selectedCareers.map((career) => (
              <Card key={career.id} className="p-4">
                <div className="space-y-1.5">
                  {career.advantages.map((val, i) => (
                    <div key={i} className="text-sm text-white/60 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400/60 shrink-0 mt-0.5" />
                      {val}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Challenges row */}
          <div className="grid gap-4 mb-2" style={{ gridTemplateColumns: `200px repeat(${selectedCareers.length}, 1fr)` }}>
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-white/70">
              <AlertTriangle className="w-4 h-4 text-amber-300" /> Challenges
            </div>
            {selectedCareers.map((career) => (
              <Card key={career.id} className="p-4">
                <div className="space-y-1.5">
                  {career.challenges.map((val, i) => (
                    <div key={i} className="text-sm text-white/60 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400/60 shrink-0 mt-0.5" />
                      {val}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Career picker modal */}
      <Modal open={showPicker} onClose={() => setShowPicker(false)} title="Add a Career to Compare">
        <div className="space-y-2">
          {availableCareers.map((career) => {
            const Icon = (LucideIcons[career.icon as keyof typeof LucideIcons] as typeof Scale) || Scale;
            return (
              <button
                key={career.id}
                onClick={() => {
                  onToggleCompare(career.id);
                  setShowPicker(false);
                }}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{career.title}</div>
                  <div className="text-xs text-white/40">{career.category}</div>
                </div>
                <Plus className="w-5 h-5 text-white/30" />
              </button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
