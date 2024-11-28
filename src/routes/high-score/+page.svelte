<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import type { PageLoad } from "./$types";
  import type { HighScoreEntry } from "$lib/server/types";

  export const load: PageLoad = async ({ fetch }) => {
    const amount = 10;
    const page = 1;

    const res = await fetch(`/high-scores?amount=${amount}&page=${page}`);
    if (!res.ok) {
      console.error("Failed to fetch high scores");
      return { highScores: [] };
    }

    const highScores: HighScoreEntry[] = await res.json();
    return { highScores };
  };
</script>

<Table.Root>
  <Table.Caption>A list of your recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>Score</Table.Head>
      <Table.Head class="text-right">When</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each highScores as score, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{score.name}</Table.Cell>
        <Table.Cell>{score.score}</Table.Cell>
        <Table.Cell class="text-right">{score.when}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
