<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let state = $state({
    correctWord: data.correctWord,
    alternatives: data.alternatives,
    feedback: data.feedback,
    showCorrectWord: true,
  });
  function countdownCorrectWordVisibility(timeout: number) {
    setTimeout(() => {
      state.showCorrectWord = false;
    }, timeout); // 2 seconds (adjust as needed)
  }
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
      state.showCorrectWord = true;
      countdownCorrectWordVisibility(2000);
    }, 1);
  }

  countdownCorrectWordVisibility(2000);
</script>

<div style="visibility: {state.showCorrectWord ? 'visible' : 'hidden'}">
  <h1 class="text-7xl text-center">
    {state.correctWord}
  </h1>
</div>

<!-- Alternatives -->
<div
  class="w-full h-full flex grid-cols-2 md:grid md:grid-cols-4 gap-2 md:gap-0"
  style="visibility: {state.showCorrectWord ? 'hidden' : 'visible'}"
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
