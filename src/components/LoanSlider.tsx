
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface LoanSliderProps {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number;
  label: string;
  unit?: string;
}

const LoanSlider = ({
  value,
  setValue,
  min,
  max,
  step,
  formatValue = (val) => val.toString(),
  parseValue = (val) => parseFloat(val),
  label,
  unit
}: LoanSliderProps) => {
  const [inputValue, setInputValue] = React.useState<string>(formatValue(value));

  // Update the input field when slider changes
  React.useEffect(() => {
    setInputValue(formatValue(value));
  }, [value, formatValue]);

  // Handle slider change
  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle input blur - validate and update
  const handleInputBlur = () => {
    let newValue = parseValue(inputValue);
    
    // Check if it's a valid number
    if (isNaN(newValue)) {
      setInputValue(formatValue(value));
      return;
    }
    
    // Clamp to min/max
    newValue = Math.max(min, Math.min(max, newValue));
    setValue(newValue);
    setInputValue(formatValue(newValue));
  };

  // Handle key press (Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center">
          {unit && <span className="text-sm mr-2 text-muted-foreground">{unit}</span>}
          <Input
            className="w-24 h-8 text-right"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSliderChange}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default LoanSlider;
