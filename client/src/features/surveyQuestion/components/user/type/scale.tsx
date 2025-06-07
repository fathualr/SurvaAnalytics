import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  options: string[];
  onChange: (options: string[]) => void;
  disabled?: boolean;
}

export function ScaleQuestion({ options, onChange, disabled = false }: Props) {
  const addOption = () => {
    if (!disabled && options.length < 10) onChange([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (!disabled && options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      onChange(newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    if (!disabled) {
      const newOptions = [...options];
      newOptions[index] = value;
      onChange(newOptions);
    }
  };

  return (
    <div className="space-y-2">
      <p className="font-semibold">Skala</p>
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-6 text-center font-medium">{i + 1}.</span>
          <Input
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
            placeholder={`Label ${i + 1}`}
            className="md:w-1/2 w-full sm:text-sm text-xs"
            disabled={disabled}
          />
          {!disabled && options.length > 2 && (
            <Button variant="ghost" size="sm" onClick={() => removeOption(i)}>
              <img src="/icons/managesurvey/x.svg" className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {!disabled && options.length < 10 && (
        <Button variant="outline" size="sm" className="sm:text-sm text-xs" onClick={addOption}>
          Tambah Label
        </Button>
      )}
    </div>
  );
}
