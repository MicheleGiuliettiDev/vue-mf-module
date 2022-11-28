import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from "path";
import typescript from "@rollup/plugin-typescript";


const resolvePath = (str: string) => path.resolve(__dirname, str)


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib:{
      entry: "./src/index.ts",
      name: "VueMfModule",
      fileName: "vue-mf-module"
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      },
      // plugins: [
      //   typescript({
      //     'target': 'esnext',
      //     'rootDir': './src',
      //     'declaration': true,
      //     'declarationDir': '../@types',
      //     exclude: './node_modules/**',
      //     allowSyntheticDefaultImports: true
      //   })
      // ]
    }
  }
})
