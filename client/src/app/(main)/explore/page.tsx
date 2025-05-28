import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavUmum} from "@/components/umum/nav-umum";
import { SurveyList } from "@/components/umum/survey-list";

export const metadata = {
  title: "Surva. - Explore"
};

const surveys = [
  {
    id: 1,
    judul: "Survei Kepuasan Pengguna adasdas dda dad adasdasdasd ada",
    deskripsi: "survei - 1",
    poin: 20,
  },
  {
    id: 2,
    judul: "Survei Layanan Publik",
    deskripsi: "survei - 2",
    poin: 15,
  },
  {
    id: 3,
    judul: "Survei Kebutuhan Digital",
    deskripsi: "survei - 3",
    poin: 25,
  },
  {
    id: 4,
    judul: "Survei Kesejahteraan Sosial",
    deskripsi: "survei - 4",
    poin: 10,
  },
  {
    id: 5,
    judul: "Survei Literasi Keuangan",
    deskripsi: "survei - 5",
    poin: 30,
  },
  {
    id: 6,
    judul: "Survei Pengalaman Pelanggan",
    deskripsi: "survei - 6",
    poin: 18,
  },
  {
    id: 7,
    judul: "Survei Efektivitas Program",
    deskripsi: "survei - 7",
    poin: 22,
  },
  {
    id: 8,
    judul: "Survei Partisipasi Komunitas",
    deskripsi: "survei - 8",
    poin: 12,
  },
  {
    id: 9,
    judul: "Survei Ketahanan Ekonomi",
    deskripsi: "survei - 9",
    poin: 16,
  },
  {
    id: 10,
    judul: "Survei Penggunaan Teknologi",
    deskripsi: "survei - 10",
    poin: 20,
  },
  {
    id: 11,
    judul: "Survei Ketahanan Ekonomi",
    deskripsi: "survei - 11",
    poin: 11,
  },
  {
    id: 12,
    judul: "Survei Penggunaan Teknologi",
    deskripsi: "survei - 12",
    poin: 120,
  },
  {
    id: 12,
    judul: "Survei Penggunaan Teknologi",
    deskripsi: "survei - 13",
    poin: 120,
  },
];

export default function Exchange() {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 sm:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Daftar survei</h1>

        {/* Search */}
          <div className="flex flex-row gap-5 mb-6">
            <Input
              type="text"
              placeholder="Cari survei"
              className="max-w-[350px]"
            />
            <Button
              variant="outline"
              type="submit"
              className="cursor-pointer hover:bg-primary-2 hover:text-accent-1"
            >
              Cari
            </Button>
          </div>

        {/* Cards + Pagination */}
        <SurveyList surveys={surveys} itemsPerPage={12} />
      </section>
    </main>
  );
}
