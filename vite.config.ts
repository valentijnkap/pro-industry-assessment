import { defineVitestConfig } from "@nuxt/test-utils/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineVitestConfig({
  test: {
    environment: "nuxt",
  },
  plugins: [
    //vue(),
    //vueJsx(),
    tsconfigPaths(),
    AutoImport({
      imports: ["vitest"],
      dts: true,
    }),
  ],
});
