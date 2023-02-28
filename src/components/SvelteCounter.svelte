<!-- @component
A counter written with Svelte
-->
<script lang="ts">
	import { useQueryClient, createQuery } from '@tanstack/svelte-query'
	import { counter as count } from '../utils';
	const client = useQueryClient()

	$: query = createQuery({
    queryKey: ["counter", $count],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/posts/${$count}`
      );
      return res.json();
    },
    placeholderData: (prev) => prev,
		select(data) {
        return {
          ...data,
          body: data.body.substring(0, 116) + "...",
        };
      },
  });

	function add() {
		count.set(count.get() + 1)		
	}

	function subtract() {
		count.set(count.get() - 1)
	}
</script>		

<div class="relative">
	<div class="bg-[#FF3E00] blur-[120px] absolute h-full w-full -z-1"></div>
	<div class="shadow-sm border border-[#FF3E00]/60 w-[420px] bg-white/80 relative rounded-xl z-10">
		<div class="flex p-3 items-center gap-4">
			<div class="w-16 h-16  bg-[#ffddd1] flex items-center  rounded-lg">
				<svg class="w-10 h-10 mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 98.1 118" style="enable-background:new 0 0 98.1 118;" xml:space="preserve">
					<style type="text/css">
						.st0{fill:#FF3E00;}
						.st1{fill:#FFFFFF;}
					</style>
					<path class="st0" d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"/>
					<path class="st1" d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"/>
					</svg>
			</div>
			<div class="text-2xl font-semibold text-[#781f01]">
				Svelte Component
			</div>
		</div>
		<div class="h-[106px]">
			<div class="px-3 leading-tight text-lg font-semibold pb-2 text-gray-700">
				{$query.data ? $query.data.title : ''}
			</div>
			<div class="px-3 leading-tight text-sm">{$query.data ? $query.data.body : ''}</div>
		</div>
		<div class="flex gap-2 p-3">
			<button
				on:click={subtract}
				class="bg-[#ffddd1] hover:bg-[#ffc6b1] text-[#FF3E00] px-3 py-2 rounded-md"
			>
				Previous Post
			</button>
			<button
				on:click={add}
				class="bg-[#ffddd1] hover:bg-[#ffc6b1] text-[#FF3E00] px-3 py-2 rounded-md"
			>
				Next Post
			</button>
		</div>
	</div>
</div>
