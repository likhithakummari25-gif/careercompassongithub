import type { Career, EducationLevel, RoadmapStep, PathwayNode, Stream } from '@/types';
import { pathways } from '@/data/pathways';

export function generateRoadmap(career: Career, educationLevel: EducationLevel): RoadmapStep[] {
  const baseSteps: RoadmapStep[] = [
    {
      id: 'study-next',
      title: 'What to Study Next',
      description: getStudyNext(career, educationLevel),
      timeframe: getStudyTimeframe(educationLevel),
      category: 'study',
    },
    {
      id: 'skills-to-learn',
      title: 'Skills to Develop',
      description: `Focus on building: ${career.skills.slice(0, 4).join(', ')}. Start with fundamentals and practice regularly through small exercises.`,
      timeframe: 'Ongoing',
      category: 'skills',
    },
    {
      id: 'beginner-projects',
      title: 'Beginner Projects to Build',
      description: career.beginnerProjects.map((p) => `\u2022 ${p}`).join('\n'),
      timeframe: 'Next 3\u20136 months',
      category: 'projects',
    },
    {
      id: 'courses',
      title: 'Courses & Qualifications',
      description: `${career.education}\n\nExplore: ${career.learningPathways.map((p) => p).join(', ')}`,
      timeframe: getCourseTimeframe(educationLevel),
      category: 'courses',
    },
    {
      id: 'experience',
      title: 'Internship & Experience',
      description: getExperienceAdvice(career, educationLevel),
      timeframe: 'Within 1\u20132 years',
      category: 'experience',
    },
    {
      id: 'short-term-goals',
      title: 'Short-term Goals',
      description: getShortTermGoals(career, educationLevel),
      timeframe: 'Next 6\u201312 months',
      category: 'goals',
    },
  ];

  return baseSteps;
}

function getStudyNext(career: Career, level: EducationLevel): string {
  switch (level) {
    case '10th':
      return `After 10th, choose a pathway that aligns with ${career.title}. Based on your interests, consider ${getRecommendedPathways(career)}. After intermediate, aim for ${career.education}.`;
    case 'inter-1':
      return `You are in your first year of intermediate. Focus on your current stream subjects and start preparing for entrance exams related to ${career.title}. After 12th, aim for ${career.education}.`;
    case 'inter-2':
      return `You are in your final year of intermediate. Intensively prepare for entrance exams for ${career.title}. After 12th, apply for ${career.education}.`;
    case 'diploma':
      return `Your diploma gives you a practical foundation. Consider lateral entry into a B.Tech program, or build a strong portfolio for ${career.title}. Focus on ${career.skills.slice(0, 2).join(' and ')}.`;
    case 'degree':
      return `You are in your degree program. Focus on ${career.skills.slice(0, 3).join(', ')} and start building real projects. Look for internships in ${career.category}.`;
    default:
      return career.education;
  }
}

function getRecommendedPathways(career: Career): string {
  const matchingPathways = pathways.filter((p) =>
    p.relatedCareers.includes(career.id)
  );
  if (matchingPathways.length === 0) return 'any stream that interests you';
  return matchingPathways.map((p) => p.title).join(' or ');
}

function getStudyTimeframe(level: EducationLevel): string {
  switch (level) {
    case '10th': return 'Next 2\u20133 years (Intermediate + entrance prep)';
    case 'inter-1': return 'Next 1\u20132 years';
    case 'inter-2': return 'Next 6\u201312 months';
    case 'diploma': return 'Next 1\u20132 years';
    case 'degree': return 'Ongoing';
    default: return 'Ongoing';
  }
}

function getCourseTimeframe(level: EducationLevel): string {
  switch (level) {
    case '10th': return 'After 12th grade';
    case 'inter-1': return 'After 12th grade';
    case 'inter-2': return 'After 12th grade (applying now)';
    case 'diploma': return 'Next 1\u20133 years';
    case 'degree': return 'Current degree + certifications';
    default: return 'Ongoing';
  }
}

function getExperienceAdvice(career: Career, level: EducationLevel): string {
  const base = career.beginnerProjects[0];
  if (level === '10th' || level === 'inter-1' || level === 'inter-2') {
    return `Start with ${base}. Look for shadowing opportunities, workshops, and summer programs related to ${career.category}.`;
  }
  return `Apply for internships in ${career.category}. Start with ${base}, then seek structured internships. Attend industry meetups and build a network.`;
}

function getShortTermGoals(career: Career, level: EducationLevel): string {
  const goals = [
    `Complete one beginner project in ${career.title} this month`,
    `Learn one core skill: ${career.skills[0]}`,
    `Research and bookmark 3 learning resources`,
  ];
  if (level === 'degree') {
    goals.push(`Apply for at least 2 internships in ${career.category}`);
  }
  if (level === '10th' || level === 'inter-1' || level === 'inter-2') {
    goals.push(`Talk to someone working in ${career.title} — ask them about their journey`);
  }
  if (level === 'inter-2') {
    goals.push(`Register and prepare for relevant entrance exams`);
  }
  return goals.map((g) => `\u2022 ${g}`).join('\n');
}

export function generatePathwayFlow(
  educationLevel: EducationLevel,
  stream: Stream,
  careerId: string | null
): PathwayNode[] {
  const nodes: PathwayNode[] = [];

  if (educationLevel === '10th') {
    nodes.push({
      id: 'ssc',
      label: '10th SSC',
      description: 'Complete your 10th standard',
      icon: 'GraduationCap',
    });

    const matchingPathways = careerId
      ? pathways.filter((p) => p.relatedCareers.includes(careerId))
      : [];
    const recommendedPathway = matchingPathways[0];

    if (recommendedPathway) {
      nodes.push({
        id: recommendedPathway.id,
        label: recommendedPathway.title,
        description: recommendedPathway.description,
        icon: recommendedPathway.icon,
      });
    } else {
      nodes.push({
        id: 'intermediate',
        label: 'Intermediate',
        description: 'Choose a stream that fits your interests',
        icon: 'BookOpen',
      });
    }

    nodes.push({
      id: 'degree',
      label: 'Degree / Higher Education',
      description: 'Pursue a bachelor\u2019s degree or equivalent',
      icon: 'Briefcase',
    });
  } else if (educationLevel === 'inter-1' || educationLevel === 'inter-2') {
    nodes.push({
      id: 'ssc',
      label: '10th SSC',
      description: 'Completed',
      icon: 'CheckCircle',
    });

    const streamPathway = pathways.find((p) => {
      if (stream === 'MPC') return p.id === 'mpc';
      if (stream === 'BiPC') return p.id === 'bipc';
      if (stream === 'MEC') return p.id === 'mec';
      if (stream === 'CEC') return p.id === 'cec';
      if (stream === 'HEC') return p.id === 'hec';
      return false;
    });

    nodes.push({
      id: 'intermediate',
      label: stream ? `Intermediate ${stream}` : 'Intermediate',
      description: streamPathway ? streamPathway.description : 'Your current stream',
      icon: streamPathway ? streamPathway.icon : 'BookOpen',
    });

    nodes.push({
      id: 'entrance',
      label: 'Entrance Exams',
      description: streamPathway ? streamPathway.entranceExams.join(', ') : 'Prepare for relevant entrance exams',
      icon: 'Target',
    });

    nodes.push({
      id: 'degree',
      label: 'Degree / Higher Education',
      description: 'Pursue a bachelor\u2019s degree based on your stream and interests',
      icon: 'Briefcase',
    });
  } else if (educationLevel === 'diploma') {
    nodes.push({
      id: 'ssc',
      label: '10th SSC',
      description: 'Completed',
      icon: 'CheckCircle',
    });
    nodes.push({
      id: 'diploma',
      label: 'Polytechnic Diploma',
      description: 'Currently pursuing or completed',
      icon: 'Wrench',
    });
    nodes.push({
      id: 'lateral',
      label: 'Lateral Entry / Employment',
      description: 'Enter B.Tech 2nd year or start working',
      icon: 'ArrowRight',
    });
  } else if (educationLevel === 'degree') {
    nodes.push({
      id: 'ssc',
      label: '10th SSC',
      description: 'Completed',
      icon: 'CheckCircle',
    });
    nodes.push({
      id: 'intermediate',
      label: 'Intermediate',
      description: 'Completed',
      icon: 'CheckCircle',
    });
    nodes.push({
      id: 'degree',
      label: 'Degree / UG',
      description: 'Currently pursuing',
      icon: 'Briefcase',
    });
    nodes.push({
      id: 'pg-or-job',
      label: 'PG / Employment',
      description: 'Pursue postgraduate studies or start your career',
      icon: 'Target',
    });
  }

  nodes.push({
    id: 'skills',
    label: 'Skill Development',
    description: 'Build technical and soft skills through projects and courses',
    icon: 'Zap',
  });
  nodes.push({
    id: 'internships',
    label: 'Internships & Experience',
    description: 'Gain real-world experience and build a network',
    icon: 'Briefcase',
  });
  nodes.push({
    id: 'career',
    label: 'Career Opportunities',
    description: careerId ? 'Enter your chosen career field' : 'Enter your chosen career field',
    icon: 'Rocket',
  });

  return nodes;
}
