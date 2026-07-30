import type { Metadata } from 'next';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import TalkList from '@/components/Talks/TalkList';
import PageWrapper from '@/components/Template/PageWrapper';
import talks from '@/data/talks';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const TALKS_URL = `${SITE_URL}/talks/`;
const TALKS_DESCRIPTION =
  'Conference presentations, invited talks, and hackathons on AI and manufacturing automation.';

export const metadata: Metadata = createPageMetadata({
  title: 'Talks & Events',
  description: TALKS_DESCRIPTION,
  path: '/talks/',
});

export default function TalksPage() {
  const talkEntries = talks.filter((t) => t.category === 'talk');
  const workshopEntries = talks.filter((t) => t.category === 'workshop');

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: TALKS_URL,
            name: 'Talks & Events',
            description: TALKS_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(TALKS_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Talks & Events', url: TALKS_URL },
          ]),
        ]}
      />
      <article className="talks-page">
        <header className="talks-header">
          <div>
            <p className="talks-eyebrow">Speaking</p>
            <h1 className="page-title">Talks &amp; Events</h1>
            <p className="talks-intro">
              Conference presentations, invited talks, and hackathons along the
              way.
            </p>
          </div>
          <Link href="/" className="talks-back-link">
            ← Back home
          </Link>
        </header>

        <section className="talks-section" aria-labelledby="talks-heading">
          <h2 id="talks-heading" className="talks-section-label">
            Talks
          </h2>
          <TalkList talks={talkEntries} />
        </section>

        <section className="talks-section" aria-labelledby="workshops-heading">
          <h2 id="workshops-heading" className="talks-section-label">
            Workshops &amp; hackathons
          </h2>
          <TalkList talks={workshopEntries} />
        </section>
      </article>
    </PageWrapper>
  );
}
