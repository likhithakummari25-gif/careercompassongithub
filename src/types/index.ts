export type EducationLevel = '10th' | 'inter-1' | 'inter-2' | 'diploma' | 'degree';

export type Stream = 'MPC' | 'BiPC' | 'MEC' | 'CEC' | 'HEC' | 'Other' | '';

export type WorkStyle = 'hands-on' | 'analytical' | 'creative' | 'collaborative' | 'independent';

export interface StudentProfile {
  name: string;
  educationLevel: EducationLevel;
  stream: Stream;
  degreeField: string;
  favoriteSubjects: string[];
  difficultSubjects: string[];
  interests: string[];
  skills: string[];
  workStyle: WorkStyle;
  careerGoals: string;
  preferredLocation: string;
  budget: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selected: string[];
}

export interface AssessmentResult {
  answers: AssessmentAnswer[];
  scores: Record<string, number>;
  profile: StudentProfile;
  completedAt: string;
}

export interface Career {
  id: string;
  title: string;
  icon: string;
  category: string;
  tags: string[];
  description: string;
  matchTraits: string[];
  education: string;
  qualifications: string[];
  skills: string[];
  beginnerProjects: string[];
  learningPathways: string[];
  advantages: string[];
  challenges: string[];
  estimatedCost?: string;
  costNote?: string;
  studyDuration: string;
  workActivities: string[];
  salaryRange: string;
  demandLevel: 'High' | 'Moderate' | 'Growing';
  traitWeights: Record<string, number>;
}

export interface Pathway {
  id: string;
  title: string;
  shortName: string;
  icon: string;
  description: string;
  whatYouStudy: string[];
  whoMightEnjoy: string[];
  futureCourses: string[];
  relatedCareers: string[];
  entranceExams: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  category: 'study' | 'skills' | 'projects' | 'courses' | 'experience' | 'goals';
}

export interface PathwayNode {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface SavedCareer {
  careerId: string;
  savedAt: string;
}

export interface DashboardData {
  savedCareers: SavedCareer[];
  lastAssessment: AssessmentResult | null;
  comparisons: string[][];
  roadmapProgress: Record<string, string[]>;
  recentlyExplored: string[];
}

export type PageId =
  | 'home'
  | 'profile'
  | 'assessment'
  | 'recommendations'
  | 'career-detail'
  | 'compare'
  | 'roadmap'
  | 'parent'
  | 'courses'
  | 'dashboard';
