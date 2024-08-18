import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import mitt from "mitt"
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
const bus = mitt()
app.config.globalProperties.$bus = bus
app.use(ElementPlus, {
    locale: zhCn,
})
app.config.globalProperties.$api = axios
app.use(pinia)
app.use(router)

app.mount('#app')

