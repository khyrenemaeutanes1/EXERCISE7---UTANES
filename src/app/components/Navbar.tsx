import { buttonVariants } from "@/components/ui/button";
import { Banana } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className=' bg-zinc-100 py-2 border-b border-s-zinc200 fixed w-full z-10 top-0'>
            <div className='container flex items-center justify-between'>
                <Link href='/'><Banana /></Link>
                <Link className={buttonVariants()} href='/sign-in'>
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default Navbar
