import { formatDate } from "@/lib/format-date";
import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import Link from "next/link";

interface MangaCardProps {
  mangaList?: MangaData[];
}

export default function MangaCard({ mangaList }: MangaCardProps) {
  const uniqueMangaList = useUniqueList(mangaList);

  return (
    <section className="card-layout">
      {uniqueMangaList.map((manga) => (
        <Link href={`/manga/${manga.mal_id}`} key={manga.mal_id}>
          <article className="card-item">
            <div className="card-animate">
              <figure className="card-image-wrapper">
                {manga.images?.jpg?.large_image_url && (
                  <Image
                    src={manga.images.jpg.large_image_url}
                    alt={manga.title || "Manga Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="card-image object-cover"
                  />
                )}

                {/* Overlay */}
                <figcaption className="card-overlay">
                  <header>
                    <h2 className="overlay-title">
                      {manga.title || manga.title_english || "Title"}
                    </h2>
                  </header>
                  <div className="overlay-info">
                    <p>
                      <span className="font-semibold text-white">Aired:</span>{" "}
                      {formatDate(manga.published.from)} to{" "}
                      {formatDate(manga.published.to)}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Genres:</span>{" "}
                      {manga.genres?.map((g) => g.name).join(", ") || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-white">
                        Chapters:
                      </span>{" "}
                      {manga.chapters || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Rank:</span>{" "}
                      {manga.rank || "N/A"}
                    </p>
                  </div>
                </figcaption>
              </figure>

              {/* Text Layout */}
              <footer className="card-text-layout">
                <h3 className="card-text-name">{manga.title || "Title"}</h3>
                <div className="card-text-detail">
                  <div className="card-detail-item">
                    <Image
                      src="/icons/episodes.svg"
                      alt="episodes"
                      width={18}
                      height={18}
                      className="detail-icon"
                    />
                    <p className="text-item">{manga.chapters || "N/A"}</p>
                  </div>
                  <div className="card-detail-item">
                    <Image
                      src="/icons/star.svg"
                      alt="star"
                      width={18}
                      height={18}
                      className="detail-icon"
                    />
                    <p className="text-[#f4d03f]">{manga.score}</p>
                  </div>
                </div>
              </footer>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}
