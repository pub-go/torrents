import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 导入暗色变量
import 'element-plus/theme-chalk/dark/css-vars.css';
import { gettext } from './i18n/gettext';

import 'uno.css';

const app = createApp(App)

app.use(gettext)
    .use(router)

app.mount('#app')
