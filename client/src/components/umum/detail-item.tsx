interface DetailItemProps {
  label: string;
  value: string | number;
}

export const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className="flex justify-between border-b py-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);
