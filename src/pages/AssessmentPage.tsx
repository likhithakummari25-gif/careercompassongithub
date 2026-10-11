import { useState } from 'react';
import {
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  Lightbulb,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import type { AssessmentAnswer, AssessmentResult, StudentProfile, PageId } from '@/types';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { calculateTraitScores } from '@/engine/matching';

interface AssessmentPageProps {
  profile: StudentProfile | null;
  onComplete: (result: AssessmentResult) => void;
  onNavigate: (page: PageId) => void;
  existingResult: AssessmentResult | null;
}

export function AssessmentPage({ profile, onComplete, onNavigate, existingResult }: AssessmentPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [error, setError] = useState('');

  const question = assessmentQuestions[currentStep];
  const totalSteps = assessmentQuestions.length;
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  const toggleOption = (optionId: string) => {
    setError('');
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === question.id);
      if (!existing) {
        return [...prev, { questionId: question.id, selected: [optionId] }];
      }
      if (question.multiSelect) {
        const isSelected = existing.selected.includes(optionId);
        return prev.map((a) =>
          a.questionId === question.id
            ? { ...a, selected: isSelected ? a.selected.filter((s) => s !== optionId) : [...a.selected, optionId] }
            : a
        );
      }
      return prev.map((a) =>
        a.questionId === question.id ? { ...a, selected: [optionId] } : a
      );
    });
  };

  const handleNext = () => {
    if (!currentAnswer || currentAnswer.selected.length === 0) {
      setError('Please select at least one option to continue');
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      finishAssessment();
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setError('');
  };

  const finishAssessment = () => {
    const scores = calculateTraitScores(answers, assessmentQuestions);
    const result: AssessmentResult = {
      answers,
      scores,
      profile: profile || {
        name: '',
        educationLevel: 'intermediate',
        favoriteSubjects: [],
        interests: [],
        skills: [],
        workStyle: 'analytical',
        careerGoals: '',
        preferredLocation: '',
        budget: '',
      },
      completedAt: new Date().toISOString(),
    };
    onComplete(result);
    onNavigate('recommendations');
  };

  const handleRetake = () => {
    handleRestart();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-cyan-300" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">Career Assessment</h1>
        <p className="text-white/50">Answer honestly \u2014 there are no wrong answers. Your responses shape your recommendations.</p>
      </div>

      {existingResult && answers.length === 0 && (
        <Card className="p-4 mb-6 border-cyan-400/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-300 shrink-0" />
            <p className="text-sm text-white/60">You have a previous assessment. Retake it to get fresh recommendations.</p>
          </div>
          <Button size="sm" variant="outline" icon={RotateCcw} onClick={handleRetake}>
            Retake
          </Button>
        </Card>
      )}

      <Card className="p-6 sm:p-8">
        <div className="mb-8">
          <Progress
            current={currentStep + 1}
            total={totalSteps}
            label={`Question ${currentStep + 1} of ${totalSteps}`}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{question.title}</h2>
          <p className="text-sm text-white/50">{question.description}</p>
          {question.multiSelect && (
            <span className="inline-block mt-2 text-xs text-cyan-300/70">Select all that apply</span>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = currentAnswer?.selected.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all group ${
                  isSelected
                    ? 'bg-cyan-400/15 border-cyan-400/40'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected ? 'bg-cyan-400 border-cyan-400' : 'border-white/20 group-hover:border-white/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-navy-950" />}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isSelected ? 'text-cyan-200' : 'text-white/80'}`}>
                      {option.label}
                    </div>
                    <div className="text-sm text-white/40 mt-0.5">{option.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <Button variant="ghost" icon={ChevronLeft} onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="ghost" icon={RotateCcw} onClick={handleRestart}>
                Restart
              </Button>
            )}
            <Button
              icon={currentStep === totalSteps - 1 ? Lightbulb : ChevronRight}
              iconPosition="right"
              onClick={handleNext}
            >
              {currentStep === totalSteps - 1 ? 'See Results' : 'Next'}
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <button
          onClick={() => onNavigate('profile')}
          className="text-sm text-white/40 hover:text-cyan-300 transition-colors"
        >
          Edit your profile first
        </button>
      </div>
    </div>
  );
}
