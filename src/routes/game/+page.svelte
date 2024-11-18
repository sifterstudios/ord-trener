<script lang="ts">
  import type { PageData } from "./$types";
  import Button from "$lib/components/ui/button/button.svelte";
  import { goto, invalidate, replaceState } from "$app/navigation";

  let { data }: { data: PageData } = $props();
  let state = $state({
    correctWord: data.correctWord,
    alternatives: data.alternatives,
    feedback: data.feedback,
  });

  function handleChoice(selectedWord: string) {
    if (selectedWord === state.correctWord) {
      state.feedback = "Correct!";
    } else {
      state.feedback = "Incorrect!";
    }
    setTimeout(async () => {
      // Load a new word
      console.log("Loading a new word");
      await goto(window.location.pathname, { invalidateAll: true });
      state.correctWord = data.correctWord;
      state.alternatives = data.alternatives;
      state.feedback = "";
    }, 1500);
  }
</script>

<div style="visibility: {state.feedback ? 'hidden' : 'visible'}">
  <h1 class="text-9xl">{state.correctWord}</h1>
</div>

<!-- Alternatives -->
<div
  class="w-full h-full flex grid-cols-2 md:grid md:grid-cols-4 gap-2 md:gap-0"
>
  {#each state.alternatives as altWord}
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
{#if state.feedback}
  <p class="">
    {state.feedback}
  </p>
{/if}
