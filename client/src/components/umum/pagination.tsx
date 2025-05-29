'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const pageNum = Math.max(1, Math.min(Number(inputValue), totalPages));
    onPageChange(pageNum);
  };

  return (
    <div className="flex justify-center items-center mt-10 gap-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="cursor-pointer p-0 m-0 bg-transparent border-none outline-none hover:opacity-80 disabled:opacity-40 disabled:cursor-default"
      >
        <Image
          src="/pagination-left.svg"
          alt="Previous"
          width={29}
          height={29}
          priority
        />
      </button>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-14 text-center text-2xl font-semibold border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <span className="text-md text-muted-foreground">/ {totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="cursor-pointer p-0 m-0 bg-transparent border-none outline-none hover:opacity-80 disabled:opacity-40 disabled:cursor-default"
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
};
