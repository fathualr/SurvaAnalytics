import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

type SurveyCardProps = {
  title: string;
  points: number;
  image?: string;
};

export function SurveyCard({ title, points, image }: SurveyCardProps) {
  const fallbackImage = "/images/explore-page/survei.png";

  return (
    <Card className="overflow-hidden p-0 flex flex-col">
      {/* Gambar */}
      <div className="relative xl:h-[140px] md:h-[120px] h-[100px] w-full">
        <Image
          src={image || fallbackImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>

      {/* Konten */}
      <CardContent
        className="bg-primary-2 text-accent-1 px-4 py-3 flex flex-col gap-1 flex-grow"
      >
        <CardTitle
          className="text-xl font-bold leading-snug line-clamp-2 min-h-[3.5rem]"
        >
          {title}
        </CardTitle>
        <p className="text-sm font-medium">{points} pts</p>
        <div className="flex justify-end mt-auto pt-2">
          <Button
            className="cursor-pointer bg-secondary-1 w-full sm:w-32 h-8 text-sm font-semibold hover:bg-secondary-2 text-black rounded-sm"
          >
            Kerjakan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
