import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: []
  },
  plugins: [
    vue({
      isProduction: true,
    }),
    dts({
      entryRoot: "./src/",
      skipDiagnostics: true
    })
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "VueMfModule",
      fileName: (format) => `vue-mf-module.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        sourcemap: "inline",
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
