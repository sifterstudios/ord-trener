<script>
  import { ModeWatcher, toggleMode } from "mode-watcher";
  import { Sun, Moon } from "svelte-radix";
  import { Button } from "../button";
</script>

<footer class="p-4 border-t border-t-slate-600">
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <div class="container mx-auto flex items-center justify-center">
      <p>Bygd med 🩸🥵 og 🥹 av</p>
      <a href="https://sifterstudios.no" class="ml-1 underline"
        >Sifter Studios</a
      >
    </div>

    <ModeWatcher />
    <Button on:click={toggleMode} size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</footer>
