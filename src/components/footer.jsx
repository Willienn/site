import {Link} from "@CS-chakra";
import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="flex justify-between absolute bottom-0 w-full h-20 lg:h-24 bg-[#0d0d0daa] border-t-2 border-t-[#090909] py-5 px-10">
      <p className="my-auto text-[.8rem] lg:text-[.9rem]">
        © Willien Muniz {date}
      </p>
      <div className="px-0 lg:px-7" >
        <div
            className="flex h-full flex-row items-center gap-2.5 lg:gap-5 ml2.5 lg:ml-0"
        >
          <p
              className="text-[.9rem] lg:text-[1rem]"
          >
            Contact
          </p>
          <Link href="https://www.linkedin.com/in/willien-muniz-973960255/">
            <img src="/linkedin.svg" alt="Link for my Linkedin" />
          </Link>
          <Link href="https://www.instagram.com/whatsisyourdoubt/">
            <img src="/instagram.svg" alt="Link for my Instagram" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
