import type { PageServerLoad } from "./$types";

// Fetch words from the API
export const load: PageServerLoad = async ({ cookies }) => {
  ingestWords();
  const response = await fetch("http://localhost:5173/api/random-word");
  const data = await response.json();
  const name = cookies.get("name");

  return {
    correctWord: data.correctWord,
    alternatives: data.alternatives,
    feedback: "",
    name: name,
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
