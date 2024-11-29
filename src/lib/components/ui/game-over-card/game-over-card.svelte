<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import validator from "validator";
  import Label from "../label/label.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  let { score, name }: { score: number; name: string } = $props();

  async function handleSubmitHighScore() {
    const name = document.getElementById("name") as HTMLInputElement;
    if (
      validator.isAlphanumeric(name.value) &&
      validator.isNumeric(score.toString())
    ) {
      await fetch("http://localhost:5173/api/high-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          score: score,
        }),
      });
    } else {
      console.log("Invalid name or score" + name.value + score);
    }

    sendRestart();
  }

  const dispatch = createEventDispatcher();

  function sendRestart() {
    dispatch("restart", {});
  }

  function handleRestart() {
    sendRestart();
  }
</script>

<div class="">
  <Card.Root class="">
    <Card.Header>
      <Card.Title>Game over!</Card.Title>
      <Card.Description
        >Hvis du vil, kan du skrive navnet ditt, så du kan se hvilken plassering
        du har fått i high-score listen!</Card.Description
      >
    </Card.Header>
    <Card.Content>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Navn</Label>
            <Input id="name" placeholder={name} />
          </div>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
      <Button onclick={handleRestart} variant="outline">Spill på nytt!</Button>
      <Button onclick={handleSubmitHighScore}>Send inn</Button>
    </Card.Footer>
  </Card.Root>
</div>
