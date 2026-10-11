import type { Career, AssessmentResult, StudentProfile } from '@/types';
import { careers } from '@/data/careers';
import type { AssessmentQuestion } from '@/data/assessmentQuestions';

export interface CareerMatch {
  career: Career;
  score: number;
  matchedTraits: string[];
}

export function calculateTraitScores(
  answers: AssessmentResult['answers'],
  questions: AssessmentQuestion[]
): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const q of questions) {
    const answer = answers.find((a) => a.questionId === q.id);
    if (!answer || answer.selected.length === 0) continue;
    let traitScore = 0;
    for (const selectedId of answer.selected) {
      const opt = q.options.find((o) => o.id === selectedId);
      if (opt) traitScore += opt.value;
    }
    scores[q.trait] = (scores[q.trait] || 0) + traitScore;
  }

  if (answers && answers.length > 0) {
    const allTraits = new Set<string>();
    questions.forEach((q) => allTraits.add(q.trait));
    allTraits.forEach((t) => {
      if (!(t in scores)) scores[t] = 0;
    });
  }

  if (answers && answers.length > 0) {
    const answer = answers.find((a) => a.questionId === 'problem-solving');
    if (answer) {
      scores['problem-solving'] = (scores['problem-solving'] || 0) + (answer.selected.length > 0 ? 1 : 0);
    }
  }

  return scores;
}

export function matchCareers(
  traitScores: Record<string, number>,
  profile: StudentProfile | null
): CareerMatch[] {
  const maxTraitScore = Math.max(1, ...Object.values(traitScores));

  const matches: CareerMatch[] = careers.map((career) => {
    let totalWeight = 0;
    let earnedScore = 0;

    for (const [trait, weight] of Object.entries(career.traitWeights)) {
      const traitScore = traitScores[trait] || 0;
      const normalized = traitScore / maxTraitScore;
      earnedScore += normalized * weight;
      totalWeight += weight;
    }

    let bonus = 0;
    if (profile) {
      if (profile.skills) {
        const overlap = career.skills.filter((s) =>
          profile.skills.some((ps) => s.toLowerCase().includes(ps.toLowerCase()) || ps.toLowerCase().includes(s.toLowerCase()))
        );
        bonus += overlap.length * 2;
      }

      if (profile.workStyle === 'hands-on' && career.matchTraits.includes('hands-on')) bonus += 3;
      if (profile.workStyle === 'creative' && career.matchTraits.includes('creativity')) bonus += 3;
      if (profile.workStyle === 'analytical' && career.matchTraits.includes('problem-solving')) bonus += 3;
      if (profile.workStyle === 'collaborative' && career.matchTraits.includes('helping-people')) bonus += 2;
      if (profile.workStyle === 'independent' && career.traitWeights.length > 2) bonus += 1;

      if (profile.favoriteSubjects) {
        const subjectBonus = checkSubjectMatch(profile.favoriteSubjects, career);
        bonus += subjectBonus;
      }
    }

    const baseScore = (earnedScore / totalWeight) * 100;
    const finalScore = Math.min(100, Math.round(baseScore + bonus));

    const matchedTraits = career.matchTraits.filter((t) => (traitScores[t] || 0) > 0);

    return {
      career,
      score: Math.max(15, finalScore),
      matchedTraits,
    };
  });

  return matches.sort((a, b) => b.score - a.score);
}

function checkSubjectMatch(subjects: string[], career: Career): number {
  const subjectMap: Record<string, string[]> = {
    Mathematics: ['software-developer', 'data-analyst', 'engineer', 'researcher', 'civil-services'],
    Physics: ['engineer', 'researcher', 'software-developer'],
    Chemistry: ['doctor', 'researcher', 'engineer', 'environmental-specialist'],
    Biology: ['doctor', 'researcher', 'environmental-specialist'],
    'Computer Science': ['software-developer', 'data-analyst', 'digital-marketer', 'graphic-designer'],
    Economics: ['data-analyst', 'entrepreneur', 'civil-services', 'digital-marketer'],
    'Business Studies': ['entrepreneur', 'digital-marketer', 'civil-services'],
    Accountancy: ['entrepreneur', 'data-analyst', 'digital-marketer'],
    'Art & Design': ['graphic-designer'],
    'Environmental Science': ['environmental-specialist', 'researcher'],
    'Political Science': ['civil-services', 'teacher'],
    History: ['civil-services', 'teacher'],
    Psychology: ['teacher', 'doctor'],
    English: ['teacher', 'civil-services', 'digital-marketer', 'graphic-designer'],
  };

  let bonus = 0;
  for (const subject of subjects) {
    const matchingCareerIds = subjectMap[subject];
    if (matchingCareerIds && matchingCareerIds.includes(career.id)) {
      bonus += 3;
    }
  }
  return Math.min(bonus, 10);
}

export function getTopMatches(matches: CareerMatch[], count = 5): CareerMatch[] {
  return matches.slice(0, count);
}
