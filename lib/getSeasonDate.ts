type Season = "winter" | "spring" | "summer" | "fall";

function getSeasonDate(
  year: number,
  season: Season,
): { start_date: string; end_date: string } {
  const seasons: Record<Season, { start: string; end: string }> = {
    winter: { start: "-01-01", end: "-03-31" },
    spring: { start: "-04-01", end: "-06-30" },
    summer: { start: "-07-01", end: "-09-30" },
    fall: { start: "-10-01", end: "-12-31" },
  };

  return {
    start_date: `${year}${seasons[season].start}`,
    end_date: `${year}${seasons[season].end}`,
  };
}

export function getCurrentSeasonRange(date: Date = new Date()): {
  year: number;
  season: Season;
  start_date: string;
  end_date: string;
} {
  const month = date.getMonth() + 1;
  let season: Season;
  const year = date.getFullYear();

  if (month >= 1 && month <= 3) {
    season = "winter";
  } else if (month >= 4 && month <= 6) {
    season = "spring";
  } else if (month >= 7 && month <= 9) {
    season = "summer";
  } else {
    season = "fall";
  }

  const { start_date, end_date } = getSeasonDate(year, season);

  return { year, season, start_date, end_date };
}
