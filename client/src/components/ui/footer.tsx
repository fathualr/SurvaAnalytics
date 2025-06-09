import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[url('/images/footer.png')] bg-cover bg-center text-white px-4 py-8 w-full">

      <div className="border-2 border-white rounded-sm p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Our Social Media */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Our social media</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:opacity-70 transition-opacity">
                <Image 
                  src="/icons/footer/instagram.svg" 
                  alt="Instagram" 
                  width={28} 
                  height={28}
                  className="w-7 h-7"
                />
              </Link>
              <Link href="#" className="hover:opacity-70 transition-opacity">
                <Image 
                  src="/icons/footer/facebook.svg" 
                  alt="Facebook" 
                  width={28} 
                  height={28}
                  className="w-7 h-7"
                />
              </Link>
              <Link href="#" className="hover:opacity-70 transition-opacity">
                <Image 
                  src="/icons/footer/linkedin.svg" 
                  alt="LinkedIn" 
                  width={28} 
                  height={28}
                  className="w-7 h-7"
                />
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Our Contact and Location</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Image 
                  src="/icons/footer/location.svg" 
                  alt="Location" 
                  width={20} 
                  height={20}
                  className="mr-2"
                />
                <span>Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29461</span>
              </div>
              <div className="flex items-center">
                <Image 
                  src="/icons/footer/email.svg" 
                  alt="Email" 
                  width={20} 
                  height={20}
                  className="mr-2"
                />
                <span>survaanalytics@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Image 
                  src="/icons/footer/phone.svg" 
                  alt="Phone" 
                  width={20} 
                  height={20}
                  className="mr-2"
                />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6  mt-4">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Image 
              src="/images/surva-white.png" 
              alt="SURVA Logo" 
              width={0} 
              height={0}
              sizes="25vw"
              className="h-8 w-auto"
            />
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="#" className="hover:underline text-base font-medium">
              Help desk
            </Link>
            <Link href="#" className="hover:underline text-base font-medium">
              Customer Support
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
