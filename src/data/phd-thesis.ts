export interface JuryMember {
  name: string;
  role: string;
  institution: string;
  position: string;
  link?: string;
}

export interface PhdThesis {
  title: string;
  author: string;
  program: string;
  defenseDate: string;
  coverImage: string;
  partnerLogos: string;
  abstract: string[];
  jury: JuryMember[];
  links: {
    read: string;
    download: string;
    cite: string;
    defenseReplay: string;
  };
}

const thesis: PhdThesis = {
  title:
    'Artificial Intelligence-Based Approach for Hybrid Assembly Line Preliminary Design in the Automotive Industry',
  author: 'Anass ELHOUD',
  program:
    'CIFRE Ph.D. Thesis — FORVIA/Faurecia & University of Franche-Comté, FEMTO-ST Institute, CNRS (2024)',
  defenseDate: 'December 2024',
  coverImage: '/images/phd-thesis/thesis-cover.jpg',
  partnerLogos: '/images/phd-thesis/partner-logos.png',
  // Links are placeholders until the defended thesis PDF and defense
  // recording are published — see AGENTS.md before wiring real URLs here.
  links: {
    read: '#',
    download: '#',
    cite: '#',
    defenseReplay: '#',
  },
  abstract: [
    'In the dynamic landscape of the automotive industry, the imperative for innovative and efficient assembly line design is crucial. This doctoral thesis introduces a novel framework based on Artificial Intelligence for the automation and acceleration of the preliminary design of hybrid assembly lines in the automotive industry. The overarching goal is to revolutionize the conventional design process, hastening development, improving operational efficiency, and ultimately reducing time to market.',
    'The research is structured into three integral parts, each addressing pivotal aspects of assembly line design. The first segment focuses on the meticulous optimization of assembly scenarios and task/machine allocation. Utilizing metaheuristic algorithms, this section dissects the intricate details of assembly scenarios, ensuring an optimal arrangement of tasks and machines. By employing advanced optimization techniques, the framework aims to streamline the assembly process, minimizing bottlenecks, and enhancing overall productivity.',
    'The second part of the framework emphasizes resource optimization, specifically targeting the reduction of machines and operators. Rooted in reinforcement learning techniques, this phase aims to construct a globally optimized sequence that adheres to company rules and accommodates stakeholder preferences. Through a careful balance of efficiency and resource minimization, the framework aims to create assembly lines that are not only cost-effective but also tailored to meet the unique requirements of the automotive manufacturing environment.',
    'The third and final part of the thesis addresses the dynamic nature of assembly lines, tackling challenges such as breakdowns, hazards, buffer limitations, idle times, learning models and operator fatigue. This section integrates predictive modeling and stochastic approaches to anticipate and mitigate disruptions, fostering adaptability and resilience in the face of real-world manufacturing uncertainties. The inclusion of client constraints ensures that the designed assembly lines align with the specific needs and expectations of end-users.',
    'The holistic framework proposed in this thesis signifies a paradigm shift in assembly line design. By integrating state-of-the-art AI techniques, it not only expedites the design process but significantly enhances the efficiency and flexibility of automotive manufacturing. The outcomes of this research hold the promise of a transformative impact on the industry, providing a sophisticated toolset to designers and manufacturers striving to stay competitive in the automotive market. This AI-driven approach serves as a testament to the potential of technology to reshape traditional paradigms, enabling the creation of assembly lines that are not only optimized but also adaptive to the dynamic challenges of contemporary manufacturing.',
  ],
  jury: [
    {
      name: 'Prof. Clarisse Dhaenens',
      role: 'Research Director',
      institution: 'PolyTech Lille',
      position: 'President / Rapporteur',
      link: 'https://pro.univ-lille.fr/clarisse-dhaenens-flipo',
    },
    {
      name: 'Prof. David Lemoine',
      role: 'Professor',
      institution: 'IMT Atlantique',
      position: 'Rapporteur',
    },
    {
      name: 'Dr. Rémy Chevrier',
      role: 'Industrial Project Manager',
      institution: 'SNCF R&D',
      position: 'Examiner',
    },
    {
      name: 'Prof. Benoit Piranda',
      role: 'Professor',
      institution: 'University of Franche-Comté',
      position: 'Examiner',
      link: 'https://benoitpiranda.fr/',
    },
    {
      name: 'Prof. Julien Bourgeois',
      role: 'Professor',
      institution: 'University of Franche-Comté',
      position: 'Thesis Director',
      link: 'https://www.femto-st.fr/en/femto-people/jbourgeo',
    },
    {
      name: 'Dr. Raphael De Matos',
      role: 'Digital Senior Manager',
      institution: 'FORVIA Clean Mobility',
      position: 'Company Manager',
      link: 'https://www.linkedin.com/in/rapha%C3%ABl-de-matos-84bab920',
    },
  ],
};

export default thesis;
