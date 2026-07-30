import Link from 'next/link';

import profile from '@/data/profile.json';

import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <p className="hero-kicker">
            {profile.role} · {profile.employer}
          </p>
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          <p className="hero-tagline">
            I&apos;m a Digital &amp; AI Strategy Manager at FORVIA, leading
            digital transformation projects, Data, AI &amp; GenAI Roadmap at the
            Group Procurement function.
          </p>

          <p className="hero-subtitle">
            French-Moroccan, Doctor in AI &amp; Computer Science, Laureate of{' '}
            <a
              href="https://ec-lyon.fr/"
              className="hero-highlight"
              target="_blank"
              rel="noreferrer"
            >
              Centrale Lyon
            </a>{' '}
            &amp;{' '}
            <a
              href="http://www.ensam-umi.ac.ma/"
              className="hero-highlight"
              target="_blank"
              rel="noreferrer"
            >
              Arts et Métiers
            </a>{' '}
            with double engineering degrees.
          </p>

          <div className="hero-cta">
            <Link href="/about" className="button">
              About Me
            </Link>
            <Link href="/resume" className="hero-resume-link">
              View Resume
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={320} height={320} priority />
        </div>
      </div>

      <div className="hero-split">
        <section className="hero-country">
          <p className="hero-country-copy hero-country-copy--lead">
            I thrive on diversity. Traveling and exploring new cultures and
            places are passions of mine. Here are some of the countries
            I&apos;ve visited.
          </p>

          <ul className="hero-country-grid" aria-label="Countries visited">
            <li>🇫🇷 France</li>
            <li>🇪🇸 Spain</li>
            <li>🇵🇹 Portugal</li>
            <li>🇮🇹 Italy</li>
            <li>🇹🇷 Turkey</li>
            <li>🇬🇷 Greece</li>
            <li>🇭🇺 Hungary</li>
            <li>🇦🇹 Austria</li>
            <li>🇧🇪 Belgium</li>
            <li>🇲🇦 Morocco</li>
            <li>🇩🇪 Germany</li>
            <li>🇲🇾 Malaysia</li>
            <li>🇸🇬 Singapore</li>
            <li>🇮🇩 Indonesia</li>
            <li>🇨🇿 Czech RC</li>
            <li>🇨🇭 Switzerland</li>
            <li>🇳🇱 Netherlands</li>
          </ul>

          <p className="hero-country-copy hero-country-copy--note">
            When the sun sets, I switch gears to capture the cosmos through my
            telescope as an astrophotographer. And when I&apos;m not stargazing,
            I immerse myself in thrilling gaming adventures. Science and tech
            are the driving forces behind my life, shaping a journey that&apos;s
            all about exploration and innovation.
          </p>
        </section>

        <span className="hero-split-arrow" aria-hidden="true">
          →
        </span>

        <aside className="hero-hobbies" aria-label="Hobbies and interests">
          <div className="hero-hobbies-stack">
            <Link
              href="/books"
              className="hero-hobby-card hero-hobby-card--books"
            >
              <span className="hero-hobby-icon" aria-hidden="true">
                📚
              </span>
              <strong>Books</strong>
            </Link>

            <Link
              href="/astrophotography"
              className="hero-hobby-card hero-hobby-card--astrophotography"
            >
              <span className="hero-hobby-icon" aria-hidden="true">
                🔭
              </span>
              <strong>Astrophotography</strong>
            </Link>

            <Link
              href="/gaming"
              className="hero-hobby-card hero-hobby-card--gaming"
            >
              <span className="hero-hobby-icon" aria-hidden="true">
                🎮
              </span>
              <strong>Gaming Zone</strong>
            </Link>
          </div>
        </aside>
      </div>

      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
