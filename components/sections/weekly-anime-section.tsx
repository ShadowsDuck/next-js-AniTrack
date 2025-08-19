import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { weekdays } from "@/lib";
import { fetchWeeklyAnime } from "@/server/cartoon";
import WeeklyAnimeCard from "../cards/weekly-anime-card";

export default async function WeeklyAnimeSection() {
  const { weeklyAnime } = await fetchWeeklyAnime();

  return (
    <section className="page-wrapper-layout">
      <main className="bg-card/80 rounded-2xl p-8">
        <header className="card-text-header text-primary text-4xl font-bold drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          Weekly Schedule
        </header>
        <div>
          <Tabs defaultValue="Mondays">
            <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
              {weekdays.map((day) => (
                <TabsTrigger
                  key={day.value}
                  value={day.value}
                  className="data-[state=active]:after:bg-primary data-[state=active]:text-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {weekdays.map((day) => (
              <TabsContent key={day.value} value={day.value}>
                <div className="mt-4 h-108 overflow-x-hidden overflow-y-auto pr-2">
                  <WeeklyAnimeCard animeList={weeklyAnime} day={day.value} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </section>
  );
}
