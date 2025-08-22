import { CustomSelect } from "@/components/ui/custom-select";
import { animeRatings } from "@/lib";

interface SelectRatingProps {
  value: string;
  onValueChange: (newValue: string | null) => void;
  disabled?: boolean;
}

const SelectRating = ({
  value,
  onValueChange,
  disabled,
}: SelectRatingProps) => {
  const handleValueChange = (newRating: string) => {
    onValueChange(newRating === "" ? null : newRating);
  };

  const handleReset = () => {
    onValueChange(null);
  };

  return (
    <div className="w-[180px]">
      <label className="text-head mb-2 block text-sm font-semibold">
        Rating
      </label>
      <div className="space-y-2">
        <CustomSelect
          options={animeRatings}
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

SelectRating.displayName = "SelectRating";
export default SelectRating;
