"use client"
import { useEffect, useState } from "react"
import styles from "./page.module.css"

export default function Aquarium() {
  const [y, setY] = useState(Math.floor(Math.random() * (300 - 200) + 200))
  const [x, setX] = useState(Math.floor(Math.random() * (300 - 100) + 100))
  const [
    scale,
    setScale,
  ] = useState(1) // Scaling for z-axis illusion
  const [
    previousX,
    setPreviousX,
  ] = useState(x)
  const [
    isFlipped,
    setIsFlipped,
  ] = useState(false)

  useEffect(() => {
    const moveFish = () => {
      const newY = Math.floor(Math.random() * (300 - 200) + 200)
      const newX = Math.floor(Math.random() * (300 - 100) + 100)
      const newScale = Math.random() * (1.5 - 0.8) + 0.8 // Random scale between 0.8 and 1.5

      setY(newY)
      setPreviousX(x) // Save the current 'x' as previous before updating
      setX(newX)
      setScale(newScale)

      // Flip fish if it moves to the left
      if (newX < previousX) {
        setIsFlipped(true)
      } else {
        setIsFlipped(false)
      }
    }

    const interval = setInterval(() => {
      moveFish()
    }, 2000) // Move fish every x seconds

    return () => clearInterval(interval)
  }, [x, previousX])

  // Calculate brightness based on scale (smaller = darker fish)
  const brightness = 0.5 + (scale - 0.8) * 0.55 // Mapping scale 0.8-1.5 to brightness 0.5-1

  return (
    <>
      <div className="z-[-1] flex min-h-[100vh] min-w-[100vw] justify-center overflow-hidden bg-[#000812]">
        <div className="relative z-[1] flex items-center justify-center">
          <div
            className={styles.table + " absolute top-[40%] z-[-1] w-[1500px]"}
            style={{
              borderBottom: "400px solid #16161c",
              borderLeft: "400px solid transparent",
              borderRight: "400px solid transparent",
            }}
          />
          <div
            className={
              styles.bowl +
              " relative h-[400px] w-[400px] rounded-full border-[2px_solid_#fff]"
            }
          >
            <div className={styles.waves}>
              <div
                className={
                  styles.fish +
                  " absolute z-[2] h-[40px] w-[50px] rounded-[50%] bg-[#e07f4e] transition-all duration-1000 ease-in-out"
                }
                style={{
                  top: y,
                  left: x,
                  transform: `${isFlipped ? "scaleX(-1)" : "scaleX(1)"} scale(${scale})`,
                  filter: `brightness(${brightness})`, // Adjust brightness based on scale
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
