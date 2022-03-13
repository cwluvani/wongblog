import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './assets/tailwind.css'

createApp(App)
    .mount('#app')
    .use(router)
    .use(store)
