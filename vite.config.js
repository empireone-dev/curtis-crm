import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 100000000000, // Adjust chunk size warning limit if needed
    },
    plugins: [
        laravel({
            input: [
                "resources/js/app.jsx",
                "resources/js/app/pages/admin/tickets/details/contents/details/page.jsx",
                'resources/js/app/pages/admin/tickets/details/contents/notes/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/files/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/activities/page.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
