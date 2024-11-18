"use client"
import DOMPurify from "isomorphic-dompurify"
import { useRef, useState } from "react"

type Node<T> = {
  prev?: Node<T>
  next?: Node<T>
  node: T
}

export class DoublyLinkedList<T> {
  public length: number
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.length = 0
    this.head = undefined
    this.tail = undefined
  }

  prepend(item: T): void {
    /**
     * Empty linked list
     * Head and tail become the same node
     */
    if (this.length === 0) {
      this.head = this.tail = { node: item }
      this.length++
      return
    }

    /**
     * When list has only 1 Item
     * In this case head and tail are the same node.
     * Head will become 'next' of the new node
     * */
    if (this.length === 1) {
      this.head = {
        node: item,
        next: this.tail,
      }
      this.tail!.prev = this.head
      this.length++
      return
    }

    /**
     * Default case
     * When the list has more than 1 item
     * Head will become 'next' of the new node
     */

    const oldHead: Node<T> = this.head
    this.head = {
      node: item,
      next: oldHead,
    }
    oldHead.prev = this.head
    this.length++
    return
  }

  get(item: T): Node<T> | -1 {
    if (this.length === 0)
      throw new Error("This list doesnt have any elements dumbass.")
    if (item === this.head?.node) return this.head
    if (item === this.tail?.node) return this.tail
    if (typeof item === "number") {
      if (item < 0 || item >= this.length) return -1

      let curr = this.head
      for (let i = 0; i < item && curr; i++) {
        curr = curr.next
      }
      return curr || -1
    }

    // Loop through the list for other positions
    let curr = this.head
    while (curr) {
      if (curr.node === item) return curr
      curr = curr.next
    }
    console.log(curr)

    return -1
  }

  /**
   * Append is the same thing of prepend but reserved
   */
  append(item: T): void {
    /**
     * Empty linked list
     */
    if (this.length === 0) {
      this.head = this.tail = { node: item }
      this.length++
      return
    }

    /**
     * When list has only 1 Item
     * */
    if (this.length === 1) {
      this.tail = {
        node: item,
        prev: this.head,
      }
      this.head!.next = this.tail
      this.length++
      return
    }

    /**
     * Default case
     */
    const oldTail: Node<T> = this.tail
    this.tail = {
      node: item,
      prev: oldTail,
    }
    oldTail.next = this.tail
    this.length++
    return
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) throw new Error("Out of Bounds")
    if (idx === 0) {
      this.prepend(item)
      return
    }
    if (idx === this.length) {
      this.append(item)
      return
    }
    const result = this.get(idx)
    if (result !== -1) {
      const newNode = { node: item, prev: result.prev, next: result }
      result.prev!.next = newNode
      result.prev = newNode

      this.length++

      return
    }
  }
  removeAt(idx: number): void {
    if (idx < 0 || idx > this.length) throw new Error("Out of Bounds")

    if (idx === 0) {
      this.head = this.head.next
      this.length--
      return
    }
    if (idx === this.length) {
      this.tail = this.tail.prev
      this.length--
      return
    }
    const result = this.get(idx)
    if (result !== -1) {
      result?.prev?.next ? (result.prev.next = result.next) : null // not suposed to happend but seens to happend???????
      result?.next?.prev ? (result.next.prev = result.prev) : null // not suposed to happend but seens to happend???????

      this.length--

      return
    }
  }
  remove(item: T) {
    if (item === this.head?.node) {
      this.head = this.head.next
      this.length--
      return
    }
    if (item === this.tail?.node) {
      this.tail = this.tail.prev
      this.length--
      return
    }
    const result = this.get(item)
    if (result !== -1) {
      result.prev!.next = result.next
      result.next!.prev = result.prev

      this.length--

      return
    }
  }
}

// Utility function to serialize a linked list
function serializeLinkedList<T>(head: Node<T> | undefined) {
  const result: Array<{ node: T; prev?: T; next?: T }> = []
  let currentNode = head

  while (currentNode) {
    result.push({
      node: currentNode.node,
      prev: currentNode.prev ? currentNode.prev.node : undefined,
      next: currentNode.next ? currentNode.next.node : undefined,
    })
    currentNode = currentNode.next
  }

  return result
}

// Utility to convert a string to title case
function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (text) => text[0].toUpperCase() + text.slice(1).toLowerCase()
  )
}

// Highlighted JSON component with sanitization
function HighlightedJSON({
  data,
  indentation,
}: {
  data: unknown
  indentation: number
}) {
  const jsonString = JSON.stringify(data, null, indentation)

  const highlighted = jsonString
    .replace(/"(\w+)"(?=:)/g, '<span class="text-blue-400">"$1"</span>') // Keys in blue
    .replace(/:\s"([^"]*)"/g, ': <span class="text-green-400">"$1"</span>') // String values in green
    .replace(/:\s(\d+)/g, ': <span class="text-yellow-400">$1</span>') // Numbers in yellow
    .replace(/null/g, '<span class="text-red-400">null</span>') // Null in red
    .replace(/true|false/g, '<span class="text-purple-400">$&</span>') // Booleans in purple

  const sanitizedHTML = DOMPurify?.sanitize(highlighted)

  return (
    <pre
      className="overflow-auto whitespace-pre-wrap font-fira_code text-sm text-stone-400"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}

export default function Page() {
  const [inptValue, setInptValue] = useState<string | null>(null)
  const [inptIndex, setInptIndex] = useState<string | null>(null)
  const [error, setError] = useState<string | false>(false)
  const [operation, setOperation] =
    useState<(typeof operations)[number]>("append")
  const [renderTrigger, setRenderTrigger] = useState(false) // Tracks updates for re-render

  const listRef = useRef(new DoublyLinkedList<string>()) // Persistent list

  function handleOperations() {
    if (
      !inptValue &&
      ["append", "prepend", "get", "remove"].includes(operation)
    ) {
      setError("Value is required for this operation")
      return
    }

    const index = Number(inptIndex)
    if (
      ["remove at", "insert at"].includes(operation) &&
      (isNaN(index) || index < 0)
    ) {
      setError("Valid index is required for this operation")
      return
    }

    setError(false)

    switch (operation) {
      case "insert at":
        listRef.current.insertAt(inptValue!, index)
        break
      case "remove at":
        listRef.current.removeAt(index)
        break
      case "get":
        const result = listRef.current.get(inptValue!)
        alert(
          result === -1
            ? "Your item isn't in the list"
            : `Your value is: {
            node: ${result.node},
            prev: ${result.prev},
            next: ${result.next}
          }`
        )
        break
      case "remove":
        listRef.current.remove(inptValue!)
        break
      case "prepend":
        listRef.current.prepend(inptValue!)
        break
      case "append":
        listRef.current.append(inptValue!)
        break
    }

    // Trigger re-render
    setRenderTrigger((prev) => !prev)
  }

  const operations = [
    "remove at",
    "insert at",
    "prepend",
    "append",
    "remove",
    "get",
  ] as const

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-stone-950 font-poppins">
      <div className="flex w-full flex-col max-w-[80%] items-center justify-center gap-6 p-2 text-stone-300">
        <div className="flex flex-wrap gap-6 w-f">
          {operations.map((item) => (
            <div key={item} className="flex w-28 flex-col items-center gap-2">
              <label htmlFor={item}>{toTitleCase(item)}</label>
              <input
                onClick={({ target }) => setOperation(target.value)}
                defaultChecked={operation === item}
                name="operation"
                type="radio"
                value={item}
                id={item}
                className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-sky-500 p-2 transition-all checked:bg-orange-500"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-orange-300">Value</label>
            <input
              disabled={operation === "remove at"}
              className="w-56 rounded p-2 text-stone-600"
              onChange={({ target }) => setInptValue(target.value || null)}
            />
          </div>
          <div className="flex w-20 flex-col gap-2">
            <label className="text-orange-300">Index</label>
            <input
              disabled={!["remove at", "insert at"].includes(operation)}
              type="number"
              className="w-20 rounded p-2 text-stone-600"
              onChange={({ target }) => setInptIndex(target.value || null)}
            />
          </div>

          <button
            disabled={
              !inptValue &&
              ["append", "prepend", "remove", "get"].includes(operation)
            }
            className="flex h-10 w-32 items-center justify-center gap-2 rounded bg-sky-950 p-2 text-orange-400 transition-all disabled:bg-sky-600/70 disabled:text-orange-300 disabled:opacity-60"
            onClick={handleOperations}
          >
            {toTitleCase(operation)}
          </button>
        </div>
      </div>

      <div className="flex size-[80%] flex-col gap-4 rounded border border-zinc-700 p-4 sm:size-[50%]">
        <h2 className="text-xl font-semibold text-stone-300">JSON View:</h2>
        <HighlightedJSON
          data={serializeLinkedList(listRef.current.head)}
          indentation={2}
        />
      </div>
    </div>
  )
}
