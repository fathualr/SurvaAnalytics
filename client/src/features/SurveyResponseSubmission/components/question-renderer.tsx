import { PertanyaanSurvei } from '@/features/survey/types';

interface QuestionRendererProps {
  question: PertanyaanSurvei;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const { teks_pertanyaan, tipe_pertanyaan, opsi, is_required } = question;

  const safeString = (val: any) => (typeof val === 'string' ? val : '');
  const safeArray = (val: any) => (Array.isArray(val) ? val : []);

  return (
    <div className="w-full h-full flex-grow flex flex-col justify-center rounded-md">
      <label className="font-medium block mb-2">
        {teks_pertanyaan}
        {is_required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {tipe_pertanyaan === 'pilihan_ganda' && (
        <div className="space-y-2">
          {opsi.map((opt) => (
            <label
              key={opt}
              className={`block border p-2 rounded-sm cursor-pointer ${
                safeString(value) === opt ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={safeString(value) === opt}
                onChange={() => onChange(opt)}
                className="hidden"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {tipe_pertanyaan === 'checkbox' && (
        <div className="space-y-2">
          {opsi.map((opt) => {
            const selected = safeArray(value);
            return (
              <label
                key={opt}
                className={`block border p-2 rounded-sm cursor-pointer ${
                  selected.includes(opt) ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={(e) => {
                    const set = new Set(selected);
                    e.target.checked ? set.add(opt) : set.delete(opt);
                    onChange(Array.from(set));
                  }}
                  className="hidden"
                />
                {opt}
              </label>
            );
          })}
        </div>
      )}

      {tipe_pertanyaan === 'dropdown' && (
        <select
          className="w-full border rounded-sm p-2 bg-white"
          value={safeString(value)}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled hidden>
            Pilih salah satu
          </option>
          {opsi.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {tipe_pertanyaan === 'skala' && (
        <div className="flex justify-around space-x-2">
          {opsi.map((opt) => (
            <label
              key={opt}
              className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer ${
                safeString(value) === opt ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={safeString(value) === opt}
                onChange={() => onChange(opt)}
                className="hidden"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {tipe_pertanyaan === 'essay' && (
        <textarea
          className="w-full border rounded-sm p-3"
          value={safeString(value)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tulis jawaban Anda..."
          rows={4}
        />
      )}
    </div>
  );
}
