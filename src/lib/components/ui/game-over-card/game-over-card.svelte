<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Card.Root class="w-[350px]">
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
          <Input id="name" placeholder="Hva kalles du?" />
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex justify-between">
    <Button variant="outline">Restart Game</Button>
    <Button>Submit</Button>
  </Card.Footer>
</Card.Root>
