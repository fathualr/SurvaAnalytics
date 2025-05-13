import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function criteriaSurvei() {
  return (
  <div className="w-full p-10">
    <div className="flex flex-row">
      <Button className="w-32 h-10 mr-4 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold ">Kelola survei</Button>
      <Button className="w-32 h-10 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Explore survei</Button>
    </div>

    <div className="flex flex-col items-center mt-6">
      <p className="text-3xl font-bold mb-1 ">Buat survei</p>
      <div className="h-3 bg-[#1860C6] rounded-full w-full mt-2"/>
    </div>

    <div className="mt-4">
      <Label className="text-xl font-bold mb-4">Kriteria survei</Label>

      <div className="border-3 border-black rounded-md p-10 pl-20">
        
        <RadioGroup className="space-y-px">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" className="border-orange-400" />
            <label htmlFor="option-one" className="font-semibold">Kriteria 1</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" className="border-orange-400"/>
            <label htmlFor="option-two" className="font-semibold">Kriteria 2</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-three" className="border-orange-400"/>
            <label htmlFor="option-three" className="font-semibold">Kriteria 3</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-four" id="option-four" className="border-orange-400"/>
            <label htmlFor="option-four" className="font-semibold">Kriteria 4</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-five" id="option-five" className="border-orange-400"/>
            <label htmlFor="option-five" className="font-semibold">Kriteria 5</label>
          </div>
        </RadioGroup>
        
      </div>

      <div className="flex justify-center mt-6">
        <Button className="bg-white hover:bg-white border-3 border-black text-black font-bold w-48 rounded-md">lanjut</Button>
      </div>

    </div>


    

  </div>
  );
}