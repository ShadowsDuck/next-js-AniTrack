import { CustomSelect } from "@/components/ui/custom-select";
import { animeTypes, mangaTypes } from "@/lib";

interface SelectTypeProps {
  type: string;
  value: string;
  onValueChange: (newValue: string | null) => void;
  disabled?: boolean;
}

const SelectType = ({
  type,
  value,
  onValueChange,
  disabled,
}: SelectTypeProps) => {
  const optionGenres = type === "anime" ? animeTypes : mangaTypes;

  const handleValueChange = (newType: string) => {
    onValueChange(newType === "" ? null : newType);
  };

  const handleReset = () => {
    onValueChange(null);
  };

  return (
    <div className="w-[180px]">
      <label className="text-head mb-2 block text-sm font-semibold">Type</label>
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

SelectType.displayName = "SelectType";
export default SelectType;
