import { ReactNode } from "react";

interface Props {
  title: string;
  questionText: string;
  progress: number;
  timer?: string;
  error?: string | null;
  questionNumber: number;
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  isLast: boolean;
}

export default function SurveyLayout({
  title,
  progress,
  timer,
  error,
  questionNumber,
  questionText,
  children,
  onPrev,
  onNext,
  onFinish,
  isLast,
}: Props) {
  return (
    <div className="w-full min-h-screen bg-white px-6 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-3 w-1/2">
          <span className="text-sm font-semibold text-blue-600">
            {progress}%
          </span>
          <div className="w-full bg-blue-100 h-2 rounded">
            <div
              className="h-2 bg-blue-500 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-bold">{timer}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-4xl mx-auto bg-[#eaf3fc] rounded-md p-8">
        <h2 className="text-gray-500 font-semibold text-lg mb-2">
          Question {questionNumber}
        </h2>

        <div className="flex flex-col gap-6 items-center text-center">
          <p className=" text-xl font-bold text-black">{questionText}</p>
          <div className="w-full max-w-xl"> {children}</div>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
        <button
          onClick={onPrev}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={questionNumber === 1}
        >
          &lt; Previous
        </button>

        <span className="font-medium text-lg">{questionNumber}</span>

        {isLast ? (
          <button
            onClick={onFinish}
            className="bg-gray-400 text-white px-6 py-2 rounded"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            next &gt;
          </button>
        )}
      </div>
    </div>
  );
}
