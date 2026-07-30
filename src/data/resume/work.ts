/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'FORVIA Group',
    position: 'Digital & AI Strategy Manager',
    url: 'https://forvia.com',
    startDate: '2025-01-01',
    summary: `Focus on Data, AI & GenAI Roadmap, Digital Solutions.
Leading digital transformation projects for procurement at Group level (6 business groups).`,
  },
  {
    name: 'FORVIA Clean Mobility',
    position: 'Digital & AI Solutions Lead',
    url: 'https://forvia.dev',
    startDate: '2021-03-01',
    endDate: '2025-01-01',
    summary: `Drove several digital and AI initiatives across Industrial and Operations func- tions. Creator of PRODynamics, an AI-powered preliminary assembly line design tool, delivered through a three-year CIFRE industrial PhD conducted within FCM’s Operations department`,
  },
  {
    name: 'RESPI-NATATION',
    position: 'AI Tech Lead',
    url: 'https://liris.com',
    startDate: '2020-11-01',
    endDate: '2021-03-01',
    summary: `Directed the NEPTUNE project team, designing AI models for video-based detection of swimmers’ breathing strategies, in partnership with the French Swimming Federation (FFN).`,
  },
  {
    name: 'CEA Tech',
    position: 'Data Scientist',
    url: 'http://cea-tech.fr',
    startDate: '2020-04-01',
    endDate: '2020-09-01',
    summary: `Developed and deployed optimization tools for Residual Gas data analysis using machine learning models and statistical methods, in collaboration with the CEA Tech team.`,
  },
];

export default work;
