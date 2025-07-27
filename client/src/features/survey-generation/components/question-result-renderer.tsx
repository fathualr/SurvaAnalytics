import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PertanyaanSurvei } from '@/features/.python-service/types/types';

interface Props {
  id: string;
  question: PertanyaanSurvei;
  value: any;
  onChange: (value: any) => void;
  index: number;
}

export const SurveyQuestion = ({ id, question, value, onChange, index }: Props) => {
  const isSelected = (opt: string) => value === opt;
  const isChecked = (opt: string) => Array.isArray(value) && value.includes(opt);

  const toggleCheckbox = (opt: string) => {
    const current = new Set(Array.isArray(value) ? value : []);
    current[current.has(opt) ? 'delete' : 'add'](opt);
    onChange(Array.from(current));
  };

  return (
    <div className="rounded-md border border-border bg-foreground/5 p-4 space-y-3">
      <p className="text-start font-medium md:text-base text-sm text-foreground">
        {index + 1}. {question.teks_pertanyaan}
      </p>

      {question.tipe_pertanyaan === 'pilihan_ganda' && (
        <ul className="flex flex-wrap justify-center gap-2">
          {question.opsi.map((opt) => (
            <li
              key={opt}
              className={`
                flex-1 px-4 py-2 rounded-lg border cursor-pointer md:text-sm text-xs max-w-full break-words
                ${isSelected(opt)
                  ? 'bg-secondary-1/20 border-secondary-1 text-foreground'
                  : 'bg-muted/10 border-muted text-muted-foreground hover:bg-muted/20'}
              `}
              onClick={() => onChange(opt)}
            >
              {isSelected(opt) ? '🔘' : '◯'} {opt}
            </li>
          ))}
        </ul>
      )}

      {question.tipe_pertanyaan === 'checkbox' && (
        <ul className="flex justify-center flex-wrap gap-2">
          {question.opsi.map((opt) => (
            <li
              key={opt}
              className={`
                flex-1 px-4 py-2 rounded-lg border cursor-pointer md:text-sm text-xs max-w-full break-words
                ${isChecked(opt)
                  ? 'bg-secondary-1/20 border-secondary-1 text-foreground'
                  : 'bg-muted/10 border-muted text-muted-foreground hover:bg-muted/20'}
              `}
              onClick={() => toggleCheckbox(opt)}
            >
              {isChecked(opt) ? '☑' : '☐'} {opt}
            </li>
          ))}
        </ul>
      )}

      {question.tipe_pertanyaan === 'dropdown' && (
        <Select value={value || ''} onValueChange={(val) => onChange(val)}>
          <SelectTrigger className="w-full bg-muted/10 border border-muted text-sm text-foreground">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {question.opsi.map((opt) => (
              <SelectItem key={opt} value={opt} className="md:text-sm text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {question.tipe_pertanyaan === 'skala' && (
        <div className="flex flex-wrap gap-2 justify-between">
          {question.opsi.map((opt) => (
            <div
              key={opt}
              className={`
                flex-1 min-w-[50px] text-center py-2 rounded-lg border cursor-pointer max-w-full md:text-sm text-xs
                ${isSelected(opt)
                  ? 'bg-secondary-1/20 border-secondary-1 text-foreground'
                  : 'bg-muted/10 border-muted text-muted-foreground hover:bg-muted/20'}
              `}
              onClick={() => onChange(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      {question.tipe_pertanyaan === 'essay' && (
        <textarea
          placeholder="Write your answer here..."
          className="w-full md:text-sm text-xs border border-glass-border rounded-lg bg-muted/10 border-muted p-3 resize-none"
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};
