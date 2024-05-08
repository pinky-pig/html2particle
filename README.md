# starter-vue-lib

- vite vue vueuse vue-router
- shadcn-vue
- tailwindcss
- vitepress
- vite-lib npm package

## 开发

开发 lib 是在 `package/` 目录下，运行项目测试是在 `src/` 目录下，Vitepress 文档在 `docs/` 目录下。

`docs/` 可以直接使用 `src/components` 中的组件，因为在 `docs/.vitepress/config.mts` 中配置了 `unplugin-vue-components/vite` 和 `unplugin-auto-import/vite` ，不过并没有配置 tsconfig.json 覆盖根目录中的。

### 安装依赖

```bash
pnpm install
```

### 启动项目

```bash
npm run dev
```

## 打包 lib

### 构建

```bash
npm run build:lib
```

### 发包

```bash
npm run release:lib
```

## 打包 docs

### 构建

```bash
npm run docs:dev
```

### 打包

```bash
npm run docs:build
```

### 预览

```bash
npm run docs:preview
```

### 打包后的文件

`/docs/.vitepress/dist`
