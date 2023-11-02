import { createApp } from 'vue';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss'; //引入模板的全局的样式
import 'virtual:svg-icons-register'; //引入svg插件需要配置代码
import globalComponents from '@/components'; //引入自定义插件对象：注册整个项目的全局组件
import router from './router'; //引入路由
import pinia from './store'; //引入仓库
const app = createApp(App);
app.use(ElementPlus);

//安装自定义插件
app.use(globalComponents);

//注册模板路由
app.use(router);

//安装仓库
app.use(pinia);

app.mount('#app');

//旧电脑git上传测试
