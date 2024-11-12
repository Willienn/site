import React, { ReactNode } from "react"

export const Heading1: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h1 className="mb-2 mt-8 font-roboto_slab text-2xl no-underline md:text-4xl">
    {children}
  </h1>
)

export const Heading2: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-2 mt-8 font-roboto_slab text-lg md:text-2xl lg:text-3xl">
    {children}
  </h2>
)

export const Heading3: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h3 className="mb-2 mt-8 font-roboto_slab text-lg md:text-xl lg:text-2xl">
    {children}
  </h3>
)

export const HorizontalRule: React.FC<{ children: ReactNode }> = ({
  children,
}) => <hr className="my-2.5">{children}</hr>

export const Paragraph: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className="block">{children}</span>
)

export const OrderedList: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ol className="ml-5 list-decimal space-y-2">{children}</ol>

export const UnorderedList: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ul className="ml-5 list-disc space-y-2">{children}</ul>

export const ListItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <li>{children}</li>
)

export const BlockQuote: React.FC = ({ children, ...props }) => (
  <blockquote
    className="font-xs mb-2.5 border-l-2 border-red-500 bg-stone-950 py-2 pl-3 font-poppins italic"
    {...props}
  >
    {children}
  </blockquote>
)

export const InlineCode: React.FC<{ children: ReactNode }> = ({ children }) => (
  <code className="rounded bg-red-500 px-1 py-0.5">{children}</code>
)

export const CodeBlock: React.FC<{ children: ReactNode }> = ({ children }) => (
  <code className="inline rounded bg-sky-950/60 px-1 py-0.5 font-fira_code leading-9 text-orange-600">
    {children}
  </code>
)
