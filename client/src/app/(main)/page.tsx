import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { GridBackgroundDemo } from "@/components/ui/grid-background"

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen">
      
  <GridBackgroundDemo>
    {/* Hero Section */}
    <section className="py-16 my-auto min-h-screen md:h-screen h-full grid md:grid-cols-2 grid-cols-1 md:px-20 sm:px-10 px-5">
      <div className="col-span-1 md:row-start-1 row-start-2 flex flex-col m-auto md:gap-10 gap-8">
        <h1 className="block font-bold md:text-6xl text-5xl">
          <span className="block">Survei sekejap,</span>
          <span className="mt-2 block">Insight Melekat!</span>
        </h1>
        <div className="md:text-xl sm:text-lg text-md">
          <span className="block">
            Dapatkan data penting dalam hitungan detik!
          </span>
          <span>
            Aplikasi surva analytic yang cepat, mudah, dan akurat untuk membantumu mengambil keputusan terbaik.
          </span>
        </div>
        <Link
          href="/explore"
          className="flex justify-center items-center max-w-[300] h-[70] border border-secondary-1 bg-secondary-1 rounded-tr-3xl rounded-bl-3xl hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-3xl hover:rounded-br-3xl transition-all duration-150"
        >
          <p className="font-semibold text-center text-3xl text-accent-1">Mulai</p>
        </Link>
      </div>
      <div className="col-span-1 row-start-1 p-10 w-full h-full flex items-center justify-center">
        <Image 
          src="/images/landing-page/hero-1.png" 
          alt="Hero" 
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto md:max-h-[600px] max-h-[400px] object-contain"
        />
      </div>
    </section>
  </GridBackgroundDemo>

      {/* About / What is Surva */}
      <section className="py-10 md:px-20 sm:px-10 px-5 grid md:grid-cols-2 grid-cols-1">
        <div className="col-span-1 w-full flex justify-center">
          <Image 
            src="/images/landing-page/hero-2.png" 
            alt="Hero" 
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto md:max-h-[600px] max-h-[400px] object-contain"
          />
        </div>
        <div className="col-span-1 grid content-center h-full pr-10 md:gap-8 gap-6">
          <h2 className="md:text-5xl text-4xl font-semibold">What is Surva?</h2>
          <p className="md:text-lg sm:text-md">
            SurvaAnalytics adalah aplikasi berbasis web yang dikembangkan untuk menyederhanakan proses pembuatan, penyebaran, dan analisis survei secara menyeluruh. Latar belakang dari proyek ini adalah kebutuhan akan solusi efisien dalam pengumpulan dan pengolahan data survei, yang sering kali terhambat oleh rendahnya tingkat partisipasi responden, pencarian responden yang relevan, serta keterbatasan dalam analisis data.
          </p>
        </div>
      </section>

      {/* How Surva Works */}
      <section className="flex flex-col py-15 md:px-20 sm:px-10 px-5 md:gap-20 gap-10">
        <h2 className="md:text-5xl text-4xl font-semibold text-center">
          How Surva Works?
        </h2>

        <div className="flex justify-center md:gap-15 gap-5">
          <Link href="#" className="w-full max-w-[280px] h-[300px] rounded-xl overflow-hidden shadow-sm border flex flex-col">
            <div className="h-[200px] flex items-center justify-center">
              <Image
                src="/images/landing-page/survey-tools.png"
                alt="Survey & Tools"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-none"
              />
            </div>
            <div className="grid items-center bg-secondary-1 py-3 text-center w-full h-full">
              <p className="font-bold text-accent-1 text-2xl">Survey & Tools</p>
            </div>
          </Link>

          <Link href="#" className="w-full max-w-[280px] h-[300px] rounded-xl overflow-hidden shadow-sm border flex flex-col">
            <div className="h-[200px] flex items-center justify-center">
              <Image
                src="/images/landing-page/payment.png"
                alt="Payment"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-none"
              />
            </div>
            <div className="grid items-center bg-secondary-1 py-3 text-center w-full h-full">
              <p className="font-bold text-accent-1 text-2xl">Payment</p>
            </div>
          </Link>
        </div>

      </section>

      {/* Opinion Form Section */}
      <section className="py-15 md:px-20 sm:px-10 px-5 grid md:grid-cols-2 grid-cols-1 md:gap-none gap-5 bg-gradient-to-r from-primary-3 to-primary-1">
        <div className="col-span-1 grid content-center h-full md:gap-8 gap-6 text-accent-1">
          <h2 className="md:text-4xl text-3xl font-semibold">We still need ur opinion </h2>
          <p className="md:text-lg sm:text-md">
            Kami selalu ingin meningkatkan pengalaman Anda di Surva. Berikan opini, saran, atau masukan Anda tentang platform ini, dan bantu kami menjadi lebih baik!
          </p>
        </div>

        <div className="col-span-1 grid content-center h-full md:px-10">
          <div className="bg-accent-1 rounded-lg p-6 text-black w-full mx-auto shadow-md">
            <h4 className="text-lg font-bold mb-4 text-center">Opinion letters</h4>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF68]"
                  placeholder="pengguna@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border border-gray-400 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#FFBF68]"
                  placeholder="Tuliskan masukan kamu di sini..."
                />
              </div>
              <Button
                variant="ghost"
                type="submit"
                className="bg-[#FFBF68] hover:bg-[#e6a94d] text-white font-semibold px-5 py-2 rounded-md transition-colors"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="flex flex-col py-15 md:px-20 sm:px-10 px-5 md:gap-15 gap-5">
        <h2 className="text-center md:text-4xl text-3xl font-semibold">
          Our Client know best
        </h2>

        <Carousel className="w-full mx-auto ">
          <CarouselContent>
            {[
              {
                name: "User 1",
                avatar: "/icons/navbar/user-circle.svg",
                message: "Surva made my data collection 10x easier!",
              },
              {
                name: "User 2",
                avatar: "/icons/navbar/user-circle.svg",
                message: "Super intuitive and fast. Love the UI!",
              },
              {
                name: "User 3",
                avatar: "/icons/navbar/user-circle.svg",
                message: "Insightful analytics that helped my research.",
              },
              {
                name: "User 4",
                avatar: "/icons/navbar/user-circle.svg",
                message: "Finally, a survey tool that doesn't frustrate me.",
              },
              {
                name: "User 5",
                avatar: "/icons/navbar/user-circle.svg",
                message: "Great support team and super clean dashboard.",
              },
            ].map((item, index) => (
              <CarouselItem
                key={index}
                className="min-w-0 basis-auto md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-primary-2 text-white p-6 rounded-xl shadow-md h-full">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <p className="font-semibold">{item.name}</p>
                  </div>
                  <p className="text-sm italic">“{item.message}”</p>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

    </main>
  );
}
