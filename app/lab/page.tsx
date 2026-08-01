import type { Metadata } from 'next';
import TriangleEvolution from '@/components/Lab/TriangleEvolution';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  HOME_URL,
  profilePageNode,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const LAB_URL = `${SITE_URL}/lab/`;
const LAB_DESCRIPTION = `${AUTHOR_NAME}'s home lab and a live simulated-annealing experiment running in the browser.`;

export const metadata: Metadata = createPageMetadata({
  title: 'Lab',
  description: LAB_DESCRIPTION,
  path: '/lab/',
});

export default function LabPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url: LAB_URL,
            name: 'Lab',
            description: LAB_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(LAB_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Lab', url: LAB_URL },
          ]),
        ]}
      />
      <article className="lab-page">
        <header className="lab-header">
          <p className="lab-eyebrow">Off the clock</p>
          <h1 className="page-title">Lab</h1>
          <p className="lab-intro">
            Where the day job stops and the tinkering starts — a running home
            lab, and one experiment running live in this page right now.
          </p>
        </header>

        <section className="lab-section" aria-labelledby="lab-home-heading">
          <h2 id="lab-home-heading" className="lab-section-label">
            Home lab
          </h2>
          <div className="lab-cards">
            <div className="lab-card">
              <h3 className="lab-card-title">Raspberry Pi builds</h3>
              <p className="lab-card-body">
                A small rack of Raspberry Pis I keep rebuilding whenever I learn
                a new trick — the point was never to finish it, it was to keep
                breaking it.
              </p>
            </div>
            <div className="lab-card">
              <h3 className="lab-card-title">Home-lab networking</h3>
              <p className="lab-card-body">
                Casual network and device poking — VLANs, self-hosted services,
                and enough penetration-testing curiosity to keep my own network
                honest.
              </p>
            </div>
            <div className="lab-card">
              <h3 className="lab-card-title">Open-source AI experiments</h3>
              <p className="lab-card-body">
                Small models and agent side-projects, built for fun rather than
                for a roadmap — the opposite pace of the day job.
              </p>
            </div>
            <div className="lab-card">
              <h3 className="lab-card-title">Quantum programming</h3>
              <p className="lab-card-body">
                A recent rabbit hole, mostly because I like understanding how
                things work at the edges of what&apos;s possible.
              </p>
            </div>
          </div>
        </section>

        <section
          className="lab-section"
          aria-labelledby="lab-experiment-heading"
        >
          <h2 id="lab-experiment-heading" className="lab-section-label">
            Live experiment: a portrait in 150 triangles
          </h2>
          <p className="lab-experiment-intro">
            Simulated annealing, evolving 150 translucent triangles toward my
            own portrait, one accepted or rejected mutation at a time — the same
            idea from{' '}
            <a href="/writing/why-i-mostly-switched-from-claude-code-to-codex-desktop-app">
              this essay
            </a>
            , running live instead of just described. Hit run and watch it
            anneal.
          </p>
          <TriangleEvolution />
        </section>
      </article>
    </PageWrapper>
  );
}
