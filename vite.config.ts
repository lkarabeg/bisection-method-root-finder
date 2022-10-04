/// <reference types="vitest" />

import { defineConfig } from 'vite'
import * as path from "path"
import dtsPlugin from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            name: "bisection-method",
            fileName: format => `bisection-method.${format}.js`
        },
    },
    resolve:{
        alias:{
            '@' : path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        dtsPlugin({
            outputDir: ['dist/types'],
            skipDiagnostics: false,
            logDiagnostics: true,
        }),
    ],
    test: {

    }
})
