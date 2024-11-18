import { db, type Word } from "$lib/server/database";

export const GET = async () => {
  // Fetch 10 random words to minimize database calls
  const randomWords: Word[] = db
    .prepare("SELECT id, word FROM words ORDER BY RANDOM() LIMIT 10")
    .all() as Word[];

  for (const randomWord of randomWords) {
    // Get similar words for the current random word
    const similarWords: Word[] = db
      .prepare(
        `
        SELECT w.id, w.word, ws.distance
        FROM word_similarity ws
        JOIN words w ON w.id = ws.word2_id
        WHERE ws.word1_id = ?
        ORDER BY RANDOM()
        LIMIT 3
        `,
      )
      .all(randomWord.id) as Word[];

    if (similarWords.length >= 3) {
      // Combine the random word with the similar words
      const allWords = [randomWord, ...similarWords]
        .map((word) => ({ id: word.id, word: word.word }))
        .sort(() => Math.random() - 0.5);

      return new Response(
        JSON.stringify({
          correctWord: randomWord.word,
          alternatives: allWords.map((w) => w.word),
        }),
      );
    }
  }

  // If no suitable word is found, return an error response
  return new Response(
    JSON.stringify({
      error: "No suitable words with enough alternatives found",
    }),
    { status: 404 },
  );
};
