import React from "react" 
export default function Loading() {
  return (
    <div class="mx-auto max-w-xl px-6 py-12 animate-pulse">
    <div class="mb-12 h-10 bg-gray-200 rounded w-1/2"/>
      <div class="flex flex-col gap-2">
        <div class="mb-4 h-96 bg-gray-200 rounded"/>
        <div class="h-10 bg-gray-200 rounded w-full"/>
        <div class="h-6 bg-gray-200 rounded w-1/4"/>
        <div class="h-12 bg-gray-200 rounded"/>
        <div class="h-4 bg-gray-200 rounded w-full"/>
      </div>
  </div>
  )
}