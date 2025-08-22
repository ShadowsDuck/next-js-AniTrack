import { CustomSelect } from "@/components/ui/custom-select";
import { animeSeasons } from "@/lib";

interface SelectSeasonProps {
  value: string;
  onValueChange: (newValue: string | null) => void;
  disabled?: boolean;
}

const SelectSeason = ({
  value,
  onValueChange,
  disabled,
}: SelectSeasonProps) => {
  const handleValueChange = (newSeason: string) => {
    onValueChange(newSeason === "" ? null : newSeason);
  };

  const handleReset = () => {
    onValueChange(null);
  };

  return (
    <div className="w-[180px]">
      <label className="text-head mb-2 block text-sm font-semibold">
        Season
      </label>
      <div className="space-y-2">
        <CustomSelect
          options={animeSeasons}
          value={value}
          placeholder="Any"
          onValueChange={handleValueChange}
          className="w-full select-none"
          onReset={handleReset}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

SelectSeason.displayName = "SelectSeason";
export default SelectSeason;
