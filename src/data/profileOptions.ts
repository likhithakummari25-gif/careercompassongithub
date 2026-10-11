import type { EducationLevel, Stream } from '@/types';

export const educationLevels: { value: EducationLevel; label: string; description: string }[] = [
  { value: '10th', label: '10th Standard (SSC)', description: 'Currently in 10th class' },
  { value: 'inter-1', label: 'Intermediate 1st Year (11th)', description: 'First year of Intermediate' },
  { value: 'inter-2', label: 'Intermediate 2nd Year (12th)', description: 'Final year of Intermediate' },
  { value: 'diploma', label: 'Diploma', description: 'Polytechnic or technical diploma' },
  { value: 'degree', label: 'Degree / Undergraduate', description: 'College or university student' },
];

export const streams: { value: Stream; label: string; description: string }[] = [
  { value: 'MPC', label: 'MPC', description: 'Maths, Physics, Chemistry — Engineering & Technology focused' },
  { value: 'BiPC', label: 'BiPC', description: 'Biology, Physics, Chemistry — Medical & Life Sciences focused' },
  { value: 'MEC', label: 'MEC', description: 'Maths, Economics, Commerce — Business & Finance focused' },
  { value: 'CEC', label: 'CEC', description: 'Commerce, Economics, Civics — Commerce & Civil Services focused' },
  { value: 'HEC', label: 'HEC', description: 'History, Economics, Civics — Humanities & Social Sciences focused' },
  { value: 'Other', label: 'Other', description: 'A different combination or stream' },
];

export const degreeFields = [
  'B.Tech / B.E. (Engineering)',
  'B.Sc (Science)',
  'B.Com (Commerce)',
  'B.A. (Arts / Humanities)',
  'BBA (Business Administration)',
  'BCA (Computer Applications)',
  'MBBS (Medical)',
  'B.Pharm (Pharmacy)',
  'LLB (Law)',
  'B.Des / BFA (Design / Fine Arts)',
  'Other',
];

export const workStyles = [
  { value: 'hands-on', label: 'Hands-on & Practical', icon: 'Wrench' },
  { value: 'analytical', label: 'Analytical & Logical', icon: 'Brain' },
  { value: 'creative', label: 'Creative & Expressive', icon: 'Palette' },
  { value: 'collaborative', label: 'Collaborative & Team-based', icon: 'Users' },
  { value: 'independent', label: 'Independent & Self-driven', icon: 'Compass' },
] as const;

export const subjectOptions = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English', 'Social Studies', 'Economics', 'Business Studies', 'Accountancy',
  'History', 'Geography', 'Political Science', 'Psychology', 'Art & Design',
  'Environmental Science', 'Engineering Drawing', 'Physical Education',
  'Telugu', 'Hindi', 'Sanskrit',
];

export const difficultSubjectOptions = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English', 'Economics', 'Accountancy', 'History', 'Political Science',
];

export const interestOptions = [
  'Gaming', 'Reading', 'Writing', 'Music', 'Sports', 'Photography',
  'Cooking', 'Travel', 'Debating', 'Volunteering', 'Crafts', 'Robotics',
  'Astronomy', 'Gardening', 'Movies & Films', 'Fashion', 'Fitness', 'Coding',
];

export const skillOptions = [
  'Communication', 'Leadership', 'Analytical thinking', 'Creativity',
  'Teamwork', 'Problem-solving', 'Public speaking', 'Writing',
  'Organizing events', 'Programming', 'Design', 'Research',
  'Time management', 'Adaptability', 'Attention to detail',
];

export const locationOptions = [
  'Local / Hometown', 'Metro City', 'Anywhere in India', 'Abroad', 'Online / Remote',
];
