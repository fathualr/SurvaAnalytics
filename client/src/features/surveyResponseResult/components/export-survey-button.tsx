'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useExportResponSurvei } from '../hooks/useUserSurveyResponseresult';

interface ExportSurveyButtonProps {
  surveiId: string;
  surveiJudul: string;
}

export const ExportSurveyButton = ({ surveiId, surveiJudul }: ExportSurveyButtonProps) => {
  const { mutate: exportSurvey, isPending } = useExportResponSurvei(surveiId, surveiJudul);

  return (
    <div className="w-full flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-fit bg-primary-2 text-accent-1 hover:bg-primary-1 hover:text-accent-1"
            disabled={isPending}
          >
            {isPending ? 'Mengunduh...' : 'Ekspor Respons Survey'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 bg-primary-2 text-accent-1">
          <DropdownMenuItem className="cursor-pointer" onClick={() => exportSurvey('csv')}>
            CSV (.csv)
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => exportSurvey('xlsx')}>
            Excel (.xlsx)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
