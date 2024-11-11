// components/MarkdownBlocks.tsx
import React, { ReactNode } from "react"

export const Heading1: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h1 className="py-7 font-roboto_slab text-2xl no-underline md:text-4xl">
    {children}
  </h1>
)

export const Heading2: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="py-5 font-roboto_slab text-lg md:text-2xl lg:text-3xl">
    {children}
  </h2>
)

export const Heading3: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h3 className="my-2.5 font-roboto_slab text-lg md:text-xl lg:text-2xl">
    {children}
  </h3>
)

export const Paragraph: React.FC<{ children: ReactNode }> = ({ children }) => (
  <p className="mt-2.5">{children}</p>
)

export const OrderedList: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ol>{children}</ol>

export const UnorderedList: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ul>{children}</ul>

export const ListItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <li>{children}</li>
)

export const BlockQuote: React.FC<
  React.ComponentPropsWithoutRef<"blockquote">
> = ({ children, ...props }) => (
  <blockquote
    className="font-xs mb-2.5 border-l-2 border-red-500 bg-stone-950 py-2 pl-3 font-poppins italic"
    {...props}
  >
    {children}
  </blockquote>
)

export const CodeBlock: React.FC<{ children: ReactNode }> = ({ children }) => (
  <pre className="line flex flex-wrap overflow-auto bg-zinc-800 px-1 py-0.5 font-mono leading-9">
    {children}
  </pre>
)
