import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.argv.some(arg => arg.includes('storybook'));

export default defineConfig({
  plugins: [
    tailwindcss(), 
    isStorybook ? [] : reactRouter(),
    tsconfigPaths()
  ],
  base: "/runplanner/",
});
