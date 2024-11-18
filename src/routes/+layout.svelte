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
  <main
    class="flex-grow container mx-auto p-4 flex items-center justify-center"
  >
    <div class="flex flex-col gap-4 w-full max-w-4xl">
      {@render children()}
    </div>
  </main>
  <Footer />
</div>

<style>
</style>
