import { distance } from "fastest-levenshtein";
import Database from "better-sqlite3";
import fs from "fs";
import type { Word, WordSimilarity } from "$lib/server/types";

const db = new Database("ord.sqlite3");

interface WordCount {
  count: number;
}

export function initializeDatabase() {
  console.log("Initializing database");
  db.pragma("journal_mode = FULL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT UNIQUE NOT NULL,
    length INTEGER AS (LENGTH(word)) STORED
    );
    `);
  console.log("Creating word_similarity table");
  db.exec(`
    CREATE TABLE IF NOT EXISTS word_similarity (
        word1_id INTEGER,
        word2_id INTEGER,
        distance INTEGER,
        PRIMARY KEY (word1_id, word2_id),
        FOREIGN KEY (word1_id) REFERENCES words(id) ON DELETE CASCADE,
        FOREIGN KEY (word2_id) REFERENCES words(id) ON DELETE CASCADE
    );
    `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS high_score (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);
}

// Function to insert words from a file
export function ingestWords(filePath: string) {
  // if db is not empty, return
  const result = db
    .prepare("SELECT COUNT(*) as count FROM words")
    .get() as WordCount;
  const count = result.count;
  if (count > 0) {
    console.log(
      "Database already contains words, skipping ingestion, count at",
      count,
    );
    return;
  }
  console.log("Ingesting words from file:", filePath);
  const words = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((word) => word.trim());
  const insertWord = db.prepare("INSERT INTO words (word) VALUES (?)");
  const insertMany = db.transaction((words: string[]) => {
    for (const word of words) {
      if (word) insertWord.run(word);
    }
  });
  insertMany(words);
  console.log("Ingested", words.length, "words");
}

export function analyzeWords() {
  const insertSimilarity = db.prepare(`
  INSERT OR IGNORE INTO word_similarity (word1_id, word2_id, distance) VALUES (?, ?, ?)
`);

  // start a timer, so I can see how long it takes
  console.time("analyzeWords");

  const result = db
    .prepare("SELECT COUNT(*) as count FROM word_similarity")
    .get() as WordCount;
  const count = result.count;
  if (count > 0) {
    console.log(
      "Database already contains similarities, skipping analysis, count at",
      count,
    );
    return;
  }

  const words = db
    .prepare("SELECT id, word, length FROM words ORDER BY length")
    .all() as Word[];
  const wordSimilarities: WordSimilarity[] = [];

  let currentLength = 0;
  // Loop through words and compute similarities
  for (let i = 0; i < words.length; i++) {
    if (words[i].length !== currentLength) {
      const progress = Math.round((i / words.length) * 100);
      console.log(
        "Analyzing words of length",
        words[i].length,
        "progress:",
        progress + "%",
      );
      currentLength = words[i].length;
    }
    for (let j = i + 1; j < words.length; j++) {
      if (Math.abs(words[i].length - words[j].length) > 1) break; // Skip if lengths differ significantly

      const wordDistance = distance(words[i].word, words[j].word);
      if (wordDistance <= 2) {
        // Adjust threshold based on similarity you want
        wordSimilarities.push({
          word1_id: words[i].id,
          word2_id: words[j].id,
          distance: wordDistance,
        });
      }
    }
  }
  console.log("Inserting", wordSimilarities.length, "similarities to database");
  wordSimilarities.forEach((similarity) => {
    insertSimilarity.run(
      similarity.word1_id,
      similarity.word2_id,
      similarity.distance,
    );
  });
  console.timeEnd("analyzeWords");
  db.pragma("journal_mode = WAL");
}

export { db, type Word };
