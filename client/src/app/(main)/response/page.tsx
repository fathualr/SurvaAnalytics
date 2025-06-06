"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 
import BarChart from "@/components/surveyresults/bar-chart";
import PieChart from "@/components/surveyresults/pie-chart";

export default function ResponseSurvey() {

  const [selectedChart, setSelectedChart] = useState<string>("");

  return (
    <div  className="w-full p-10">
      <div className="flex flex-row">
        <Button className="w-32 h-10 mr-5 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold ">Kelola survei</Button>
        <Button className="w-32 h-10 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Explore survei</Button>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-3xl font-bold mb-1 ">Gajah Duduk</p>
        <div className="h-3 bg-[#1860C6] rounded-full w-full mt-2"/>
      </div>

      <div className="flex justify-center gap-7 my-4">
        <Button className="w-32 h-8 rounded-2xl bg-[#FFBF68]">Overview</Button>
        <Button className="w-32 h-8 rounded-2xl bg-[#71A9DA]">Response</Button>
        <Button className="w-32 h-8 rounded-2xl bg-[#FFBF68]">Dashboard</Button>
      </div>

      <div className="border-2 border-black rounded-md p-8 mb-6">
        <div className="mb-1">
          <span className="text-md font-semibold">1. Apakah ikan suka makan pelet</span>
          <Select onValueChange={(value) => setSelectedChart(value)}>
            <SelectTrigger className="text-black border-2 border-black w-36 mt-2 ml-4">
              <SelectValue placeholder="Pilih chart"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pie">Pie Chart</SelectItem>
              <SelectItem value="bar">Bar Graph</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-4 flex justify-center items-center">
          {selectedChart == "pie" && <PieChart />}
          {selectedChart == "bar" && <BarChart />}
          </div>
        </div>
      </div>

    </div>

  )
}