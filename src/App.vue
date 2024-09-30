<template>
  <router-view></router-view>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'

import defaultJson from "./assets/utils/default"

const $route = useRoute();
const $router = useRouter()
const routerlink = (val) => {
    $router.push({path:val});
}
let DataSaver = defaultJson

if ((localStorage.getItem("mainData") )==null) {
localStorage.setItem("mainData", JSON.stringify(DataSaver));
}

</script>

<style>
body{
  margin:0;
  padding:0;
}

:root {
  /* 背景主要颜色 */
  --theme-color: #000000; 
  /* 背景颜色反色 */
  --theme-roloc: #ffffff; 
  /* 高亮文字主要颜色 */
  --theme-main-color: #4698db;
  /* 侧边栏主要颜色 */
  --theme-sidebar-major-color: #161616;
  /* 侧边栏文字颜色 */
  --theme-sidebar-text-color: #959ba7;


  /* 插入光标的颜色 */
  --hide-cursor: rgba(0,0,0,0);


  /* 主页面的div的背景颜色 */
  --theme-background-major-color: #161616;
  /* 主页面的文字颜色 */
  --theme-text-major-color: #959ba7;
  /* 主页面的按钮按下文字颜色 */
  --theme-text-major-color-active: #676b73;
  /* 主页面提示文字 */
  --theme-text-major-color-tip: #5b5e66;
  /* 主页面输入框背景颜色 */
  --theme-text-major-color-input: #252525;
  /* 主页面任务类型hover颜色 */
  --theme-class-major-color-hover: #353535;

  --Pointer--live: 1;
  --theme--test: 0;
}
</style>
