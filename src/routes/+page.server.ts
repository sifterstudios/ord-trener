import type { PageServerLoad } from '@sveltejs/kit';

// Fetch words from the API
export const load: PageServerLoad = async () => {
    const response = await fetch ('/api/random-word');
    const data = await response.json();
    return {
        correctWord: data.correctWord,
        alternatives: data.alternatives,
        feedback: ''
    }
}
