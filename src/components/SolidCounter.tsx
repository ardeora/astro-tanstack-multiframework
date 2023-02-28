/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";
import { QueryClientProvider, createQuery } from "@tanstack/solid-query";
import { client, counter } from "../utils";
import { useStore } from "@nanostores/solid";

/** A counter written with Solid */
export default function SolidCounter({ children }) {
  return (
    <QueryClientProvider client={client}>
      <Counter />
    </QueryClientProvider>
  );
}

export function Counter() {
  const count = useStore(counter);
  const add = () => counter.set(counter.get() + 1);
  const subtract = () => counter.set(counter.get() - 1);

  const query = createQuery(() => ({
    queryKey: ["counter", count()],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      const res = await fetch(`https://dummyjson.com/posts/${count()}`);
      return res.json();
    },
    placeholderData: (prev) => prev,
    select(data) {
      return {
        ...data,
        body: data.body.substring(0, 116) + "...",
      };
    },
  }));

  return (
    <div class="relative">
      <div class="bg-[#446b9e] blur-[120px] absolute h-full w-full -z-1"></div>
      <div class="shadow-sm border border-[#446b9e]/60 w-[420px] bg-white/80 relative rounded-xl z-10">
        <div class="flex p-3 items-center gap-4">
          <div class="w-16 h-16  bg-[#cee3ff] flex items-center  rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 mx-auto"
              viewBox="0 0 166 155.3"
            >
              <defs>
                <linearGradient
                  id="a"
                  gradientUnits="userSpaceOnUse"
                  x1="27.5"
                  y1="3"
                  x2="152"
                  y2="63.5"
                >
                  <stop offset=".1" stop-color="#76b3e1" />
                  <stop offset=".3" stop-color="#dcf2fd" />
                  <stop offset="1" stop-color="#76b3e1" />
                </linearGradient>
                <linearGradient
                  id="b"
                  gradientUnits="userSpaceOnUse"
                  x1="95.8"
                  y1="32.6"
                  x2="74"
                  y2="105.2"
                >
                  <stop offset="0" stop-color="#76b3e1" />
                  <stop offset=".5" stop-color="#4377bb" />
                  <stop offset="1" stop-color="#1f3b77" />
                </linearGradient>
                <linearGradient
                  id="c"
                  gradientUnits="userSpaceOnUse"
                  x1="18.4"
                  y1="64.2"
                  x2="144.3"
                  y2="149.8"
                >
                  <stop offset="0" stop-color="#315aa9" />
                  <stop offset=".5" stop-color="#518ac8" />
                  <stop offset="1" stop-color="#315aa9" />
                </linearGradient>
                <linearGradient
                  id="d"
                  gradientUnits="userSpaceOnUse"
                  x1="75.2"
                  y1="74.5"
                  x2="24.4"
                  y2="260.8"
                >
                  <stop offset="0" stop-color="#4377bb" />
                  <stop offset=".5" stop-color="#1a336b" />
                  <stop offset="1" stop-color="#1a336b" />
                </linearGradient>
              </defs>
              <path
                d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
                fill="#76b3e1"
              />
              <path
                d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
                opacity=".3"
                fill="url(#a)"
              />
              <path
                d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
                fill="#518ac8"
              />
              <path
                d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
                opacity=".3"
                fill="url(#b)"
              />
              <path
                d="M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z"
                fill="url(#c)"
              />
              <path
                d="M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z"
                fill="url(#d)"
              />
            </svg>
          </div>
          <div class="text-2xl font-semibold text-[#045268]">
            Solid Component
          </div>
        </div>
        <div class="h-[106px]">
          <div class="px-3 leading-tight text-lg font-semibold pb-2 text-gray-700">
            {query.data?.title}
          </div>
          <div class="px-3 leading-tight text-sm">{query.data?.body}</div>
        </div>
        <div class="flex gap-2 p-3">
          <button
            onClick={subtract}
            class="bg-[#cee3ff] hover:bg-[#bbd8ff] text-[#335d92] px-3 py-2 rounded-md"
          >
            Previous Post
          </button>
          <button
            onClick={add}
            class="bg-[#cee3ff] hover:bg-[#bbd8ff] text-[#335d92] px-3 py-2 rounded-md"
          >
            Next Post
          </button>
        </div>
      </div>
    </div>
  );
}
