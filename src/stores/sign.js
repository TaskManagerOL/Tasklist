import { defineStore } from 'pinia'
import { ref,reactive } from 'vue'
export const signStore = defineStore('signStore', () => {
  const sign = ref(0)
  const data = reactive({
    id: "",
    email: "",
    account: "",
    day: "",
    avatar: ""
  })
  const isLog = ref(0)
  const info = ref(0)
  return { sign,data,isLog,info }
})
