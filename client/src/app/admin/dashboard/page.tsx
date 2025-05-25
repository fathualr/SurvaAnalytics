import { Component } from "@/components/ui/dashboard-chart";

export default function DashboardPage() {
  return (
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl font-semibold">Dashboard</h2>

        {/* Card info */}
        <div className="flex flex-row gap-4 my-6">
          <div className="w-1/2 bg-[#F2F9FF] border-3 border-[#3E82CD] p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">Total User</p>
            <p className="text-3xl mt-2">206</p>
          </div>
          <div className="w-full bg-[#F2F9FF] border-3 border-[#3E82CD] p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">Total Survei</p>
            <p className="text-3xl mt-2">200000 survei</p>
          </div>
        </div>
          <Component ></Component>
        
      </div>
  );
}
