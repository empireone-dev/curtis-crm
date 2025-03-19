import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  
    
    plugins: [
        laravel({
            input: [
                "resources/js/app.jsx",
                'resources/js/app/pages/admin/tickets/details/contents/files/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/activities/page.jsx',
                "resources/js/app/pages/admin/tickets/details/contents/details/page.jsx",
                'resources/js/app/pages/admin/tickets/details/contents/availability/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/internals/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/call_back/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/parts_validation/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/refund/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/repair/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/replacement_warranty/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/replacement_parts/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/status/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/warehouse/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/warranty_validation/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/notes/page.jsx',
                'resources/js/app/pages/admin/tickets/details/contents/decision_making/page.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
