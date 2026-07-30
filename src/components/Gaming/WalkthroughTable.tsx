import Rating from '@/components/Rating';
import type { YearGroup } from '@/data/gaming';

import PlatformIcon from './PlatformIcon';

interface WalkthroughTableProps {
  group: YearGroup;
}

export default function WalkthroughTable({ group }: WalkthroughTableProps) {
  return (
    <section
      className="gaming-year"
      aria-labelledby={`walkthrough-${group.year}`}
    >
      <h2 id={`walkthrough-${group.year}`} className="gaming-year-heading">
        {group.year} walkthrough
      </h2>

      <div className="gaming-table-wrap">
        <table className="gaming-table">
          <thead>
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Genre</th>
              <th scope="col">Platform</th>
              <th scope="col">Hours</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {group.games.map((game) => (
              <tr key={game.title}>
                <th scope="row">{game.title}</th>
                <td>{game.genre}</td>
                <td>
                  <PlatformIcon platform={game.platform} />
                </td>
                <td>{game.hours ?? '—'}</td>
                <td>
                  <Rating rating={game.rating} size={12} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
