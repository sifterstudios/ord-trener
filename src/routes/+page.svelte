<script>
    import {onMount} from "svelte";

    async function ingestWords() {
        const response = await fetch('/api/ingest-db', {
            method: 'POST',
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Error:', response.statusText);
        }
    }
    onMount(ingestWords);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
