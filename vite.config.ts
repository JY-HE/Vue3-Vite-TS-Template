import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(),
  // 自动引入
  AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    // 指定引入根目录下的 requests，config，utils 目录内的所有函数
    dirs: ['./src/requests/**', './src/config/**', './src/utils/**'],
    resolvers: [ElementPlusResolver()],
    // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
    dts: 'src/auto-import.d.ts',
    // 配置开启 eslint
    eslintrc: {
      enabled: false,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  }),
  // elementUi组件自动引入
  Components({
    resolvers: [ElementPlusResolver()],
    dts: 'src/components.d.ts',
  }),
  ],
  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'your https address',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import '@/assets/scss/variables.scss';
  //         @import '@/assets/scss/main.scss';
  //        `,
  //     },
  //   },
  // },
});
