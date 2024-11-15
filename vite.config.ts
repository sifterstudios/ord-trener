import process from "node:process";
import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";

const options =
  process.env.CUSTOM_COMPILER === "true"
    ? {
        compiler: {
          extension: "svelte",
          compiler: compilerFactory(),
        },
      }
    : { compiler: "svelte" };

export default defineConfig({
  plugins: [sveltekit(), Icons(options)],

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customSvelteCompiler(svg: any) {
  const openTagStart = svg.indexOf("<svg ");
  const openTagEnd = svg.indexOf(">", openTagStart);
  const closeTagStart = svg.lastIndexOf("</svg");
  const attributes = svg.slice(openTagStart + 5, openTagEnd);
  const content = svg.slice(openTagEnd + 1, closeTagStart);
  return `<script>
  import CustomSvg from "/src/CustomSvg.svelte";
  const content=\`${content.replace(/`/g, "&#96;")}\`;
</script>
<CustomSvg ${attributes} {...$$props} {content}/>
`;
}

// to show how to use async
async function compilerFactory() {
  return Promise.resolve(customSvelteCompiler);
}
