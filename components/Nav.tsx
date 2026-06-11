import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });

const Nav = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-8 bg-blur mix-blend-color-blur border-b border-black/80">
      <Image src="/favicon.ico" alt="Logo" width={55} height={55} />
      <ul className="flex items-center gap-4">
        <li
          className={`${playfair.className} text-xl font-extralight hover:border-b hover:border-black`}
        >
          <Link href="/">Inicio</Link>
        </li>
        <li
          className={`${playfair.className} text-xl font-extralight hover:border-b hover:border-black`}
        >
          <Link href="/about">Sobre nosotros</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
