'use client';

import { Input } from "@/components/ui/input";

interface Option {
  value: string;
  label: string;
}

interface ProfileFormFieldProps {
  label: string;
  id: string;
  value: string;
  onChange?: (id: string, value: string) => void;
  type?: 'text' | 'date' | 'select';
  options?: Option[];
  readOnly?: boolean;
  isEditing?: boolean;
}

export function ProfileFormField({
  label,
  id,
  value,
  onChange,
  type = 'text',
  options = [],
  readOnly = false,
  isEditing = false,
}: ProfileFormFieldProps) {
  return (
    <div className="flex flex-col md:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="w-full md:w-40 font-semibold">
        <label htmlFor={id}>{label}</label>
      </div>

      <div className="hidden md:block font-semibold">:</div>

      <div className="w-full">
        {type === 'select' ? (
          <select
            id={id}
            name={id}
            value={value}
            onChange={(e) => onChange?.(id, e.target.value)}
            disabled={!isEditing || readOnly}
            autoComplete="off"
            className="rounded-md w-full h-10 border bg-none px-3"
          >
            <option className="text-[#323232]" disabled value="">Pilih {label.toLowerCase()}</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value} className="text-[#323232]">
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <Input
            id={id}
            type={type}
            value={value || '-'}
            onChange={(e) => onChange?.(id, e.target.value)}
            readOnly={readOnly || !isEditing}
            autoComplete="off"
            className="h-9 w-full bg-none"
          />
        )}
      </div>
    </div>
  );
}
