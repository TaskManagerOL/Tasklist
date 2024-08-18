import { defineStore } from 'pinia'
import { ref } from 'vue'
export const signStore = defineStore('signStore', () => {
  const sign = ref(0)
  return { sign }
})
