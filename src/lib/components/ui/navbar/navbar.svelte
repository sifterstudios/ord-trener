<script>
  import { ModeWatcher } from "mode-watcher";
  import { Button } from "../button";

  const links = [
    { href: "/game", text: "Spill" },
    { href: "/high-score", text: "High-score" },
    { href: "/about", text: "Om" },
  ];
  import Sun from "svelte-radix/Sun.svelte";
  import Moon from "svelte-radix/Moon.svelte";
  import { toggleMode } from "mode-watcher";
</script>

<nav class="bg-primary">
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b border-b-slate-600"
  >
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="logo.png" class="h-8" alt="Ord-trener logo" />
    </a>
    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <ModeWatcher />
      <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <Button variant="secondary" type="button"
        ><i class="fab fa-github mr-1"></i> Github</Button
      >
      <Button
        data-collapse-toggle="navbar-cta"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2"
        aria-controls="navbar-cta"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </Button>
    </div>
    <div
      class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-cta"
    >
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
      >
        {#each links as link}
          <li>
            <a
              href={link.href}
              class="text-primary-foreground hover:underline hover:text-slate-300 rounded-md block py-2 px-3 md:p-0 focus-visible:ring-offset-2 focus-visible:ring-ring"
              aria-current="page"
            >
              {link.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
