import { CustomSelect } from "@/components/ui/custom-select";
import { animeStatuses, mangaStatuses } from "@/lib";

interface SelectStatusProps {
  type: string;
  value: string;
  onValueChange: (newValue: string | null) => void;
  disabled?: boolean;
}

const SelectStatus = ({
  type,
  value,
  onValueChange,
  disabled,
}: SelectStatusProps) => {
  const optionGenres = type === "anime" ? animeStatuses : mangaStatuses;

  const handleValueChange = (newStatus: string) => {
    onValueChange(newStatus === "" ? null : newStatus);
  };

  const handleReset = () => {
    onValueChange(null);
  };

  return (
    <div className="w-[180px]">
      <label className="text-head mb-2 block text-sm font-semibold">
        Status
      </label>
      <div className="space-y-2">
        <CustomSelect
          options={optionGenres}
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

SelectStatus.displayName = "SelectStatus";
export default SelectStatus;
