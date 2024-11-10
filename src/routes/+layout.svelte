<script lang="ts">
    import '../app.css';
    import {writable} from "svelte/store";
    import {onMount} from "svelte";

    let { children } = $props();

    const correctWord = writable('');
    const alternatives = writable([]);
    const feedback = writable('');
    // let timer: NodeJS.Timeout;

    // Fetch words from the API
    async function fetchWords() {
        const response = await fetch ('/api/random-word');
        const data = await response.json();
        correctWord.set(data.correctWord);
        alternatives.set(data.alternatives);
        feedback.set('');
    }

    // Timer for displaying the word briefly
    onMount(() => {
        fetchWords();
        setTimeout(() => {
            feedback.set('');
        }, 1000);
    })

    // Handle user choice
    function handleChoice(selectedWord: string) {
        if (selectedWord === $correctWord) {
            feedback.set('Correct!');
        } else {
            feedback.set('Incorrect!');
        }
        setTimeout(() => {
            fetchWords();
        }, 1500);
    }
</script>

{@render children()}

<!-- Styling with Tailwind CSS -->
<div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <!-- Word display (hidden after 1 second) -->
    <div class="text-4xl font-bold mb-4 transition-opacity" style="visibility: { $feedback ? 'hidden' : 'visible' }">
        { $correctWord }
    </div>

    <!-- Alternatives -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
        {#each $alternatives as altWord}
            <button type="button"
                    class="bg-gray-300 hover:bg-gray-400 text-xl font-semibold py-3 px-6 rounded-lg cursor-pointer transition"
                    onclick={() => handleChoice(altWord)}>
                { altWord }
            </button>
        {/each}
    </div>

    <!-- Feedback message -->
    {#if $feedback}
        <div class="text-2xl font-semibold text-green-600">
            { $feedback }
        </div>
    {/if}
</div>