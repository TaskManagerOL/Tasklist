<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'

import clock from '../components/tool/clock.vue'
import loading from '../components/tool/loading.vue'

import { events } from '../../EventBus/EventBus';
import { signStore } from '../stores/sign';// 注册路由
const signState = signStore()
import updateData from '../assets/utils/version';// 版本号
import { wave, canvasHeight, canvasWidth } from '../assets/utils/dotcanvas';// 波浪canvas

import egg from '../assets/utils/F12EasterEgg';// 彩蛋
egg()

import url from '../assets/utils/url.json'
const endURL = url.endURL

import pinIcon from "../assets/icon/pin.svg"
import SpinIcon from "../assets/icon/Spin.svg"
import clockIcon from "../assets/icon/clock.svg"
import SclockIcon from "../assets/icon/Sclock.svg"
import signIcon from "../assets/icon/sign.svg"
import SsignIcon from "../assets/icon/Ssign.svg"
import f11Icon from "../assets/icon/f11.svg"
import Sf11Icon from "../assets/icon/Sf11.svg"
import firstAvatar from "../assets/image/Profile.jpg"

const $router = useRouter()
const routerlink = (val) => {
  $router.push({name:val});
}

const canvasShow = ref(0)
let DataClass = JSON.parse(localStorage.getItem("mainData"));
setInterval(() => {
  DataClass = JSON.parse(localStorage.getItem("mainData"));
  canvasShow.value = DataClass.time.theme;
})

//该变量用于记录签到时间 存入数据库
const signDay = ref("2023-04-09")
const Time = (val) => {
  if(val == undefined)return undefined
  let Signintime = new Date(val).getTime();
  let NowTime = new Date().getTime();
  return Math.floor((NowTime - Signintime)/(24 * 3600 * 1000))
}
const signuptime = ref(undefined)

const avatar = ref('')
const UserID = ref()
watch(() => signState.isLog, () => {
  UserID.value = signState.data.account
  signuptime.value = Time(signState.data.day)
  avatar.value = signState.data.avatar
})

//以下用于记录按钮变化 可以不存入loctstroge和数据库
const sidebarstyle = ref("") 
const main = ref()
const iconstyle = reactive([{ icon: pinIcon, isP:0 }, { icon: clockIcon, isP: 0 }, { icon: signIcon, isP: 0 }, { icon: f11Icon, isP: 0 }])
const iconPoint = (val) => {
  switch (val) {
    case "top":
      iconstyle[0].icon = ++iconstyle[0].isP % 2 ? SpinIcon : pinIcon;
      sidebarstyle.value = iconstyle[0].isP % 2 ? { width: "250px", opacity: 1, visibility: "visible" } : "";
      break;
    case "clock":
      iconstyle[1].icon = ++iconstyle[1].isP % 2 ? SclockIcon : clockIcon;
      break;
    case "signkexie":
      iconstyle[2].icon = SsignIcon;
      setTimeout(() => {
        iconstyle[2].icon = signIcon;
      }, 100);
      fetch("https://at.kexie.space/api/record/online/" + DataClass.time.studyID, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json()).then(
          res => {
            if (res.code != 0)
              alert("不好意思，出现未知错误XP")
            else{
              if (res.data.status) {
                fetch("/api/user/signOut", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userId: DataClass.time.studyID
                  })
                }).then(res => res.json()).then(res => alert(res.data.userName + "辛苦啦✨，本次工作" + res.data.accumulatedTime + "小时，本周已工作" + res.data.totalTime + "小时，请注意休息噢~"))
              } else {
                fetch("/api/user/signIn", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userId: DataClass.time.studyID
                  })
                }).then(res => res.json()).then(res => {
                  if (res.code == -205)
                    alert("哎呀别操作太快，要跟不上了QAQ")
                  else if (res.code != 0 && res.code != -205)
                    alert("不好意思，出现未知错误XP")
                  else
                    alert(res.data.userName + "您好，准备上班了吗？今天还有" + DataClass.tableData.length + "个任务未完成，还不能休息哦~")
                })
              }
            }
          })
      break;
    case "f11":
      iconstyle[3].icon = ++iconstyle[3].isP % 2 ? Sf11Icon : f11Icon;
      if (iconstyle[3].isP % 2)
        main.value.requestFullscreen()
      else
        document.exitFullscreen();
      break;
    default:
      console.error("ICON NOT FOUND!");
      break;
  }
}
//全屏除点击外状态判断
addEventListener("fullscreenchange", () => { 
  iconstyle[3].isP = document.fullscreenElement ? 1 : 0;
  iconstyle[3].color = iconstyle[3].isP % 2 ? "#1296db" : "#969ba7";
});
//以下用于绑定齿轮和sidebar
const Overstyle = ref("")
const Over = () => {
  Overstyle.value = {
    transform: "rotate(240deg)",
    transition: "all 0.5s ease-in-out"
  }
}

const Leave = () => {
  if (iconstyle[0].isP % 2 == 0) {
    Overstyle.value = {
      transform: "rotate(0deg)",
      transition: "all 1.5s ease-in-out"
    }
  }
}

//优化封装代码
const themeFunction = (val) => {
  document.documentElement.style.setProperty(`--theme-color`, val[0]);
  document.documentElement.style.setProperty(`--theme-roloc`, val[1]);
  document.documentElement.style.setProperty(`--theme-main-color`, val[2]);
  document.documentElement.style.setProperty(`--theme-sidebar-major-color`, val[3]);
  document.documentElement.style.setProperty(`--theme-sidebar-text-color`, val[4]);
  document.documentElement.style.setProperty(`--theme-background-major-color`, val[5]);
  document.documentElement.style.setProperty(`--theme-text-major-color`, val[6]);
  document.documentElement.style.setProperty(`--theme-text-major-color-active`, val[7]);
  document.documentElement.style.setProperty(`--theme-text-major-color-tip`, val[8]);
  document.documentElement.style.setProperty(`--theme-text-major-color-input`, val[9]);
  document.documentElement.style.setProperty(`--theme-class-major-color-hover`, val[10]);
}

//这个方法可以测试系统主题是否为黑色
const themeIsDark = window.matchMedia('(prefers-color-scheme: dark)')
//监听系统主题变化
themeIsDark.addEventListener('change',e => {
  newTheme(DataClass.time.theme)
});

const newTheme = (val) => {
  switch (val) {
    case 0:
      themeFunction(['#000000','#ffffff','#4698db','#161616','#959ba7','#161616','#959ba7','#676b73','#5b5e66','#252525','#353535'])
      break;
    case 1:
      themeFunction(['#e0e0e0','#312520','#4698db','#e9f1f6','#75664d','#e9f1f6','#75664d','#5d513c','#bbcdc5','#f3f9f1','#e0f0e9'])
      break;
    case 2:
      themeFunction(['#000000','#ffffff','#4698db','#161616','#959ba7','#161616','#959ba7','#676b73','#5b5e66','#252525','#353535'])
      break;
    case 3:
      themeFunction(['#e0e0e0','#312520','#4698db','#e9f1f6','#75664d','#e9f1f6','#75664d','#5d513c','#bbcdc5','#f3f9f1','#e0f0e9'])
      break;
    default:
      break;
  }
  let DataClass = JSON.parse(localStorage.getItem("mainData"));
  if (DataClass.time.bindTheme) {
    if (themeIsDark.matches && val == 1) {
      DataClass.time.theme = 0
      newTheme(DataClass.time.theme)
    } else if (themeIsDark.matches && val == 3) {
      DataClass.time.theme = 2
      newTheme(DataClass.time.theme)
    } else if (!themeIsDark.matches && val == 0) {
      DataClass.time.theme = 1
      newTheme(DataClass.time.theme)
    } else if (!themeIsDark.matches && val == 2) {
      DataClass.time.theme = 3
      newTheme(DataClass.time.theme)
    }
    localStorage.setItem("mainData", JSON.stringify(DataClass));
  }
}
newTheme(DataClass.time.theme)

//全局bus事件传递主题变化 给diy

const emit = () => {
  events.on('theme', (val) => { newTheme(val) })
}
emit()

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
  })
}

</script>

<template>
  <div>
    <div class="main" ref="main">
        <div v-if="canvasShow==2||canvasShow==3">
          <canvas class="absolute left-[0] z-[0]" ref="wave" :width="canvasWidth" :height="canvasHeight"></canvas>
        </div>
        <div id="setting">
          <div @mouseover="Over" :style="Overstyle" id="settingico">
            <img src="../assets/icon/setting.svg">
          </div>
          <div @mouseover="Over" @mouseleave="Leave" id="settingsidebar" :style="sidebarstyle">
            <div class="flex w-2/3 pt-[.2rem] mt-[2rem] ml-[.5rem] items-center justify-center border-[#61dde4] border-[3px] rounded-full bg-[#327270]">
              <div @click="iconPoint('top')" class="px-[.2rem]">
                <img class="w-[35px] h-[35px]" :src="iconstyle[0].icon">
              </div>
              <div @click="iconPoint('clock')" class="px-[.2rem]">
                <img class="w-[35px] h-[35px]" :src="iconstyle[1].icon">
              </div>
              <div @click="iconPoint('signkexie')" class="px-[.2rem]" title="一键签到签退:科协人员可以进入右下角版号页面输入学号">
                <img class="w-[35px] h-[35px]" :src="iconstyle[2].icon">
              </div>
              <div @click="iconPoint('f11')" class="px-[.2rem]">
                <img class="w-[35px] h-[35px]" :src="iconstyle[3].icon"> 
              </div>
            </div>
            <ul class="flex flex-col items-center ">
              <li>
                <div class="flex justify-center" >
                  <img class="w-[80px] h-[80px] rounded-xl" :src="avatar||firstAvatar" alt="头像">
                </div>
                <div class="signin" @click="UserID?routerlink('User'):routerlink('Sign')">{{ UserID||"登录/注册" }}</div>
                <div>已注册{{signuptime === undefined? Time(signDay):signuptime }}天</div>
              </li>
              <li @click="routerlink('List')">⏱️任务清单</li>
              <li @click="routerlink('DayList')">🧾每日任务</li>
              <li @click="routerlink('TaskCalendar')">📖任务日历</li>
              <li @click="routerlink('MainList')">📜杂项安排</li>
              <li @click="routerlink('DIY')">✨风格选择</li>
            </ul>
            <div class="absolute bottom-[5px] left-[10px] text-[--theme-sidebar-text-color] cursor-pointer">
              <a href="https://beian.miit.gov.cn/" target="_blank" class="text-[--theme-sidebar-text-color] whitespace-nowrap">桂ICP备2024039870号</a>
            </div>
            <div class="absolute bottom-[5px] left-[200px] text-[--theme-sidebar-text-color] cursor-pointer">
              <!-- 版本号 -->
              <p @click="routerlink('GetMore')">{{ updateData[0].version }}</p>
            </div>
          </div>
          <clock v-if="iconstyle[1].isP%2" class="clock"></clock>
        </div>
        <router-view></router-view>
        <!-- <loading></loading> -->
    </div>
  </div>
</template>

<style scoped>
/* 主题跟随系统 */
@media (prefers-color-scheme: dark) {
    :root {
      --theme--test: 0;
    }
}

@media (prefers-color-scheme: light) {
  :root {
      --theme--test: 1;
    }
}

@font-face {
  font-family: 'iconfont';  /* Project id 4008251 */
  src: url('//at.alicdn.com/t/c/font_4008251_qo4v93ohsh.woff2?t=1701401677051') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_qo4v93ohsh.woff?t=1701401677051') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_qo4v93ohsh.ttf?t=1701401677051') format('truetype');
}

  .iconfont{
    font-family:"iconfont" !important;
    font-size:24px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    text-decoration: none;
    font-size: 24px;
    padding-left: 6px;
    line-height: 36px;
    color:  var(--theme-sidebar-text-color);
    user-select: none;
    cursor: pointer;
    caret-color: var(--hide-cursor);
}

  .clock {
    position: absolute;
    z-index: 50;
  }

  .main {
    width: 100vw;
    height: 100vh;
    background-color: var(--theme-color);
    margin: 0;
    padding: 0;
    overflow: hidden;
    
  }

  #settingico{
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 30px;
    transition: all 1.5s ease-in-out;
    z-index: 101;
  }

  #settingsidebar {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 100%;
    background-color: var(--theme-sidebar-major-color);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    z-index: 100;
  }

  #settingico img {
    width: 50px;
    height: 50px;
    user-select: none;
    -webkit-user-drag: none;
    caret-color: var(--hide-cursor);
  }

  #settingico:hover~#settingsidebar {
    width: 250px;
    opacity: 1;
    visibility: visible;
    transition: all 0.5s ease-in-out;
  }

  #settingsidebar:hover {
    width: 250px;
    opacity: 1;
    visibility: visible;
    transition: all 0.5s ease-in-out;
  }

  #setting ul {
    width: 60%;
    height: 80%;
    position: absolute;
    top: 100px;
    right: 20%;
  }

  #setting ul li {
    list-style:none;
    font-size: 26px;
    font-weight: 900;
    color: var(--theme-text-major-color);
    white-space: nowrap;
    user-select: none;
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
  }

 #setting ul li:active {
    color: var(--theme-text-major-color-active);
 }

  #setting ul :nth-child(1){
    font-size: 18px;
  }

  #setting ul :nth-child(1) .signin{
    font-size: 20px;
    background-image: linear-gradient(to top left,#3CA55C,#B5AC49);
    background-clip: text;
    -webkit-background-clip:text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
  }

  #setting ul :nth-child(1) .signin:active {
    background-image: linear-gradient(to top left,#24FE41,#FDFC47);
    background-clip: text;
    -webkit-background-clip:text;
    -webkit-text-fill-color: transparent;
  }

  </style>
