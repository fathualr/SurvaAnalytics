import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavUmum} from "@/components/umum/nav-umum";
import { SurveyList } from "@/components/umum/survey-list";

const surveys = [
  {
    id: 1,
    title: "Survei Kepuasan Pengguna",
    points: 20,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 2,
    title: "Survei Layanan Publik",
    points: 15,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 3,
    title: "Survei Kebutuhan Digital",
    points: 25,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 4,
    title: "Survei Kesejahteraan Sosial",
    points: 10,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 5,
    title: "Survei Literasi Keuangan",
    points: 30,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 6,
    title: "Survei Pengalaman Pelanggan",
    points: 18,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 7,
    title: "Survei Efektivitas Program",
    points: 22,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 8,
    title: "Survei Partisipasi Komunitas",
    points: 12,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 9,
    title: "Survei Ketahanan Ekonomi",
    points: 16,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 10,
    title: "Survei Penggunaan Teknologi",
    points: 20,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 11,
    title: "Survei Ketahanan Ekonomi",
    points: 11,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 12,
    title: "Survei Penggunaan Teknologi",
    points: 120,
    image: "/images/explore-page/survei.png",
  },
  {
    id: 12,
    title: "Survei Penggunaan Teknologi",
    points: 120,
    image: "/images/explore-page/survei.png",
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
