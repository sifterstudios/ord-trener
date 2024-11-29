import type { PageLoad } from "./$types";
import type { HighScoreEntry } from "$lib/server/types";

export const load: PageLoad = async ({ fetch }) => {
  const amount = 10;
  const page = 1;

  const res = await fetch(`/api/high-score?amount=${amount}&page=${page}`);
  if (!res.ok) {
    console.error("Failed to fetch high scores");
    return { highScores: [] };
  }

  const highScores: HighScoreEntry[] = await res.json();
  return { highScores };
};
