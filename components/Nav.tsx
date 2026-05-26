import { Instrument_Serif } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

const Nav = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-end px-8 bg-blur mix-blend-color-blur border-b border-black/80">
      <ul className="flex items-center gap-4">
        <li
          className={`${playfair.className} text-xl font-extralight hover:border-b hover:border-black`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`${playfair.className} text-xl font-extralight hover:border-b hover:border-black`}
        >
          <Link href="/about">About</Link>
        </li>
        <li
          className={`${playfair.className} text-xl font-extralight hover:border-b hover:border-white hover:bg-amber-200`}
        >
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
