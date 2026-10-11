import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Scale,
  Map,
  GraduationCap,
  Zap,
  Rocket,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Clock,
  Briefcase,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as LucideIcons from 'lucide-react';
import type { Career, PageId } from '@/types';

interface CareerDetailPageProps {
  career: Career;
  matchScore?: number;
  onNavigate: (page: PageId) => void;
  onBack: () => void;
  onSaveCareer: (careerId: string) => void;
  onUnsaveCareer: (careerId: string) => void;
  isCareerSaved: (careerId: string) => boolean;
  onAddToCompare: (careerId: string) => void;
  compareList: string[];
}

function DetailSection({
  icon: Icon,
  title,
  items,
  variant = 'default',
}: {
  icon: typeof Star;
  title: string;
  items: string[];
  variant?: 'default' | 'advantages' | 'challenges';
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          variant === 'advantages' ? 'bg-green-400/15' : variant === 'challenges' ? 'bg-amber-400/15' : 'bg-cyan-400/15'
        }`}>
          <Icon className={`w-4 h-4 ${
            variant === 'advantages' ? 'text-green-300' : variant === 'challenges' ? 'text-amber-300' : 'text-cyan-300'
          }`} />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-white/60 flex items-start gap-2">
            {variant === 'advantages' ? (
              <CheckCircle2 className="w-4 h-4 text-green-400/60 shrink-0 mt-0.5" />
            ) : variant === 'challenges' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400/60 shrink-0 mt-0.5" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 shrink-0 mt-1.5" />
            )}
            <span className="whitespace-pre-line">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function CareerDetailPage({
  career,
  matchScore,
  onNavigate,
  onBack,
  onSaveCareer,
  onUnsaveCareer,
  isCareerSaved,
  onAddToCompare,
  compareList,
}: CareerDetailPageProps) {
  const saved = isCareerSaved(career.id);
  const inCompare = compareList.includes(career.id);
  const Icon = (LucideIcons[career.icon as keyof typeof LucideIcons] as typeof Star) || Star;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-cyan-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <Card glow className="p-8 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-card-glow" />
        <div className="relative flex flex-col sm:flex-row items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
            <Icon className="w-8 h-8 text-cyan-300" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-display mb-2">{career.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="purple">{career.category}</Badge>
              <Badge variant={career.demandLevel === 'High' ? 'green' : career.demandLevel === 'Growing' ? 'cyan' : 'default'}>
                <TrendingUp className="w-3 h-3" /> {career.demandLevel} demand
              </Badge>
              {career.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <p className="text-white/60 leading-relaxed">{career.description}</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => (saved ? onUnsaveCareer(career.id) : onSaveCareer(career.id))}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              title={saved ? 'Unsave' : 'Save'}
            >
              {saved ? <BookmarkCheck className="w-5 h-5 text-cyan-300" /> : <Bookmark className="w-5 h-5 text-white/50" />}
            </button>
          </div>
        </div>

        {matchScore !== undefined && (
          <div className="relative mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/70">Your Match Score</span>
              <span className={`text-2xl font-bold ${matchScore >= 70 ? 'text-green-300' : matchScore >= 50 ? 'text-cyan-300' : 'text-amber-300'}`}>
                {matchScore}%
              </span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  matchScore >= 70
                    ? 'bg-gradient-to-r from-green-400 to-cyan-400'
                    : matchScore >= 50
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                    : 'bg-gradient-to-r from-amber-400 to-purple-400'
                }`}
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <Clock className="w-5 h-5 text-cyan-300 mb-2" />
          <div className="text-xs text-white/40">Study Duration</div>
          <div className="text-sm font-semibold">{career.studyDuration}</div>
        </Card>
        <Card className="p-4">
          <Wallet className="w-5 h-5 text-cyan-300 mb-2" />
          <div className="text-xs text-white/40">Est. Cost</div>
          <div className="text-sm font-semibold">{career.estimatedCost || 'Varies'}</div>
        </Card>
        <Card className="p-4">
          <Briefcase className="w-5 h-5 text-cyan-300 mb-2" />
          <div className="text-xs text-white/40">Salary Range</div>
          <div className="text-sm font-semibold">{career.salaryRange}</div>
        </Card>
        <Card className="p-4">
          <TrendingUp className="w-5 h-5 text-cyan-300 mb-2" />
          <div className="text-xs text-white/40">Demand</div>
          <div className="text-sm font-semibold">{career.demandLevel}</div>
        </Card>
      </div>

      {career.costNote && (
        <Card className="p-4 mb-6 border-amber-400/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/50">{career.costNote}</p>
          </div>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button icon={Map} onClick={() => onNavigate('roadmap')} fullWidth>
          View Career Roadmap
        </Button>
        <Button
          variant={inCompare ? 'primary' : 'secondary'}
          icon={Scale}
          onClick={() => onAddToCompare(career.id)}
          disabled={inCompare}
          fullWidth
        >
          {inCompare ? 'Added to Compare' : 'Add to Compare'}
        </Button>
      </div>

      {/* Detail sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DetailSection icon={GraduationCap} title="Education & Qualifications" items={career.qualifications} />
        <DetailSection icon={Zap} title="Important Skills" items={career.skills} />
        <DetailSection icon={Rocket} title="Beginner Projects" items={career.beginnerProjects} />
        <DetailSection icon={BookOpen} title="Learning Pathways" items={career.learningPathways} />
        <DetailSection icon={CheckCircle2} title="Career Advantages" items={career.advantages} variant="advantages" />
        <DetailSection icon={AlertTriangle} title="Career Challenges" items={career.challenges} variant="challenges" />
      </div>

      {/* Work activities */}
      <Card className="p-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-5 h-5 text-cyan-300" />
          <h3 className="font-semibold">Typical Work Activities</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {career.workActivities.map((activity, i) => (
            <Badge key={i}>{activity}</Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
