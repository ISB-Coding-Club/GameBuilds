import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        hmr: {
            clientPort: 443,
            protocol: "wss",
        },
    },
    publicDir: path.resolve("static"),
    base: "./",
});
