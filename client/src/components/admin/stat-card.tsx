export function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="flex flex-col justify-center items-center text-center border shadow h-40 rounded-md bg-white">
      <p className="text-lg">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
