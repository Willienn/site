"use client";
import {useInView} from "react-intersection-observer";
import Link from "next/link";

export default function Nav() {
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0,
  });

  const navItems = [
    { name: "Works", link: "/works" },
    { name: "About", link: "/" },
  ] as const;

  return (
    <nav ref={ref}>
      <div className="min-h-[65px]" />
        <div
          className={`fixed top-0 z-40 py-2.5 px-2.5 lg:px-0 min-w-full bg-[#0d0d0daa]`}
        >
          <div
              className="flex text-white items-center justify-between mx-[2svw] text-[1.2em] lg:text-[1.4em]"
          >
            <Link href="/">
              <img
                  className="aspect-square w-[30px] lg:w-[45px] "
                src="/sitelogo.svg"
                alt="Logo do site"
              />
            </Link>
            <div className="flex">
            {navItems.map((item, idx) => (
              <Link href={item.link} key={idx}>
                <div
                    className="mx-2.5 px-2.5 transition-all duration-100 hover:scale-110 active:scale-90"
                >
                  {item.name}
                </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
    </nav>);
}
