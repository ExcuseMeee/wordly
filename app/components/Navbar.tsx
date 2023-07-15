import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-3 border-b-2 border-white/40 text-white h-full">
      <div className="col-span-1">{/* Intentionally Blank */}</div>
      <div className="col-span-1 grid place-items-center font-bold text-3xl">
        Wordly
      </div>
      <div className="col-span-1 grid place-items-center">
        <div className="h-4/6 aspect-square relative">
          <Link href={"https://github.com/ExcuseMeee/wordly"} target="_blank">
            <Image
              src={"github-mark-white.svg"}
              alt="Github"
              fill
              className="hover:brightness-50 hover:cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
