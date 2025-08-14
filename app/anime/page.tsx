import AnimeCard from "@/components/cards/anime-card";
import { fetchTopAnime } from "@/server/cartoon";

export default async function Page() {
  const animeList = await fetchTopAnime();

  return (
    <div className="page-layout">
      <div className="page-wrapper-layout">
        <AnimeCard animeList={animeList} />
      </div>
    </div>
  );
}
