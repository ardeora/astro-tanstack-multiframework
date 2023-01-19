<!-- @component
A counter written with Svelte
-->
<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { client } from '../utils';
  import Counter from './SvelteCounter.svelte'
</script>

<QueryClientProvider client={client}>
  <Counter />
</QueryClientProvider>
	
