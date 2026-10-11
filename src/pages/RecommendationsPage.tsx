import { useState } from 'react';
import {
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Scale,
  Map,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as LucideIcons from 'lucide-react';
import type { AssessmentResult, PageId } from '@/types';
import { matchCareers, getTopMatches, type CareerMatch } from '@/engine/matching';
import { careers } from '@/data/careers';

interface RecommendationsPageProps {
  assessment: AssessmentResult | null;
  onNavigate: (page: PageId) => void;
  onSelectCareer: (careerId: string) => void;
  onSaveCareer: (careerId: string) => void;
  onUnsaveCareer: (careerId: string) => void;
  isCareerSaved: (careerId: string) => boolean;
  onAddToCompare: (careerId: string) => void;
  compareList: string[];
}

export function RecommendationsPage({
  assessment,
  onNavigate,
  onSelectCareer,
  onSaveCareer,
  onUnsaveCareer,
  isCareerSaved,
  onAddToCompare,
  compareList,
}: RecommendationsPageProps) {
  const [showAll, setShowAll] = useState(false);

  if (!assessment) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-white/40" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-3">No Assessment Yet</h1>
        <p className="text-white/50 mb-8">
          Take the career assessment to get personalized recommendations based on your interests and strengths.
        </p>
        <Button size="lg" icon={Lightbulb} onClick={() => onNavigate('assessment')}>
          Take Assessment
        </Button>
      </div>
    );
  }

  const allMatches = matchCareers(assessment.scores, assessment.profile);
  const topMatches = getTopMatches(allMatches, 5);
  const displayedMatches = showAll ? allMatches.slice(0, 12) : topMatches;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-cyan-300" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">Your Career Recommendations</h1>
        <p className="text-white/50 max-w-2xl mx-auto">
          Based on your assessment, here are careers that match your interests and strengths.
          The match score reflects alignment with your answers \u2014 it does not predict success or guarantee employment.
        </p>
      </div>

      {/* Trait summary */}
      <Card className="p-6 mb-8">
        <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-300" /> Your Strength Profile
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(assessment.scores)
            .sort(([, a], [, b]) => b - a)
            .filter(([, v]) => v > 0)
            .map(([trait, score]) => (
              <Badge
                key={trait}
                variant={score > 5 ? 'cyan' : 'default'}
              >
                {trait.replace(/-/g, ' ')}: {score}
              </Badge>
            ))}
        </div>
      </Card>

      {/* Career cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMatches.map((match: CareerMatch, idx: number) => {
          const saved = isCareerSaved(match.career.id);
          const inCompare = compareList.includes(match.career.id);
          const Icon = (LucideIcons[match.career.icon as keyof typeof LucideIcons] as typeof Lightbulb) || Lightbulb;

          return (
            <Card
              key={match.career.id}
              hover
              glow={idx < 3}
              className="p-6 animate-fade-in-up flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saved ? onUnsaveCareer(match.career.id) : onSaveCareer(match.career.id);
                    }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    title={saved ? 'Saved' : 'Save career'}
                  >
                    {saved ? (
                      <BookmarkCheck className="w-5 h-5 text-cyan-300" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-white/40" />
                    )}
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-1">{match.career.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="purple">{match.career.category}</Badge>
                <Badge variant={match.career.demandLevel === 'High' ? 'green' : match.career.demandLevel === 'Growing' ? 'cyan' : 'default'}>
                  {match.career.demandLevel} demand
                </Badge>
              </div>

              <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{match.career.description}</p>

              {/* Match score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/50">Match Score</span>
                  <span className={`text-sm font-bold ${match.score >= 70 ? 'text-green-300' : match.score >= 50 ? 'text-cyan-300' : 'text-amber-300'}`}>
                    {match.score}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      match.score >= 70
                        ? 'bg-gradient-to-r from-green-400 to-cyan-400'
                        : match.score >= 50
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                        : 'bg-gradient-to-r from-amber-400 to-purple-400'
                    }`}
                    style={{ width: `${match.score}%` }}
                  />
                </div>
              </div>

              {match.matchedTraits.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {match.matchedTraits.slice(0, 3).map((trait) => (
                    <span key={trait} className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/50">
                      {trait.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 mt-auto">
                <Button
                  size="sm"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onSelectCareer(match.career.id)}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant={inCompare ? 'primary' : 'secondary'}
                  icon={Scale}
                  onClick={() => onAddToCompare(match.career.id)}
                  disabled={inCompare}
                >
                  {inCompare ? 'Added' : 'Compare'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {!showAll && allMatches.length > 5 && (
        <div className="text-center mt-8">
          <Button variant="secondary" onClick={() => setShowAll(true)}>
            Show All {allMatches.length} Careers
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
        <Button variant="secondary" icon={RotateCcw} onClick={() => onNavigate('assessment')}>
          Retake Assessment
        </Button>
        <Button variant="secondary" icon={Scale} onClick={() => onNavigate('compare')}>
          Compare Careers
        </Button>
        <Button variant="secondary" icon={Map} onClick={() => onNavigate('dashboard')}>
          View Dashboard
        </Button>
      </div>

      <p className="text-center text-xs text-white/30 mt-6 max-w-xl mx-auto">
        Match scores are based on your assessment answers and profile. They reflect alignment, not a prediction of success or employment.
      </p>
    </div>
  );
}
