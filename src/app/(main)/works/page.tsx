"use client"
import Link from "next/link"
import { Fragment, useState } from "react"
import styles from "./page.module.css"

const myProjects = [
  {
    name: "Aquarium",
    link: "/works/aquarium",
    image: "/aquarium.jpg",
    text: "Aquarium with a fish :D",
  },
  {
    name: "OLD WIN",
    link: "/boot",
    image: "/oldwin.jpg",
    text: "Making old windows on web",
  },
]

export default function Works() {
  const [
    clicked,
    setClicked,
  ] = useState<number>()
  return (
    <div
      className={`flex pt-10 ${
        clicked !== undefined
          ? "h-[79svh] w-screen justify-center gap-[4vmin]"
          : "h-[79svh] w-screen items-center justify-center gap-[4vmin]"
      }`}
    >
      {myProjects.map((project, idx) => (
        <Fragment key={idx}>
          <img
            alt="imagem ilustrativa do projeto"
            src={project.image ? project.image : "/noImage.webp"}
            className={`${
              clicked === idx
                ? styles.opened
                : clicked !== undefined
                  ? styles.closed
                  : "h-[56svh] w-[20svw] object-cover object-center opacity-100"
            } z-10 cursor-pointer rounded-lg`}
            onClick={() => setClicked(idx)}
          />

          <div
            className={`min-h-full min-w-[25svw] scale-150 ${clicked !== idx && "hidden"}`}
          />
          <div
            className={`${
              clicked === idx
                ? styles.openedText
                : clicked !== undefined
                  ? styles.closedText
                  : styles.defaultText
            } flex flex-col items-center justify-between`}
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="font-poppins text-2xl font-bold">
                {project.name}
              </h1>
              <p className="max-w-[55svw] font-poppins text-lg">
                {project.text}
              </p>
            </div>
            <div className="flex gap-2.5">
              <Link
                className="rounded-md bg-white px-2.5 py-1 font-poppins text-lg font-semibold text-black"
                href={project.link}
              >
                Let me see it
              </Link>
              <button
                className="rounded-md bg-white px-2.5 py-1 font-poppins text-lg font-semibold text-black"
                onClick={() => location.reload()}
              >
                Go Back
              </button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
