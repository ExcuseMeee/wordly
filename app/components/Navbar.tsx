import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const colors = ["bg-green-500", "bg-yellow-500", "bg-zinc-700"];
  return (
    <nav className="grid grid-cols-6 border-white/40 text-white h-full bg-gradient-to-b from-slate-800 to-neutral-900 ">
      <div className="md:col-span-2 col-span-1">
        {/* Intentionally Blank */}
      </div>
      <div className="md:col-span-2 col-span-4 flex justify-center items-center">
        {"WORDLY".split("").map((letter, i) => {
          const color = colors.at(i % colors.length)!;
          return (
            <span
              key={i}
              className={`md:w-11 w-10 aspect-square grid place-items-center mx-0.5 font-bold text-2xl bg-green-500 ${color}`}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div className="md:col-span-2 col-span-1 grid place-items-center">
        <div className="h-1/3 md:h-1/2 aspect-square relative">
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
