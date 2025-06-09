interface Props {
  disabled?: boolean;
}

export function EssayQuestion({ disabled = true }: Props) {
  return (
    <div className="space-y-2">
      <p className="font-semibold">Essay</p>
      <textarea
        className="w-full mt-4 bg-transparent border-0 border-b-2 border-dashed border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none resize-none"
        rows={1}
        placeholder="Jawaban anda"
        disabled={disabled}
      />
    </div>
  );
}
