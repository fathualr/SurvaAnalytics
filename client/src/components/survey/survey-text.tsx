export function SurveyText({ title = "Essay" }: { title?: string }) {
  return (
    <div className="mt-1">
      <p className="font-semibold">{title}</p>
      <textarea 
        className="w-full mt-4 bg-transparent border-0 border-b-2 border-dashed border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none resize-none" 
        rows={1} 
        placeholder="Jawaban panjang" 
        disabled
      />
    </div>
  );
}