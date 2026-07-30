export interface WritingItem {
  title: string;
  url: string;
  date: string;
  description: string;
}

const data: WritingItem[] = [
  // Academic papers from the PhD years, on assembly line design and
  // manufacturing automation. Kept in date-descending order like the rest
  // of this file — src/data/__tests__/writing.test.ts enforces it.
  {
    title:
      'Swarm Intelligence-Based Framework for Accelerated and Optimized Assembly Line Design in the Automotive Industry',
    url: 'https://link.springer.com/article/10.1007/s10845-023-02182-5',
    date: '2024-06-28',
    description:
      'Two discrete metaheuristics for hybrid assembly line balancing beat expert-tuned baselines by up to 20% on cycle time. Journal of Intelligent Manufacturing.',
  },
  {
    title:
      'Online Reinforcement Learning for Designing Automotive Hybrid Assembly Sequence: A Task Clustering-Guided Approach',
    // No standalone DOI found yet — links to the author's Scholar profile,
    // where this paper is listed. Fragment keeps the URL unique from the
    // IEEM 2023 entry below, which links the same profile.
    url: 'https://scholar.google.com/citations?user=anQcJ10AAAAJ&hl=en#aiai-2024',
    date: '2024-06-27',
    description:
      'A task-clustering-guided reinforcement learning approach for sequencing hybrid automotive assembly lines. IFIP AIAI 2024, Corfu.',
  },
  {
    title:
      'A Comparative Analysis of Hybrid Assembly Line Key Performance Indicators Between a Real-world Industrial Setting and a Fast Discrete Event Simulator',
    // Same fallback as the AIAI 2024 entry above — no standalone DOI found.
    url: 'https://scholar.google.com/citations?user=anQcJ10AAAAJ&hl=en#ieem-2023',
    date: '2023-12-18',
    description:
      'Comparing KPIs measured on a real hybrid assembly line against a fast discrete-event simulator. IEEE IEEM 2023, Singapore.',
  },
  {
    title:
      'ManufactSim: Manufacturing Line Simulation Using Heterogeneous Distributed Robots',
    url: 'https://www.researchgate.net/publication/359601087_ManufactSim_Manufacturing_Line_Simulation_Using_Heterogeneous_Distributed_Robots',
    date: '2022-04-13',
    description:
      'A manufacturing line simulator built on heterogeneous distributed robots. IEEE AINA 2022, Sydney.',
  },
  {
    title:
      'Parameters Correlation of Deep Learning Model for Visual Inspection in the Automotive Industry',
    url: 'https://ieeexplore.ieee.org/document/9790250/',
    date: '2022-03-18',
    description:
      'Combining model confidence scores with visual explanation heatmaps to improve automotive weld-seam inspection accuracy. IEEE ICCCR 2022, Shanghai.',
  },
];

export default data;
