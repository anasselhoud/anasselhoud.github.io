export interface Talk {
  title: string;
  type: string;
  event: string;
  location: string;
  /** ISO date (first of the month) — sort key only, month precision is all that's known. */
  date: string;
  dateLabel: string;
  category: 'talk' | 'workshop';
}

const talks: Talk[] = [
  {
    title: 'IEEM23 Paper Conference Presentation',
    type: 'Conference',
    event: 'Industrial Engineering and Engineering Management',
    location: 'Singapore',
    date: '2023-12-01',
    dateLabel: 'December 2023',
    category: 'talk',
  },
  {
    title: 'Introduction to AI & Manufacturing Line Design Automation',
    type: 'Invited Talk',
    event: 'Global Material Network Meeting @ FORVIA',
    location: 'Germany',
    date: '2022-08-01',
    dateLabel: 'August 2022',
    category: 'talk',
  },
  {
    title: 'AI for Automating the Manufacturing Line Design',
    type: 'Seminar Talk',
    event: 'Young Scientists Day @ FORVIA',
    location: 'France',
    date: '2022-07-01',
    dateLabel: 'July 2022',
    category: 'talk',
  },
  {
    title: 'A Brief Introduction into Natural Language Processing',
    type: 'Invited Talk',
    event: 'BlaBlaConf for AI/Big Data Seminar',
    location: 'Morocco',
    date: '2020-11-01',
    dateLabel: 'November 2020',
    category: 'talk',
  },
  {
    title: 'Space Apps Global Problem Solver',
    type: 'Hackathon',
    event: 'NASA Space Apps COVID-19 Challenge',
    location: 'USA — Online',
    date: '2020-05-01',
    dateLabel: 'May 2020',
    category: 'workshop',
  },
  {
    title: 'Innovation Challenge Arabia Hackathon',
    type: 'Hackathon',
    event: 'Arab Congress of Innovation',
    location: 'Morocco',
    date: '2018-12-01',
    dateLabel: 'December 2018',
    category: 'workshop',
  },
];

export default talks;
