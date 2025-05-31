export interface SurveyOptionProps {
    options: string[];
    type: "radio" | "checkbox";
    onAddOption: () => void;
    onRemoveOption: (index: number) => void;
    onChangeOption: (index: number, value: string) => void;
}

export interface Question {
  id: string
  type: "radio" | "checkbox"
  text: string
  options: string[]
  required?: boolean
}

export interface Survey {
  id: string
  title: string
  questions: Question[]
}