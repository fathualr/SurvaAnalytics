export interface SurveyOptionProps {
    options: string[];
    type: "radio" | "checkbox";
    onAddOption: () => void;
    onRemoveOption: (index: number) => void;
    onChangeOption: (index: number, value: string) => void;
}