import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'html2particle',
  description: '文档',
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
})
