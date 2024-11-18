<script>
  import Progress from "../progress/progress.svelte";
  let { currentLevel = 0, currentScore, maxProgressCurrentLevel } = $props();
</script>

<div class="flex px-24 gap-x-2">
  <span class="text-sm font-medium leading-none">{currentLevel}</span>
  <Progress value={currentScore} max={maxProgressCurrentLevel} class="" />
  <span class="text-sm font-medium leading-none">{currentLevel + 1}</span>
</div>
