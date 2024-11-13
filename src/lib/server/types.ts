export type Word ={
    id: number;
    word: string;
    length: number;
}

export type WordSimilarity = {
    word1_id: number;
    word2_id: number;
    distance: number;
}

export type HighScore = {
    id: number;
    name: string;
    score: number;
    created_at: Date;
}
