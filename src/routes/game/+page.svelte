<script lang="ts">
  import type { PageData } from "./$types";
  import Button from "$lib/components/ui/button/button.svelte";

  function handleChoice(selectedWord: string) {
    if (selectedWord === data.correctWord) {
      data.feedback = "Correct!";
    } else {
      data.feedback = "Incorrect!";
    }
    setTimeout(() => {
      // Load a new word
    }, 1500);
  }

  let { data }: { data: PageData } = $props();
</script>

<div style="visibility: {data.feedback ? 'hidden' : 'visible'}">
  <h1 class="text-9xl">{data.correctWord}</h1>
</div>

<!-- Alternatives -->
<div
  class="w-full h-full flex grid-cols-2 md:grid md:grid-cols-4 gap-2 md:gap-0"
>
  {#each data.alternatives as altWord}
    <Button
      variant="outline"
      class="flex items-center justify-center h-16 md:h-full"
      onclick={() => handleChoice(altWord)}
    >
      {altWord}
    </Button>
  {/each}
</div>
<!-- Feedback message -->
{#if data.feedback}
  <p class="">
    {data.feedback}
  </p>
{/if}
