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

<Button variant="secondary">{data.correctWord}</Button>

<div style="visibility: {data.feedback ? 'hidden' : 'visible'}">
  {data.correctWord}
</div>

<!-- Alternatives -->
{#each data.alternatives as altWord}
  <Button variant="outline" onclick={() => handleChoice(altWord)}>
    {altWord}
  </Button>
{/each}

<!-- Feedback message -->
{#if data.feedback}
  <p class="text-primary-foreground">
    {data.feedback}
  </p>
{/if}
