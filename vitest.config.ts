import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      deps: {
        // TypeError: Unknown file extension ".css" for xxx/node_modules/element-plus/theme-chalk/base.css
        // https://github.com/vitest-dev/vitest/issues/1388
        // https://cn.vitest.dev/config/#deps-inline
        inline: ['element-plus']
      }
    }
  })
)
