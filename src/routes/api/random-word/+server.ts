import { db, type Word } from "$lib/server/database";

export const GET = async () => {
  const randomWord: Word = db
    .prepare("SELECT id, word FROM words ORDER BY RANDOM() LIMIT 1")
    .get() as Word;
  console.log("Random word:", randomWord.id);

  if (!randomWord) {
    return new Response(JSON.stringify({ error: "No words in database" }), {
      status: 404,
    });
  }

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

  console.log("Similar words:", similarWords.length);

  if (similarWords.length < 3) {
    return new Response(
      JSON.stringify({ error: "Not enough similar words found" }),
      { status: 404 },
    );
  }

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
};
