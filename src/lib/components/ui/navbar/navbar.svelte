<script>
  import { Button } from "../button";

  const links = [
    { href: "/game", text: "Spill" },
    { href: "/high-score", text: "High-score" },
    { href: "/about", text: "Om" },
  ];
</script>

<nav>
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b border-b-slate-600"
  >
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="logo.png" class="h-8" alt="Ord-trener logo" />
    </a>
    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <a
        href="https://github.com/sifterstudios/ord-trener"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button"><i class="fab fa-github mr-1"></i> Github</Button>
      </a>
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
              class="hover:underline rounded-md block py-2 px-3 md:p-0"
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
