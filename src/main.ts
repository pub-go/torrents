import 'uno.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 导入暗色变量
import 'element-plus/theme-chalk/dark/css-vars.css';
import { gettext } from './i18n/gettext';
const app = createApp(App)

app.use(gettext)
    .use(router)

app.mount('#app')
