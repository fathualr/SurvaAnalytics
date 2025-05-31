import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ManageSurvei() {
  return (
    <div className="w-full p-10">
      <div className="flex flex-row">
        <Button className="w-32 h-10 mr-4 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold ">Kelola survei</Button>
        <Button className="w-32 h-10 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Explore survei</Button>
      </div>
      <div>
      <p className="mt-6 text-2xl font-bold"> Ur Surve</p>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300"> 
          </div>
          <Link href="/manage-survey/add">
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold">Buat baru</span>
            </div>
          </Link>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
          <Link href="/manage-survey/edit">
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </Link>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </div>
        {/* card */}

        {/* Card */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="relative h-48 w-full bg-gray-300">
          </div>
            <div className="bg-[#FFBF68] text-white p-3 flex items-center justify-center h-16">
            <span className="text-lg font-semibold"> Kelola survei</span>
            </div>
          </div>
        {/* card */}

        </div>

          <div className="flex justify-end mt-6 mr-3 py-2">
            <button className="text-blue-500 text-3xl font-bold" >More</button>
          </div>

      </div>
    </div>
       
  );
}