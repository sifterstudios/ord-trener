import type { PageServerLoad } from "./$types";

interface GameWordData {
  correctWord: string;
  alternatives: string[];
  feedback: string;
  nameCookie: string;
}
// Fetch words from the API
export const load: PageServerLoad = async ({
  cookies,
}): Promise<GameWordData> => {
  await ingestWords();
  const response = await fetch("http://localhost:5173/api/random-word");
  const data = await response.json();
  const nameC = cookies.get("name");

  return {
    correctWord: data.correctWord,
    alternatives: data.alternatives,
    feedback: "",
    nameCookie: nameC || "",
  } as GameWordData;

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
