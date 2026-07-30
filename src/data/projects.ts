export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  /** Not every project has a shareable screenshot — omit rather than link a missing file. */
  image?: string;
  date: string;
  desc: string;
  tech?: string[];
  featured?: boolean;
}

const data: Project[] = [
  {
    title: 'PRODynamics',
    subtitle: 'Built during a CIFRE industrial PhD at FORVIA Clean Mobility',
    date: '2023-06-01',
    desc: 'AI-powered tool for preliminary assembly-line design, now used at company scale for automated, data-driven line design decisions that used to take engineers days to work through by hand.',
    tech: ['Python', 'Reinforcement Learning', 'Optimization'],
    featured: true,
  },
];

export default data;
