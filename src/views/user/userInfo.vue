<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';

import { signStore } from '../../stores/sign';// 注册路由
const signState = signStore()

import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()
const routerlink = (val) => {
  $router.push({name:val});
}

import url from '../../assets/utils/url.json'
const endURL = url.endURL

const avatar = ref(signState.data.avatar)
const UserID = ref(signState.data.account)
const email = ref(signState.data.email)
const day = ref(signState.data.day)

// token认证
const auth = JSON.parse(localStorage.getItem("auth"))
if (auth) {
  fetch(endURL + "/token", {
  method: "POST",
  credentials: 'include',
  body: JSON.stringify({
    'id':auth.id,
    'email': auth.email
  })
  }).then(res => res.json()).then(res => {
    if (res.code == 0) {
      signState.data = res.info
      signState.isLog = 1
    }
  }).then(() => {
    avatar.value = signState.data.avatar
    UserID.value = signState.data.account
    email.value = signState.data.email
    day.value = signState.data.day
  })
}

const logout = () => {
  localStorage.removeItem('auth')
  fetch(endURL + "/logout",{
    method: "POST",
    credentials: 'include'
  })
  signState.isLog = 0
  signState.data.avatar = ""
  signState.data.account = ""
  signState.data.email = ""
  signState.data.day = undefined
  signState.data.id = ""
  routerlink('HOME')
}

const signout = () => {
  alert("您确定要注销账户？")
}

</script>

<template>
    <div class="w-[100vw] h-[100vh] flex justify-center ">
        <div class="infoMain w-[800px] h-[700px] z-[20] mt-[4rem] rounded-xl flex flex-col items-center">
          <div class="w-[750px] h-[180px] mt-[4rem] flex items-center">
            <div class="w-[180px] h-[180px] mx-[3rem] p-[3px] border-[1px] border-[#929292]">
              <img class="select-none" draggable="false" :src="avatar" alt="头像">
            </div>
            <div class="h-[170px] w-[1px] bg-[#929292]"></div>
            <div class="w-[350px] h-[180px] flex flex-col pt-[1rem] pl-[3rem] items-start">
              <div class="text-[48px] text-[var(--theme-sidebar-text-color)]">{{ UserID }}</div>
              <div class="flex flex-col items-start ">
                <div class="text-[18px] text-[var(--theme-sidebar-text-color)]">邮箱：{{ email }}</div>
                <div class="text-[18px] text-[var(--theme-sidebar-text-color)]">注册日期：{{ day }}</div>
              </div>
            </div>
            <div>
              <div class="w-[100px] h-[50px] bg-[#fc4343] flex justify-center items-center my-[1rem] text-white text-lg rounded-xl select-none cursor-pointer active:bg-[#fc8282]" @click="logout">
                退出登录
              </div>
              <div class="w-[100px] h-[50px] bg-[#fc4343] flex justify-center items-center my-[1rem] text-white text-lg rounded-xl select-none cursor-pointer active:bg-[#fc8282]" @click="signout">
                注销账户
              </div>
            </div>
          </div>
          <div class="w-[750px] h-[450px] flex flex-col py-[2rem]">
            <div class="">
              123
            </div>
            <div>
              
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>
  .infoMain {
    background-color: var(--theme-sidebar-major-color);
  }
</style>