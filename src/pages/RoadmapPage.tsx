import { useState, useMemo } from 'react';
import {
  Map,
  BookOpen,
  Zap,
  Rocket,
  GraduationCap,
  Briefcase,
  Target,
  ChevronLeft,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as LucideIcons from 'lucide-react';
import type { EducationLevel, PageId, Stream } from '@/types';
import { careers, getCareerById } from '@/data/careers';
import { generateRoadmap, generatePathwayFlow } from '@/engine/roadmap';

interface RoadmapPageProps {
  careerId: string | null;
  educationLevel: EducationLevel;
  stream: Stream;
  onNavigate: (page: PageId) => void;
  onSelectCareer: (careerId: string) => void;
  roadmapProgress: Record<string, string[]>;
  onToggleStep: (careerId: string, stepId: string) => void;
}

const categoryIcons: Record<string, typeof BookOpen> = {
  study: GraduationCap,
  skills: Zap,
  projects: Rocket,
  courses: BookOpen,
  experience: Briefcase,
  goals: Target,
};

const categoryColors: Record<string, string> = {
  study: 'from-cyan-400/20 to-cyan-400/5',
  skills: 'from-purple-400/20 to-purple-400/5',
  projects: 'from-green-400/20 to-green-400/5',
  courses: 'from-amber-400/20 to-amber-400/5',
  experience: 'from-pink-400/20 to-pink-400/5',
  goals: 'from-cyan-400/20 to-purple-400/5',
};

const pathwayIconMap: Record<string, typeof Map> = {
  GraduationCap,
  BookOpen,
  Briefcase,
  Target,
  Zap,
  Rocket,
  Wrench: Briefcase,
  Calculator: Target,
  Dna: BookOpen,
  TrendingUp: Target,
  Building2: Briefcase,
  Hammer: Briefcase,
  ArrowRight: ArrowRight,
  CheckCircle: CheckCircle,
};

export function RoadmapPage({
  careerId,
  educationLevel,
  stream,
  onNavigate,
  onSelectCareer,
  roadmapProgress,
  onToggleStep,
}: RoadmapPageProps) {
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(careerId);

  const career = useMemo(() => {
    if (selectedCareerId) return getCareerById(selectedCareerId);
    return null;
  }, [selectedCareerId]);

  const roadmap = useMemo(() => {
    if (!career) return [];
    return generateRoadmap(career, educationLevel);
  }, [career, educationLevel]);

  const pathwayFlow = useMemo(() => {
    return generatePathwayFlow(educationLevel, stream, selectedCareerId);
  }, [educationLevel, stream, selectedCareerId]);

  const completedSteps = career ? roadmapProgress[career.id] || [] : [];
  const progressPercent = roadmap.length > 0 ? Math.round((completedSteps.length / roadmap.length) * 100) : 0;

  const handleCareerSelect = (id: string) => {
    setSelectedCareerId(id);
    onSelectCareer(id);
  };

  if (!career) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Map className="w-8 h-8 text-cyan-300" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Career Roadmap</h1>
          <p className="text-white/50">Select a career to generate a step-by-step roadmap adapted to your education level.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careers.map((c) => {
            const Icon = (LucideIcons[c.icon as keyof typeof LucideIcons] as typeof Map) || Map;
            const steps = generateRoadmap(c, educationLevel);
            const completed = (roadmapProgress[c.id] || []).length;
            return (
              <Card
                key={c.id}
                hover
                className="p-5"
                onClick={() => handleCareerSelect(c.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{c.title}</h3>
                    <Badge variant="purple" className="mt-0.5">{c.category}</Badge>
                  </div>
                </div>
                {completed > 0 && (
                  <div className="text-xs text-cyan-300">{completed}/{steps.length} steps completed</div>
                )}
                <Button size="sm" fullWidth icon={ArrowRight} iconPosition="right" onClick={() => {}} className="mt-3">
                  View Roadmap
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const Icon = (LucideIcons[career.icon as keyof typeof LucideIcons] as typeof Map) || Map;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button
        onClick={() => setSelectedCareerId(null)}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-cyan-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All Roadmaps
      </button>

      <Card glow className="p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-card-glow" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
            <Icon className="w-7 h-7 text-cyan-300" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-display">{career.title} Roadmap</h1>
            <p className="text-sm text-white/50 mt-1">
              Adapted for: {educationLevel === '10th' ? '10th Standard' : educationLevel === 'inter-1' ? 'Intermediate 1st Year' : educationLevel === 'inter-2' ? 'Intermediate 2nd Year' : educationLevel === 'diploma' ? 'Diploma' : 'Degree / UG'}
              {stream && ` · Stream: ${stream}`}
            </p>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Your Progress</span>
            <span className="text-sm font-bold text-cyan-300">{progressPercent}%</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-white/40 mt-2">{completedSteps.length} of {roadmap.length} steps completed</p>
        </div>
      </Card>

      <h2 className="text-lg font-semibold font-display mb-4 flex items-center gap-2">
        <Map className="w-5 h-5 text-cyan-300" /> Your Pathway
      </h2>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 overflow-x-auto scrollbar-thin pb-2">
          {pathwayFlow.map((node, idx) => {
            const NodeIcon = pathwayIconMap[node.icon] || GraduationCap;
            const isLast = idx === pathwayFlow.length - 1;
            return (
              <div key={node.id} className="flex sm:flex-col items-center sm:gap-2 shrink-0">
                <div className="flex flex-col sm:items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isLast
                      ? 'bg-gradient-to-br from-cyan-400/30 to-purple-500/30 ring-2 ring-cyan-400/40'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <NodeIcon className={`w-6 h-6 ${isLast ? 'text-cyan-300' : 'text-white/50'}`} />
                  </div>
                  <div className="sm:text-center mt-2 max-w-[140px]">
                    <div className={`text-xs font-semibold ${isLast ? 'text-cyan-200' : 'text-white/70'}`}>
                      {node.label}
                    </div>
                    <div className="text-xs text-white/30 mt-0.5 hidden sm:block">
                      {node.description}
                    </div>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex sm:flex-col items-center mx-2 sm:mx-0 sm:my-1">
                    <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-cyan-400/40 to-purple-400/20" />
                    <ChevronLeft className="sm:hidden w-5 h-5 text-cyan-400/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-lg font-semibold font-display mb-4">Detailed Steps</h2>

      <div className="space-y-4">
        {roadmap.map((step, idx) => {
          const StepIcon = categoryIcons[step.category] || BookOpen;
          const isCompleted = completedSteps.includes(step.id);
          const colorClass = categoryColors[step.category] || 'from-cyan-400/20 to-purple-400/5';

          return (
            <Card key={step.id} className={`p-5 transition-all ${isCompleted ? 'opacity-70' : ''}`}>
              <div className="flex items-start gap-4">
                <button
                  onClick={() => onToggleStep(career.id, step.id)}
                  className="shrink-0 mt-0.5"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-white/30 hover:text-cyan-300 transition-colors" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                      <StepIcon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isCompleted ? 'line-through text-white/40' : ''}`}>
                        {step.title}
                      </h3>
                      <span className="text-xs text-white/40">{step.timeframe}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 whitespace-pre-line leading-relaxed">{step.description}</p>
                </div>

                <span className="text-xs text-white/30 shrink-0 hidden sm:block">Step {idx + 1}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button variant="secondary" icon={ChevronLeft} onClick={() => setSelectedCareerId(null)}>
          Pick Another Career
        </Button>
        <Button icon={Target} onClick={() => onNavigate('dashboard')}>
          View Dashboard
        </Button>
      </div>

      <Card className="p-4 mt-6 border-amber-400/20">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-white/50">
            This roadmap is a general guide adapted to your education level. Eligibility requirements,
            entrance exams, and course availability vary by institution, state, and year. Consult with
            academic counselors for institution-specific pathways.
          </p>
        </div>
      </Card>
    </div>
  );
}
