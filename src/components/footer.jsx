import Link from "next/link"

export default function Footer() {
  const date = new Date().getFullYear()
  return (
    <footer className="absolute bottom-0 flex h-20 w-full justify-between border-t-2 border-t-stone-950 bg-zinc-950/60 px-10 py-5 lg:h-24">
      <p className="my-auto text-[.8rem] lg:text-[.9rem]">
        © Willien Muniz {date}
      </p>
      <div className="px-0 lg:px-7">
        <div className="ml2.5 flex h-full flex-row items-center gap-2.5 lg:ml-0 lg:gap-5">
          <p className="text-[.9rem] lg:text-[1rem]">Contact</p>
          <Link href="https://www.linkedin.com/in/willien-muniz-69728062/">
            <img src="/linkedin.svg" alt="Link for my Linkedin" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
