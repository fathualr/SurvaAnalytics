import Image from "next/image";

type SurveyPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function SurveyPagination({
  totalPages,
  currentPage,
  onPageChange,
}: SurveyPaginationProps) {
  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-0 m-0 bg-transparent mr-4 border-none outline-none hover:opacity-80 disabled:opacity-40"
      >
        <Image
          src="/pagination-left.svg"
          alt="Previous"
          width={29}
          height={29}
          priority
        />
      </button>

      <p className="text-2xl font-semibold">{currentPage}</p>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-0 m-0 bg-transparent ml-4 border-none outline-none hover:opacity-80 disabled:opacity-40"
      >
        <Image
          src="/pagination-right.svg"
          alt="Next"
          width={29}
          height={29}
          priority
        />
      </button>
    </div>
  );
}
