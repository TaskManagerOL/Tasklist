<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'

import { signStore } from '../../stores/sign'
const signState = signStore()

import url from '../../assets/utils/url.json'
const endURL = url.endURL

import avatarRandom from '../../assets/utils/avatar'

const $route = useRoute();
const $router = useRouter()
const routerlink = (val) => {
    $router.push({name:val});
}
let DataClass = JSON.parse(localStorage.getItem("mainData"));

const land = ref(1) //用于检测是注册还是登录
const fontColor = (val) => { //修改相应样式
    return  (val==land.value)? "color:#4698db" : "color:#000000"
}

//写点正则判断
const userID = ref('') //IDv-model绑定
const password = ref('') //Passwordv-model绑定
const tel = ref('') //号码v-model绑定
const Num = ref('') //验证码v-model绑定
const sign_password = ref('')

//表单第一次点击后才会触发表单验证
const IDpoint = ref(0)
const Pswpoint = ref(0)
const telpoint = ref(0)
const Numpoint = ref(0)
const sign_passwordPoint = ref(0)

const emoji = reactive(['right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;']) //错误icon原始状态
const patternForID = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z]{2,4})+$/ //账号正则判断
const patternForPsw = /^[A-Za-z0-9~]{6,12}$/ //密码正则判断
const patternForTel = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z]{2,4})+$/ //邮箱严谨判断
const patternForNum = /^[0-9]{6}$/ //验证码正则判断

const RegIsp = () => {
    (!patternForID.test(userID.value) && IDpoint.value == 1) ? emoji[0] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[0] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForPsw.test(password.value) && Pswpoint.value == 1) ? emoji[1] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[1] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForTel.test(tel.value) && telpoint.value == 1) ? emoji[2] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[2] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForNum.test(Num.value) && Numpoint.value == 1) ? emoji[3] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[3] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForPsw.test(sign_password.value) && sign_passwordPoint.value == 1) ? emoji[4] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[4] = 'right:-40px;visibility: hidden;opacity: 0;';
    land.value?landword.value = "登录":landword.value = "注册"
}

const codetext = ref("获取验证码")
const codeIsp = ref(1)
const landword = ref('登录')

const countcode = () => {
    let num = 60
    let timer = setInterval(() => {
        codetext.value = num + "s后重试"
        codeIsp.value = 0
        if (num <= 0) codetext.value = "获取验证码", clearInterval(timer),codeIsp.value = 1
        num--
    }, 1000);
}

const sendEmail = () => {
    if (codeIsp.value&&localStorage.getItem("expiryCode")<Date.now()) {
        localStorage.setItem("expiryCode",Date.now()+60000)
        if (!(!patternForTel.test(tel.value) && telpoint.value == 1)) {
            fetch(endURL + "/sendemail", {
                method: "POST",
                body: JSON.stringify({
                    'email': tel.value,
                })
            }).then(res => res.json()).then(res => {
                if (res.code != 0) {
                    countcode()
                } else if (res.code == 3) {
                    codetext.value = "账号已存在"
                }
            })
        }
    } else {
        codetext.value = "请稍后重试"
    }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return year+'-'+month+'-'+day ;
}

const LogIn = (time) => {
    if (patternForID.test(userID.value) && patternForPsw.test(password.value)) {
        fetch(endURL + "/login", {
            method: "POST",
            credentials: "include",  // 允许发送和接收 Cookie
            body: JSON.stringify({
                'email': userID.value,
                'password': password.value
                })
        }).then(res => res.json()).then(res => {
            if (res.code == 0) {
                signState.data = res.info
                localStorage.setItem('auth', JSON.stringify({
                    "id": res.auth.id,
                    "email": res.auth.email
                }))
                signState.isLog = 1
                landword.value = "登录成功🥰"
                if (time) {
                    signState.sign = 0
                    routerlink('HOME')
                } else {
                    setTimeout(() => {
                        signState.sign = 0
                        routerlink('HOME')
                    }, 1000);
                }
            }
            else if (res.code == 1) {
                landword.value = res.state + "🤯"
            }
        })
    }
}

const SignIn = () => {
    if (patternForTel.test(tel.value) && patternForNum.test(Num.value) && patternForPsw.test(sign_password.value)) {
        fetch(endURL + "/signin", {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                'email': tel.value,
                'password': sign_password.value,
                'code': Num.value,
                'account': "tasklister",
                'day': formatDate(new Date()),
                'avatar': avatarRandom
            })
        }).then(res => res.json()).then(res => {
            if (res.code == 0) {
                landword.value = "注册成功🥰"
                setTimeout(() => {
                    land.value = 1
                    userID.value = tel.value
                    landword.value = "登录"
                }, 1000);
            }
            else if (res.code == 1) {
                landword.value = "验证码错误😫"
            }
            else if (res.code == 2) {
                landword.value = "验证码过期🤕"
            }
            // DataClass.time.userID = response.data.profile.nickname
            // DataClass.time.primeID = response.data.account.id
            // localStorage.setItem("mainData", JSON.stringify(DataClass));
            // routerlink("HOME")
        })
    }
}


const wavemove = reactive(['transform: translateX(0)','transform: translateX(0)','transform: translateX(0)','transform: translateX(0)','transform: translateX(0)'])
const mousemove = (e) => {
    const mouseX = e.clientX
    const windowWidth = document.documentElement.clientWidth
    const rate = mouseX/windowWidth
    wavemove[0] = 'transform: translateX(' + 280 * (rate - 0.5) * 2 + 'px)'
    wavemove[1] = 'transform: translateX(' + 280 * (rate - 0.5) * 1.5 + 'px)'
    wavemove[2] = 'transform: translateX(' + 280 * (rate - 0.5) * 1 + 'px)'
    wavemove[3] = 'transform: translateX(' + 280 * (rate - 0.5) * .5 + 'px)'
    wavemove[4] = 'transform: translateX(' + 280 * (rate - 0.5) * 1 + 'px)'
}

const enterKey = () => {
    land.value ? LogIn(1) : SignIn()
}

</script>

<template>
    <div class="mainsub" @mousemove="mousemove">
        <div class="signDiv" id="signDiv">
            <!-- 返回按钮 -->
            <div class="absolute top-[20px] flex">
                <div class="cloud1"></div>
                <div class="cloud2 phonehidden"></div>
            </div>
            <div class="absolute right-7 top-7 cursor-pointer topicon" title="返回" @click="routerlink('HOME')"><i class="iconfont">&#xe64f;</i></div>
            <div class="flex items-center w-full h-full">
                <!-- 左边部分 -->
                <div class="flex flex-col justify-center items-center px-10 phonehidden" style="user-select:none;border-color:rgba(230, 230, 230)" id="phonehidden">
                    <div class="h-2/5 pb-10 phonehidden" id="phonehidden">
                        <div id="tasklist"></div>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="border-r-2 border-solid phonehidden h-[250px] mb-10 border-[#d3d6d8] select-none" id="phonehidden"></div>
                <!-- 右边部分 -->
                <div class="flex flex-col justify-start items-center w-full px-10 h-[300px] select-none">
                    <!-- 右上部分 -->
                    <div class="text-2xl flex">
                        <div class="mx-6 cursor-pointer" @click="land=1,RegIsp()" :style="fontColor(1)">密码登录</div>
                        <div class="border-r-2 border-solid border-slate-500"></div>
                        <div class="mx-6 cursor-pointer" @click="land=0,RegIsp()" :style="fontColor(0)">快速注册</div>
                    </div>
                    <!-- 表单部分 -->
                    <div v-if="land" class="m-5 w-full flex justify-center ">
                        <form class="flex flex-col" action="">
                            <div class="flex items-center relative">
                                <div class="flex rounded-t-xl" style="width:450px;height:50px;border:1px solid #adadad">
                                    <label for="账号" class="py-3 px-6" style="width:100px">邮箱</label>
                                    <input v-model="userID" @focus="IDpoint=1" @keyup="RegIsp()" class="h-full w-full focus:outline-0" style="background-color:rgba(224, 224, 224,0)" name="账号" type="text" placeholder="请输入邮箱">
                                </div> 
                                <el-tooltip content="请输入正确的邮箱哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[0]" >😭</div>
                                </el-tooltip>
                            </div>
                            <div class="flex items-center relative">
                                <div class="flex justify-between rounded-b-xl" style="width:450px;height:50px;border:1px solid #adadad;border-top:0;">
                                    <label for="密码" class="py-3 px-6" style="width:100px">密码</label>
                                    <input v-model="password" @focus="Pswpoint=1"  @keydown.enter="enterKey()"  @keyup="RegIsp()" class="h-full focus:outline-0" style="width: 300px;background-color:rgba(224, 224, 224,0)" name="密码" type="password" placeholder="请输入密码">
                                    <div class="py-3 px-4" style="width:120px;color:#4698db;cursor:pointer;" @click="routerlink('foundPsw')">忘记密码?</div>
                                </div>
                                <el-tooltip content="密码为字母和数字组合哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[1]" >😭</div>
                                </el-tooltip>
                            </div>
                        </form>
                    </div>
                    <div v-if="!land" class="m-5">
                        <form class="flex flex-col" action="">
                            <div class="flex items-center relative">
                                <div class="flex justify-between rounded-t-xl" style="width:450px;height:50px;border:1px solid #adadad">
                                    <label for="账号" class="py-3 px-6" style="width:120px">邮箱</label>
                                    <input class="h-full w-full focus:outline-0"  v-model="tel" @focus="telpoint=1" @keyup="RegIsp()" style="width: 300px;background-color:rgba(224, 224, 224,0)" name="号码" type="text" placeholder="请输入邮箱">
                                    <div class="py-3 px-4 cursor-pointer" style="width:150px;color:#4698db;" @click="telpoint=1,Numpoint=0,RegIsp(),sendEmail()">{{ codetext }}</div>
                                </div> 
                                <el-tooltip content="请输入正确的邮箱哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[2]" >😭</div>
                                </el-tooltip>
                            </div>
                            <div class="flex items-center relative">
                                <div class="flex" style="width:450px;height:50px;border:1px solid #adadad;border-top:0;">
                                    <label for="密码" class="py-3" style="width:130px">密码</label>
                                    <input class="h-full w-full focus:outline-0" v-model="sign_password" @focus="sign_passwordPoint=1" @keyup="RegIsp()" style="background-color:rgba(224, 224, 224,0)" name="密码" type="password" placeholder="请输入密码">
                                </div>
                                <el-tooltip content="密码为字母和数字组合、6~12位哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[4]">😭</div>
                                </el-tooltip>
                            </div>
                            <div class="flex items-center relative">
                                <div class="flex rounded-b-xl" style="width:450px;height:50px;border:1px solid #adadad;border-top:0;">
                                    <label for="验证码" class="py-3" style="width:130px">验证码</label>
                                    <input class="h-full w-full focus:outline-0" @keydown.enter="enterKey()" v-model="Num" @focus="Numpoint=1" @keyup="RegIsp()" style="background-color:rgba(224, 224, 224,0)" name="验证码" type="text" placeholder="请输入验证码">
                                </div>
                                <el-tooltip content="验证码为六位数哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[3]">😭</div>
                                </el-tooltip>
                            </div>
                        </form>
                    </div>
                    <!-- 登录按钮部分 -->
                    <div class="flex absolute bottom-[110px] items-center justify-center w-[300px] h-[80px] sunButton">
                        <div class="subbmitButton"  @click="land?LogIn():SignIn()">{{ landword }}</div>
                    </div>
                    <!-- 多方式登录部分 -->
                    <!-- <div class="flex flex-col" style="font-size:14px;color:#213547">
                        <p class="pb-3">其他方式登录</p>
                        <div class="flex justify-center">
                            <div class="flex items-center mx-5 cursor-pointer" @click="routerlink('QQCode')">
                                <img src="/iconWechat.png" alt="WeChat">
                                <p class="px-2">微信登录</p>
                            </div>
                            <div class="flex items-center mx-5 cursor-pointer" @click="routerlink('WechatCode')">
                                <img src="/iconTencent.png" alt="Tencent">
                                <p class="px-2">QQ登录</p>
                            </div>
                        </div>
                    </div> -->
                    <!-- 隐私政策提醒部分 -->
                    <div class="absolute flex flex-col pt-8 bottom-10 z-[9] text-[#fff]" style="font-size:13px;">
                        <div class="flex w-full justify-center">未注册过Tasklist的邮箱，将自动帮你注册账号</div>
                        <div class="flex w-full justify-center">
                            <p>登录或完成注册前请阅读</p>
                            <!-- <div class="px-1 cursor-pointer text-[#70d6f5]">用户协议</div>
                            <p>和</p> -->
                            <a class="px-1 cursor-pointer text-[#70d6f5]" @click="routerlink('agreement')">隐私政策</a>
                        </div>
                    </div>
                </div>
                <div class="pointer-events-none">
                    <div class="wave1" :style="wavemove[0]"></div>
                    <div class="wave2" :style="wavemove[1]"></div>
                    <div class="wave3" :style="wavemove[2]"></div>
                    <div class="wave4" :style="wavemove[3]"></div>
                    <div class="ship" :style="wavemove[2]">
                        <div class="rollship"></div>
                    </div>
                    <div class="lighter phonehidden" :style="wavemove[0]"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@media screen and (orientation:portrait) {
    #tasklist { width: 0;opacity: 0;padding: 0; }
	.phonehidden { width: 0;opacity: 0;padding: 0; }
    #signDiv { width:480px }
}

/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4008251 */
  src: url('//at.alicdn.com/t/c/font_4008251_y7vbi11e4hm.woff2?t=1723971266207') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_y7vbi11e4hm.woff?t=1723971266207') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_y7vbi11e4hm.ttf?t=1723971266207') format('truetype');
}

.iconfont{
    font-family:"iconfont" !important;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
}

@keyframes gradientBG {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes mainBackChange {
    0% {
        background-color: rgba(0, 0, 0, 1);
    }
    50% {
        background-color: rgba(0, 0, 0, 0.8);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.6);
    }
}

@keyframes rollship {
    0% {
        transform:  rotate(0deg);
    }
    25% {
         transform:  rotate(15deg);
    }
    50% {
         transform:  rotate(0deg);
    }
    75% {
        transform:  rotate(-15deg);
    }
    100% {
        transform:  rotate(0deg);
    }
}

.subbmitButton {
    color: transparent;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    transition: all .5s ease-in-out;
    background-color:#f00800;
    border: 2px solid #f05800;
    box-shadow: 0px 0px 15px #d33c00;
    overflow: hidden;
    white-space: nowrap;
}

.sunButton:hover .subbmitButton{
    width: 200px;
    height: 40px;
    color: #4698db;
    background-color:#f5f5f5;
    border:solid 3px #4698db;
    box-shadow: 5px 5px 8px #757575
    
}

#tasklist {
    width: 250px;
    height: 250px;
    user-select: none;
    -webkit-user-drag: none;
    transition: all .5s ease-in-out;
    background-image: url(/tasklist.png);
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    border-radius: 10px;
    border: 1px solid #cccccc;
}

#phonehidden:hover #tasklist {
    background-image: url(/Stasklist.png);
}

:deep(.el-select.m-2){
    margin: 0;
}

:deep(.el-input__wrapper) {
    border: 0;
    padding-left: 1.5rem;
    padding-right: 1.3rem;
    font-size: 1rem;
    width: 100px;
    background-color:transparent;
    outline:none;
}

body {
    padding: 0;
    margin: 0;
}

.mainsub {
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    animation: mainBackChange .5s linear;
}

.signDiv {
    position: absolute;
    width: 940px;
    height: 480px;
    border-radius: 10px;
    background: #f5f5f5;
    overflow:hidden;
    border: solid 2px #9c9c9c;
    /* background-image: url(/public/signBG.png); */
    background-size: contain;
}

.cloud1 {
    width: 400px;
    height: 50px;
    transform-origin: 0 0;
    transform: scale(1.3);
    background-image:linear-gradient(to right,#028bd4,#9dffd8);
    background-size: 600% 600%;
    animation: gradientBG 8s 0.6s ease infinite;
    user-select: none;
    clip-path: path('M1 30.5C0.723858 30.5 0.5 30.7239 0.5 31C0.5 31.2761 0.723858 31.5 1 31.5V30.5ZM28.3835 15L27.9231 14.8049L27.9231 14.8049L28.3835 15ZM100 1.5H300V0.5H100V1.5ZM1 31.5H201V30.5H1V31.5ZM100 16.5H200V15.5H100V16.5ZM250 16.5H300V15.5H250V16.5ZM100.5 0.5C97.7477 0.5 95.6428 1.48712 94.2283 3.00259C92.8207 4.51071 92.125 6.51166 92.125 8.5C92.125 10.4883 92.8207 12.4893 94.2283 13.9974C95.6428 15.5129 97.7477 16.5 100.5 16.5V15.5C98.0025 15.5 96.1699 14.6121 94.9594 13.3151C93.7419 12.0107 93.125 10.2617 93.125 8.5C93.125 6.73834 93.7419 4.98929 94.9594 3.68491C96.1699 2.38788 98.0025 1.5 100.5 1.5V0.5ZM33.5 30.8751C33.5 28.1227 32.5129 26.0177 30.9974 24.6033C29.4893 23.1956 27.4883 22.5 25.5 22.5C23.5117 22.5 21.5107 23.1956 20.0026 24.6033C18.4871 26.0177 17.5 28.1227 17.5 30.8751H18.5C18.5 28.3775 19.3879 26.5449 20.6849 25.3343C21.9893 24.1169 23.7383 23.5 25.5 23.5C27.2617 23.5 29.0107 24.1169 30.3151 25.3343C31.6121 26.5449 32.5 28.3775 32.5 30.8751H33.5ZM37.5 31C37.5 26.8716 36.0121 23.7351 33.7463 21.6334C31.488 19.5388 28.4874 18.5 25.5 18.5C22.5126 18.5 19.512 19.5388 17.2537 21.6334C14.9879 23.7351 13.5 26.8716 13.5 31H14.5C14.5 27.1284 15.8871 24.2649 17.9338 22.3666C19.988 20.4612 22.7374 19.5 25.5 19.5C28.2626 19.5 31.012 20.4612 33.0662 22.3666C35.1129 24.2649 36.5 27.1284 36.5 31H37.5ZM41.5 31C41.5 25.5364 39.5108 21.3994 36.4943 18.6316C33.4858 15.8711 29.4859 14.5 25.5 14.5C21.5141 14.5 17.5142 15.8711 14.5057 18.6316C11.4892 21.3994 9.5 25.5364 9.5 31H10.5C10.5 25.7969 12.3858 21.9339 15.1818 19.3684C17.9858 16.7956 21.7359 15.5 25.5 15.5C29.2641 15.5 33.0142 16.7956 35.8182 19.3684C38.6142 21.9339 40.5 25.7969 40.5 31H41.5ZM49.6601 17.7788C46.7638 11.906 37.73 12.0741 35.2037 18.3123L36.1305 18.6877C38.3249 13.2691 46.2396 13.1039 48.7633 18.2212L49.6601 17.7788ZM53.2658 15.9832C49.0735 7.30728 35.9162 7.33842 31.7906 16.0805L32.695 16.5073C36.4605 8.52801 48.5377 8.49705 52.3654 16.4183L53.2658 15.9832ZM27.9231 14.8049C27.8906 14.8816 27.8586 14.9588 27.8271 15.0365L28.7539 15.4121C28.7834 15.3393 28.8134 15.267 28.8438 15.1951L27.9231 14.8049ZM57.1798 14.8049C54.5451 8.58868 48.5282 5.5 42.5514 5.5C36.5746 5.5 30.5577 8.58868 27.9231 14.8049L28.8438 15.1951C31.2951 9.41132 36.9032 6.5 42.5514 6.5C48.1996 6.5 53.8077 9.41132 56.259 15.1951L57.1798 14.8049ZM66.5 30.8751C66.5 28.1227 65.5129 26.0177 63.9974 24.6033C62.4893 23.1956 60.4883 22.5 58.5 22.5C56.5117 22.5 54.5107 23.1956 53.0026 24.6033C51.4871 26.0177 50.5 28.1227 50.5 30.8751H51.5C51.5 28.3775 52.3879 26.5449 53.6849 25.3343C54.9893 24.1169 56.7383 23.5 58.5 23.5C60.2617 23.5 62.0107 24.1169 63.3151 25.3343C64.6121 26.5449 65.5 28.3775 65.5 30.8751H66.5ZM70.5 31C70.5 26.8716 69.0121 23.7351 66.7463 21.6334C64.488 19.5388 61.4874 18.5 58.5 18.5C55.5126 18.5 52.512 19.5388 50.2537 21.6334C47.9879 23.7351 46.5 26.8716 46.5 31H47.5C47.5 27.1284 48.8871 24.2649 50.9338 22.3666C52.988 20.4612 55.7374 19.5 58.5 19.5C61.2626 19.5 64.012 20.4612 66.0662 22.3666C68.1129 24.2649 69.5 27.1284 69.5 31H70.5ZM74.5 31C74.5 25.5364 72.5108 21.3994 69.4943 18.6316C66.4858 15.8711 62.4859 14.5 58.5 14.5C54.5141 14.5 50.5142 15.8711 47.5057 18.6316C44.4892 21.3994 42.5 25.5364 42.5 31H43.5C43.5 25.7969 45.3858 21.9339 48.1818 19.3684C50.9858 16.7956 54.7359 15.5 58.5 15.5C62.2641 15.5 66.0142 16.7956 68.8182 19.3684C71.6142 21.9339 73.5 25.7969 73.5 31H74.5ZM107.875 0.5C105.123 0.5 103.018 1.48712 101.603 3.00259C100.196 4.51071 99.5 6.51166 99.5 8.5C99.5 10.4883 100.196 12.4893 101.603 13.9974C103.018 15.5129 105.123 16.5 107.875 16.5V15.5C105.377 15.5 103.545 14.6121 102.334 13.3151C101.117 12.0107 100.5 10.2617 100.5 8.5C100.5 6.73834 101.117 4.98929 102.334 3.68491C103.545 2.38788 105.377 1.5 107.875 1.5V0.5ZM300 16.5C302.752 16.5 304.857 15.5129 306.272 13.9974C307.679 12.4893 308.375 10.4883 308.375 8.5C308.375 6.51166 307.679 4.51071 306.272 3.00259C304.857 1.48712 302.752 0.5 300 0.5V1.5C302.498 1.5 304.33 2.38788 305.541 3.68491C306.758 4.98929 307.375 6.73834 307.375 8.5C307.375 10.2617 306.758 12.0107 305.541 13.3151C304.33 14.6121 302.498 15.5 300 15.5V16.5ZM200 31.5C202.752 31.5 204.857 30.5129 206.272 28.9974C207.679 27.4893 208.375 25.4883 208.375 23.5C208.375 21.5117 207.679 19.5107 206.272 18.0026C204.857 16.4871 202.752 15.5 200 15.5V16.5C202.498 16.5 204.33 17.3879 205.541 18.6849C206.758 19.9893 207.375 21.7383 207.375 23.5C207.375 25.2617 206.758 27.0107 205.541 28.3151C204.33 29.6121 202.498 30.5 200 30.5V31.5ZM292 16.5C294.752 16.5 296.857 15.5129 298.272 13.9974C299.679 12.4893 300.375 10.4883 300.375 8.5C300.375 6.51166 299.679 4.51071 298.272 3.00259C296.857 1.48712 294.752 0.5 292 0.5V1.5C294.498 1.5 296.33 2.38788 297.541 3.68491C298.758 4.98929 299.375 6.73834 299.375 8.5C299.375 10.2617 298.758 12.0107 297.541 13.3151C296.33 14.6121 294.498 15.5 292 15.5V16.5ZM192 31.5C194.752 31.5 196.857 30.5129 198.272 28.9974C199.679 27.4893 200.375 25.4883 200.375 23.5C200.375 21.5117 199.679 19.5107 198.272 18.0026C196.857 16.4871 194.752 15.5 192 15.5V16.5C194.498 16.5 196.33 17.3879 197.541 18.6849C198.758 19.9893 199.375 21.7383 199.375 23.5C199.375 25.2617 198.758 27.0107 197.541 28.3151C196.33 29.6121 194.498 30.5 192 30.5V31.5ZM249.5 14C249.5 14.8284 248.828 15.5 248 15.5V16.5C249.381 16.5 250.5 15.3807 250.5 14H249.5ZM248 15.5C247.172 15.5 246.5 14.8284 246.5 14H245.5C245.5 15.3807 246.619 16.5 248 16.5V15.5ZM246.5 14C246.5 13.1716 247.172 12.5 248 12.5V11.5C246.619 11.5 245.5 12.6193 245.5 14H246.5ZM248 12.5C248.828 12.5 249.5 13.1716 249.5 14H250.5C250.5 12.6193 249.381 11.5 248 11.5V12.5ZM247.5 14.5C247.356 14.5 247.166 14.5142 247.001 14.6027C246.91 14.652 246.795 14.7415 246.73 14.8925C246.661 15.049 246.676 15.2015 246.713 15.3144C246.777 15.5064 246.924 15.6373 247.014 15.7088C247.124 15.7951 247.257 15.875 247.401 15.9472C247.974 16.2335 248.926 16.5 250 16.5V15.5C249.074 15.5 248.276 15.2665 247.849 15.0528C247.743 15 247.673 14.9549 247.634 14.924C247.576 14.8784 247.629 14.8999 247.662 14.9981C247.684 15.0642 247.698 15.1737 247.646 15.2921C247.597 15.405 247.516 15.4612 247.475 15.4832C247.413 15.517 247.394 15.5 247.5 15.5V14.5ZM249 14C249 14.2414 248.995 14.8402 249.228 15.3845C249.349 15.6662 249.541 15.9526 249.845 16.1667C250.152 16.383 250.538 16.5 251 16.5L251 15.5C250.712 15.5 250.535 15.4295 250.421 15.3489C250.303 15.2662 250.214 15.1462 250.147 14.9905C250.005 14.6598 250 14.2586 250 14H249Z');
}

.cloud2 {
    left: 400px;
    width: 400px;
    height: 50px;
    transform-origin: 0 0;
    transform: scale(1.3);
    background-image:linear-gradient(to right,#028bd4,#9dffd8);
    background-size: 600% 600%;
    animation: gradientBG 8s ease infinite;
    user-select: none;
    clip-path: path('M52 0.5C51.7239 0.5 51.5 0.723858 51.5 1C51.5 1.27614 51.7239 1.5 52 1.5V0.5ZM1 30.5C0.723858 30.5 0.5 30.7239 0.5 31C0.5 31.2761 0.723858 31.5 1 31.5V30.5ZM350.875 31.5C351.151 31.5 351.375 31.2761 351.375 31C351.375 30.7239 351.151 30.5 350.875 30.5V31.5ZM273.383 15L272.923 14.8049L272.923 14.8049L273.383 15ZM306.093 15L305.633 14.8049L305.633 14.8049L306.093 15ZM362 31.5C362.276 31.5 362.5 31.2761 362.5 31C362.5 30.7239 362.276 30.5 362 30.5V31.5ZM52 1.5H252V0.5H52V1.5ZM1 31.5H101V30.5H1V31.5ZM52 16.5H102V15.5H52V16.5ZM52.5002 0.5C49.7477 0.5 47.6428 1.48712 46.2283 3.00259C44.8207 4.51071 44.125 6.51166 44.125 8.5C44.125 10.4883 44.8207 12.4893 46.2283 13.9974C47.6428 15.5129 49.7477 16.5 52.5002 16.5V15.5C50.0025 15.5 48.1699 14.6121 46.9594 13.3151C45.7419 12.0107 45.125 10.2617 45.125 8.5C45.125 6.73834 45.7419 4.98929 46.9594 3.68491C48.1699 2.38788 50.0025 1.5 52.5002 1.5V0.5ZM21.8751 0.5C19.1227 0.5 17.0177 1.48712 15.6033 3.00259C14.1956 4.51071 13.5 6.51166 13.5 8.5C13.5 10.4883 14.1956 12.4893 15.6033 13.9974C17.0177 15.5129 19.1227 16.5 21.8751 16.5V15.5C19.3775 15.5 17.5449 14.6121 16.3343 13.3151C15.1169 12.0107 14.5 10.2617 14.5 8.5C14.5 6.73834 15.1169 4.98929 16.3343 3.68491C17.5449 2.38788 19.3775 1.5 21.8751 1.5V0.5ZM21.6249 16.5C24.3773 16.5 26.4823 15.5129 27.8967 13.9974C29.3044 12.4893 30 10.4883 30 8.5C30 6.51166 29.3044 4.51071 27.8967 3.00259C26.4823 1.48712 24.3773 0.5 21.6249 0.5V1.5C24.1225 1.5 25.9551 2.38788 27.1657 3.68491C28.3831 4.98929 29 6.73834 29 8.5C29 10.2617 28.3831 12.0107 27.1657 13.3151C25.9551 14.6121 24.1225 15.5 21.6249 15.5V16.5ZM59.8751 0.5C57.1227 0.5 55.0177 1.48712 53.6033 3.00259C52.1956 4.51071 51.5 6.51166 51.5 8.5C51.5 10.4883 52.1956 12.4893 53.6033 13.9974C55.0177 15.5129 57.1227 16.5 59.8751 16.5V15.5C57.3775 15.5 55.5449 14.6121 54.3343 13.3151C53.1169 12.0107 52.5 10.2617 52.5 8.5C52.5 6.73834 53.1169 4.98929 54.3343 3.68491C55.5449 2.38788 57.3775 1.5 59.8751 1.5V0.5ZM101 31.5C103.752 31.5 105.857 30.5129 107.272 28.9974C108.679 27.4893 109.375 25.4883 109.375 23.5C109.375 21.5117 108.679 19.5107 107.272 18.0026C105.857 16.4871 103.752 15.5 101 15.5V16.5C103.498 16.5 105.33 17.3879 106.541 18.6849C107.758 19.9893 108.375 21.7383 108.375 23.5C108.375 25.2617 107.758 27.0107 106.541 28.3151C105.33 29.6121 103.498 30.5 101 30.5V31.5ZM93 31.5C95.7524 31.5 97.8574 30.5129 99.2719 28.9974C100.679 27.4893 101.375 25.4883 101.375 23.5C101.375 21.5117 100.679 19.5107 99.2719 18.0026C97.8574 16.4871 95.7524 15.5 93 15.5V16.5C95.4977 16.5 97.3302 17.3879 98.5408 18.6849C99.7583 19.9893 100.375 21.7383 100.375 23.5C100.375 25.2617 99.7583 27.0107 98.5408 28.3151C97.3302 29.6121 95.4977 30.5 93 30.5V31.5ZM350.875 30.5H159.875V31.5H350.875V30.5ZM159.875 30.5H151.875V31.5H159.875V30.5ZM151.875 30.5H150.875V31.5H151.875V30.5ZM251.875 15.5H251.375V16.5H251.875V15.5ZM251.375 15.5H244V16.5H251.375V15.5ZM244 15.5H159.875V16.5H244V15.5ZM159.875 15.5H151.875V16.5H159.875V15.5ZM251.375 1.5C253.873 1.5 255.705 2.38788 256.916 3.68491C258.133 4.98929 258.75 6.73834 258.75 8.5C258.75 10.2617 258.133 12.0107 256.916 13.3151C255.705 14.6121 253.873 15.5 251.375 15.5V16.5C254.127 16.5 256.232 15.5129 257.647 13.9974C259.054 12.4893 259.75 10.4883 259.75 8.5C259.75 6.51166 259.054 4.51071 257.647 3.00259C256.232 1.48712 254.127 0.5 251.375 0.5V1.5ZM244 1.5C246.498 1.5 248.33 2.38788 249.541 3.68491C250.758 4.98929 251.375 6.73834 251.375 8.5C251.375 10.2617 250.758 12.0107 249.541 13.3151C248.33 14.6121 246.498 15.5 244 15.5V16.5C246.752 16.5 248.857 15.5129 250.272 13.9974C251.679 12.4893 252.375 10.4883 252.375 8.5C252.375 6.51166 251.679 4.51071 250.272 3.00259C248.857 1.48712 246.752 0.5 244 0.5V1.5ZM151.875 30.5C149.377 30.5 147.545 29.6121 146.334 28.3151C145.117 27.0107 144.5 25.2617 144.5 23.5C144.5 21.7383 145.117 19.9893 146.334 18.6849C147.545 17.3879 149.377 16.5 151.875 16.5V15.5C149.123 15.5 147.018 16.4871 145.603 18.0026C144.196 19.5107 143.5 21.5117 143.5 23.5C143.5 25.4883 144.196 27.4893 145.603 28.9974C147.018 30.5129 149.123 31.5 151.875 31.5V30.5ZM159.875 30.5C157.377 30.5 155.545 29.6121 154.334 28.3151C153.117 27.0107 152.5 25.2617 152.5 23.5C152.5 21.7383 153.117 19.9893 154.334 18.6849C155.545 17.3879 157.377 16.5 159.875 16.5V15.5C157.123 15.5 155.018 16.4871 153.603 18.0026C152.196 19.5107 151.5 21.5117 151.5 23.5C151.5 25.4883 152.196 27.4893 153.603 28.9974C155.018 30.5129 157.123 31.5 159.875 31.5V30.5ZM278.5 30.8751C278.5 28.1227 277.513 26.0177 275.997 24.6033C274.489 23.1956 272.488 22.5 270.5 22.5C268.512 22.5 266.511 23.1956 265.003 24.6033C263.487 26.0177 262.5 28.1227 262.5 30.8751H263.5C263.5 28.3775 264.388 26.5449 265.685 25.3343C266.989 24.1169 268.738 23.5 270.5 23.5C272.262 23.5 274.011 24.1169 275.315 25.3343C276.612 26.5449 277.5 28.3775 277.5 30.8751H278.5ZM282.5 31C282.5 26.8716 281.012 23.7351 278.746 21.6334C276.488 19.5388 273.487 18.5 270.5 18.5C267.513 18.5 264.512 19.5388 262.254 21.6334C259.988 23.7351 258.5 26.8716 258.5 31H259.5C259.5 27.1284 260.887 24.2649 262.934 22.3666C264.988 20.4612 267.737 19.5 270.5 19.5C273.263 19.5 276.012 20.4612 278.066 22.3666C280.113 24.2649 281.5 27.1284 281.5 31H282.5ZM286.5 31C286.5 25.5364 284.511 21.3994 281.494 18.6316C278.486 15.8711 274.486 14.5 270.5 14.5C266.514 14.5 262.514 15.8711 259.506 18.6316C256.489 21.3994 254.5 25.5364 254.5 31H255.5C255.5 25.7969 257.386 21.9339 260.182 19.3684C262.986 16.7956 266.736 15.5 270.5 15.5C274.264 15.5 278.014 16.7956 280.818 19.3684C283.614 21.9339 285.5 25.7969 285.5 31H286.5ZM294.66 17.7788C291.764 11.906 282.73 12.0741 280.204 18.3123L281.131 18.6877C283.325 13.2691 291.24 13.1039 293.763 18.2212L294.66 17.7788ZM298.266 15.9832C294.073 7.30728 280.916 7.33842 276.791 16.0805L277.695 16.5073C281.461 8.52801 293.538 8.49705 297.365 16.4183L298.266 15.9832ZM272.923 14.8049C272.891 14.8817 272.859 14.9589 272.827 15.0365L273.754 15.4121C273.783 15.3393 273.813 15.2669 273.844 15.1951L272.923 14.8049ZM302.18 14.8049C299.545 8.58868 293.528 5.5 287.551 5.5C281.575 5.5 275.558 8.58868 272.923 14.8049L273.844 15.1951C276.295 9.41132 281.903 6.5 287.551 6.5C293.2 6.5 298.808 9.41132 301.259 15.1951L302.18 14.8049ZM327.37 17.7788C324.473 11.906 315.439 12.0741 312.913 18.3123L313.84 18.6877C316.034 13.2691 323.949 13.1039 326.473 18.2212L327.37 17.7788ZM330.975 15.9832C326.783 7.30728 313.626 7.33842 309.5 16.0805L310.404 16.5073C314.17 8.52801 326.247 8.49705 330.075 16.4183L330.975 15.9832ZM305.633 14.8049C305.6 14.8817 305.568 14.9589 305.537 15.0365L306.463 15.4121C306.493 15.3393 306.523 15.2669 306.553 15.1951L305.633 14.8049ZM334.889 14.8049C332.255 8.58868 326.238 5.5 320.261 5.5C314.284 5.5 308.267 8.58868 305.633 14.8049L306.553 15.1951C309.005 9.41132 314.613 6.5 320.261 6.5C325.909 6.5 331.517 9.41132 333.969 15.1951L334.889 14.8049ZM311.5 30.8751C311.5 28.1227 310.513 26.0177 308.997 24.6033C307.489 23.1956 305.488 22.5 303.5 22.5C301.512 22.5 299.511 23.1956 298.003 24.6033C296.487 26.0177 295.5 28.1227 295.5 30.8751H296.5C296.5 28.3775 297.388 26.5449 298.685 25.3343C299.989 24.1169 301.738 23.5 303.5 23.5C305.262 23.5 307.011 24.1169 308.315 25.3343C309.612 26.5449 310.5 28.3775 310.5 30.8751H311.5ZM315.5 31C315.5 26.8716 314.012 23.7351 311.746 21.6334C309.488 19.5388 306.487 18.5 303.5 18.5C300.513 18.5 297.512 19.5388 295.254 21.6334C292.988 23.7351 291.5 26.8716 291.5 31H292.5C292.5 27.1284 293.887 24.2649 295.934 22.3666C297.988 20.4612 300.737 19.5 303.5 19.5C306.263 19.5 309.012 20.4612 311.066 22.3666C313.113 24.2649 314.5 27.1284 314.5 31H315.5ZM319.5 31C319.5 25.5364 317.511 21.3994 314.494 18.6316C311.486 15.8711 307.486 14.5 303.5 14.5C299.514 14.5 295.514 15.8711 292.506 18.6316C289.489 21.3994 287.5 25.5364 287.5 31H288.5C288.5 25.7969 290.386 21.9339 293.182 19.3684C295.986 16.7956 299.736 15.5 303.5 15.5C307.264 15.5 311.014 16.7956 313.818 19.3684C316.614 21.9339 318.5 25.7969 318.5 31H319.5ZM344.5 30.8751C344.5 28.1227 343.513 26.0177 341.997 24.6033C340.489 23.1956 338.488 22.5 336.5 22.5C334.512 22.5 332.511 23.1956 331.003 24.6033C329.487 26.0177 328.5 28.1227 328.5 30.8751H329.5C329.5 28.3775 330.388 26.5449 331.685 25.3343C332.989 24.1169 334.738 23.5 336.5 23.5C338.262 23.5 340.011 24.1169 341.315 25.3343C342.612 26.5449 343.5 28.3775 343.5 30.8751H344.5ZM348.5 31C348.5 26.8716 347.012 23.7351 344.746 21.6334C342.488 19.5388 339.487 18.5 336.5 18.5C333.513 18.5 330.512 19.5388 328.254 21.6334C325.988 23.7351 324.5 26.8716 324.5 31H325.5C325.5 27.1284 326.887 24.2649 328.934 22.3666C330.988 20.4612 333.737 19.5 336.5 19.5C339.263 19.5 342.012 20.4612 344.066 22.3666C346.113 24.2649 347.5 27.1284 347.5 31H348.5ZM352.5 31C352.5 25.5364 350.511 21.3994 347.494 18.6316C344.486 15.8711 340.486 14.5 336.5 14.5C332.514 14.5 328.514 15.8711 325.506 18.6316C322.489 21.3994 320.5 25.5364 320.5 31H321.5C321.5 25.7969 323.386 21.9339 326.182 19.3684C328.986 16.7956 332.736 15.5 336.5 15.5C340.264 15.5 344.014 16.7956 346.818 19.3684C349.614 21.9339 351.5 25.7969 351.5 31H352.5ZM351 31.5H362V30.5H351V31.5Z');
}

.wave1 {
    position: absolute;
    left: -280px;
    bottom: 0;
    z-index: 8;
    width: 1500px;
    height: 80px;
    background-color: #00657F;
    transform: translateX(280px);
    clip-path: path('M0 30.24C0 30.24 31 9.24 66 30.24C101 51.24 110 52.24 150.5 30.24C191 8.23998 196 3.74002 241 30.24C286 56.74 293 80.24 386.5 30.24C480 -19.76 499 22.7401 534 30.24C569 37.7399 574 86.24 669.5 30.24C765 -25.76 868 9.24006 913 30.24C958 51.2399 933.5 6.24004 983 30.24C1032.5 54.24 1036 -1.75996 1103.5 30.24C1171 62.24 1189 63.74 1241 30.24C1293 -3.26004 1266.5 -4.25996 1370.5 30.24C1474.5 64.74 1500 30.24 1500 30.24V110.24H0V30.24Z');
}

.wave2 {
    position: absolute;
    left: -280px;
    bottom: 20px;
    z-index: 7;
    width: 1500px;
    height: 80px;
    background-color: #358B9E;
    clip-path: path('M0 29.2513C0 29.2513 3 1.0026 66 29.2513C129 57.5 93 7 150.5 29.2513C208 51.5026 165.5 2.0026 241 29.2513C316.5 56.5 277 1.5 386.5 29.2513C496 57.0026 534 29.2513 534 29.2513C534 29.2513 559 -13.5 669.5 29.2513C780 72.0026 861 -11.7487 913 29.2513C965 70.2513 955.663 29.2513 983 29.2513C1030.06 29.2513 1061.5 46.7513 1103.5 29.2513C1145.5 11.7513 1179 -26.7487 1241 29.2513C1303 85.2513 1299 -10.7487 1370.5 29.2513C1442 69.2513 1500 29.2513 1500 29.2513V109.251H0V29.2513Z');
}

.wave3 {
    position: absolute;
    left: -280px;
    bottom: 40px;
    z-index: 6;
    width: 1500px;
    height: 80px;
    background-color: #379FBB;
    clip-path: path('M0 27.2514C0 27.2514 6.5 53.0027 66 27.2514C125.5 1.50006 125.5 1.50006 150.5 27.2514C175.5 53.0027 200 7.00006 241 27.2514C282 47.5027 344.5 43.0001 386.5 27.2514C428.5 11.5027 447 57.5001 534 27.2514C621 -2.99734 617.5 39.5001 669.5 27.2514C696.213 20.9591 780.5 46.2516 800 15.3758C819.5 -15.5 893.792 17.8896 913 27.2514C952.5 46.5027 937 39.5027 983 27.2514C1029 15.0001 1070.5 12.5027 1103.5 27.2514C1136.5 42 1198.5 59 1241 27.2514C1283.5 -4.4973 1299 -12.7486 1370.5 27.2514C1442 67.2513 1500 27.2514 1500 27.2514V107.251H0V27.2514Z');
}

.wave4 {
    position: absolute;
    left: -280px;
    bottom: 50px;
    z-index: 5;
    width: 1500px;
    height: 80px;
    background-color: #5CCFE0;
    clip-path: path('M0 18.6632C0 18.6632 38 30.5388 66 18.6632C94 6.78765 116.5 6.78765 150.5 18.6632C184.5 30.5388 200 -1.58808 241 18.6632C282 38.9145 351 42.2487 393 26.5C435 10.7513 500 46.8265 534 18.6632C568 -9.50001 633.5 18.6632 669.5 18.6632C705.5 18.6632 744.5 -12.9247 800 6.78765C855.5 26.5 862.5 30.5388 913 18.6632C963.5 6.78765 934.5 0.499987 983 18.6632C1031.5 36.8265 1070.5 3.91459 1103.5 18.6632C1136.5 33.4119 1198.5 50.4119 1241 18.6632C1283.5 -13.0854 1337.5 30.5388 1370.5 18.6632C1403.5 6.78766 1500 18.6632 1500 18.6632V98.6632H0V18.6632Z');
}

.ship {
    position: absolute;
    left: 200px;
    bottom: 45px;
    z-index: 6;
    width: 80px;
    height: 58px;
}

.rollship {
    width: 80px;
    height: 58px;
    background-image: url(../../assets/icon/ship.svg);
    background-repeat: no-repeat;
    transform-origin: center center;
    animation: rollship 5s linear infinite;
}

.lighter {
    position: absolute;
    right: -220px;
    bottom: -30px;
    z-index: 4;
    width: 600px;
    height: 400px;
    background-image: url(../../assets/icon/lighter.svg);
    background-repeat: no-repeat;
    scale:0.5;
}

.topicon {
    transition: all .2s ease-in-out;
    transform-origin:center center;
}

.topicon:hover {
    transform: scale(1.8);
}
</style>