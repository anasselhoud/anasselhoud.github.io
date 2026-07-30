import type { Metadata } from 'next';
import Link from 'next/link';

import FeaturedCard from '@/components/Gaming/FeaturedCard';
import WalkthroughTable from '@/components/Gaming/WalkthroughTable';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { featuredGames, walkthroughs } from '@/data/gaming';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const GAMING_URL = `${SITE_URL}/gaming/`;
const GAMING_DESCRIPTION =
  "A log of what I've been playing — featured favorites plus a year-by-year walkthrough history.";

export const metadata: Metadata = createPageMetadata({
  title: 'Gaming Zone',
  description: GAMING_DESCRIPTION,
  path: '/gaming/',
});

export default function GamingPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: GAMING_URL,
            name: 'Gaming Zone',
            description: GAMING_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(GAMING_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Gaming Zone', url: GAMING_URL },
          ]),
        ]}
      />
      <article className="gaming-page">
        <header className="gaming-header">
          <div>
            <p className="gaming-eyebrow">Gaming zone</p>
            <h1 className="page-title">Gaming Zone</h1>
            <p className="gaming-intro">
              Whatever I&apos;m not building during the day, I&apos;m probably
              playing at night. A running log of favorites and a year-by-year
              walkthrough history.
            </p>
          </div>
          <Link href="/" className="gaming-back-link">
            ← Back home
          </Link>
        </header>

        <section
          className="gaming-section"
          aria-labelledby="featured-games-heading"
        >
          <div className="gaming-section-heading">
            <div>
              <h2 id="featured-games-heading">Featured</h2>
              <p>The ones that earned every hour.</p>
            </div>
          </div>
          <div className="gaming-featured-grid">
            {featuredGames.map((game) => (
              <FeaturedCard key={game.title} game={game} />
            ))}
          </div>
        </section>

        <div className="gaming-walkthroughs">
          {walkthroughs.map((group) => (
            <WalkthroughTable key={group.year} group={group} />
          ))}
        </div>
      </article>
    </PageWrapper>
  );
}
