import vue from '@vitejs/plugin-vue'
import { execSync } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

function exeCmd(cmd: string) {
  return execSync(cmd).toString().trim()
}

function getGitInfo() {
  return {
    author: exeCmd('git log -1 --format=%an'),
    subject: exeCmd('git log -1 --format=%s'),
    commit: exeCmd('git log -1 --format=%h'),
    commitLong: exeCmd('git log -1 --format=%H'),
    timestampt: exeCmd('git log -1 --format=%at'),
    time: exeCmd('git log -1 --format=%aI'),
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/torrents/',
  define: {
    __GIT_INFO__: getGitInfo(),
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),// 自动导入样式
    // https://venerable-strudel-d42cce.netlify.app/guide/
    UnoCSS({
      presets: [
        presetUno(),          // 基本预设
        presetAttributify(),  // 属性化支持
        presetIcons(),        // 图标支持
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
