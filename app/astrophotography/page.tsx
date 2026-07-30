import type { Metadata } from 'next';
import Link from 'next/link';

import Gallery from '@/components/Astrophotography/Gallery';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import photos from '@/data/astrophotography';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const ASTRO_URL = `${SITE_URL}/astrophotography/`;
const ASTRO_DESCRIPTION =
  'A collection of amateur astrophotography — moon phases, nebulae, and the odd shooting star, captured through a telescope and a DSLR.';

export const metadata: Metadata = createPageMetadata({
  title: 'Astrophotography',
  description: ASTRO_DESCRIPTION,
  path: '/astrophotography/',
});

export default function AstrophotographyPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: ASTRO_URL,
            name: 'Astrophotography',
            description: ASTRO_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(ASTRO_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Astrophotography', url: ASTRO_URL },
          ]),
        ]}
      />
      <article className="astro-page">
        <header className="astro-header">
          <div>
            <p className="astro-eyebrow">Night sky</p>
            <h1 className="page-title">Astrophotography</h1>
            <p className="astro-intro">
              AI engineer by day, amateur astrophotographer by night. A
              collection of what a telescope, a DSLR, and a few clear nights can
              catch.
            </p>
          </div>
          <Link href="/" className="astro-back-link">
            ← Back home
          </Link>
        </header>

        <Gallery photos={photos} />
      </article>
    </PageWrapper>
  );
}
