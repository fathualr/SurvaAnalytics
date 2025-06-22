'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormGroup } from '@/components/umum/form/form-group';

interface DateRangeSectionProps {
  startDate: string;
  endDate: string;
  onChange: (payload: { startDate: string; endDate: string }) => void;
  disabled?: boolean;
}

function formatDateUTC(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getDateOnlyUTC(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function addDaysUTC(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setUTCDate(newDate.getUTCDate() + days);
  return getDateOnlyUTC(newDate);
}

export function DateRangeSection({
  startDate,
  endDate,
  onChange,
  disabled = false,
}: DateRangeSectionProps) {
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);
  const [error, setError] = useState('');
  const [duration, setDuration] = useState<number | null>(null);

  const todayUTC = getDateOnlyUTC(new Date());
  const minStartDate = formatDateUTC(addDaysUTC(todayUTC, 3));

  useEffect(() => {
    const startDateObj = getDateOnlyUTC(new Date(start));
    const endDateObj = getDateOnlyUTC(new Date(end));

    if (disabled) {
      const diffTime = endDateObj.getTime() - startDateObj.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDuration(days > 0 ? days : null);
      setError('');
      return;
    }

    const isStartValid = startDateObj >= addDaysUTC(todayUTC, 3);
    const isEndValid = endDateObj > startDateObj;

    if (!isStartValid) {
      setError('Tanggal mulai minimal 3 hari dari hari ini.');
      setDuration(null);
    } else if (!isEndValid) {
      setError('Tanggal berakhir harus 1 hari setelah tanggal mulai.');
      setDuration(null);
    } else {
      setError('');
      const diffTime = endDateObj.getTime() - startDateObj.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDuration(days);
      onChange({ startDate: start, endDate: end });
    }
  }, [start, end, disabled, onChange]);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-5">
      <FormGroup label="Tanggal Mulai" htmlFor="start-date">
        <Input
          id="start-date"
          type="date"
          value={start}
          min={minStartDate}
          className="sm:text-sm text-xs w-full"
          onChange={(e) => setStart(e.target.value)}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Minimal: {minStartDate}
        </p>
      </FormGroup>

      <FormGroup label="Tanggal Berakhir" htmlFor="end-date">
        <Input
          id="end-date"
          type="date"
          value={end}
          min={formatDateUTC(addDaysUTC(new Date(start), 1))}
          className="sm:text-sm text-xs"
          onChange={(e) => setEnd(e.target.value)}
          disabled={disabled}
        />
      </FormGroup>

      <FormGroup label="Total Durasi (hari)" htmlFor="duration">
        <Input
          id="duration"
          type="text"
          className="sm:text-sm text-xs"
          value={duration ? `${duration} hari` : ''}
          readOnly
          disabled
        />
      </FormGroup>

      {error && <p className="text-sm text-red-600 col-span-full">{error}</p>}
    </div>
  );
}
