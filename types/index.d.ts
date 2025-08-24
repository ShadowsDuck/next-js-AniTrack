interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Images {
  jpg: ImageFormat;
  webp: ImageFormat;
}

interface Title {
  type: string;
  title: string;
}

interface DateProp {
  day: number;
  month: number;
  year: number;
}

interface PublishedProp {
  from: DateProp;
  to: DateProp;
  string: string;
}

interface Published {
  from: string;
  to: string;
  prop: PublishedProp;
}

interface Person {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Broadcast {
  day: "string";
  time: "string";
  timezone: "string";
  string: "string";
}

interface Trailer {
  youtube_id: "string";
  url: "string";
  embed_url: "string";
}

declare interface Episodes {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  aired: string;
  score: number;
  filler: boolean;
  recap: boolean;
  forum_url: string;
}

declare interface News {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  comments: number;
  excerpt: string;
}

declare interface Streaming {
  name: string;
  url: string;
}

declare interface Character {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
      };
    };
    name: string;
  };
  role: string;
  voice_actors: {
    person: {
      mal_id: number;
      url: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
      name: string;
    };
    language: string;
  }[];
}

declare interface Relation {
  relation: string;
  entry: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

// Base interface สำหรับข้อมูล common ระหว่าง Anime และ Manga
interface MediaBase {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Person[];
  serializations: Person[];
  genres: Person[];
  explicit_genres: Person[];
  themes: Person[];
  demographics: Person[];
}

declare interface AnimeData extends MediaBase {
  episodes: number;
  aired: Published;
  studios: Person[];
  duration: string;
  season: string;
  broadcast: Broadcast;
  trailer: Trailer;
  streaming: Streaming[];
  relations: Relation[];
}

declare interface MangaData extends MediaBase {
  chapters: number;
  volumes: number;
  external: Streaming[];
  relations: Relation[];
}

declare interface CharacterData {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

declare interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}
