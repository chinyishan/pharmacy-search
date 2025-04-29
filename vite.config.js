import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/pharmacy-search/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 設定 @ 指向 src
    },
  },
  // vite IP 配置
  server: {
    host: "0.0.0.0",
  },
});
