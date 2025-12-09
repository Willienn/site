"use client"
import Image from "next/image"
import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react"
import { IoMdArrowDropright } from "react-icons/io"
import Typed from "react-typed"
import styles from "./page.module.css"

interface Icon {
  name: string
  type: string
  window: ReactElement
}

const BootScreen: FC = () => {
  const bootText = [
    [
      "Initializing Boot......",
    ],
    [
      "Checking for errors",
    ],
    [
      "Bios ................... OK",
    ],
    [
      "Kernel ................... OK",
    ],
    [
      "Initializing OS",
    ],
  ]

  return (
    <div className="m-2.5">
      {bootText.map((text, idx) => (
        <div className="text-[#11ff11]" key={idx}>
          <Typed
            startDelay={idx * 1600}
            strings={text}
            showCursor={false}
            typeSpeed={10}
          />
        </div>
      ))}
    </div>
  )
}

const IconWindow: React.FC<{
  icon: Icon
  onClick: () => void
}> = ({ icon, onClick }) => (
  <button
    className="mx-1 my-0.5 flex cursor-pointer flex-col items-center justify-center"
    onClick={onClick}
  >
    <Image
      alt="icon"
      className="mb-[-5px]"
      width={32}
      height={32}
      src={
        icon.type === "computer"
          ? "/computer.png"
          : icon.type === "txt"
            ? "/text.png"
            : icon.type === "css"
              ? "/question.png"
              : icon.type === "mail"
                ? "/mail.png"
                : "/question.png" // Fallback image
      }
    />
    <p
      className="font-fira_code text-lg text-[#F0F0F0]"
      style={{
        textShadow: "1px 1px #303030ee",
      }}
    >
      {icon.name}
    </p>
  </button>
)

export default function Boot() {
  const [
    state,
    setState,
  ] = useState({
    boot: false,
    buttonVisible: true,
    bootAnimation: [] as string[],
    loading: false,
    sysLoaded: false,
    menuOpen: false,
    openWindows: [] as ReactNode[],
  })
  const [
    date,
    setDate,
  ] = useState(new Date())

  const icons: Icon[] = [
    {
      name: "Computer",
      type: "computer",
      window: <WindowContent />,
    },
    {
      name: "text.txt",
      type: "txt",
      window: <WindowContent />,
    },
    {
      name: "About.vfx",
      type: "css",
      window: <WindowContent />,
    },
    {
      name: "Contact",
      type: "mail",
      window: <WindowContent />,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (state.bootAnimation.length !== 0) {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          buttonVisible: false,
          boot: true,
        }))
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            boot: false,
            loading: true,
          }))
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              sysLoaded: true,
              loading: false,
            }))
          }, 5500)
        }, 7500)
      }, 4500)
    }
  }, [
    state.bootAnimation,
  ])

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        {state.buttonVisible && (
          <div className="flex min-h-screen w-screen items-center justify-center">
            <button
              className={`${state.bootAnimation[0]} flex size-[120px] items-center justify-center rounded-lg bg-[#0e4f03]`}
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  bootAnimation: [
                    styles.boot,
                    styles.bootIcon1,
                    styles.bootIcon2,
                  ],
                }))
              }
            >
              <div
                className={`${state.bootAnimation[2]} h-[60px] w-16 rounded-full border-[3px] border-[#05070b]`}
                style={{
                  borderBlockStart: "3px solid transparent",
                }}
              >
                <div
                  className={`${
                    state.bootAnimation[1] !== styles.bootIcon1
                      ? styles.idle
                      : state.bootAnimation[1]
                  } m-auto -mt-1 h-5 w-0.5 rounded-sm border-2 border-[#05070b]`}
                />
              </div>
            </button>
          </div>
        )}

        {state.boot && <BootScreen />}
        {state.loading && (
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="w-fit">
              <p className="text-center font-fira_code text-2xl">Windows 91</p>
              <div className="h-5 w-52 overflow-hidden border border-white">
                <div
                  className={`${styles.bootLoad} my-0.5 h-[80%] w-4 bg-white`}
                />
              </div>
            </div>
          </div>
        )}

        {state.sysLoaded && (
          <div className="h-screen w-screen">
            <div
              className={`${styles.windows} h-[calc(100vh-40px)] w-screen p-2.5`}
            >
              {icons.map((icon, idx) => (
                <IconWindow
                  key={idx}
                  icon={icon}
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      openWindows: prevState.openWindows.concat(icon.window),
                    }))
                  }
                />
              ))}
            </div>

            <div className="flex h-10 w-screen items-center justify-between border-l-[3px] border-t-[3px] border-l-[#cfcfcf] border-t-[#cfcfcf] bg-[#C0C0C0] p-1">
              <button
                className="relative my-0.5 ml-1 h-fit border-2 border-b-[#2e2e2e] border-l-[#dfdfdf] border-r-[#2e2e2e] border-t-[#dfdfdf] bg-[#c6c6c6] p-1"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    menuOpen: !prevState.menuOpen,
                  }))
                }
              >
                <Image
                  alt="start menu logo"
                  src="/start-button.png"
                  width={24}
                  height={24}
                />
                {state.menuOpen && (
                  <div className="absolute -left-0.5 bottom-[112%] h-[200px] w-[120px] border-2 border-b-[#2e2e2e] border-l-[#dfdfdf] border-r-[#2e2e2e] border-t-[#dfdfdf] bg-[#c6c6c6]">
                    <div className="flex flex-col">
                      {[
                        "Programs",
                        "Documents",
                        "Contact",
                        "Willien",
                      ].map((item, idx) => (
                        <p
                          className="flex cursor-pointer items-center justify-between px-1 font-fira_code text-black hover:bg-[#0090e4]"
                          key={idx}
                        >
                          {item}
                          {item === "Programs" && (
                            <IoMdArrowDropright className="text-lg" />
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </button>

              <div className="h-fit border-2 border-b-[#2e2e2e] border-l-[#dfdfdf] border-r-[#2e2e2e] border-t-[#dfdfdf] px-1">
                <p className="bold select-none font-fira_code text-[#3e3e3e]">
                  {date.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function WindowContent(): ReactNode {
  return (
    <div>
      <p>This is a window content</p>
    </div>
  )
}
