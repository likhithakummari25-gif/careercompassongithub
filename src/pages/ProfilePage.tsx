import { useState } from 'react';
import {
  User,
  GraduationCap,
  BookOpen,
  Heart,
  Zap,
  Briefcase,
  Target,
  MapPin,
  Wallet,
  Check,
  ChevronRight,
  ChevronLeft,
  Wrench,
  Brain,
  Palette,
  Users,
  Compass as CompassIcon,
  AlertTriangle,
  HeartHandshake,
  ArrowRight,
  Calculator,
  Dna,
  TrendingUp,
  Building2,
  Hammer,
  BookOpen as BookIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import type { StudentProfile, EducationLevel, Stream, WorkStyle, PageId } from '@/types';
import {
  educationLevels,
  streams,
  degreeFields,
  workStyles,
  subjectOptions,
  difficultSubjectOptions,
  interestOptions,
  skillOptions,
  locationOptions,
} from '@/data/profileOptions';
import { pathways } from '@/data/pathways';
import { parentStageGuides } from '@/data/parentContent';
import * as LucideIcons from 'lucide-react';

interface ProfilePageProps {
  profile: StudentProfile | null;
  onSave: (profile: StudentProfile) => void;
  onNavigate: (page: PageId) => void;
}

const workStyleIconMap: Record<string, typeof Wrench> = {
  Wrench, Brain, Palette, Users, Compass: CompassIcon,
};

const pathwayIconMap: Record<string, typeof Calculator> = {
  Calculator, Dna, TrendingUp, Building2, Wrench, Hammer, BookOpen: BookIcon,
};

const emptyProfile: StudentProfile = {
  name: '',
  educationLevel: '10th',
  stream: '',
  degreeField: '',
  favoriteSubjects: [],
  difficultSubjects: [],
  interests: [],
  skills: [],
  workStyle: 'analytical',
  careerGoals: '',
  preferredLocation: 'Local / Hometown',
  budget: '',
};

function MultiSelectGrid({
  options,
  selected,
  onToggle,
  columns = 3,
}: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  columns?: number;
}) {
  const colClass = columns === 2 ? 'sm:grid-cols-2' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4';
  return (
    <div className={`grid grid-cols-2 ${colClass} gap-2`}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all border text-left flex items-center gap-2 ${
              isSelected
                ? 'bg-cyan-400/15 border-cyan-400/40 text-cyan-200'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {isSelected && <Check className="w-4 h-4 shrink-0 text-cyan-300" />}
            <span className="truncate">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

interface StepDef {
  id: string;
  title: string;
  description: string;
  optional?: boolean;
  showFor?: EducationLevel[];
}

const allSteps: StepDef[] = [
  { id: 'name', title: 'About You', description: 'Tell us your name (or skip this step)' },
  { id: 'education', title: 'Education Level', description: 'What class or education level are you currently studying?' },
  { id: 'stream', title: 'Your Stream', description: 'Which stream are you currently studying?', showFor: ['inter-1', 'inter-2'] },
  { id: 'degree-field', title: 'Your Degree', description: 'What degree and subject area are you studying?', showFor: ['degree'] },
  { id: 'subjects', title: 'Favorite Subjects', description: 'Which subjects do you enjoy the most?' },
  { id: 'difficult-subjects', title: 'Difficult Subjects', description: 'Which subjects do you find challenging? (Optional)', optional: true },
  { id: 'interests', title: 'Interests & Hobbies', description: 'What do you love doing outside of class?' },
  { id: 'skills', title: 'Skills & Strengths', description: 'What are you naturally good at?' },
  { id: 'workStyle', title: 'Preferred Type of Work', description: 'How do you like to work?' },
  { id: 'goals', title: 'Future Goals', description: 'What do you want to achieve? (Optional)', optional: true },
  { id: 'location', title: 'Location & Budget', description: 'Where would you like to study? (Budget is optional)', optional: true },
  { id: 'parent', title: 'Discuss with Parents', description: 'Questions to explore together with your family', optional: true },
];

export function ProfilePage({ profile, onSave, onNavigate }: ProfilePageProps) {
  const [formData, setFormData] = useState<StudentProfile>(profile || emptyProfile);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleSteps = allSteps.filter((s) => {
    if (!s.showFor) return true;
    return s.showFor.includes(formData.educationLevel);
  });

  const step = visibleSteps[currentStepIdx];
  const isLastStep = currentStepIdx === visibleSteps.length - 1;

  const toggleArrayValue = (key: keyof StudentProfile, value: string) => {
    setFormData((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const validateStep = (): boolean => {
    setErrors({});
    switch (step.id) {
      case 'education':
        if (!formData.educationLevel) {
          setErrors({ education: 'Please select your education level' });
          return false;
        }
        break;
      case 'stream':
        if (!formData.stream) {
          setErrors({ stream: 'Please select your current stream' });
          return false;
        }
        break;
      case 'workStyle':
        if (!formData.workStyle) {
          setErrors({ workStyle: 'Please select a preferred work style' });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (isLastStep) {
      onSave(formData);
      onNavigate('assessment');
    } else {
      setCurrentStepIdx((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) setCurrentStepIdx((s) => s - 1);
  };

  const handleSkip = () => {
    if (isLastStep) {
      onSave(formData);
      onNavigate('assessment');
    } else {
      setCurrentStepIdx((s) => s + 1);
    }
  };

  const handleEducationSelect = (level: EducationLevel) => {
    setFormData((prev) => ({ ...prev, educationLevel: level }));
    setErrors({});
    if (currentStepIdx === 1) {
      setTimeout(() => setCurrentStepIdx((s) => s + 1), 300);
    }
  };

  const parentGuide = parentStageGuides.find((g) => {
    if (formData.educationLevel === '10th') return g.level === '10th';
    if (formData.educationLevel === 'inter-1' || formData.educationLevel === 'inter-2') return g.level === 'inter';
    if (formData.educationLevel === 'diploma') return g.level === 'diploma';
    if (formData.educationLevel === 'degree') return g.level === 'degree';
    return false;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-cyan-300" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">Student Profile</h1>
        <p className="text-white/50">Tell us about yourself so we can find the best career matches</p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="mb-8">
          <Progress
            current={currentStepIdx + 1}
            total={visibleSteps.length}
            label={`Step ${currentStepIdx + 1} of ${visibleSteps.length}`}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{step.title}</h2>
          <p className="text-sm text-white/50">{step.description}</p>
          {step.optional && (
            <span className="inline-block mt-2 text-xs text-amber-300/70">This step is optional — you can skip it</span>
          )}
        </div>

        <div className="space-y-4">
          {step.id === 'name' && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Name or Nickname</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex (optional)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
              <p className="text-xs text-white/40 mt-2">This stays on your device only — we do not collect or store it remotely.</p>
            </div>
          )}

          {step.id === 'education' && (
            <div className="space-y-2">
              {educationLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleEducationSelect(level.value)}
                  className={`w-full px-4 py-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
                    formData.educationLevel === level.value
                      ? 'bg-cyan-400/15 border-cyan-400/40 text-cyan-200'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs text-white/40">{level.description}</div>
                  </div>
                  {formData.educationLevel === level.value && <Check className="w-5 h-5 text-cyan-300" />}
                </button>
              ))}
              {errors.education && <p className="text-sm text-red-400">{errors.education}</p>}
            </div>
          )}

          {step.id === 'stream' && (
            <div className="space-y-2">
              {streams.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, stream: s.value as Stream })}
                  className={`w-full px-4 py-3 rounded-xl text-left border transition-all ${
                    formData.stream === s.value
                      ? 'bg-cyan-400/15 border-cyan-400/40 text-cyan-200'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <div className="font-medium">{s.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.description}</div>
                </button>
              ))}
              {errors.stream && <p className="text-sm text-red-400">{errors.stream}</p>}
            </div>
          )}

          {step.id === 'degree-field' && (
            <div className="space-y-2">
              {degreeFields.map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => setFormData({ ...formData, degreeField: field })}
                  className={`w-full px-4 py-3 rounded-xl text-left border transition-all ${
                    formData.degreeField === field
                      ? 'bg-cyan-400/15 border-cyan-400/40 text-cyan-200'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium text-sm">{field}</span>
                </button>
              ))}
            </div>
          )}

          {step.id === 'subjects' && (
            <div>
              <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                <BookOpen className="w-4 h-4" /> Select all that apply
              </div>
              <MultiSelectGrid
                options={subjectOptions}
                selected={formData.favoriteSubjects}
                onToggle={(v) => toggleArrayValue('favoriteSubjects', v)}
                columns={3}
              />
            </div>
          )}

          {step.id === 'difficult-subjects' && (
            <div>
              <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400/60" /> Select subjects you find challenging
              </div>
              <MultiSelectGrid
                options={difficultSubjectOptions}
                selected={formData.difficultSubjects}
                onToggle={(v) => toggleArrayValue('difficultSubjects', v)}
                columns={3}
              />
              <p className="text-xs text-white/40 mt-3">Knowing your challenges helps us suggest pathways that play to your strengths.</p>
            </div>
          )}

          {step.id === 'interests' && (
            <div>
              <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                <Heart className="w-4 h-4" /> Select all that apply
              </div>
              <MultiSelectGrid
                options={interestOptions}
                selected={formData.interests}
                onToggle={(v) => toggleArrayValue('interests', v)}
                columns={4}
              />
            </div>
          )}

          {step.id === 'skills' && (
            <div>
              <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                <Zap className="w-4 h-4" /> Select all that apply
              </div>
              <MultiSelectGrid
                options={skillOptions}
                selected={formData.skills}
                onToggle={(v) => toggleArrayValue('skills', v)}
                columns={3}
              />
            </div>
          )}

          {step.id === 'workStyle' && (
            <div className="space-y-2">
              {workStyles.map((style) => {
                const Icon = workStyleIconMap[style.icon] || Briefcase;
                return (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, workStyle: style.value as WorkStyle })}
                    className={`w-full px-4 py-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
                      formData.workStyle === style.value
                        ? 'bg-cyan-400/15 border-cyan-400/40 text-cyan-200'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{style.label}</span>
                    {formData.workStyle === style.value && <Check className="w-5 h-5 ml-auto text-cyan-300" />}
                  </button>
                );
              })}
              {errors.workStyle && <p className="text-sm text-red-400">{errors.workStyle}</p>}
            </div>
          )}

          {step.id === 'goals' && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">What are your future goals?</label>
              <textarea
                value={formData.careerGoals}
                onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                placeholder="e.g. I want to build technology that helps people, or I want to run my own business one day..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
              />
              <div className="mt-4">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                  <Wallet className="w-4 h-4" /> Approximate Education Budget (optional)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g. Rs. 5 Lakhs (optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
            </div>
          )}

          {step.id === 'location' && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
                <MapPin className="w-4 h-4" /> Preferred Study Location
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {locationOptions.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredLocation: loc })}
                    className={`px-4 py-3 rounded-xl text-left border transition-all ${
                      formData.preferredLocation === loc
                        ? 'bg-cyan-400/15 border-cyan-400/40 text-cyan-200'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step.id === 'parent' && parentGuide && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-400/15 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-200">{parentGuide.label}</h3>
                  <p className="text-xs text-white/40">Questions to discuss with your parents or family</p>
                </div>
              </div>
              <div className="space-y-3">
                {parentGuide.questions.map((q, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-400/20 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/60 leading-relaxed">{q}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Card className="p-4 mt-4 border-amber-400/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-white/50">
                    You do not need to answer these here. Take them home and discuss with your family.
                    For more guidance, visit the Parent Corner page.
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <Button variant="ghost" icon={ChevronLeft} onClick={handleBack} disabled={currentStepIdx === 0}>
            Back
          </Button>
          <div className="flex gap-2">
            {step.optional && (
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            )}
            <Button icon={isLastStep ? Target : ChevronRight} iconPosition="right" onClick={handleNext}>
              {isLastStep ? 'Save & Continue' : 'Next'}
            </Button>
          </div>
        </div>
      </Card>

      {formData.educationLevel === '10th' && currentStepIdx >= 1 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Pathways After 10th</h2>
              <p className="text-sm text-white/50">Explore the different directions you can take after 10th standard</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pathways.map((pw) => {
              const Icon = pathwayIconMap[pw.icon] || GraduationCap;
              return (
                <Card key={pw.id} className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{pw.title}</h3>
                      <Badge variant="purple" className="mt-0.5">{pw.shortName}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-3">{pw.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-white/60">What you study:</span>
                      <ul className="text-xs text-white/40 mt-1 space-y-0.5">
                        {pw.whatYouStudy.slice(0, 3).map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400/50 mt-1.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white/60">Future courses:</span>
                      <p className="text-xs text-white/40 mt-0.5">{pw.futureCourses.slice(0, 3).join(', ')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('roadmap')}
                    className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 mt-3 transition-colors"
                  >
                    View roadmap <ArrowRight className="w-3 h-3" />
                  </button>
                </Card>
              );
            })}
          </div>
          <Card className="p-4 mt-4 border-amber-400/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-white/50">
                Eligibility requirements, entrance exams, and available courses vary by institution, state, and year.
                Always check with specific colleges and official portals for current information.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
