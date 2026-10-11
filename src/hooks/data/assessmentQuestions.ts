export interface AssessmentQuestion {
  id: string;
  trait: string;
  title: string;
  description: string;
  multiSelect: boolean;
  options: {
    id: string;
    label: string;
    description: string;
    value: number;
  }[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'problem-solving',
    trait: 'problem-solving',
    title: 'Problem Solving & Logical Thinking',
    description: 'How do you approach challenges and complex situations?',
    multiSelect: true,
    options: [
      { id: 'ps1', label: 'I enjoy puzzles and logic games', description: 'Sudoku, chess, riddles, coding challenges', value: 3 },
      { id: 'ps2', label: 'I break big problems into smaller steps', description: 'Methodical, step-by-step approach', value: 2 },
      { id: 'ps3', label: 'I like finding patterns in data', description: 'Noticing trends and connections', value: 2 },
      { id: 'ps4', label: 'I stay calm under pressure', description: 'Think clearly in difficult situations', value: 1 },
    ],
  },
  {
    id: 'creativity',
    trait: 'creativity',
    title: 'Creativity & Design',
    description: 'How do you express your creative side?',
    multiSelect: true,
    options: [
      { id: 'cr1', label: 'I enjoy drawing, painting, or design', description: 'Visual arts and creative expression', value: 3 },
      { id: 'cr2', label: 'I love coming up with new ideas', description: 'Brainstorming and ideation', value: 2 },
      { id: 'cr3', label: 'I like making things look beautiful', description: 'Aesthetic sense and attention to detail', value: 2 },
      { id: 'cr4', label: 'I enjoy storytelling and writing', description: 'Crafting narratives and content', value: 1 },
    ],
  },
  {
    id: 'helping-people',
    trait: 'helping-people',
    title: 'Helping People & Communication',
    description: 'How do you connect with and support others?',
    multiSelect: true,
    options: [
      { id: 'hp1', label: 'I enjoy teaching and explaining things', description: 'Helping others understand', value: 3 },
      { id: 'hp2', label: 'I am a good listener', description: 'People come to me for advice', value: 2 },
      { id: 'hp3', label: 'I want to make a difference in people\u2019s lives', description: 'Service-oriented mindset', value: 2 },
      { id: 'hp4', label: 'I enjoy public speaking and presentations', description: 'Comfortable in front of audiences', value: 1 },
    ],
  },
  {
    id: 'science-research',
    trait: 'science',
    title: 'Science & Research',
    description: 'How curious are you about the natural world?',
    multiSelect: true,
    options: [
      { id: 'sc1', label: 'I love experiments and discovery', description: 'Hands-on scientific exploration', value: 3 },
      { id: 'sc2', label: 'I enjoy learning how things work', description: 'Understanding mechanisms and systems', value: 2 },
      { id: 'sc3', label: 'I like reading about scientific discoveries', description: 'Staying curious about research', value: 2 },
      { id: 'sc4', label: 'I care about the environment and sustainability', description: 'Green thinking and conservation', value: 1 },
    ],
  },
  {
    id: 'business-leadership',
    trait: 'business',
    title: 'Business & Leadership',
    description: 'How do you lead and create impact?',
    multiSelect: true,
    options: [
      { id: 'bl1', label: 'I enjoy leading teams and initiatives', description: 'Taking charge and organizing', value: 3 },
      { id: 'bl2', label: 'I have ideas for businesses or products', description: 'Entrepreneurial thinking', value: 2 },
      { id: 'bl3', label: 'I am good at planning and organizing', description: 'Strategic and structured', value: 2 },
      { id: 'bl4', label: 'I enjoy negotiating and persuading', description: 'Influence and communication', value: 1 },
    ],
  },
  {
    id: 'technology',
    trait: 'technology',
    title: 'Technology & Computers',
    description: 'How comfortable are you with technology?',
    multiSelect: true,
    options: [
      { id: 'tc1', label: 'I enjoy coding or want to learn', description: 'Programming and software', value: 3 },
      { id: 'tc2', label: 'I like exploring new apps and tools', description: 'Tech-savvy and curious', value: 2 },
      { id: 'tc3', label: 'I enjoy building or fixing tech things', description: 'Hardware, gadgets, systems', value: 2 },
      { id: 'tc4', label: 'I spend a lot of time on computers', description: 'Comfortable with digital environments', value: 1 },
    ],
  },
  {
    id: 'hands-on',
    trait: 'hands-on',
    title: 'Practical & Hands-on Work',
    description: 'How do you like to work with your hands?',
    multiSelect: true,
    options: [
      { id: 'ho1', label: 'I enjoy building or fixing physical things', description: 'Working with tools and materials', value: 3 },
      { id: 'ho2', label: 'I learn best by doing, not just reading', description: 'Experiential learning preference', value: 2 },
      { id: 'ho3', label: 'I like working outdoors and on-site', description: 'Active, non-desk work', value: 2 },
      { id: 'ho4', label: 'I enjoy DIY projects and crafts', description: 'Making things from scratch', value: 1 },
    ],
  },
];
