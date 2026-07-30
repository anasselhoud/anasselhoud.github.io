import type { Metadata } from 'next';

import Education from '@/components/Resume/Education';
import Experience from '@/components/Resume/Experience';
import References from '@/components/Resume/References';
import ResumeNav from '@/components/Resume/ResumeNav';
import Skills from '@/components/Resume/Skills';
import PageWrapper from '@/components/Template/PageWrapper';
import contact from '@/data/contact';
import profile from '@/data/profile.json';
import degrees from '@/data/resume/degrees';
import { categories, skills } from '@/data/resume/skills';
import work from '@/data/resume/work';
import { createPageMetadata } from '@/lib/metadata';
import { AUTHOR_NAME, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Resume',
  description: `${AUTHOR_NAME}'s Resume. PhD in AI, Digital & AI Strategy Manager at FORVIA, industrial AI and digital transformation.`,
  path: '/resume/',
});

// Single source of truth for the GitHub handle, shared with the footer and
// contact page rather than hardcoded a second time here.
const githubContact = contact.find((item) => item.label === 'GitHub');

export default function ResumePage() {
  return (
    <PageWrapper>
      <section className="resume-page">
        <header className="resume-header">
          <h1 className="resume-title">Resume</h1>
          <p className="resume-summary">
            PhD in Artificial Intelligence with a dual technical and business
            profile spanning industrial AI and digital transformation strategy.
            I&apos;m currently Digital &amp; AI Strategy Manager at FORVIA,
            leading Data, AI &amp; GenAI roadmap and digital transformation for
            procurement at Group level. Previously built and shipped
            PRODynamics, an AI-powered assembly line design tool, through a
            three-year industrial PhD at FORVIA Clean Mobility. Centrale Lyon
            and Arts et Métiers engineering degrees, BCG-certified in digital
            transformation strategy.
          </p>
          {/* Print-only, but real markup rather than CSS `content`, so it is
              selectable, linkable, and reads from the shared profile. The
              screen layout carries these in the footer, which print hides. */}
          <address className="resume-print-contact">
            <a href={`${SITE_URL}/`}>{SITE_URL.replace(/^https?:\/\//, '')}</a>
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {githubContact && (
              <>
                <span aria-hidden="true"> · </span>
                <a href={githubContact.link}>
                  {githubContact.link.replace(/^https?:\/\//, '')}
                </a>
              </>
            )}
          </address>
        </header>

        <ResumeNav />

        <div className="resume-content">
          <section id="experience" className="resume-section">
            <Experience data={work} />
          </section>

          <section id="education" className="resume-section">
            <Education data={degrees} />
          </section>

          <section id="skills" className="resume-section">
            <Skills skills={skills} categories={categories} />
          </section>

          <section id="references" className="resume-section">
            <References />
          </section>
        </div>
      </section>
    </PageWrapper>
  );
}
