import path, { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { loadEnv } from 'vite'

const ENV = { ...loadEnv('development', process.cwd()) }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: ENV.VITE_PKG_NAME,
  description: 'A simple bento layout component for Vue3.',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/get-started' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide/get-started' },
          { text: 'Demo', link: '/guide/demo' },
        ],
      },
      {
        text: 'Usage',
        items: [
          { text: 'Html', link: '/usage/html' },
          { text: 'Vue', link: '/usage/vue' },
          { text: 'React', link: '/usage/react' },
          { text: 'Vanilla', link: '/usage/vanilla' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pinky-pig/html2particle' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, '../..', 'src')}/`,
      },
    },
    plugins: [
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
        ],
        dts: './.vitepress/typings/auto-imports.d.ts',
        dirs: [
          '../src/composables',
        ],
        vueTemplate: true,
      }),
      Components({
        dts: './.vitepress/typings/components.d.ts',
        dirs: [
          '../src/components',
        ],
      }),
    ],
  },
})
