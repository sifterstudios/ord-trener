<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageData } from "./$types";
  import { Confetti } from "svelte-confetti";

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
    }, timeout);
  }
  function handleChoice(selectedWord: string) {
    if (selectedWord === state.correctWord) {
      state.feedback = "Correct!";
    } else {
      state.feedback = "Incorrect!";
    }
    setTimeout(async () => {
      console.log("Loading a new word");
      await goto(window.location.pathname, { invalidateAll: true }); // trigger the load() function server-side
      state.correctWord = data.correctWord;
      state.alternatives = data.alternatives;
      state.feedback = "";
      state.showCorrectWord = true;
      countdownCorrectWordVisibility(2000);
    }, 1);
  }

  countdownCorrectWordVisibility(2000);
</script>

{#if state.showCorrectWord}
  <div>
    <h1 class="text-7xl text-center">
      {state.correctWord}
    </h1>
  </div>
{/if}

<!-- Alternatives -->
{#if !state.showCorrectWord}
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
{/if}
<!-- Feedback message -->
{#if state.feedback === "Correct!"}
  <Confetti cone amount="200" />
{/if}
