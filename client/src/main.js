import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd'


createApp(App)
    .mount('#app')
    .use(router)
    .use(store)
    .use(Antd)
    
