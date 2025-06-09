import { Button } from "@/components/ui/button";

export default function OverviewSurvey() {
  return (
    <div className="w-full p-10">
      <div className="flex flex-row">
        <Button className="w-32 h-10 mr-5 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold ">Kelola survei</Button>
        <Button className="w-32 h-10 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Explore survei</Button>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-3xl font-bold mb-1 ">Gajah Duduk</p>
        <div className="h-3 bg-[#1860C6] rounded-full w-full mt-2"/>
      </div>

      <div className="flex justify-center gap-7 my-4">
        <Button className="w-32 h-8 rounded-2xl bg-[#71A9DA]">Overview</Button>
        <Button className="w-32 h-8 rounded-2xl bg-[#FFBF68]">Response</Button>
        <Button className="w-32 h-8 rounded-2xl bg-[#FFBF68]">Dashboard</Button>
      </div>

      <div className="mt-6 bg-[#71A9DA] text-white p-10 rounded-sm ">
        <div className="space-y-4 text-sm">
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="w-40 font-semibold">id survei</span>
            <span>:</span>
            <span className="ml-5 font-semibold">09777770707070709</span>
          </div>
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="w-40 font-semibold">status</span>
            <span>:</span>
            <span className="ml-5 font-semibold">aktif</span>
          </div>
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="w-40 font-semibold">Jumlah pertanyaan</span>
            <span>:</span>
            <span className="ml-5 font-semibold">20</span>
          </div>
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="w-40 font-semibold">Target responden</span>
            <span>:</span>
            <span className="ml-5 font-semibold">70</span>
          </div>
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="w-40 font-semibold">Durasi</span>
            <span>:</span>
            <span className="ml-5 font-semibold">10 hari</span>
          </div>
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="w-40 font-semibold">Jangka waktu</span>
            <span>:</span>
            <span className="ml-5 font-semibold">10 nov 2025 - 20 nov 2025</span>
          </div>
          <div className="flex items-center pb-2 border-b border-gray-500">
            <span className="flex items-center w-40 font-semibold">Target responden</span>
            <span>:</span>
            <span className="ml-5 font-semibold">17-20 tahun</span>
          </div>
        </div>
      </div>

    </div>
  )
}