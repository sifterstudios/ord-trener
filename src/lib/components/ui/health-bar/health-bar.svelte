<script lang="ts">
  import { HeartFilled, Heart } from "svelte-radix";

  let { amountOfLives: amountOfLives }: { amountOfLives: number } = $props();
  const maxLives = 3;
</script>

<div class="absolute flex top-24 p-2 self-center">
  {#each Array.from({ length: maxLives }, (_, i) => i) as life}
    {#if life < amountOfLives}
      <HeartFilled size="40" color="red" />
    {:else}
      <Heart size="40" color="red" />
    {/if}
  {/each}
</div>
