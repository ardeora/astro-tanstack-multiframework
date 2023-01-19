import { useState } from "react";
import { client, counter } from "../utils";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";

export function ReactCounter() {
  return (
    <QueryClientProvider client={client}>
      <Counter />
    </QueryClientProvider>
  );
}

/** A counter written with React */
export function Counter() {
  const count = useStore(counter);
  const add = () => counter.set(counter.get() + 1);
  const subtract = () => counter.set(counter.get() - 1);

  const { data, refetch } = useQuery({
    queryKey: ["counter", count],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/posts/${count}`);
      return res.json();
    },
    keepPreviousData: true,
    select(data) {
      return {
        ...data,
        body: data.body.substring(0, 116) + "...",
      };
    },
  });

  return (
    <div className="relative">
      <div className="bg-[#61dafb] blur-[120px] absolute h-full w-full -z-1"></div>
      <div className="shadow-sm border border-[#61dafb]/60 w-[420px] bg-white/80 relative rounded-xl z-10">
        <div className="flex p-3 items-center gap-4">
          <div className="w-16 h-16  bg-[#def7ff] flex items-center  rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-11.5 -10.232 23 20.463"
              className="w-12 h-12 text-[#61dafb] mx-auto"
            >
              <circle r="2.05" fill="#61dafb"></circle>
              <g fill="none" stroke="#61dafb">
                <ellipse rx="11" ry="4.2"></ellipse>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
              </g>
            </svg>
          </div>
          <div className="text-2xl font-semibold text-[#045268]">
            React Component
          </div>
        </div>
        <div className="h-[106px]">
          <div className="px-3 leading-tight text-lg font-semibold pb-2 text-gray-700">
            {data?.title}
          </div>
          <div className="px-3 leading-tight text-sm">{data?.body}</div>
        </div>
        <div className="flex gap-2 p-3">
          <button
            onClick={subtract}
            className="bg-[#def7ff] hover:bg-[#cef3ff] text-cyan-500 px-3 py-2 rounded-md"
          >
            Previous Post
          </button>
          <button
            onClick={add}
            className="bg-[#def7ff] hover:bg-[#cef3ff] text-cyan-500 px-3 py-2 rounded-md"
          >
            Next Post
          </button>
        </div>
      </div>
    </div>
  );
}
