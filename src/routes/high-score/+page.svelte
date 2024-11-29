<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import type { HighScoreEntry } from "$lib/server/types";

  export let data: { highScores: HighScoreEntry[] };
</script>

<Table.Root>
  <Table.Caption>High Scores</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>Score</Table.Head>
      <Table.Head class="text-right">When</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data.highScores as score, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{score.name}</Table.Cell>
        <Table.Cell>{score.score}</Table.Cell>
        <Table.Cell class="text-right">{score.created_at}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
