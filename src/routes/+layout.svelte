<script lang="ts">
    import '../app.css';
    import {load} from "./+page.server";
    import {page} from "$app/stores";


    // Handle user choice
    function handleChoice(selectedWord: string) {
        if (selectedWord === $page.data.correctWord) {
            $page.data.feedback.set('Correct!');
        } else {
            $page.data.feedback.set('Incorrect!');
        }
        setTimeout(() => {
            load($page.data);
        }, 1500);
    }
</script>

<!-- Styling with Tailwind CSS -->
<div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <!-- Word display (hidden after 1 second) -->
    <div class="text-4xl font-bold mb-4 transition-opacity" style="visibility: { $page.data.feedback ? 'hidden' : 'visible' }">
        { $page.data.correctWord }
    </div>

    <!-- Alternatives -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
        {#each $page.data.alternatives as altWord}
            <button type="button"
                    class="bg-gray-300 hover:bg-gray-400 text-xl font-semibold py-3 px-6 rounded-lg cursor-pointer transition"
                    onclick={() => handleChoice(altWord)}>
                { altWord }
            </button>
        {/each}
    </div>

    <!-- Feedback message -->
    {#if $page.data.feedback}
        <div class="text-2xl font-semibold text-green-600">
            { $page.data.feedback }
        </div>
    {/if}
</div>