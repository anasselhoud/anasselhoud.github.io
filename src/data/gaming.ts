export type Platform = 'pc' | 'playstation';

export interface FeaturedGame {
  title: string;
  description: string;
  image: string;
  platform: Platform;
  hours: number;
  badge: 'Perfect' | 'Great';
  genre: string;
  progression: number;
}

export interface PlayedGame {
  title: string;
  genre: string;
  platform: Platform;
  /** "30H", "Pending", or omitted when never logged. */
  hours?: string;
  rating: number;
}

export interface YearGroup {
  year: number;
  games: PlayedGame[];
}

export const featuredGames: FeaturedGame[] = [
  {
    title: 'Red Dead Redemption 2',
    description:
      'A seminal masterpiece into the heart of the American Wild West. A tale of loyalty, betrayal, and the struggle for survival.',
    image: '/images/gaming/red-dead-redemption-2.jpg',
    platform: 'pc',
    hours: 142,
    badge: 'Perfect',
    genre: 'Open World',
    progression: 100,
  },
  {
    title: 'Elden Ring',
    description:
      'An epic, complete journey through a world of chaos — navigating treacherous landscapes and confronting legendary adversaries.',
    image: '/images/gaming/elden-ring.jpg',
    platform: 'playstation',
    hours: 168,
    badge: 'Perfect',
    genre: 'Souls-like',
    progression: 100,
  },
  {
    title: 'Hogwarts Legacy',
    description:
      'A wizarding open world steeped in castle intrigue, magical combat, and Hogwarts lore.',
    image: '/images/gaming/hogwarts-legacy.jpg',
    platform: 'pc',
    hours: 55,
    badge: 'Great',
    genre: 'Wizarding Open World',
    progression: 100,
  },
];

export const walkthroughs: YearGroup[] = [
  {
    year: 2025,
    games: [
      {
        title: 'Split Fiction',
        genre: 'Puzzle Game',
        platform: 'playstation',
        hours: '30H',
        rating: 5,
      },
      {
        title: 'Outer Wilds',
        genre: 'Thriller',
        platform: 'playstation',
        hours: '35H',
        rating: 5,
      },
      {
        title: 'It Takes Two',
        genre: 'Coop Puzzle',
        platform: 'playstation',
        hours: '30H',
        rating: 4,
      },
    ],
  },
  {
    year: 2024,
    games: [
      {
        title: 'Chants of Sennaar',
        genre: 'Puzzle Game',
        platform: 'playstation',
        hours: '10H',
        rating: 4,
      },
      {
        title: 'Elden Ring: Shadow of the Erdtree',
        genre: 'DLC Souls-like',
        platform: 'pc',
        hours: '35H',
        rating: 4,
      },
      {
        title: 'Last of Us Part II Remastered',
        genre: 'Action-Adventure',
        platform: 'playstation',
        hours: '30H',
        rating: 3,
      },
      {
        title: 'Ghost of Tsushima',
        genre: 'Action-Adventure: Open World',
        platform: 'playstation',
        hours: '30H',
        rating: 4,
      },
      {
        title: 'Lies of P',
        genre: 'Souls-like',
        platform: 'pc',
        hours: '35H',
        rating: 3,
      },
      {
        title: 'A Plague Tale: Requiem',
        genre: 'Action-Adventure: Stealth',
        platform: 'playstation',
        hours: '27H',
        rating: 3,
      },
      {
        title: "Assassin's Creed Mirage",
        genre: 'Action-Adventure: RPG',
        platform: 'pc',
        hours: 'Pending',
        rating: 3,
      },
      {
        title: "Assassin's Creed Origins",
        genre: 'Action-Adventure: RPG',
        platform: 'playstation',
        hours: 'Pending',
        rating: 5,
      },
    ],
  },
  {
    year: 2023,
    games: [
      {
        title: 'Elden Ring',
        genre: 'Souls-like',
        platform: 'playstation',
        hours: '168H',
        rating: 5,
      },
      {
        title: 'God of War: Ragnarok',
        genre: "Action-Adventure: Hack'n slash",
        platform: 'playstation',
        hours: '55H',
        rating: 4,
      },
      {
        title: 'Red Dead Redemption 2',
        genre: 'Open World',
        platform: 'pc',
        hours: '142H',
        rating: 5,
      },
      {
        title: 'Hogwarts Legacy',
        genre: 'Wizarding Open World',
        platform: 'pc',
        hours: '55H',
        rating: 4,
      },
      {
        title: "Assassin's Creed Valhalla",
        genre: 'Action-Adventure: RPG',
        platform: 'pc',
        hours: '35H',
        rating: 4,
      },
      {
        title: 'GTA V',
        genre: 'Open World',
        platform: 'pc',
        hours: '110H',
        rating: 4,
      },
      {
        title: 'Satisfactory',
        genre: 'Simulation & Management',
        platform: 'pc',
        rating: 4,
      },
      {
        title: 'The Forest',
        genre: 'Survival',
        platform: 'pc',
        hours: '40H',
        rating: 4,
      },
      {
        title: 'Destiny 2',
        genre: 'Looter Shooter',
        platform: 'pc',
        rating: 3,
      },
    ],
  },
];
