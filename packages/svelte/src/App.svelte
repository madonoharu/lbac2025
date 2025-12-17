<script lang="ts">
  import type { Attachment } from "svelte/attachments";

  // monorepoでtsgoが型を読み込めない
  import { createUniverse, type Dot } from "./lib";
  import Cell from "./Cell.svelte";

  const dotAttachment = (dot: Dot): Attachment => {
    return (elem) => {
      dot.setElem(elem);
    };
  };

  let universe = $state(createUniverse(1000));
  const fps = $derived(universe.fps.display());

  $effect(() => {
    const f = async () => {
      universe = await universe.update();
    };

    f();
  });
</script>

<main>
  <div class="container">
    <p>{fps}</p>
    {#each universe.list as dot (dot.id)}
      <Cell {@attach dotAttachment(dot)} />
    {/each}
  </div>
</main>
