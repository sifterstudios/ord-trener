<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../button/button.svelte";

  interface Props {
    correctWord: string;
    alternatives: string[];
    feedback: string;
    showCorrectWord: boolean;
  }

  let { correctWord, alternatives, feedback, showCorrectWord }: Props =
    $props();
  const dispatch = createEventDispatcher();

  function sendChoice(selectedWord: string) {
    dispatch("choice", { choice: selectedWord });
  }
</script>

{#if showCorrectWord}
  <div>
    <h1 class="text-7xl text-center">
      {correctWord}
    </h1>
  </div>
{/if}

<!-- Alternatives -->
{#if !showCorrectWord}
  <div
    class="pop w-full h-full flex grid-cols-2 md:grid md:grid-cols-4 gap-2 md:gap-0"
  >
    {#if feedback.length > 0}
      {#each alternatives as altWord}
        <Button
          variant="outline"
          class="flex justify-center h-16 md:h-full {altWord === correctWord
            ? 'bg-green-600'
            : 'bg-gray-900'}"
          onclick={() => sendChoice(altWord)}
        >
          {altWord}
        </Button>
      {/each}
    {:else}
      {#each alternatives as altWord}
        <Button
          variant="outline"
          class="flex items-center justify-center h-16 md:h-full"
          onclick={() => sendChoice(altWord)}
        >
          {altWord}
        </Button>
      {/each}
    {/if}
  </div>
{/if}

<style>
  .pop {
    animation: pop 0.2s forwards;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1) translateY(-10%);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
