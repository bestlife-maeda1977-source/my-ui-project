import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // root は設定せず、デフォルト（プロジェクトルート）のままにします
  build: {
    rollupOptions: {
      input: {
        // index.html はルートにあるので resolve(__dirname, "index.html")
        main: resolve(__dirname, "index.html"),

        // 残りのファイルは src/ の中にあるのでパスを修正
        dashboard: resolve(__dirname, "src/dashboard.html"),
        create: resolve(__dirname, "src/create.html"),
        edit: resolve(__dirname, "src/edit.html"),
        detail: resolve(__dirname, "src/detail.html"),
        login: resolve(__dirname, "src/login.html"),
      },
    },
  },
});
