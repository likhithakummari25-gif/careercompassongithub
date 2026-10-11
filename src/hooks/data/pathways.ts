import type { Pathway } from '@/types';

export const pathways: Pathway[] = [
  {
    id: 'mpc',
    title: 'Intermediate MPC',
    shortName: 'MPC',
    icon: 'Calculator',
    description:
      'Maths, Physics, and Chemistry — the classic path for engineering, architecture, and technology careers.',
    whatYouStudy: [
      'Mathematics (algebra, calculus, trigonometry)',
      'Physics (mechanics, electricity, optics)',
      'Chemistry (organic, inorganic, physical)',
      'English and a second language',
    ],
    whoMightEnjoy: [
      'Students who enjoy problem-solving and logic',
      'Those who like understanding how machines and systems work',
      'Students strong in mathematics and physics',
    ],
    futureCourses: [
      'B.Tech / B.E. (Engineering) — various branches',
      'B.Arch (Architecture)',
      'B.Sc (Maths, Physics, Chemistry)',
      'BCA (Computer Applications)',
      'Integrated M.Sc programs',
    ],
    relatedCareers: ['engineer', 'software-developer', 'data-analyst', 'researcher'],
    entranceExams: ['EAMCET / ECET', 'JEE Main & Advanced', 'Various state CETs'],
  },
  {
    id: 'bipc',
    title: 'Intermediate BiPC',
    shortName: 'BiPC',
    icon: 'Dna',
    description:
      'Biology, Physics, and Chemistry — the path for medicine, life sciences, and health careers.',
    whatYouStudy: [
      'Biology (botany and zoology)',
      'Physics (basics and applications)',
      'Chemistry (organic, inorganic, physical)',
      'English and a second language',
    ],
    whoMightEnjoy: [
      'Students fascinated by living organisms and the human body',
      'Those who want to help people through healthcare',
      'Students who enjoy lab work and experiments',
    ],
    futureCourses: [
      'MBBS (Medicine)',
      'BDS (Dentistry)',
      'B.Pharm (Pharmacy)',
      'B.Sc (Nursing, Biotechnology, Agriculture)',
      'BVSc (Veterinary Science)',
    ],
    relatedCareers: ['doctor', 'researcher', 'environmental-specialist'],
    entranceExams: ['NEET', 'EAMCET (Medical stream)', 'AIIMS entrance'],
  },
  {
    id: 'mec',
    title: 'Intermediate MEC',
    shortName: 'MEC',
    icon: 'TrendingUp',
    description:
      'Maths, Economics, and Commerce — the path for business, finance, and data careers.',
    whatYouStudy: [
      'Mathematics (statistics, probability, basics)',
      'Economics (micro and macro)',
      'Commerce (business studies)',
      'English and a second language',
    ],
    whoMightEnjoy: [
      'Students interested in business and entrepreneurship',
      'Those who like working with numbers and data',
      'Students who enjoy understanding markets and finance',
    ],
    futureCourses: [
      'B.Com (Commerce)',
      'BBA (Business Administration)',
      'B.Sc (Economics, Statistics)',
      'CA / CMA / CS professional courses',
      'Integrated BBA-MBA programs',
    ],
    relatedCareers: ['entrepreneur', 'data-analyst', 'digital-marketer', 'civil-services'],
    entranceExams: ['IPMAT (IIM)', 'CLAT (if law inclined)', 'CA Foundation'],
  },
  {
    id: 'cec',
    title: 'Intermediate CEC',
    shortName: 'CEC',
    icon: 'Building2',
    description:
      'Commerce, Economics, and Civics — the path for accounting, civil services, and law careers.',
    whatYouStudy: [
      'Commerce (accountancy, business studies)',
      'Economics (micro and macro)',
      'Civics / Political Science',
      'English and a second language',
    ],
    whoMightEnjoy: [
      'Students interested in governance and public service',
      'Those who enjoy accounting and financial management',
      'Students who like debating policies and law',
    ],
    futureCourses: [
      'B.Com (Commerce)',
      'LLB (Law, after graduation)',
      'B.A. (Political Science, Economics)',
      'CA / CMA professional courses',
      'Civil services preparation',
    ],
    relatedCareers: ['civil-services', 'entrepreneur', 'digital-marketer', 'teacher'],
    entranceExams: ['CLAT (Law)', 'CA Foundation', 'UPSC CSE (after graduation)'],
  },
  {
    id: 'hec',
    title: 'Intermediate HEC',
    shortName: 'HEC',
    icon: 'BookOpen',
    description:
      'History, Economics, and Civics — the path for humanities, social sciences, and teaching careers.',
    whatYouStudy: [
      'History (Indian and world)',
      'Economics (basics)',
      'Civics / Political Science',
      'English and a second language',
    ],
    whoMightEnjoy: [
      'Students who love reading about history and society',
      'Those interested in teaching and education',
      'Students who enjoy writing and analysis',
    ],
    futureCourses: [
      'B.A. (History, Political Science, Economics)',
      'B.Ed (Teaching, after graduation)',
      'BBA / B.Com (if economics-focused)',
      'Mass Communication / Journalism',
    ],
    relatedCareers: ['teacher', 'civil-services', 'digital-marketer'],
    entranceExams: ['UPSC CSE (after graduation)', 'B.Ed entrance', 'University entrance exams'],
  },
  {
    id: 'polytechnic',
    title: 'Polytechnic Diploma',
    shortName: 'Diploma',
    icon: 'Wrench',
    description:
      'A 3-year technical diploma that gives practical engineering skills and direct entry into the workforce or lateral entry to B.Tech.',
    whatYouStudy: [
      'Core engineering subjects (branch-specific)',
      'Practical workshop sessions',
      'Technical drawing and design',
      'Industry-oriented projects',
    ],
    whoMightEnjoy: [
      'Students who prefer hands-on, practical learning',
      'Those who want to start earning sooner',
      'Students interested in technical trades',
    ],
    futureCourses: [
      'Lateral entry into B.Tech 2nd year',
      'Advanced specialization certifications',
      'Apprenticeship programs',
    ],
    relatedCareers: ['skilled-technical', 'engineer', 'software-developer'],
    entranceExams: ['POLYCET', 'Diploma entrance exams (state-wise)'],
  },
  {
    id: 'iti',
    title: 'ITI & Vocational Courses',
    shortName: 'ITI',
    icon: 'Hammer',
    description:
      'Short-term industrial training (6 months to 2 years) for specific trades — fastest path to skilled employment.',
    whatYouStudy: [
      'Trade-specific skills (electrician, fitter, mechanic, etc.)',
      'Safety practices and workshop procedures',
      'On-the-job training through apprenticeships',
    ],
    whoMightEnjoy: [
      'Students who want to start working quickly',
      'Those who enjoy manual, practical work',
      'Students interested in a specific trade',
    ],
    futureCourses: [
      'Apprenticeship under NAPS',
      'Advanced ITI specialization',
      'Skill India certifications',
    ],
    relatedCareers: ['skilled-technical'],
    entranceExams: ['ITI admission (merit-based or entrance)', 'State ITI entrance exams'],
  },
];

export function getPathwayById(id: string): Pathway | undefined {
  return pathways.find((p) => p.id === id);
}
