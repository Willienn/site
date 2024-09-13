import classNames from "classnames"
import { v4 as uuid } from "uuid"

export default function Text({ text }) {
  const colorMapper = {
    default: "text-current",
    yellow: "text-yellow-500",
    gray: "text-gray-500",
    brown: "text-brown-500",
    orange: "text-orange-500",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    red: "text-red-500",
  }
  if (!text) {
    return null
  }
  return text?.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    const id = uuid()
    return (
      <span
        className={classNames(colorMapper[color], "font-poppins break-words", {
          "font-bold": bold,
          italic: italic,
          "line-through": strikethrough,
          underline: underline,
          "px-2 py-1 text-orange-700": code,
        })}
        key={id}
      >
        {text.link ? (
          <a
            className="font-roboto_slab text-sky-100 hover:text-sky-400 hover:underline"
            href={text.link.url}
          >
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}
