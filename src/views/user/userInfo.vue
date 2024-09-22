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
const oldavatar = ref(signState.data.avatar)
const UserID = ref(signState.data.account)
const email = ref(signState.data.email)
const day = ref(signState.data.day)

// token认证
const tokenNow = () => {
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
      oldavatar.value = signState.data.avatar
      UserID.value = signState.data.account
      email.value = signState.data.email
      day.value = signState.data.day
    })
  }
}
tokenNow()

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


const newAvatar = ref()
const newName = ref()
const changeAvatar = (e) => {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = function(e) {
    const base64 = e.target.result;
    avatar.value = base64
    newAvatar.value = base64
  }
}

const textPlaceholder = ref("此处键入新名称")
const textNum = () => {
  if (newName.value.length >= 10||newName.value.length == 0) {
    newName.value = ""
    setTimeout(() => {
      textPlaceholder.value = "此处键入新名称"
    },2000)
    textPlaceholder.value = "字数错误，请重新键入"
  }
}

const saveChange = () => {
  console.log(newAvatar.value, avatar.value,newName.value);
  fetch(endURL + "/info", {
    method: "POST",
    credentials:"include",
    body: JSON.stringify({
      "email": email.value,
      "account": newName.value ? newName.value : UserID.value,
      "avatar": newAvatar.value ? newAvatar.value : oldavatar.value
      })
  }).then(res => res.json()).then(res => {
      if (res.code == 0) {
        signState.data.avatar = newAvatar.value
        signState.data.account = newName.value
      }
  }).then(tokenNow())///这里造成不能及时更新 看看怎么解决
}

const clearData = () => {
  alert("您确定要清除数据？")
}

const signout = () => {
  alert("您确定要注销账户？")
}
</script>

<template>
    <div class="w-[100vw] h-[100vh] flex justify-center items-center">
        <div class="infoMain w-[800px] h-[350px] z-[20] rounded-xl flex flex-col items-center">
          <div class="w-[750px] h-[180px] mt-[4rem] flex items-center">
            <div class="relative w-[180px] h-[180px] mx-[3rem] p-[3px] border-[1px] border-[#929292] overflow-hidden">
              <input type="file" accept="image/*" class="absolute w-[180px] h-[180px] left-0 opacity-0 select-none" @change="changeAvatar" title="">
              <img class="select-none w-[100%] h-[100%] object-cover" draggable="false" :src="avatar" alt="头像">
            </div>
            <div class="h-[170px] w-[1px] bg-[#929292]"></div>
            <div class="w-[350px] h-[180px] flex flex-col pt-[1rem] pl-[3rem] items-start">
              <div class="text-[48px] text-[var(--theme-sidebar-text-color)]">{{ UserID }}</div>
              <div class="flex flex-col items-start ">
                <div class="text-[18px] text-[var(--theme-sidebar-text-color)]">邮箱：{{ email }}</div>
                <div class="text-[18px] text-[var(--theme-sidebar-text-color)]">注册日期：{{ day }}</div>
              </div>
            </div>
            <div class="mt-[2rem] flex flex-col items-center">
              <div class="w-[100px] h-[50px] bg-[#fc4343] flex justify-center items-center my-[.5rem] text-white text-lg rounded-xl select-none cursor-pointer active:bg-[#fc8282]" @click="logout">
                退出登录
              </div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#fc4343]"></div>
              <div class="w-[100px] h-[50px] bg-[#fc4343] flex justify-center items-center my-[.5rem] text-white text-lg rounded-xl select-none cursor-pointer active:bg-[#fc8282]" @click="clearData">
                清除数据
              </div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#fc4343]"></div>
              <div class="w-[100px] h-[50px] bg-[#fc4343] flex justify-center items-center my-[.5rem] text-white text-lg rounded-xl select-none cursor-pointer active:bg-[#fc8282]" @click="signout">
                注销账户
              </div>
            </div>
          </div>
          <div class="w-[650px] h-[450px] flex flex-col pt-[2rem]">
            <div class="w-full flex items-center">
              <div class="flex mr-[.5rem]">
                <div class="w-[80px] h-[40px] flex justify-center items-center rounded-l-xl border-[2px] border-[white] text-[white] shadow-white shadow select-none" style="text-shadow: 0px 0px 5px white;">修改名称</div>
                <input v-model="newName" class="w-[200px] h-[40px] px-[.5rem] outline-none shadow-white shadow " type="text" :placeholder="textPlaceholder" @blur="textNum">
                <div class="w-[20px] h-[40px] flex justify-center items-center rounded-r-xl border-[2px] border-[white] text-[white] shadow-white shadow select-none" style="text-shadow: 0px 0px 5px white;"></div>
              </div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="w-[5px] h-[5px] rounded-full bg-[#43c8fc] mx-[.5rem]"></div>
              <div class="mx-[.5rem] w-[80px] h-[40px] bg-[#43c8fc] border-[white] border-[3px] flex justify-center items-center text-white text-lg rounded-xl select-none cursor-pointer active:bg-[#7ddaff]" @click="saveChange">
                保存
              </div>
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