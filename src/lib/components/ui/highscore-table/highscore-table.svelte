<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { toNaturalDate } from "$lib/date-time/date-time";
  import type { HighScoreEntry } from "../../../server/types";

  let highScores: HighScoreEntry[] = $state([]);

  async function getHighScores(pageCount = 0) {
    const res = await fetch(`/api/high-score?page=${pageCount}`);
    const hs = res.json() as Promise<HighScoreEntry[]>;

    for (const highScore of await hs) {
      highScores = [...highScores, highScore];
    }
  }

  getHighScores();
</script>

<Table.Root>
  <Table.Caption>A list of your recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>Score</Table.Head>
      <Table.Head>When</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each highScores as highScore, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{highScore.name}</Table.Cell>
        <Table.Cell>{highScore.score}</Table.Cell>
        <Table.Cell>{toNaturalDate(highScore.created_at.toString())}</Table.Cell
        >
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
