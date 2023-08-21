import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/antd.css'
// import './assets/main.css'
import './style/main.less'
import filters from  '@/filters'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')

app.config.globalProperties.$filters = {
  ...filters
}
