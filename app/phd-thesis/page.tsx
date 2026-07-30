import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DocumentIcon, DownloadIcon, QuoteIcon } from '@/components/Icons';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import thesis from '@/data/phd-thesis';
import { createPageMetadata } from '@/lib/metadata';
import { breadcrumbNode, HOME_URL, SITE_URL, webPageNode } from '@/lib/schema';

const PHD_URL = `${SITE_URL}/phd-thesis/`;
const PHD_DESCRIPTION =
  'Doctoral thesis on an AI-based framework for hybrid assembly line preliminary design in the automotive industry — CIFRE with FORVIA and FEMTO-ST.';

export const metadata: Metadata = createPageMetadata({
  title: 'PhD Thesis',
  description: PHD_DESCRIPTION,
  path: '/phd-thesis/',
});

export default function PhdThesisPage() {
  const {
    title,
    author,
    program,
    defenseDate,
    coverImage,
    partnerLogos,
    abstract,
    jury,
    links,
  } = thesis;

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          webPageNode({
            url: PHD_URL,
            name: title,
            description: PHD_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(PHD_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'PhD Thesis', url: PHD_URL },
          ]),
        ]}
      />
      <article className="phd-page">
        <header className="phd-header">
          <div>
            <p className="phd-eyebrow">Doctoral research</p>
            <h1 className="page-title">PhD Thesis</h1>
            <p className="phd-intro">
              A CIFRE doctorate between FORVIA/Faurecia and the FEMTO-ST
              Institute, on using AI to design automotive assembly lines.
            </p>
          </div>
          <Link href="/" className="phd-back-link">
            ← Back home
          </Link>
        </header>

        <section className="phd-card">
          <div className="phd-card-media">
            <div className="phd-cover">
              <Image
                src={coverImage}
                alt={`Cover page of the thesis: ${title}`}
                width={424}
                height={600}
              />
            </div>
            <div className="phd-actions">
              <a
                href={links.read}
                className="phd-action"
                title="Read the full thesis"
              >
                <DocumentIcon size={16} />
                Read
              </a>
              <a
                href={links.download}
                className="phd-action"
                title="Download the PDF"
              >
                <DownloadIcon size={16} />
                Download
              </a>
              <a
                href={links.cite}
                className="phd-action"
                title="Cite this thesis"
              >
                <QuoteIcon size={16} />
                Cite
              </a>
              <a
                href={links.defenseReplay}
                className="phd-action"
                title="Watch the defense replay"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  style={{ width: 16, height: 16 }}
                />
                Defense replay
              </a>
            </div>
          </div>

          <div className="phd-card-body">
            <h2 className="phd-title">{title}</h2>
            <p className="phd-author">{author}</p>
            <p className="phd-program">{program}</p>

            <div className="phd-logos">
              <Image
                src={partnerLogos}
                alt="FORVIA, FEMTO-ST, and Université Bourgogne Franche-Comté logos"
                width={600}
                height={120}
              />
            </div>

            <p className="phd-defense">
              Successfully defended in <strong>{defenseDate}</strong>.
            </p>

            <h3 className="phd-section-label">Jury members</h3>
            <div className="phd-table-wrap">
              <table className="phd-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Institution</th>
                    <th scope="col">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {jury.map((member) => (
                    <tr key={member.name}>
                      <th scope="row">
                        {member.link ? (
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {member.name}
                          </a>
                        ) : (
                          member.name
                        )}
                      </th>
                      <td>{member.role}</td>
                      <td>{member.institution}</td>
                      <td>{member.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="phd-section-label">Abstract</h3>
            <div className="phd-abstract">
              {abstract.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
