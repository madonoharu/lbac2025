<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  let { children, class: cls, ...props }: SvelteHTMLElements["div"] = $props();
</script>

<div {...props} class={["cell", cls]}>
  {@render children?.()}
</div>
