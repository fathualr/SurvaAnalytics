"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"  
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SurveyRadio } from "@/components/survey/survey-radio";
import { SurveyCheckbox } from "@/components/survey/survey-checkbox";
import { SurveyScale } from "@/components/survey/survey-scale";
import { SurveyDropdown } from "@/components/survey/survey-dropdown";
import { SurveyText } from "@/components/survey/survey-text";


export default function AddSurvei() {
  const [questionType, setQuestionType] = useState("");
  const [radioOptions, setRadioOptions] = useState<string[]>(["", ""]);
  const [checkboxOptions, setCheckboxOptions] = useState<string[]>(["", ""]);
  const [scaleOptions, setScaleOptions] = useState<string[]>(["", "", "", "", ""])
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(["", ""])

  type Question = {
    id: string;
    type: 'radio' | 'checkbox' | 'scale' | 'dropdown' | 'text';
    question: string;
    options? : string[];
    scaleLabels? : string[];
  }

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'radio',
      question: '',
      options: ['', '']
    }
  ]);

  // Fungsi tambah pertanyaan
  const addNewQuestion = () => {
    const newId = Date.now().toString();

    setQuestions([
      ...questions,
      {
        id: newId,
        type: 'text',
        question: '',
        options: ['']
      }
    ])
  }

  // fungsi update pertanyaan
  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ))
  } 

  // fungsi tambah opsi ke pertanyaan
  const addOptionToQuestion = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      return {
        ...q,
        options: [...(q.options || []), '']
      }
    }))
  }
// funsgi untuk hapus
  const removeOptionFromQuestion = (questionId: string, optionIndex: number) => {
  setQuestions(questions.map(q => {
    if (q.id !== questionId) return q;
    
    // Pastikan minimal 1 opsi tersisa
    const currentOptions = q.options || [''];
    if (currentOptions.length <= 1) return q; 

    return {
      ...q,
      options: currentOptions.filter((_, idx) => idx !== optionIndex)
    };
  }));
};
// fungsi update option dalam pertanyaan
const updateOptionInQuestion = (
  questionId: string, 
  optionIndex: number, 
  value: string
) => {
  setQuestions(questions.map(q => {
    if (q.id !== questionId) return q;
    
    const updatedOptions = [...(q.options || [''])];
    updatedOptions[optionIndex] = value;
    
    return {
      ...q,
      options: updatedOptions
    };
  }));
};
  // fungsi tambah scala
  const addScaleOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      const currentOptions = q.scaleLabels || Array(5).fill("");
       if (currentOptions.length >= 10) return q; 
    
      return {
        ...q,
        scaleLabels: [...currentOptions, ""]
    };
    }))
  }

  // fungsi hapus scala
  const removeScaleOption = (questionId: string, index: number) => {
  setQuestions(questions.map(q => {
    if (q.id !== questionId) return q;
    const currentOptions = q.scaleLabels || [""];
    
    // Stop jika sisa 1 opsi
    if (currentOptions.length <= 1) return q; 
    
    return {
      ...q,
      scaleLabels: currentOptions.filter((_, i) => i !== index)
    };
  }));
};

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

      <div className="mt-6 space-y-4">

        <div>
          <Label className="text-lg font-bold mb-1">Nama survei</Label>
          <input type="text" className="w-full border-2 border-black rounded-md px-3 py-2"/>
        </div>

        <div className="border-2 border-black rounded-md h-10 px-3 p-2 ">
          <span className="">Kriteria survei</span>
        </div>

        <div>
          <Label className="text-lg font-bold mb-1">Deskripsi survei</Label>
          <textarea className="w-full border-2 border-black rounded-md px-3 py-2" rows={5}/>
        </div>

        {questions.map((q, qIndex) => ( 
        <div key={q.id} className="border-2 border-black rounded-md p-10 pl-20 mb-6">
          <Input value={q.question} onChange={(e) => updateQuestion(q.id, { question: e.target.value})} className="mb-6 border-1 border-black focus:border-black " placeholder="Pertanyaan Survei" />


        <div className="flex flex-col md:flex-row items-start gap-4 mt-4 w-full">
          <div className="w-full md:w-[200px]">
          <Select value={q.type} onValueChange={(value) => updateQuestion(q.id, { type: value as Question['type'] })}>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="radio" className="font-bold flex items-center gap-2"><img src="/radio-button.svg" className="w-4 h-4"/>Pilihan Ganda</SelectItem>
                <SelectItem value="checkbox" className="font-bold"><img src="/check-square.svg" className="w-4 h-4"/>Checkbox</SelectItem>
                <SelectItem value="text" className="font-bold "><img src="/paragraf.svg" className="w-4 h-4"/>Essay</SelectItem>
                <SelectItem value="scale" className="font-bold"><img src="/skala-linier.svg" className="w-4 h-4"/>Skala</SelectItem>
                <SelectItem value="dropdown" className="font-bold"><img src="/caret-down.svg" className="w-4 h-4" />Drop-down</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>

        {/* opsi tipe radio */}
        <div className="w-full flex-1">
        {q.type === "radio" && (
          <SurveyRadio 
          options={q.options || ['']}
          onAddOption={() => addOptionToQuestion(q.id)}
          onRemoveOption={(index) => removeOptionFromQuestion(q.id, index)}
          onChangeOption={(index, value) => 
            updateOptionInQuestion(q.id, index, value)
          } 
          />
        )}

        {/* opsi tipe checkbox */}
        {q.type === "checkbox" && (
          <SurveyCheckbox 
          options={q.options || ['']}
          onAddOption={() => addOptionToQuestion(q.id)}
          onRemoveOption={(index) => removeOptionFromQuestion(q.id, index)}
          onChangeOption={(index, value) => 
            updateOptionInQuestion(q.id, index, value)
          }
          />
        )}

        {/* opsi tipe skala */}
        {q.type === "scale" && (
          <SurveyScale 
          options={q.scaleLabels || Array(5).fill("")}
          onAddOption={() => addScaleOption(q.id)}
          onRemoveOption={(index) => removeScaleOption(q.id, index)}
          onChangeOption={(index, value) => {
            setQuestions(questions.map(question => {
              if (question.id !== q.id) return question;
              const newLabels = [...(question.scaleLabels || [])];
              newLabels[index] = value;
              return {...question, scaleLabels: newLabels };
            }));
          }}
          />
        )}

        {/* opsi tipe dropdown */}
        {q.type === "dropdown" && (
          <SurveyDropdown 
          options={q.options || ['']}
          onAddOption={() => addOptionToQuestion(q.id)}
          onRemoveOption={(index) => removeOptionFromQuestion(q.id, index)}
          onChangeOption={(index, value) => updateOptionInQuestion(q.id, index, value)}
          />

        )}

        {/* opsi tipe text */}
        {q.type === "text" &&  <SurveyText />}

      
        </div>
        </div>
      </div>
      ))}

        <div className="flex justify-center mt-6">
        <Button onClick={addNewQuestion} className="bg-white hover:bg-white border-3 border-black text-black font-bold w-48 rounded-md">Tambah Pertanyaan</Button>
        </div>

        
        <div className="flex justify-end mt-6">
        <Button className="bg-white hover:bg-white border-3 border-black text-black font-bold w-48 rounded-md">lanjut</Button>
        </div>
        
        
      </div>
    </div>
  );
}