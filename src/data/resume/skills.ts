export interface Skill {
  title: string;
  category: string;
}

export interface Category {
  name: string;
  /** Which half of the dual technical / strategy profile this category reads under. */
  group?: 'Technical' | 'Strategy & Leadership';
}

/**
 * Category → group lookup, kept separate from `skills` so `buildCategories`
 * can derive categories from the skill list while still assigning each one
 * a side of the technical / strategy split.
 */
const CATEGORY_GROUPS: Record<string, Category['group']> = {
  'AI & Data Science': 'Technical',
  'MLOps & Engineering': 'Technical',
  'Digital Strategy': 'Strategy & Leadership',
  'Leadership & Management': 'Strategy & Leadership',
};

const skills: Skill[] = [
  // AI & Data Science
  { title: 'Generative AI & LLMs', category: 'AI & Data Science' },
  { title: 'Machine Learning', category: 'AI & Data Science' },
  { title: 'Industrial AI', category: 'AI & Data Science' },
  { title: 'Computer Vision', category: 'AI & Data Science' },
  { title: 'Reinforcement Learning', category: 'AI & Data Science' },
  { title: 'Statistical Modeling', category: 'AI & Data Science' },
  // MLOps & Engineering
  { title: 'Python', category: 'MLOps & Engineering' },
  { title: 'SQL', category: 'MLOps & Engineering' },
  { title: 'Cloud Platforms', category: 'MLOps & Engineering' },
  { title: 'Docker & Kubernetes', category: 'MLOps & Engineering' },
  { title: 'Git', category: 'MLOps & Engineering' },
  { title: 'CI/CD', category: 'MLOps & Engineering' },
  // Digital Strategy
  {
    title: 'Digital Transformation Roadmap',
    category: 'Digital Strategy',
  },
  { title: 'Data & AI Strategy', category: 'Digital Strategy' },
  { title: 'Data Ownership', category: 'Digital Strategy' },
  { title: 'Innovation Strategy', category: 'Digital Strategy' },
  { title: 'Change Management', category: 'Digital Strategy' },
  // Leadership & Management
  {
    title: 'Executive Stakeholder Communication',
    category: 'Leadership & Management',
  },
  {
    title: 'Cross-Functional Projects Leadership',
    category: 'Leadership & Management',
  },
  { title: 'Technical Team Mentoring', category: 'Leadership & Management' },
  { title: 'Digital Project Management', category: 'Leadership & Management' },
];

/**
 * Build categories from skills, tagging each with the group it reads under
 * (falling back to Technical for any category not in the lookup, so a new
 * category never renders blank).
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.map((skill) => skill.category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    group: CATEGORY_GROUPS[category] ?? 'Technical',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
