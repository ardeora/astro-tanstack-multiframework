<template>
  <!--
		Seeing type errors on the word `class`?
		This unfortunately happens because @types/react's JSX definitions leak into every file due to being declared globally.
		There's currently no way to prevent this when using both Vue and React with TypeScript in the same project.
		You can read more about this issue here: https://github.com/johnsoncodehk/volar/discussions/592
	-->
  <div class="relative">
    <div class="bg-[#41b883] blur-[120px] absolute h-full w-full -z-1"></div>
    <div
      class="shadow-sm border border-[#41b883]/60 w-[420px] bg-white/80 relative rounded-xl z-10"
    >
      <div class="flex p-3 items-center gap-4">
        <div class="w-16 h-16 bg-[#c8ffe6] flex items-center rounded-lg">
          <svg
            class="w-10 h-10 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 261.76 226.69"
          >
            <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
              <g transform="translate(178.06 235.01)">
                <path
                  d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z"
                  fill="#41b883"
                />
              </g>
              <g transform="translate(178.06 235.01)">
                <path
                  d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z"
                  fill="#34495e"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="text-2xl font-semibold text-[#066037]">Vue Component</div>
      </div>
      <div class="h-[106px]">
        <div
          class="px-3 leading-tight text-lg font-semibold pb-2 text-gray-700"
        >
          {{ data?.title }}
        </div>
        <div class="px-3 leading-tight text-sm">{{ data?.body }}</div>
      </div>
      <div class="flex gap-2 p-3">
        <button
          @click="subtract()"
          class="bg-[#c8ffe6] hover:bg-[#a6ffd7] text-[#309366] px-3 py-2 rounded-md"
        >
          Previous Post
        </button>
        <button
          @click="add()"
          class="bg-[#c8ffe6] hover:bg-[#a6ffd7] text-[#309366] px-3 py-2 rounded-md"
        >
          Next Post
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "@nanostores/vue";
import { counter } from "../utils";
import { useQuery } from "@tanstack/vue-query";

export default {
  setup() {
    const count = useStore(counter);
    const add = () => counter.set(count.value + 1);
    const subtract = () => counter.set(count.value - 1);

    const { data } = useQuery({
      queryKey: ["counter", count],
      queryFn: async () => {
        const res = await fetch(`https://dummyjson.com/posts/${count.value}`);
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

    return {
      count,
      add,
      subtract,
      data,
    };
  },
};
</script>
