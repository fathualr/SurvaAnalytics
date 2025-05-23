import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SurveyOptionProps } from "./types"

export function SurveyRadio({
  options,
  onAddOption,
  onRemoveOption,
  onChangeOption,
}: SurveyOptionProps) {
  return (
    <div className="mt-1 space-y-2">
      <p className="font-semibold">Pilihan Ganda</p>
      <RadioGroup>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={`option-${index}`} id={`option-${index}`} className="border-black border-3" disabled/>
            <Input value={option} onChange={(e) => onChangeOption(index, e.target.value)} placeholder={`Opsi ${index + 1}`} className="w-1/2"/>
            {options.length > 1 && (
            <Button variant="ghost" size="sm" onClick={() => onRemoveOption(index)}><img src="/x.svg" alt="Hapus" className="h-4 w-4"/></Button>
            )}
          </div>
        ))}
      </RadioGroup>
      <Button variant="outline" onClick={onAddOption}>Tambah Opsi</Button>
    </div>
  );
}