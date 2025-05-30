import { URL, fileURLToPath } from 'node:url';
import markdown from 'vite-plugin-md';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { code, link, meta } from 'md-powerpack';

// https://vite.dev/config/
export default defineConfig(
    {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    quietDeps: true,
                },
            },
        },
        plugins: [
            vue( { include: [ /\.vue$/, /\.md$/ ], } ),
            vueDevTools(),
            markdown(
                {
                    builders: [
                        meta(),
                        link(),
                        code()
                    ],
                }
            ),
        ],
        resolve: { alias: { '@': fileURLToPath( new URL( 'src', import.meta.url ) ) }, },
        vue: { template: { compilerOptions: { whitespace: 'condense' } } },
    }
);
