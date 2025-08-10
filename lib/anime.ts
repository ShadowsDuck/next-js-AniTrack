export const fetchTopAnime = async () => {
  const response = await fetch("/api/top-anime");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const result = await response.json();
  return result.data || [];
};

export const fetchTopManga = async () => {
  const response = await fetch("/api/top-manga");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const result = await response.json();
  return result.data || [];
};

// export const fetchTopAnime = async (): Promise<AnimeData[]> => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=5`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result.data || [];
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

// export const fetchTopManga = async () => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const response = await fetch(`https://api.jikan.moe/v4/top/manga?limit=5`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result.data || [];
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

// แก้ไข fetchAnimeById function
// export const fetchTopAnime = async (): Promise<AnimeData[]> => {
//   try {
//     const response = await fetch(`/api/anime`, {
//       next: { revalidate: 0 },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result || [];
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return [];
//   }
// };

// export const fetchTopAnime = async (): Promise<AnimeData[]> => {
//   try {
//     const uniqueItems = new Map<number, AnimeData>();
//     const limit = 25;
//     let page = 1;
//     const maxPages = 5; // ป้องกัน infinite loop

//     while (uniqueItems.size < limit && page <= maxPages) {
//       const response = await fetch(
//         `https://api.jikan.moe/v4/top/anime?page=${page}&limit=25`,
//         {
//           // Next.js caching - revalidate ทุก 1 ชั่วโมง
//           next: {
//             revalidate: 3600,
//             tags: ["anime-top"], // สำหรับ on-demand revalidation
//           },
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 429) {
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           continue;
//         }
//         throw new Error(`Jikan API error: ${response.status}`);
//       }

//       const result = await response.json();
//       const animeData = result.data || [];

//       if (animeData.length === 0) break;

//       // เพิ่มเฉพาะ anime ที่ unique
//       animeData.forEach((anime: AnimeData) => {
//         if (anime?.mal_id && !uniqueItems.has(anime.mal_id)) {
//           uniqueItems.set(anime.mal_id, anime);
//         }
//       });

//       page++;
//     }

//     const finalResult = Array.from(uniqueItems.values()).slice(0, limit);

//     return finalResult;
//   } catch (error) {
//     console.error("Error fetching top anime:", error);
//     return [];
//   }
// };
