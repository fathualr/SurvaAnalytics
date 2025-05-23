import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Exchange() {
  return (
    <div className="w-full p-10">
        <div className="flex flex-row">
            <Button className="w-32 h-10 mr-4 bg-[#FFBF68] hover:bg-[#D9D9D9] rounded-md font-semibold text-sm">Kelola survei</Button>
            <Button className="w-32 h-10 bg-[#FFBF68] hover:bg-[#D9D9D9] rounded-md font-semibold text-sm">Exchange</Button>
        </div>
        <div className="flex flex-col">
            <p className="mt-6 ml-2 mb-2 font-bold">Point</p>
            <p className="w-24 outline-1 p-2 rounded-sm outline-black flex items-center justify-start ">2000 pts</p>
        </div>
        <div>
        <p className="mt-6 text-2xl font-semibold">Point Exchange</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

          {/* Card  */}
          <div className="bg-white shadow rounded-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src="/images/card-image.png" alt="card image" layout="fill" objectFit="cover"
              />
            </div>
            <div className="bg-[#3984EF] text-white p-3">
              <p className="text-xl md:text-2xl font-bold">Pulsa Telkomsel</p>
              <p className="text-md font-semibold">10 pts</p>
              <div className="flex items-center justify-end mt-2">
                <Button className="bg-[#FFBF68] w-full sm:w-36 h-8 text-sm font-semibold hover:bg-[#D9D9D9] rounded-sm">
                  Tukar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Card  */}
          <div className="bg-white shadow rounded-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src="/images/card-image.png" alt="card image" layout="fill" objectFit="cover"
              />
            </div>
            <div className="bg-[#3984EF] text-white p-3">
              <p className="text-xl md:text-2xl font-bold">Pulsa Telkomsel</p>
              <p className="text-md font-semibold">10 pts</p>
              <div className="flex items-center justify-end mt-2">
                <Button className="bg-[#FFBF68] w-full sm:w-36 h-8 text-sm font-semibold hover:bg-[#D9D9D9] rounded-sm">
                  Tukar
                </Button>
              </div>
            </div>
          </div>

          {/* Card  */}
          <div className="bg-white shadow rounded-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src="/images/card-image.png" alt="card image" layout="fill" objectFit="cover"
              />
            </div>
            <div className="bg-[#3984EF] text-white p-3">
              <p className="text-xl md:text-2xl font-bold">Pulsa Telkomsel</p>
              <p className="text-md font-semibold">10 pts</p>
              <div className="flex items-center justify-end mt-2">
                <Button className="bg-[#FFBF68] w-full sm:w-36 h-8 text-sm font-semibold hover:bg-[#D9D9D9] rounded-sm">
                  Tukar
                </Button>
              </div>
            </div>
          </div>
        
          {/* Card  */}
          <div className="bg-white shadow rounded-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src="/images/card-image.png" alt="card image" layout="fill" objectFit="cover"
              />
            </div>
            <div className="bg-[#3984EF] text-white p-3">
              <p className="text-xl md:text-2xl font-bold">Pulsa Telkomsel</p>
              <p className="text-md font-semibold">10 pts</p>
              <div className="flex items-center justify-end mt-2">
                <Button className="bg-[#FFBF68] w-full sm:w-36 h-8 text-sm font-semibold hover:bg-[#D9D9D9] rounded-sm">
                  Tukar
                </Button>
              </div>
            </div>
          </div>

            </div>
            <div className="flex justify-center items-center mt-10 ">
            <button className="p-0 m-0 bg mr-4 -transparent border-none outline-none hover:bg-">
              <Image src="/pagination-left.svg" alt="Previous" width={29} height={29} priority />
            </button>
            <p className="text-2xl font-semibold">1</p>
            <button className="p-0 m-0 bg ml-4 -transparent border-none outline-none hover:opacity-80 transition">
              <Image src="/pagination-right.svg" alt="Previous" width={29} height={29} priority />
            </button>
            </div>
        </div>
    </div>
  );
}
