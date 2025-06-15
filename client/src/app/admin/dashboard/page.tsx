import { DashboardChart } from "@/components/admin/dashboard-chart";

export default function DashboardPage() {
  return (
    <section className="grid text-primary-1 gap-3 font-semibold">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 content-center text-center border shadow h-40 rounded-md">
          <p className="text-lg">Total Pengguna</p>
          <p className="text-3xl font-bold mt-2">x</p>
        </div>
        <div className="col-span-1 content-center text-center border shadow h-40 rounded-md">
          <p className="text-lg">Total Survei</p>
          <p className="text-3xl font-bold mt-2">x</p>
        </div>
        <div className="col-span-1 content-center text-center border shadow h-40 rounded-md">
          <p className="text-lg">Total Respon</p>
          <p className="text-3xl font-bold mt-2">x</p>
        </div>
        <div className="col-span-3">
          <DashboardChart />
        </div>
      </div>
    </section>
  );
}
