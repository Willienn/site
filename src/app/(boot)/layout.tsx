import { ReactNode } from "react"
import "./global.css"

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
