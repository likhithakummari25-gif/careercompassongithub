import {
  LayoutDashboard,
  Bookmark,
  ClipboardList,
  Scale,
  Map,
  Clock,
  Trash2,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as LucideIcons from 'lucide-react';
import type { DashboardData, AssessmentResult, PageId } from '@/types';
import { getCareerById } from '@/data/careers';
import { matchCareers, getTopMatches } from '@/engine/matching';

interface DashboardPageProps {
  dashboard: DashboardData;
  assessment: AssessmentResult | null;
  onNavigate: (page: PageId) => void;
  onSelectCareer: (careerId: string) => void;
  onUnsaveCareer: (careerId: string) => void;
  onClearAll: () => void;
}

export function DashboardPage({
  dashboard,
  assessment,
  onNavigate,
  onSelectCareer,
  onUnsaveCareer,
  onClearAll,
}: DashboardPageProps) {
  const savedCareers = dashboard.savedCareers
    .map((sc) => getCareerById(sc.careerId))
    .filter(Boolean);

  const recentlyExplored = dashboard.recentlyExplored
    .map((id) => getCareerById(id))
    .filter(Boolean);

  const topMatches = assessment ? getTopMatches(matchCareers(assessment.scores, assessment.profile), 3) : [];

  const totalRoadmapSteps = Object.values(dashboard.roadmapProgress).reduce((sum, steps) => sum + steps.length, 0);

  const isEmpty =
    savedCareers.length === 0 &&
    !assessment &&
    dashboard.comparisons.length === 0 &&
    totalRoadmapSteps === 0 &&
    recentlyExplored.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard className="w-8 h-8 text-white/40" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-3">Your Dashboard</h1>
        <p className="text-white/50 mb-8">
          Your saved careers, assessment results, comparisons, and roadmap progress will appear here.
          Start by taking the assessment or exploring careers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" icon={ClipboardList} onClick={() => onNavigate('assessment')}>
            Take Assessment
          </Button>
          <Button size="lg" variant="secondary" icon={Compass} onClick={() => onNavigate('recommendations')}>
            Explore Careers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display mb-1">Your Dashboard</h1>
          <p className="text-white/50 text-sm">Track your career exploration journey</p>
        </div>
        <Button size="sm" variant="ghost" icon={Trash2} onClick={onClearAll}>
          Clear All Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Results */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-cyan-300" />
            </div>
            <h2 className="font-semibold text-lg">Assessment Results</h2>
          </div>
          {assessment ? (
            <div>
              <p className="text-sm text-white/50 mb-3">
                Completed on {new Date(assessment.completedAt).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(assessment.scores)
                  .sort(([, a], [, b]) => b - a)
                  .filter(([, v]) => v > 0)
                  .slice(0, 5)
                  .map(([trait, score]) => (
                    <Badge key={trait} variant="cyan">
                      {trait.replace(/-/g, ' ')}: {score}
                    </Badge>
                  ))}
              </div>
              <div className="space-y-2 mb-4">
                {topMatches.map((m) => (
                  <div key={m.career.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <span className="text-sm">{m.career.title}</span>
                    <span className="text-sm font-bold text-cyan-300">{m.score}%</span>
                  </div>
                ))}
              </div>
              <Button size="sm" variant="secondary" icon={RotateCcw} onClick={() => onNavigate('assessment')} fullWidth>
                Retake Assessment
              </Button>
            </div>
          ) : (
            <EmptyState
              icon={ClipboardList}
              text="No assessment taken yet"
              action={() => onNavigate('assessment')}
              actionLabel="Take Assessment"
            />
          )}
        </Card>

        {/* Saved Careers */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-cyan-300" />
            </div>
            <h2 className="font-semibold text-lg">Saved Careers</h2>
            {savedCareers.length > 0 && <Badge>{savedCareers.length}</Badge>}
          </div>
          {savedCareers.length > 0 ? (
            <div className="space-y-2">
              {savedCareers.map((career) => {
                const Icon = (LucideIcons[career!.icon as keyof typeof LucideIcons] as typeof Bookmark) || Bookmark;
                return (
                  <div key={career!.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <button
                      onClick={() => onSelectCareer(career!.id)}
                      className="flex-1 text-left text-sm font-medium hover:text-cyan-300 transition-colors"
                    >
                      {career!.title}
                    </button>
                    <button
                      onClick={() => onUnsaveCareer(career!.id)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4 text-white/40" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Bookmark}
              text="No saved careers yet"
              action={() => onNavigate('recommendations')}
              actionLabel="Explore Careers"
            />
          )}
        </Card>

        {/* Comparisons */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-cyan-300" />
            </div>
            <h2 className="font-semibold text-lg">Career Comparisons</h2>
            {dashboard.comparisons.length > 0 && <Badge>{dashboard.comparisons.length}</Badge>}
          </div>
          {dashboard.comparisons.length > 0 ? (
            <div className="space-y-2">
              {dashboard.comparisons.map((comp, i) => {
                const careersInComp = comp.map((id) => getCareerById(id)?.title).filter(Boolean);
                return (
                  <div key={i} className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm font-medium mb-1">Comparison {i + 1}</div>
                    <div className="text-xs text-white/40">{careersInComp.join(' vs ')}</div>
                  </div>
                );
              })}
              <Button size="sm" variant="secondary" onClick={() => onNavigate('compare')} fullWidth>
                Go to Compare
              </Button>
            </div>
          ) : (
            <EmptyState
              icon={Scale}
              text="No comparisons saved"
              action={() => onNavigate('compare')}
              actionLabel="Compare Careers"
            />
          )}
        </Card>

        {/* Roadmap Progress */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
              <Map className="w-5 h-5 text-cyan-300" />
            </div>
            <h2 className="font-semibold text-lg">Roadmap Progress</h2>
            {totalRoadmapSteps > 0 && <Badge variant="green">{totalRoadmapSteps} steps done</Badge>}
          </div>
          {Object.keys(dashboard.roadmapProgress).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(dashboard.roadmapProgress).map(([careerId, steps]) => {
                const career = getCareerById(careerId);
                if (!career) return null;
                return (
                  <div key={careerId} className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{career.title}</span>
                      <span className="text-xs text-cyan-300">{steps.length} steps</span>
                    </div>
                    <button
                      onClick={() => onNavigate('roadmap')}
                      className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors"
                    >
                      Continue roadmap <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Map}
              text="No roadmap progress yet"
              action={() => onNavigate('roadmap')}
              actionLabel="View Roadmaps"
            />
          )}
        </Card>
      </div>

      {/* Recently Explored */}
      {recentlyExplored.length > 0 && (
        <Card className="p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-cyan-300" />
            </div>
            <h2 className="font-semibold text-lg">Recently Explored</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {recentlyExplored.slice(0, 8).map((career) => {
              const Icon = (LucideIcons[career!.icon as keyof typeof LucideIcons] as typeof Clock) || Clock;
              return (
                <button
                  key={career!.id}
                  onClick={() => onSelectCareer(career!.id)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="text-sm font-medium truncate">{career!.title}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  text,
  action,
  actionLabel,
}: {
  icon: typeof TrendingUp;
  text: string;
  action: () => void;
  actionLabel: string;
}) {
  return (
    <div className="text-center py-6">
      <Icon className="w-8 h-8 text-white/20 mx-auto mb-3" />
      <p className="text-sm text-white/40 mb-4">{text}</p>
      <Button size="sm" variant="secondary" onClick={action}>
        {actionLabel}
      </Button>
    </div>
  );
}
