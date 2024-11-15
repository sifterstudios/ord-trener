<script lang="ts">
  import Footer from "$lib/components/ui/footer/footer.svelte";
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  import "../app.css";
  let { children } = $props();
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
/>
<div class="flex flex-col min-h-screen">
  <Navbar />
  <main class="bg-primary flex-grow container mx-auto p-4">
    {@render children()}
  </main>
  <Footer />
</div>
