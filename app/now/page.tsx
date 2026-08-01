import type { Metadata } from 'next';
import Link from 'next/link';
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

const NOW_URL = `${SITE_URL}/now/`;
const NOW_DESCRIPTION = `What ${AUTHOR_NAME} is focused on right now, updated occasionally rather than on a schedule.`;

/** Bump this whenever the page copy below changes. */
const LAST_UPDATED = '2026-08-01';

export const metadata: Metadata = createPageMetadata({
  title: 'Now',
  description: NOW_DESCRIPTION,
  path: '/now/',
});

export default function NowPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url: NOW_URL,
            name: 'Now',
            description: NOW_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(NOW_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Now', url: NOW_URL },
          ]),
        ]}
      />
      <article className="now-page">
        <header className="now-header">
          <p className="now-eyebrow">What I&apos;m up to</p>
          <h1 className="page-title">Now</h1>
          <p className="now-updated">
            Last updated{' '}
            <time dateTime={LAST_UPDATED}>
              {new Date(`${LAST_UPDATED}T12:00:00Z`).toLocaleDateString(
                'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </time>
            . This page is a snapshot, not a live feed — see a{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              now page
            </a>{' '}
            if that convention is new to you.
          </p>
        </header>

        <div className="now-list">
          <section className="now-item">
            <h2 className="now-item-label">Working on</h2>
            <p className="now-item-body">
              Leading the Data, AI &amp; GenAI roadmap and digital
              transformation for procurement across FORVIA Group&apos;s six
              business groups.
            </p>
          </section>

          <section className="now-item">
            <h2 className="now-item-label">Building</h2>
            <p className="now-item-body">
              This site, end to end — content, design system, and the{' '}
              <Link href="/lab">Lab</Link> experiment below, mostly during
              evenings with Claude Code doing a lot of the typing.
            </p>
          </section>

          <section className="now-item">
            <h2 className="now-item-label">Writing</h2>
            <p className="now-item-body">
              Just published{' '}
              <Link href="/writing/why-i-mostly-switched-from-claude-code-to-codex-desktop-app">
                Why Trade-offs Are Steering Industrial AI
              </Link>
              , on why hill-climbing and satisficing describe industrial AI
              better than optimality does.
            </p>
          </section>

          <section className="now-item">
            <h2 className="now-item-label">Reading</h2>
            <p className="now-item-body">
              Working through the <Link href="/books">books shelf</Link> —
              currently more nonfiction than fiction.
            </p>
          </section>

          <section className="now-item">
            <h2 className="now-item-label">Based in</h2>
            <p className="now-item-body">
              Paris, France — still finding excuses to travel whenever the
              calendar allows it.
            </p>
          </section>
        </div>
      </article>
    </PageWrapper>
  );
}
