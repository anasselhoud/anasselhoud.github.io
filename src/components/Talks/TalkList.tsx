import type { Talk } from '@/data/talks';

interface TalkListProps {
  talks: Talk[];
}

export default function TalkList({ talks }: TalkListProps) {
  return (
    <ul className="talks-list">
      {talks.map((talk) => (
        <li key={talk.title} className="talks-item">
          <div className="talks-item-heading">
            <h3 className="talks-item-title">{talk.title}</h3>
            <time className="talks-item-date" dateTime={talk.date}>
              {talk.dateLabel}
            </time>
          </div>
          <p className="talks-item-meta">
            <span className="talks-item-type">{talk.type}</span>
            <span aria-hidden="true"> · </span>
            <strong>{talk.event}</strong>
          </p>
          <p className="talks-item-location">{talk.location}</p>
        </li>
      ))}
    </ul>
  );
}
