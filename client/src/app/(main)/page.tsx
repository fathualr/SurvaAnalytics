import { Metadata } from 'next';
import Image from "next/image"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { GridBackgroundDemo } from "@/components/ui/grid-background"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"


export const metadata: Metadata = {
  title: 'Surva.',
  description: 'Aplikasi analisis cerdas untuk hasil survei.'
};


export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen">
      
      <GridBackgroundDemo>
        {/* Hero Section */}
        <section className="py-16 my-auto min-h-screen md:h-screen h-full grid md:grid-cols-2 grid-cols-1 md:px-20 sm:px-10 px-5">
          <div className="col-span-1 md:row-start-1 row-start-2 flex flex-col m-auto md:gap-10 gap-8 md:items-start items-center md:text-left text-center">
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
              className="flex justify-center items-center w-full max-w-[300] h-[70] border border-secondary-1 bg-secondary-1 rounded-tr-3xl rounded-bl-3xl hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-3xl hover:rounded-br-3xl transition-all duration-150"
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
        <div className="col-span-1 grid content-center h-full md:pr-10 md:gap-8 gap-6 md:text-left text-center">
          <h2 className="md:text-5xl text-4xl font-semibold">What is Surva?</h2>
          <p className="md:text-lg  sm:text-md text-justify">
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
          <Dialog>
            <DialogTrigger asChild>
              <Card className="w-full max-w-[280px] h-[300px] overflow-hidden p-0 flex flex-col items-center rounded-lg shadow-md gap-0 cursor-pointer">
                <div className="w-full h-[200px] flex items-center justify-center bg-accent-1 p-0">
                  <Image
                    src="/images/landing-page/survey-tools.png"
                    alt="Survey & Tools"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full object-cover p-0"
                  />
                </div>
                <CardContent className="grid items-center bg-secondary-1 py-3 text-center w-full h-full">
                  <CardTitle className="font-bold text-accent-1 text-2xl">
                    Survey & Tools
                  </CardTitle>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="md:p-4 p-2">
              <DialogHeader>
                <DialogTitle>Survey & Tools</DialogTitle>
                <div className="max-h-120 h-auto overflow-auto md:p-2 p-1">
                  <div className="grid justify-items-center">
                    <Image
                      src="/images/landing-page/survey-tools.png"
                      alt="Survey & Tools"
                      width={120}
                      height={120}
                      sizes="50vw"
                      className="object-cover p-0"
                    />
                  </div>
                  <div className="space-y-3 text-left text-sm">
                    <p><strong>Apa itu Survey & Tools?</strong><br />
                    Fitur ini menyediakan berbagai survei yang dapat diisi pengguna, serta alat bantu (tools) untuk mempermudah aktivitas Anda dalam platform kami.</p>
                    <p><strong>Mengapa fitur ini penting?</strong><br />
                    Dengan mengisi survei, Anda membantu kami memahami kebutuhan pengguna dan meningkatkan kualitas layanan. Tools yang tersedia juga mempermudah pekerjaan, seperti pengumpulan data atau analisis sederhana.</p>
                    <p><strong>Bagaimana cara menggunakannya?</strong><br />
                    1. Klik menu "Survey & Tools" di dashboard.<br />
                    2. Pilih survei yang ingin Anda isi atau tools yang ingin digunakan.<br />
                    3. Ikuti instruksi pada masing-masing halaman dengan teliti.<br />
                    4. Setelah selesai, pastikan Anda menyimpan atau mengirim data Anda jika diperlukan.</p>
                    <p><em>Tips:</em> Cek secara rutin untuk melihat survei baru dan tools yang diperbarui.</p>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="w-full max-w-[280px] h-[300px] overflow-hidden p-0 flex flex-col items-center rounded-lg shadow-md gap-0 cursor-pointer">
                <div className="w-full h-[200px] flex items-center justify-center bg-accent-1 p-0">
                  <Image
                    src="/images/landing-page/payment.png"
                    alt="Payment"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full object-cover p-0"
                  />
                </div>
                <CardContent className="grid items-center bg-secondary-1 py-3 text-center w-full h-full">
                  <CardTitle className="font-bold text-accent-1 text-2xl">
                    Payment
                  </CardTitle>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="md:p-4 p-2">
              <DialogHeader>
                <DialogTitle>Payment</DialogTitle>
                <div className="max-h-120 h-auto overflow-auto md:p-2 p-1">
                  <div className="grid justify-items-center">
                    <Image
                      src="/images/landing-page/payment.png"
                      alt="Payment"
                      width={120}
                      height={120}
                      sizes="50vw"
                      className="object-cover p-0"
                    />
                  </div>
                  <div className="space-y-3 text-left text-sm">
                    <p><strong>Apa itu fitur Payment?</strong><br />
                    Fitur ini memungkinkan Anda melakukan pembayaran langsung melalui aplikasi, baik untuk langganan, produk, maupun layanan tertentu.</p>
                    <p><strong>Mengapa Anda perlu menggunakannya?</strong><br />
                    Dengan fitur ini, proses pembayaran menjadi lebih cepat, aman, dan terintegrasi dengan layanan yang Anda gunakan.</p>
                    <p><strong>Langkah-langkah penggunaannya:</strong><br />
                    1. Masuk ke halaman "Payment" dari dashboard Anda.<br />
                    2. Pilih jenis pembayaran atau tagihan yang ingin dibayar.<br />
                    3. Pilih metode pembayaran (transfer bank, e-wallet, kartu kredit, dll).<br />
                    4. Ikuti instruksi pembayaran hingga selesai.<br />
                    5. Anda akan menerima konfirmasi otomatis setelah pembayaran berhasil.</p>
                    <p><em>Catatan:</em> Pastikan informasi akun Anda sudah diperbarui agar pembayaran tidak tertunda.</p>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

      </section>

      {/* Opinion Form Section */}
      <section className="py-15 md:px-20 sm:px-10 px-5 grid md:grid-cols-2 grid-cols-1 md:gap-none gap-5 bg-gradient-to-r from-primary-3 to-primary-1">
        <div className="col-span-1 grid content-center h-full md:gap-8 gap-6 text-accent-1">
          <h2 className="md:text-4xl text-3xl font-semibold">We still need your opinion </h2>
          <p className="md:text-lg sm:text-md">
            Kami selalu ingin meningkatkan pengalaman Anda di Surva. Berikan opini, saran, atau masukan Anda tentang platform ini, dan bantu kami menjadi lebih baik!
          </p>
        </div>

        <div className="col-span-1 grid content-center h-full md:pl-10">
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
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="subject"
                  id="subject"
                  className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF68]"
                  placeholder="Laporan"
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
      <section className="flex flex-col items-center py-15 md:px-20 sm:px-10 px-5 md:gap-15 gap-5">
        <h2 className="text-center md:text-4xl text-3xl font-semibold">
          Our Clients Know Best
        </h2>
        <div className="antialiased overflow-hidden">
          <InfiniteMovingCards
            items={[
              {
                quote: "Aplikasi ini sangat membantu saya dalam menyebarkan survei riset skripsi. Respondennya cepat terkumpul!",
                name: "Andi Pratama",
                title: "Mahasiswa Politeknik",
              },
              {
                quote: "Platform ini mempercepat proses pengumpulan data pelanggan kami. Sangat direkomendasikan untuk riset pasar!",
                name: "Dina Ayu",
                title: "Analis Pasar di Kantor",
              },
              {
                quote: "Antarmukanya simpel, distribusi surveinya efektif, dan hasilnya bisa langsung diekspor. Sangat efisien!",
                name: "Rudi Kurniawan",
                title: "Peneliti Independen",
              },
              {
                quote: "Kami menggunakan aplikasi ini untuk survei kepuasan pengguna. Fitur penyebarannya sangat memudahkan.",
                name: "Sari Meilani",
                title: "Manajer Produk di Perusahaan",
              },
              {
                quote: "Sangat membantu untuk menyebarkan survei secara luas dan mendapatkan insight berkualitas dari responden nyata.",
                name: "Yusuf Hakim",
                title: "Konsultan Data",
              },
            ]}
            direction="right"
            speed="slow"
          />
          <InfiniteMovingCards
            items={[
              {
                quote: "Aplikasi ini sangat membantu saya dalam menyebarkan survei riset skripsi. Respondennya cepat terkumpul!",
                name: "Andi Pratama",
                title: "Mahasiswa Politeknik",
              },
              {
                quote: "Platform ini mempercepat proses pengumpulan data pelanggan kami. Sangat direkomendasikan untuk riset pasar!",
                name: "Dina Ayu",
                title: "Analis Pasar di Kantor",
              },
              {
                quote: "Antarmukanya simpel, distribusi surveinya efektif, dan hasilnya bisa langsung diekspor. Sangat efisien!",
                name: "Rudi Kurniawan",
                title: "Peneliti Independen",
              },
              {
                quote: "Kami menggunakan aplikasi ini untuk survei kepuasan pengguna. Fitur penyebarannya sangat memudahkan.",
                name: "Sari Meilani",
                title: "Manajer Produk di Perusahaan",
              },
              {
                quote: "Sangat membantu untuk menyebarkan survei secara luas dan mendapatkan insight berkualitas dari responden nyata.",
                name: "Yusuf Hakim",
                title: "Konsultan Data",
              },
            ]}
            direction="left"
            speed="slow"
          />
        </div>
      </section>

    </main>
  );
}
