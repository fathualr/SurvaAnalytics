import React from 'react'
import { SurveyRadio } from './survey-radio';
import { SurveyCheckbox } from './survey-checkbox';
import { SurveyOptionProps } from './types';
import { on } from 'events';

const SurveyQuestion = () => {
  return (
    <div>
        <h2 className="text-lg font-semibold mb-4">Pertanyaan Survei</h2>
        <SurveyType
          options={["Opsi 1", "Opsi 2", "Opsi 3", "Opsi 4"]}
          type="radio"
          onAddOption={() => console.log("Tambah Opsi")}
          onRemoveOption={(index) => console.log("Hapus Opsi", index)}
          onChangeOption={(index, value) => console.log("Ubah Opsi", index, value)}
        />
        <SurveyType
          options={["Opsi A", "Opsi B"]}
          type="checkbox"
          onAddOption={() => console.log("Tambah Opsi")}
          onRemoveOption={(index) => console.log("Hapus Opsi", index)}
          onChangeOption={(index, value) => console.log("Ubah Opsi", index, value)}
        />
    </div>
  )
}
  
export function SurveyType({
  options,
  type,
  onAddOption,
  onRemoveOption,
  onChangeOption,
}: SurveyOptionProps ) {
   switch (type) {
    case "radio":
      return (
        <SurveyRadio
        type="radio"
          options={options}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          onChangeOption={onChangeOption}
        />
      );
    case "checkbox":
      return (
        <SurveyCheckbox
        type="checkbox"
          options={options}
            onAddOption={onAddOption}
            onRemoveOption={onRemoveOption}
            onChangeOption={onChangeOption}

        />
      );
    default:
      return <div>Jenis pertanyaan tidak dikenali</div>;
  }
}

export default SurveyQuestion
