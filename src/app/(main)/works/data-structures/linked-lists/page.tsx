"use client";
import { useRef, useState } from "react";

type Node<T> = {
  prev?: Node<T>;
  next?: Node<T>;
  node: T;
};

export class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  prepend(item: T): void {
    /**
     * Empty linked list
     * Head and tail become the same node
     */
    if (this.length === 0) {
      this.head = this.tail = { node: item };
      this.length++;
      return;
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
      };
      this.tail!.prev = this.head;
      this.length++;
      return;
    }

    /**
     * Default case
     * When the list has more than 1 item
     * Head will become 'next' of the new node
     */

    const oldHead: Node<T> = this.head;
    this.head = {
      node: item,
      next: oldHead,
    };
    oldHead.prev = this.head;
    this.length++;
    return;
  }

  /**
   * Append is the same thing of prepend but reserved
   */
  append(item: T): void {
    /**
     * Empty linked list
     */
    if (this.length === 0) {
      this.head = this.tail = { node: item };
      this.length++;
      return;
    }

    /**
     * When list has only 1 Item
     * */
    if (this.length === 1) {
      this.tail = {
        node: item,
        prev: this.head,
      };
      this.head!.next = this.tail;
      this.length++;
      return;
    }

    /**
     * Default case
     */
    const oldTail: Node<T> = this.tail;
    this.tail = {
      node: item,
      prev: oldTail,
    };
    oldTail.next = this.tail;
    this.length++;
    return;
  }

  insertAt(item: T, idx: number): void {
    if (idx === 0) this.prepend(item);
    if (idx === this.length - 1) this.append(item);
    for (let i = 0; i < this.length - 1; i++) {}
    //what now?
  }
  remove() {}
  removeAt() {}
  get() {}
}

function serializeLinkedList<T>(head: Node<T> | undefined) {
  const result: Array<{ node: T; prev?: T; next?: T }> = [];
  let currentNode = head;

  while (currentNode) {
    result.push({
      node: currentNode.node,
      prev: currentNode.prev ? currentNode.prev.node : undefined,
      next: currentNode.next ? currentNode.next.node : undefined,
    });
    currentNode = currentNode.next;
  }

  return result;
}

// Helper function to add syntax highlighting
function HighlightedJSON({ data }: { data: unknown }) {
  const jsonString = JSON.stringify(data, null, 2);

  const highlighted = jsonString
    .replace(/"(\w+)"(?=:)/g, '<span class="text-blue-400">"$1"</span>') // Keys in blue
    .replace(/:\s"([^"]*)"/g, ': <span class="text-green-400">"$1"</span>') // String values in green
    .replace(/:\s(\d+)/g, ': <span class="text-yellow-400">$1</span>') // Numbers in yellow
    .replace(/null/g, '<span class="text-red-400">null</span>') // Null in red
    .replace(/true|false/g, '<span class="text-purple-400">$&</span>'); // Booleans in purple

  return (
    <pre
      className="text-stone-400 font-mono text-sm whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

export default function Page() {
  const [inptValue, setInptValue] = useState<string | null>(null);
  const [_, setRenderTrigger] = useState(false);
  const listRef = useRef(new DoublyLinkedList<string>()); // Persistent list

  const appendToList = () => {
    if (inptValue) {
      listRef.current.append(inptValue); // Append to the persistent list
      setRenderTrigger((prev) => !prev); // Trigger re-render
    }
  };

    const prependToList = () => {
      if (inptValue) {
        listRef.current.prepend(inptValue); // Prepend to the persistent list
        setRenderTrigger((prev) => !prev); // Trigger re-render
      }
    };


  return (
    <div className="h-screen flex justify-center flex-col items-center w-full bg-stone-950">
      <div className="flex justify-center flex-col items-center w-full p-2 text-stone-300 gap-6">
        <input
          className="rounded w-56 text-stone-600 p-2"
          onChange={({ target }) => setInptValue(target.value || null)}
        />
        <button
          disabled={!inptValue}
          className="bg-sky-950 flex gap-2 items-center justify-center disabled:opacity-60  disabled:bg-sky-600/70 transition-all w-64 disabled:text-orange-300 text-orange-400 rounded p-2"
          onClick={appendToList}
        >
          Append{" "}
          <div className="text-ellipsis overflow-hidden max-w-20 whitespace-nowrap">{`"${inptValue}"`}</div>{" "}
          to the list
        </button>
        <button
          disabled={!inptValue}
          className="bg-sky-950 flex gap-2 items-center justify-center disabled:opacity-60  disabled:bg-sky-600/70 transition-all w-64 disabled:text-orange-300 text-orange-400 rounded p-2"
          onClick={prependToList}
        >
          Prepend{" "}
          <div className="text-ellipsis overflow-hidden max-w-20 whitespace-nowrap">{`"${inptValue}"`}</div>{" "}
          to the list
        </button>
      </div>

      <div className="size-[50%] border-zinc-700 border p-4">
        <h2 className="text-xl text-stone-300 font-semibold mb-4">
          JSON View:
        </h2>
        <HighlightedJSON data={serializeLinkedList(listRef.current["head"])} />
      </div>
    </div>
  );
}
