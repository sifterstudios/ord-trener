<script lang="ts">
  import GameWindow from "$lib/components/ui/game-window/game-window.svelte";
  import LevelProgressBar from "$lib/components/ui/level-progress-bar/level-progress-bar.svelte";
  import type { PageData } from "./$types";
  import { Confetti } from "svelte-confetti";
  import { highScore } from "./high-score.svelte";
  import { timer, startTimer, resetTimer } from "./timer.svelte";
  import HealthBar from "$lib/components/ui/health-bar/health-bar.svelte";
  import { goto } from "$app/navigation";
  import GameOverCard from "$lib/components/ui/game-over-card/game-over-card.svelte";

  interface GameState {
    correctWord: string;
    alternatives: string[];
    feedback: string;
    nameCookie: string;
    showCorrectWord: boolean;
  }

  let { data }: { data: PageData } = $props();
  let gameState: GameState = $state({
    correctWord: data.correctWord,
    alternatives: data.alternatives,
    feedback: data.feedback,
    nameCookie: data.correctWord,
    showCorrectWord: true,
  });

  let currentScore = $state(0);
  let currentLevel = $state(0);
  let maxProgressCurrentLevel = $state(highScore.getNextLevelScore(0));
  let amountOfLives = $state(3);

  function countdownCorrectWordVisibility(timeout: number) {
    setTimeout(() => {
      gameState.showCorrectWord = false;
      resetTimer();
      startTimer();
    }, timeout);
  }

  function resetGame() {
    amountOfLives = 3;
    currentScore = 0;
    currentLevel = 0;
    goto("/game");
  }

  function handleChoice(
    event: CustomEvent<{ choice: string; x: number; y: number }>,
  ) {
    if (event.detail.choice === gameState.correctWord) {
      currentScore += highScore.calculateHighScore(currentLevel, timer);
      console.log("timer", timer);

      if (currentScore >= maxProgressCurrentLevel) {
        currentLevel++;
        maxProgressCurrentLevel = highScore.getNextLevelScore(currentLevel);
      }

      gameState.feedback = "Correct!";
    } else {
      amountOfLives--;
      gameState.feedback = "Incorrect!";
    }
    setTimeout(async () => {
      const response = await fetch("http://localhost:5173/api/random-word");

      gameState = await response.json();
      gameState.showCorrectWord = true;
      gameState.feedback = "";

      countdownCorrectWordVisibility(2000);
    }, 1000);
  }

  function handleRestart() {
    resetGame();
  }

  // Countdown for the first word
  countdownCorrectWordVisibility(2000);
</script>

{#if amountOfLives === 0}
  <div class="">
    <GameOverCard
      score={currentScore}
      nameCookie={gameState.nameCookie}
      on:restart={handleRestart}
    />
  </div>
{:else}
  <div class="absolute top-20 left-0 w-full">
    <LevelProgressBar {currentLevel} {currentScore} {maxProgressCurrentLevel} />
  </div>

  <HealthBar {amountOfLives} />

  <GameWindow
    correctWord={gameState.correctWord}
    alternatives={gameState.alternatives}
    feedback={gameState.feedback}
    showCorrectWord={gameState.showCorrectWord}
    on:choice={handleChoice}
  />

  {#if gameState.feedback === "Correct!"}
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Confetti x={[]} />
      <Confetti amount="10" x={[-0.75, -0.3]} y={[0.15, 0.75]} />
      <Confetti amount="10" x={[0.3, 0.75]} y={[0.15, 0.75]} />
    </div>
  {/if}
{/if}
