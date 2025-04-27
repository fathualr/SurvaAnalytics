import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[url('/images/footer.png')] bg-cover text-white p-4">
      <div className="flex outline-2 outline-white justify-between p-8">
        
        <div className="flex flex-col items-start">
          <p className="font-semibold text-xl">Our social media</p>
          <div className="flex justify-center w-fit pl-0.5 pt-2 gap-4">
            <div className="p-1 bg-[#D9D9D9]">
              <Link href="/login" className="hover:opacity-80">
                <Image src="/images/instagram.png" alt="Instagram Logo" width={30} height={30} />
              </Link>
            </div>
            <div className="p-1 bg-[#D9D9D9]">
              <Link href="/" className="hover:opacity-80">
                <Image src="/images/facebook.png" alt="Facebook Logo" width={30} height={30} />
              </Link>
            </div>
            <div className="p-1 bg-[#D9D9D9]">
              <Link href="/" className="hover:opacity-80">
                <Image src="/images/linkedin.png" alt="LinkedIn Logo" width={30} height={30} />
              </Link>
            </div>
          </div>
          <div className="pl-1 mt-38">
            <Link href="/" className="hover:opacity-80">
              <Image src="/images/surva-white.png" alt="Surva Logo" width={100} height={20} />
            </Link>
          </div>
        </div>


        <div className="flex flex-col items-start gap-2">
          <p className="font-semibold text-xl">Our Contact and Location</p>
          <div className="flex items-center gap-2">
              <Image
                src="/location.svg" 
                alt="Location Icon" 
                width={30} 
                height={30} 
                className="object-contain"
              />
              <p className="text-base">Jl. Surva Analytics No.1, Batam, Indonesia</p>
          </div>
           <div className="flex items-center gap-2">
              <Image
                src="/email.svg" 
                alt="Email Icon" 
                width={30} 
                height={30} 
                className="object-contain"
              />
              <p className="text-base">info@survaanalytics.com</p>
          </div>
          <div className="flex items-center gap-2">
              <Image
                src="/phone.svg" 
                alt="Phone Icon" 
                width={30} 
                height={30} 
                className="object-contain"
              />
              <p className="text-base">+62 812-3456-7890</p>
          </div>
       </div>

        <div className="flex flex-row items-start mt-56">
          <Link href="/help-desk" className="text-xl font-semibold hover:underline">
                Help desk
          </Link>
              <span className='ml-2 mr-2'>|</span>
          <Link href="/customer-support" className="text-xl font-semibold hover:underline">
                Customer Support
            </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
