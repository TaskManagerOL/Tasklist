<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute();
const $router = useRouter()
const routerlink = (val) => {
    $router.push({name:val});
}
import axios from 'axios';
let DataClass = JSON.parse(localStorage.getItem("mainData"));

//绘制正弦波浪canvas
const wave = ref('')
const canvasWidth = ref(1920)
const canvasHeight = ref(800)
//构建一个结构体 方便后期绘制多条正弦曲线
class Line {
    constructor (a, b, c, d, z, start, end, gap) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d  //以上四个控制正弦函数振幅周期之类的
        this.z = z  //三维坐标
        this.start = start //绘画开始点
        this.end = end  //绘画结束点
        this.gap = gap //间距
        this.pointList = []
        this.computePointList()
    }
    computePointList () {
        this.pointList = []
        for (let i = this.start; i <= this.end; i = i + this.gap) {
            let x = i
            let y = this.a * Math.sin((this.b * x + this.c) / 180 * Math.PI) + this.d   // 即y = A sin(ωx + φ) + B
            let offset = i //偏移量用来让他运动
            this.pointList.push({
                x,
                y,
                z: this.z,
                originX: x,
                offset
            })
        }
    }
}
const lineList = [
    new Line(20, 2, 0, 0, -390, -300, 300, 10),
    new Line(20, 2, 0, 0, -360, -300, 300, 10),
    new Line(20, 2, 0, 0, -330, -300, 300, 10),
    new Line(20, 2, 0, 0, -300, -300, 300, 10),
    new Line(20, 2, 0, 0, -270, -300, 300, 10),
    new Line(20, 2, 0, 0, -240, -300, 300, 10),
    new Line(20, 2, 0, 0, -210, -300, 300, 10),
    new Line(20, 2, 0, 0, -180, -300, 300, 10),
    new Line(20, 2, 0, 0, -150, -300, 300, 10),
    new Line(20, 2, 0, 0, -120, -300, 300, 10),
    new Line(20, 2, 0, 0, -90, -300, 300, 10),
    new Line(20, 2, 0, 0, -60, -300, 300, 10),
    new Line(20, 2, 0, 0, -30, -300, 300, 10),
    new Line(20, 2, 0, 0, 0, -300, 300, 10),
    new Line(20, 2, 0, 0, 30, -300, 300, 10),
    new Line(20, 2, 0, 0, 60, -300, 300, 10),
    new Line(20, 2, 0, 0, 90, -300, 300, 10),
    new Line(20, 2, 0, 0, 120, -300, 300, 10),
    new Line(20, 2, 0, 0, 150, -300, 300, 10),
    new Line(20, 2, 0, 0, 180, -300, 300, 10),
    new Line(20, 2, 0, 0, 210, -300, 300, 10),
    new Line(20, 2, 0, 0, 240, -300, 300, 10),
    new Line(20, 2, 0, 0, 270, -300, 300, 10),
    new Line(20, 2, 0, 0, 300, -300, 300, 10),
    
]//整个类的列表出来

const draw = (visual) => { //这是个绘制正弦点的函数
    const context = wave.value.getContext("2d");
    context.clearRect(0, 0, canvasWidth.value, canvasHeight.value) //清空像素
    lineList.forEach(line => {
        line.pointList.forEach(item => {
            const pointSize = 1.5 * visual.z / (visual.z - item.z) //整个近大远小
            context.beginPath()
            context.arc(item.canvasX  + canvasWidth.value / 2, item.canvasY  + canvasHeight.value / 2, pointSize, 0, 2 * Math.PI) //arc(x, y, radius, startAngle, endAngle, counterclockwise);
            context.closePath()
            context.fill()
        })
    })
}
const updatePointList = (rotationAngleSpeed, visual) => { //这是个更新点的位置而使正弦函数移动的函数
    lineList.forEach(line => {
        line.pointList.forEach(item => {
            let x = item.x
            let z = item.z
            item.x = x * Math.cos(rotationAngleSpeed / 180 * Math.PI) - z * Math.sin(rotationAngleSpeed / 180 * Math.PI) 
            item.z = z * Math.cos(rotationAngleSpeed / 180 * Math.PI) + x * Math.sin(rotationAngleSpeed / 180 * Math.PI) 
            item.y = line.a * Math.sin((line.b * item.originX + line.c + item.offset) / 180 * Math.PI) + line.d //绕y轴旋转所以y比较特别
            item.canvasX = (item.x - visual.x) * visual.z / (visual.z - z)
            item.canvasY = (item.y - visual.y) * visual.z / (visual.z - z)
            })
    })
}

const animationFrame = (visual) => { //正弦函数动画
    window.requestAnimationFrame(() => {
        lineList.forEach((line,index) => {
            line.pointList.forEach(item => {
            line.c = item.offset + index * 30 //index控制偏移量更美观
            item.offset = item.offset + 1
            })
            updatePointList(.003,visual)
        })
        draw(visual)
        animationFrame(visual)
    })
}
//监听canvas标签创建、因为JS比标签创建更快，所以需要监听。
watch(wave, (newValue, oldValue) => {
    const visual = { //观察点设置
        x: 0,
        y: -70,
        z: 500
    }
    draw(visual);
    animationFrame(visual)
})

const land = ref(1) //用于检测是注册还是登录
const fontColor = (val) => { //修改相应样式
    return  (val==land.value)? "color:#4698db" : "color:#000000"
}

//写点正则判断
const userID = ref('') //IDv-model绑定
const password = ref('') //Passwordv-model绑定
const tel = ref('') //号码v-model绑定
const Num = ref('') //验证码v-model绑定

//表单第一次点击后才会触发表单验证
const IDpoint = ref(0)
const Pswpoint = ref(0)
const telpoint = ref(0)
const Numpoint = ref(0)

const emoji = reactive(['right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;','right:-40px;visibility: hidden;opacity: 0;']) //错误icon原始状态
const patternForID = /^[1-9]([0-9]{4,10})$/ //账号正则判断
const patternForPsw = /^[A-Za-z0-9~]+$/ //密码正则判断
const patternForTel = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/ //手机号严谨判断
const patternForNum = /^[A-Za-z0-9]{4}$/ //验证码正则判断

//整个会逃跑的按钮玩玩
const runningButton = ref('')
const runButton = ref('margin-left:0px;margin-right:0px;background-color:#7fd6f5;')

const testNow = () => {
    (!patternForID.test(userID.value) && IDpoint.value == 1) ? emoji[0] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[0] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForPsw.test(password.value) && Pswpoint.value == 1) ? emoji[1] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[1] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForTel.test(tel.value) && telpoint.value == 1) ? emoji[2] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[2] = 'right:-40px;visibility: hidden;opacity: 0;';
    (!patternForNum.test(Num.value) && Numpoint.value == 1) ? emoji[3] = 'right:-40px;visibility: visible;opacity: 1;' : emoji[3] = 'right:-40px;visibility: hidden;opacity: 0;';
    ((patternForTel.test(tel.value) && patternForNum.test(Num.value) && land.value == 0)||(patternForID.test(userID.value) && patternForPsw.test(password.value) && land.value == 1)) ? runButton.value = 'margin-left:0px;margin-right:0px;background-color:#4698db;cursor:pointer' : runButton.value = 'margin-left:0px;margin-right:0px;background-color:#7fd6f5;';
}

const SignIn = () => {
    axios.post("http://localhost:3000/login/cellphone", { "phone": userID.value, "password": password.value }).then(response => {
        console.log(response.data);
        DataClass.time.userID = response.data.profile.nickname
        DataClass.time.primeID = response.data.account.id
        localStorage.setItem("mainData", JSON.stringify(DataClass));
        routerlink("HOME")
    }, error => {
        console.log('错误', error.message)
    })
}
</script>

<template>
    <div class="main">
        <!-- canvas部分 -->
        <canvas class="" ref="wave" :width="canvasWidth" :height="canvasHeight"></canvas>
        <div class="signDiv" id="signDiv">
            <!-- 返回按钮 -->
            <div class="absolute right-10 top-6 text-2xl cursor-pointer" title="返回" @click="routerlink('HOME')"><i class="iconfont">&#xe72e;</i></div>
            <div class="flex items-center w-full h-full">
                <!-- 左边部分 -->
                <div class="flex flex-col justify-center items-center px-10 " style="user-select:none;border-color:rgba(230, 230, 230)" id="phonehidden">
                    <p class="text-2xl">移动端使用</p>
                    <div class="h-2/5 py-10" id="phonehidden">
                        <div style="height:250px;width:250px" id="icon"></div>
                    </div>
                    <div class="text-2xl absolute bottom-[50px]" id="phonehidden">
                        <vuetyped :strings="['你好','欢迎使用Tasklist','一个任务清单平台','不使用登录功能的话','您的所有日程将被存储在本地','请勿将重要日程写入TaskList','玩得开心😶‍🌫️']" :loop="true" :smart-backspace="true">
                            <div class="typing" />
                        </vuetyped>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="border-r-2 border-solid" style="height:230px;user-select:none;border-color:rgba(230, 230, 230)" id="phonehidden"></div>
                <!-- 右边部分 -->
                <div class="flex flex-col justify-center items-center w-full px-10" style="user-select:none;">
                    <!-- 右上部分 -->
                    <div class="h-1/5 text-2xl flex">
                        <div class="mx-6 cursor-pointer" @click="land=1,testNow()" :style="fontColor(1)">密码登录</div>
                        <div class="border-r-2 border-solid border-slate-500"></div>
                        <div class="mx-6 cursor-pointer" @click="land=0,testNow()" :style="fontColor(0)">快速注册</div>
                    </div>
                    <!-- 表单部分 -->
                    <div v-if="land" class="m-5 w-full flex justify-center">
                        <form class="flex flex-col" action="">
                            <div class="flex items-center relative">
                                <div class="flex rounded-t-xl" style="width:450px;height:50px;border:1px solid #adadad;background-color:rgba(224, 224, 224,.8)">
                                    <label for="账号" class="py-3 px-6" style="width:100px">账号</label>
                                    <input v-model="userID" @focus="IDpoint=1" @keyup="testNow()" class="h-full w-full focus:outline-0" style="background-color:rgba(224, 224, 224,0)" name="账号" type="text" placeholder="请输入账号">
                                </div> 
                                <el-tooltip content="账号为4~10位的数字哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[0]" >😭</div>
                                </el-tooltip>
                            </div>
                            <div class="flex items-center relative">
                                <div class="flex justify-between rounded-b-xl" style="width:450px;height:50px;border:1px solid #adadad;background-color:rgba(224, 224, 224,.8);border-top:0;">
                                    <label for="密码" class="py-3 px-6" style="width:100px">密码</label>
                                    <input v-model="password" @focus="Pswpoint=1" @keyup="testNow()" class="h-full focus:outline-0" style="width: 300px;background-color:rgba(224, 224, 224,0)" name="密码" type="password" placeholder="请输入密码">
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
                                <div class="flex justify-between rounded-t-xl" style="width:450px;height:50px;border:1px solid #adadad;background-color:rgba(224, 224, 224,.8)">
                                    <label for="账号" class="py-3 px-6" style="width:120px">手机</label>
                                    <input class="h-full w-full focus:outline-0"  v-model="tel" @focus="telpoint=1" @keyup="testNow()" style="width: 300px;background-color:rgba(224, 224, 224,0)" name="号码" type="text" placeholder="请输入手机号">
                                    <div class="py-3 px-4 cursor-pointer" style="width:150px;color:#4698db;" @click="telpoint=1,Numpoint=0,testNow()">获取验证码</div>
                                </div> 
                                <el-tooltip content="请输入正确的电话号码哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[2]" >😭</div>
                                </el-tooltip>
                            </div>
                            <div class="flex items-center relative">
                                <div class="flex rounded-b-xl" style="width:450px;height:50px;border:1px solid #adadad;background-color:rgba(224, 224, 224,.8);border-top:0;">
                                    <label for="验证码" class="py-3" style="width:130px">验证码</label>
                                    <input class="h-full w-full focus:outline-0"  v-model="Num" @focus="Numpoint=1" @keyup="testNow()" style="background-color:rgba(224, 224, 224,0)" name="验证码" type="text" placeholder="请输入验证码">
                                </div>
                                <el-tooltip content="验证码为四位数哦" placement="bottom">
                                    <div class="absolute transition-all" :style="emoji[3]">😭</div>
                                </el-tooltip>
                            </div>
                        </form>
                    </div>
                    <!-- 登录按钮部分 -->
                    <div class="flex items-center justify-center pb-3">
                        <div class="subbmitButton" ref="runningButton" :style="runButton" @click="SignIn()">登录</div>
                    </div>
                    <!-- 多方式登录部分 -->
                    <div class="flex flex-col" style="font-size:14px;color:#213547">
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
                    </div>
                    <!-- 隐私政策提醒部分 -->
                    <div class="flex flex-col pt-8" style="font-size:13px;">
                        <div class="flex w-full justify-center">未注册过Tasklist的手机号，我们将自动帮你注册账号</div>
                        <div class="flex w-full justify-center">
                            <p>登录或完成注册即代表你同意</p>
                            <div class="px-1 cursor-pointer" style="color:#4698db">用户协议</div>
                            <p>和</p>
                            <div class="px-1 cursor-pointer" style="color:#4698db">隐私政策</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media screen and (orientation:portrait) {
    #icon { width: 0;opacity: 0;padding: 0; }
	#phonehidden { width: 0;opacity: 0;padding: 0; }
    #signDiv { width:480px }
}

/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4008251 */
  src: url('//at.alicdn.com/t/c/font_4008251_xc2hwtymsts.woff2?t=1689927116115') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_xc2hwtymsts.woff?t=1689927116115') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_xc2hwtymsts.ttf?t=1689927116115') format('truetype');
}

.iconfont{
    
    font-family:"iconfont" !important;
    font-size:24px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
   
}

.subbmitButton {
    color: #ffffff;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width:160px;
    height:45px;
    transition: all .2s ease-in-out;
}

#icon {
    user-select: none;
    -webkit-user-drag: none;
    transition: all .5s ease-in-out;
    background-image: url(/tasklist.png);
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
}

#icon:hover {
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

::v-deep .el-input__inner{
    color: #2d4051!important;
    height: 45px;
}

::v-deep .el-select {
  --el-select-input-focus-border-color: none !important;
}
::v-deep .el-input__wrapper {
  box-shadow: none !important;
}
::v-deep  .el-select .el-input.is-focus .el-input__wrapper {
  box-shadow: none !important;
}
::v-deep  .el-select .el-input__wrapper.is-focus {
  box-shadow: none !important;
}
::v-deep  .el-select:hover:not(.el-select--disabled) .el-input__wrapper {
  box-shadow: none !important;
}

body {
    padding: 0;
    margin: 0;
}

.main {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #e0e0e0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signDiv {
    position: absolute;
    width: 1000px;
    height: 480px;
    border-radius: 50px;
    background: rgba(224, 224, 224,.8);
    box-shadow:  35px 35px 70px #bebebe,
                -35px -35px 70px #ffffff;
    overflow:hidden;
}
</style>