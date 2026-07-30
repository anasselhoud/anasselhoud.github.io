export interface Book {
  title: string;
  author: string;
  category: string;
  /** 1-5, whole or half-star (e.g. 3.5). Shown as filled/outline stars. */
  rating: number;
  featured?: boolean;
  image: string;
}

const books: Book[] = [
  {
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    category: 'Science Fiction',
    rating: 5,
    featured: true,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg',
  },
  {
    title: 'Dark Forest',
    author: 'Liu Cixin',
    category: 'Science Fiction',
    rating: 5,
    featured: true,
    image:
      'https://m.media-amazon.com/images/I/81yrzReGlRL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'The Good Life',
    author: 'Robert Waldinger & Marc Schulz',
    category: 'Nonfiction',
    rating: 4,
    featured: true,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1671981018i/61272271.jpg',
  },
  {
    title: "Chip War: The Fight for the World's Most Critical Technology",
    author: 'Chris Miller',
    category: 'Nonfiction',
    rating: 4,
    featured: true,
    image:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1662566820i/60321447.jpg',
  },
  {
    title: 'Ultra-Processed People',
    author: 'Chris van Tulleken',
    category: 'Nonfiction',
    rating: 4,
    featured: true,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1679715862i/62586003.jpg',
  },
  {
    title: 'The Phoenix Project',
    author: 'Gene Kim, Kevin Behr, George Spafford',
    category: 'Nonfiction',
    rating: 4,
    image:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1361113128i/17255186.jpg',
  },
  {
    title: 'Brief Answers to the Big Questions',
    author: 'Stephen Hawking',
    category: 'Science',
    rating: 3,
    image: 'https://productimages.worldofbooks.com/1473695988.jpg',
  },
  {
    title: 'Why We Sleep',
    author: 'Matthew Walker',
    category: 'Health',
    rating: 4,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1556604137i/34466963.jpg',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    rating: 4,
    image:
      'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'The Einstein Enigma',
    author: 'José Rodrigues dos Santos',
    category: 'Thriller',
    rating: 3,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348990500i/6978063.jpg',
  },
  {
    title: 'Idiot Brain',
    author: 'Dean Burnett',
    category: 'Psychology',
    rating: 3,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463185933i/26530389.jpg',
  },
  {
    title: 'The Black Swan',
    author: 'Nassim Nicholas Taleb',
    category: 'Strategy',
    rating: 4,
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386925471i/242472.jpg',
  },
  {
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    category: 'History',
    rating: 4,
    image: 'https://pictures.abebooks.com/isbn/9781910701874-fr.jpg',
  },
];

export default books;
