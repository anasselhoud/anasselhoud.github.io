export interface AstroPhoto {
  slug: string;
  /** Optional — a couple of shots in the original set never got a caption. */
  caption?: string;
  location?: string;
  thumb: string;
  full: string;
}

const photos: AstroPhoto[] = [
  {
    slug: 'moon-last-quarter',
    caption:
      'Last quarter phase (~50%) of the moon, captured through a 114/900 telescope and a DSLR.',
    location: 'Montbéliard, France',
    thumb: '/images/astrophotography/thumbs/moon-last-quarter.jpg',
    full: '/images/astrophotography/full/moon-last-quarter.jpg',
  },
  {
    slug: 'milky-way-marrakech',
    caption:
      'A stacked image of part of the Milky Way — 200 x 10s exposures, shot from a hotel terrace (Bortle 6).',
    location: 'Marrakech, Morocco',
    thumb: '/images/astrophotography/thumbs/milky-way-marrakech.jpg',
    full: '/images/astrophotography/full/milky-way-marrakech.jpg',
  },
  {
    slug: 'orion-nebula',
    caption:
      'A stacked image of the Orion Nebula, taken on February 24th, 2024.',
    location: 'France',
    thumb: '/images/astrophotography/thumbs/orion-nebula.jpg',
    full: '/images/astrophotography/full/orion-nebula.jpg',
  },
  {
    slug: 'moon-phase',
    thumb: '/images/astrophotography/thumbs/moon-phase.jpg',
    full: '/images/astrophotography/full/moon-phase.jpg',
  },
  {
    slug: 'moon-waning-gibbous',
    caption: 'Waning gibbous (88%), taken with a DSLR — no telescope needed.',
    location: 'France',
    thumb: '/images/astrophotography/thumbs/moon-waning-gibbous.jpg',
    full: '/images/astrophotography/full/moon-waning-gibbous.jpg',
  },
  {
    slug: 'shooting-star-lyon',
    caption: 'A shooting star, caught by chance.',
    location: 'Lyon, France',
    thumb: '/images/astrophotography/thumbs/shooting-star-lyon.jpg',
    full: '/images/astrophotography/full/shooting-star-lyon.jpg',
  },
  {
    slug: 'saturn-morocco',
    caption: 'Saturn, adorned in its rings. Quality was AI-enhanced.',
    location: 'Morocco',
    thumb: '/images/astrophotography/thumbs/saturn-morocco.jpg',
    full: '/images/astrophotography/full/saturn-morocco.jpg',
  },
  {
    slug: 'full-moon-february-2024',
    caption: 'Full moon of February 2024.',
    location: 'Montbéliard, France',
    thumb: '/images/astrophotography/thumbs/full-moon-february-2024.jpg',
    full: '/images/astrophotography/full/full-moon-february-2024.jpg',
  },
];

export default photos;
