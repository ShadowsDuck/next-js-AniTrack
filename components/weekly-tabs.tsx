import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WeeklyTabs() {
  const weekdays = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  return (
    <div className="bg-card/80 rounded-xl p-8">
      <Tabs defaultValue="monday" className="items-center">
        <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
          {weekdays.map((day) => (
            <TabsTrigger
              key={day.value}
              value={day.value}
              className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {day.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {weekdays.map((day) => (
          <TabsContent key={day.value} value={day.value}>
            <p className="text-muted-foreground p-4 text-center text-xs">
              เนื้อหาสำหรับวัน{day.label}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
