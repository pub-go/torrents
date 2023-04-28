## 项目搭建过程 / 脚手架
## Node 环境

安装 [nvm](https://github.com/nvm-sh/nvm), 用这个工具安装、切换 Node 版本
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# 或者
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# 执行上面的命令之一即可，等待安装完毕，会提示你设置以下环境变量，将这两行加入 profile 配置中即可（安装脚本好像会自动配置）
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## 项目创建
[创建一个 Vue 应用](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)

```bash
npm init vue@latest
# 按提示输入项目名(TypeScript + Vue Router + Vitest)，然后 cd 进新建的项目目录
git init -b main # 初始化 git 工程
git config user.name your_email@some.com # 如果全局没有设置或者需要项目单独设置
echo 'registry=https://registry.npmmirror.com' > .npmrc # 如果全局没有配置 npm 镜像 或者项目需要单独配置 npm 镜像
npm install # 安装 npm 依赖
# 如果需要修改项目 base 路径，改 vite.config.ts
# 参见： https://cn.vitejs.dev/config/shared-options.html#base
npm run dev # 启动开发环境
```

接下来可以在 Github/Gitee 创建空仓库，然后关联推送上去
```bash
git remote add origin xxxx.git # 关联你新建的远端仓库
git branch -M main # 设置主分支名称
```

然后可以设置一下 GitHub Actions
- 比如使用 [Yikun/hub-mirror-action@mappings](https://github.com/Yikun/hub-mirror-action) 自动将 GitHub 仓库同步到 Gitee.
- 比如使用 [JamesIves/github-pages-deploy-action@v4](https://github.com/JamesIves/github-pages-deploy-action) 自动部署 GitHub Pages.
```bash
# 一个最小可运行的项目就搭好了 可以 push 了
git add .
git commit -m 'init'
git push -u origin main
```

## 引入依赖
### ElementPlus 组件库
[Element Plus 安装](https://element-plus.org/zh-CN/guide/installation.html#%E7%8E%AF%E5%A2%83%E6%94%AF%E6%8C%81)
```bash
npm install element-plus --save
# [自动导入](https://element-plus.org/zh-CN/guide/quickstart.html#%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%85%A5-%E6%8E%A8%E8%8D%90)
npm install -D unplugin-vue-components unplugin-auto-import
# 并按文档修改 vite.config.ts
```

[国际化 ConfigProvider](https://element-plus.org/zh-CN/guide/i18n.html#configprovider)
// TODO

### UnoCSS
[文档](https://unocss.dev/integrations/vite)

(又)一个简化 css 写法的库，只需要写 class 就能自动生成 css，比如 `class="flex"` 会生成 `.flex{display: flex}`，
好像这种写法叫做 `原子 CSS`？
```bash
npm install -D unocss
```
安装后在 vite.config.ts 中配置 Plugin
```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(
      presets: [
        presetUno(),          // 基本预设
        presetAttributify(),  // 属性化支持
        presetIcons(),        // 图标支持
      ],
    ),
  ],
})
```

[在线预览 class 生成的 css](https://unocss.dev/interactive/)

### router 路由
略。生成时已引入，用法见代码。
`createWebHistory` 需要服务器配置才能支持: 不存在的文件返回 index.html 以便让网页端接管路由
所以 GitHub Pages 这种应当使用 # hash 路由，换为 `createWebHashHistory`.

### 保持路径不使用#路由的方法
[怎样为Github pages Hack使用了vue-router history模式的vue应用？](https://www.zhihu.com/question/64173754)
- 最简单的方法，将 build 后的 index.html 复制一份，命名为 404.html, 见 [.github/workflows/ghpage.yaml](./.github/workflows/ghpage.yaml)
- [csuwildcat/sghpa](https://github.com/csuwildcat/sghpa) 404.html 中在 sessionStorage 记录当前路径，并重定向到 index.html, 然后在首页 replace url
- [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages) 思路同上, 只是使用 script 而不是 meta 标签进行重定向

第一种方法，请求服务端不存在的文件，会返回 404 状态码，但 404.html 的内容就是 index.html 的内容，所以浏览器可以正常渲染页面，不打开控制台是看不到 404 标红的。
后两种方法，会返回 404 状态码，然后跳转到首页 得到 200 状态码，并通过 `history.replaceState` 替换 url, 不打开控制台用户也是无感的。

