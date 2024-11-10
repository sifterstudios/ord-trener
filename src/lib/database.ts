import {distance} from "fastest-levenshtein";
import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('ord.sqlite3');

interface WordCount {
    count: number;
}

export interface Word {
    id: number;
    word: string;
    length: number;
}

export function initializeDatabase() {
    console.log('Initializing database');
    db.exec(`
    CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT UNIQUE NOT NULL,
    length INTEGER AS (LENGTH(word)) STORED
    );
    `);
    console.log('Creating word_similarity table');
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
}


// Function to insert words from a file
export function ingestWords(filePath: string) {
    // if db is not empty, return
    const result = db.prepare('SELECT COUNT(*) as count FROM words').get() as WordCount;
    const count = result.count;
    if (count > 0) {
        console.log('Database already contains words, skipping ingestion, count at', count);
        return;
    }
    console.log('Ingesting words from file:', filePath);
    const words = fs.readFileSync(filePath, 'utf-8').split('\n').map(word => word.trim());
    const insertWord = db.prepare('INSERT INTO words (word) VALUES (?)');
    const insertMany = db.transaction((words: string[]) => {
        for (const word of words) {
            if (word) insertWord.run(word);
        }
    });
    insertMany(words);
    console.log('Ingested', words.length, 'words');
}

export function analyzeWords() {
    const insertSimilarity = db.prepare(`
  INSERT OR IGNORE INTO word_similarity (word1_id, word2_id, distance) VALUES (?, ?, ?)
`);
    // start a timer, so I can see how long it takes
    console.time('analyzeWords');

    const result = db.prepare('SELECT COUNT(*) as count FROM word_similarity').get() as WordCount;
    const count = result.count;
    if (count > 0) {
        console.log('Database already contains similarities, skipping analysis, count at', count);
        return;
    }

    const words = db.prepare('SELECT id, word, length FROM words ORDER BY length').all() as Word[];

    // Loop through words and compute similarities
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (Math.abs(words[i].length - words[j].length) > 1) break; // Skip if lengths differ significantly

            const wordDistance = distance(words[i].word, words[j].word);
            if (wordDistance <= 2) { // Adjust threshold based on similarity you want
                console.log('Inserting similarity between', words[i].word, 'and', words[j].word, 'with distance', wordDistance);
                insertSimilarity.run(words[i].id, words[j].id, wordDistance);
            }
        }
    }
    console.timeEnd('analyzeWords');
}


export {db};