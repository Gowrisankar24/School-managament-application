import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@/components/Menu';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen flex">
            {/* sidebar -left */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Link
                    href={'/'}
                    className="flex items-center justify-center lg:justify-start gap-1"
                >
                    <Image src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="hidden lg:block font-bold text-lightSky">
                        School Management
                    </span>
                </Link>
                <Menu />
            </div>

            {/* main content */}
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f0f2f0] overflow-scroll flex flex-col">
                <Navbar />
                <ToastContainer />
                {children}
            </div>
        </div>
    );
}
