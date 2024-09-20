import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

import { signStore } from '../stores/sign';// 注册路由显示控制
const signState = signStore()

export const themeStore = defineStore('themeStore', () => {
    //登录猴需要同步
    const themeChoose = ref(0)

    // 自定义设置部分
    const bindMainSub = ref(false)
    const bindTheme = ref(false)
    const bindCalendar = ref(false)

    return { themeChoose,bindMainSub,bindTheme,bindCalendar }
})