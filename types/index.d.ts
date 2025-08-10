declare interface AnimeData {
  mal_id: number;
  title: string;
  title_english?: string;
  synopsis: string;
  type: string;
  episodes: number;
  status: string;
  aired: {
    from: string;
    to: string;
  };
  score: number;
  scored_by: number;
  year: number;
  season: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  genres: Array<{ mal_id: number; name: string }>;
  studios: Array<{ mal_id: number; name: string }>;
}
