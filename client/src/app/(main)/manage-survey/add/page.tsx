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
        type: 'radio',
        question: '',
        options: ['', '']
      }
    ])
  }

  // fungsi update pertanyaan
  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => {
      if (q.id !== id) return q;

      const optionTypes = ['radio', 'checkbox', 'dropdown'];
      const isCurrentOptionType = optionTypes.includes(q.type);
      const isNewOptionType = updates.type && optionTypes.includes(updates.type);

       if (updates.type && updates.type !== q.type ) {
        if (isNewOptionType) {
          return {
            ...q,
            type: updates.type,
            options: q.options ?? ['', ''],
            scaleLabels: undefined,
          }
        }
        if (updates.type === 'scale') {
          return {
            ...q,
            type: 'scale',
            scaleLabels: Array(5).fill(""),
            options: undefined,
          }
        }
        if (updates.type === 'text') {
          return {
            ...q,
            type: 'text',
            options: undefined,
            scaleLabels: undefined
          }
        }
      }
      return {...q, ...updates};
    }))
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

  // funsgi untuk hapus opsi
  const removeOptionFromQuestion = (questionId: string, optionIndex: number) => {
  setQuestions(questions.map(q => {
    if (q.id !== questionId) return q;
    
    // Pastikan minimal 1 opsi tersisa
    const currentOptions = q.options || [''];
    if (currentOptions.length <= 1) return q; 

      return {
        ...q,
        options: currentOptions.filter((_, idx) => idx !== optionIndex)
      }
    }))
  }

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
      }
    }))
  }

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
    
    // Sisa 1 opsi
    if (currentOptions.length <= 1) return q; 
      return {
        ...q,
        scaleLabels: currentOptions.filter((_, i) => i !== index)
      }
    }))
  }

  // fungsi menghapus pertanyaan
  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  // fungsi input tag Region
  const [regions, setRegions] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([""])

  const handleAddRegion = (index: number) => {
    const value = inputValues[index].trim();
    if (!value) return;

    setRegions(prev => [...prev, value]);

    setInputValues(prev => {
      const updated = [...prev];
      updated[index] = "";
      return [...updated];
    })
  }

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputValues];
    newInputs[index] = value;
    setInputValues(newInputs);
  };

  const handleRemoveRegion = (index: number) => {
    const newRegions = [...regions];
    newRegions.splice(index, 1);
    setRegions(newRegions);
  }

  // fungsi input tag Status
  const [activities, setActivities] = useState<string[]>([]);
  const [activityInputs, setActivityInputs] = useState<string[]>([""])

  const handleAddActivity = (index: number) => {
    const value = activityInputs[index].trim();
    if (!value) return;

    setActivities(prev => [...prev, value]);

    setActivityInputs(prev => {
      const updated = [...prev];
      updated[index] = "";
      return [...updated];
    })
  }

  const handleActivityChange = (index: number, value: string) => {
    const newInputs = [...activityInputs];
    newInputs[index] = value;
    setActivityInputs(newInputs);
  }

  const handleRemoveActivity = (index:number) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  }

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
          <Input type="text" className="w-full border-2 border-black rounded-md px-3 py-2 h-10"/>
        </div>
        <div>

          <Label className="text-lg font-bold mb-1">Kriteria Survei</Label>
          <div className="border-2 border-black rounded-md p-10 pl-8 mb-6">
            <div className="mb-3">
              <span className="font-bold text-sm ml-1 mb-1 block">Region</span>
              <div className="flex flex-wrap gap-2">
                {regions.map((region, idx) => (
                  <div key={idx} className="flex items-center bg-blue-100 px-3 py-1 rounded-sm text-sm font-medium">
                    {region}
                    <button onClick={() => handleRemoveRegion(idx)}  className="ml-3"><img src="/icons/managesurvey/x.svg" className="w-4 h-4"/></button>
                  </div>
                ))}

                {inputValues.map((value, idx) => (
                  <div key={`input-${idx}`}  className="flex items-center gap-1">
                    <Input 
                    type="text" 
                    className="border-1 border-black rounded px-2 py-1 text-sm w-20 h-8" 
                    value={value}  
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                   />
                    <Button variant="ghost" size="sm" className="bg-gray-200 w-12" onClick={() => handleAddRegion(idx)}><img src="/icons/managesurvey/plus.svg" className="w-5 h-5"/></Button>
                   </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-3">
            <span className="font-bold text-sm ml-1">Umur</span>

            <div className="flex items-center gap-4">
              <Input type="number"  className="w-20  border-1 border-black" placeholder="Min" min="1" max="100"/>
              <hr className="border-t-2 border-black w-3" />
              <Input type="number"  className="w-20  border-1 border-black" placeholder="Max" min="1" max="100"/>
            </div>
            </div>

            <div className="mb-3">
              <span className="font-bold text-sm ml-1 mb-1 block">Status latar belakang</span>
              <div className="flex flex-wrap gap-2">
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center bg-blue-100 px-3 py-1 rounded-sm text-sm font-medium">
                    {activity}
                    <button onClick={() => handleRemoveActivity(idx)}  className="ml-3"><img src="/icons/managesurvey/x.svg" className="w-4 h-4"/></button>
                  </div>
                ))}

                {activityInputs.map((value, idx) => (
                  <div key={`activity-input-${idx}`}  className="flex items-center gap-1">
                    <Input 
                    type="text" 
                    className="border-1 border-black rounded px-2 py-1 text-sm w-20 h-8" 
                    value={value}  
                    onChange={(e) => handleActivityChange(idx, e.target.value)}
                   />
                    <Button variant="ghost" size="sm" className="bg-gray-200 w-12" onClick={() => handleAddActivity(idx)}><img src="/icons/managesurvey/plus.svg" className="w-5 h-5"/></Button>
                   </div>
                  ))}
              </div>

            </div>

            <div className="flex flex-col gap-1 mb-3">
              <span className="font-bold text-sm ml-1">Jenis kelamin</span>

              <Select>
                <SelectTrigger className="w-40 border-black border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua" className="font-semibold"><img src="/icons/managesurvey/malefemale.svg" className="w-4 h-4"/>Semua</SelectItem>
                  <SelectItem value="laki-laki" className="font-semibold"><img src="/icons/managesurvey/male.svg" className="w-4 h-4"/>Laki-laki</SelectItem>
                  <SelectItem value="perempuan" className="font-semibold"><img src="/icons/managesurvey/female.svg" className="w-4 h-4"/>Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-lg font-bold mb-1">Deskripsi survei</Label>
          <textarea className="w-full border-2 border-black rounded-md px-3 py-2" rows={4}/>
        </div>

        <div className="flex justify-end mt-6 mb-6">
        <Button className="bg-white hover:bg-white border-2 border-black text-black font-bold w-48 rounded-md">Simpan survei</Button>
        </div>

        {questions.map((q, qIndex) => ( 
        <div key={q.id} className="border-2 border-black rounded-md p-10 pl-20 mb-6">
          <Input value={q.question} onChange={(e) => updateQuestion(q.id, { question: e.target.value})} className="mb-6 border-1 border-black focus:border-black " placeholder="Pertanyaan Survei" />

        <div className="flex flex-col items-start gap-4 mt-4 w-full">
          <div className="w-full md:w-[200px]">
          <Select value={q.type} onValueChange={(value) => updateQuestion(q.id, { type: value as Question['type'] })}>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="radio" className="font-semibold"><img src="/icons/managesurvey/radio-button.svg" className="w-4 h-4"/>Pilihan Ganda</SelectItem>
                <SelectItem value="checkbox" className="font-semibold"><img src="/icons/managesurvey/check-square.svg" className="w-4 h-4"/>Checkbox</SelectItem>
                <SelectItem value="text" className="font-semibold "><img src="/icons/managesurvey/paragraf.svg" className="w-4 h-4"/>Essay</SelectItem>
                <SelectItem value="scale" className="font-semibold"><img src="/icons/managesurvey/skala-linier.svg" className="w-4 h-4"/>Skala</SelectItem>
                <SelectItem value="dropdown" className="font-semibold"><img src="/icons/managesurvey/caret-down.svg" className="w-4 h-4" />Drop-down</SelectItem>
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

          <div className="flex justify-end">
            <Button onClick={() => deleteQuestion(q.id)} variant="ghost" size="sm" ><img src="/icons/managesurvey/trash.svg" className="w-6 h-6"/></Button>
          </div>

      </div>
      ))}

        <div className="flex justify-center mt-6">
        <Button onClick={addNewQuestion} className="bg-white hover:bg-white border-2 border-black text-black font-bold w-48 rounded-md">Tambah Pertanyaan</Button>
        </div>
      </div>
    </div>
  );
}