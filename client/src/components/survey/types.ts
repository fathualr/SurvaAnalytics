export interface SurveyOptionProps {
    options: string[];
    onAddOption: () => void;
    onRemoveOption: (index: number) => void;
    onChangeOption: (index: number, value: string) => void;
}