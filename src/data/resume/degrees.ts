export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'Université Marie et Louis Pasteur',
    degree: 'PhD in AI & Computer Science',
    link: 'https://umlp.fr',
    year: 2024,
  },
  {
    school: 'Ecole Centrale de Lyon',
    degree: 'Engineering Degree in AI & Computer Science',
    link: 'https://centrale-lyon.fr',
    year: 2021,
  },
  {
    school: 'Arts et Métiers',
    degree: 'General Engineering Degree',
    link: 'https://www.ensam-umi.ac.ma/',
    year: 2012,
  },
];

export default degrees;
