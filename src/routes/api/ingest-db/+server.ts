import type {RequestHandler} from '@sveltejs/kit'
import {initializeDatabase, ingestWords, analyzeWords} from "$lib/database";

export const POST: RequestHandler = async () => {
    initializeDatabase();
    ingestWords('static/norwegian.txt');
    analyzeWords();
    return new Response(JSON.stringify({status: 'Words ingested successfully'}), {status: 200});
}