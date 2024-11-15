import type { PageServerLoad } from "./$types";

// Fetch words from the API
export const load: PageServerLoad = async () => {
  ingestWords();
  const response = await fetch("http://localhost:5173/api/random-word");
  const data = await response.json();
  return {
    correctWord: data.correctWord,
    alternatives: data.alternatives,
    feedback: "",
  };
  async function ingestWords() {
    const response = await fetch("http://localhost:5173/api/ingest-db", {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Error:", response.statusText);
    }
  }
};
