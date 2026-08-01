import type { Metadata } from 'next';
import Link from 'next/link';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import writing from '@/data/writing';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const RESEARCH_URL = `${SITE_URL}/research/`;
const RESEARCH_DESCRIPTION =
  'Peer-reviewed papers on AI-driven assembly line design and manufacturing automation, from the PhD years.';

export const metadata: Metadata = createPageMetadata({
  title: 'Research',
  description: RESEARCH_DESCRIPTION,
  path: '/research/',
});

/** Same real papers the writing index links externally, ordered newest first. */
const publications = [...writing].sort((a, b) => b.date.localeCompare(a.date));

export default function ResearchPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: RESEARCH_URL,
            name: 'Research',
            description: RESEARCH_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(RESEARCH_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Research', url: RESEARCH_URL },
          ]),
        ]}
      />
      <article className="research-page">
        <header className="research-header">
          <div>
            <p className="research-eyebrow">Publications</p>
            <h1 className="page-title">Research</h1>
            <p className="research-intro">
              Peer-reviewed work from the PhD years, on AI-driven assembly line
              design and manufacturing automation.
            </p>
          </div>
          <Link href="/" className="research-back-link">
            ← Back home
          </Link>
        </header>

        <ol className="research-list">
          {publications.map((paper) => (
            <li key={paper.url} className="research-item">
              <span className="research-item-year">
                {new Date(paper.date).getFullYear()}
              </span>
              <div className="research-item-body">
                <h2 className="research-item-title">
                  <a href={paper.url} target="_blank" rel="noopener noreferrer">
                    {paper.title}
                    <span className="research-item-external" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </h2>
                <p className="research-item-desc">{paper.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </PageWrapper>
  );
}
