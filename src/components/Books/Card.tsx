import Rating from '@/components/Rating';
import type { Book } from '@/data/books';

interface CardProps {
  book: Book;
}

export default function Card({ book }: CardProps) {
  const { title, author, category, rating, image } = book;

  return (
    <article className="books-card">
      <div className="books-card-media">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="books-card-body">
        <p className="books-card-category">{category}</p>
        <h3 className="books-card-title">{title}</h3>
        <p className="books-card-author">{author}</p>
        <Rating rating={rating} />
      </div>
    </article>
  );
}
