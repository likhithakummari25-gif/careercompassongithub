export interface ParentSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export const parentSections: ParentSection[] = [
  {
    id: 'ask-questions',
    title: 'Questions to Ask Your Child',
    icon: 'HelpCircle',
    description: 'Start open, judgment-free conversations with these prompts.',
    items: [
      'What subjects do you enjoy the most, and what makes them fun?',
      'Which subjects do you find difficult? Is it the topic or the way it is taught?',
      'If you had a free weekend and no homework, what would you choose to do?',
      'What kind of problems do you like solving — people problems, technical problems, or creative challenges?',
      'Who do you admire, and what about their work interests you?',
      'What does a good day look like for you — working alone, in a team, outdoors, or at a desk?',
    ],
  },
  {
    id: 'understand-strengths',
    title: 'Understanding Their Interests & Strengths',
    icon: 'Lightbulb',
    description: 'Observe patterns in what your child naturally gravitates toward.',
    items: [
      'Notice which activities they do without being asked — that is a strong signal.',
      'Pay attention to what they talk about excitedly — passion shows in enthusiasm.',
      'Look at how they handle challenges: do they research, build, or talk it out?',
      'Ask their teachers what strengths they see in the classroom.',
      'Encourage exploration — interests evolve, and that is healthy.',
    ],
  },
  {
    id: 'fees-affordability',
    title: 'Discussing Fees & Affordability',
    icon: 'Wallet',
    description: 'Have honest, supportive conversations about finances.',
    items: [
      'Be transparent about what the family can afford without guilt or pressure.',
      'Research scholarships and financial aid together — there are more options than many realize.',
      'Compare total costs (tuition + living + materials), not just tuition fees.',
      'Consider government colleges and scholarships — they often match or exceed private quality.',
      'Discuss education loans honestly — including repayment timelines.',
      'For ITI and diploma courses, costs are much lower and apprenticeships may provide stipend income.',
    ],
  },
  {
    id: 'comparing-options',
    title: 'Comparing Career Options Together',
    icon: 'Scale',
    description: 'Use our comparison tool and these tips to weigh options.',
    items: [
      'Compare not just salary, but also demand, work style, and growth potential.',
      'Talk about what daily life in each career looks like — not just the title.',
      'Consider the study duration — some paths take 3 years, others take 8+.',
      'Discuss backup options — a Plan B reduces anxiety for both of you.',
      'Use the Career Compass comparison feature to see careers side by side.',
    ],
  },
  {
    id: 'support-without-pressure',
    title: 'Supporting Without Pressure',
    icon: 'HeartHandshake',
    description: 'Guide your child without imposing your own preferences.',
    items: [
      'Listen more than you speak — your child needs a sounding board, not a verdict.',
      'Avoid comparing them to relatives or neighbors — every journey is unique.',
      'It is okay if their first choice changes — exploration is part of growing up.',
      'Celebrate their self-awareness — knowing what they want is a skill.',
      'Share your concerns as questions, not commands: "What do you think about…?"',
    ],
  },
  {
    id: 'discussion-checklist',
    title: 'Career Discussion Checklist',
    icon: 'ClipboardCheck',
    description: 'Use this checklist for a productive career conversation.',
    items: [
      '\u2610 We discussed the child\u2019s top 3 interests and what they enjoy about them',
      '\u2610 We talked about which subjects are difficult and how to address them',
      '\u2610 We reviewed the assessment results together',
      '\u2610 We compared at least 2 career options using the comparison tool',
      '\u2610 We discussed pathways after 10th / 12th and which ones fit',
      '\u2610 We talked about education costs and what the family can support',
      '\u2610 We looked at scholarships and financial aid options',
      '\u2610 We discussed the roadmap for the top career choice',
      '\u2610 We agreed on next steps and a timeline',
      '\u2610 We agreed to revisit the conversation in a few weeks',
    ],
  },
];

export interface ParentStageGuide {
  level: string;
  label: string;
  questions: string[];
}

export const parentStageGuides: ParentStageGuide[] = [
  {
    level: '10th',
    label: 'After 10th Standard',
    questions: [
      'Which subjects does your child enjoy most? This helps choose between MPC, BiPC, MEC, etc.',
      'Does your child prefer theory and exams, or practical hands-on work? (This might point to Polytechnic or ITI)',
      'What is the approximate budget for intermediate education?',
      'Has your child shown interest in any particular career field?',
    ],
  },
  {
    level: 'inter',
    label: 'During Intermediate (11th-12th)',
    questions: [
      'How is your child coping with the current stream? Should we consider alternatives?',
      'What entrance exams should we start preparing for?',
      'Are there coaching classes or online resources we should explore?',
      'What backup options should we keep in case the first choice does not work out?',
    ],
  },
  {
    level: 'diploma',
    label: 'During Diploma',
    questions: [
      'Should your child pursue lateral entry into B.Tech, or start working after diploma?',
      'What specialization or advanced certifications would add value?',
      'Are there apprenticeship or internship opportunities nearby?',
    ],
  },
  {
    level: 'degree',
    label: 'During Degree / Undergraduate',
    questions: [
      'What internships or projects would strengthen your child\u2019s resume?',
      'Should they pursue postgraduate studies or enter the workforce?',
      'What skills beyond the degree would make them more employable?',
      'Have they explored career options related to their degree field?',
    ],
  },
];
