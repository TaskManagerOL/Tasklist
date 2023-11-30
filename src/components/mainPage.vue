<script setup>
import clock from './views/clock.vue'
import loading from './Special/loading.vue'
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
import { events } from '../../EventBus/EventBus';
//写个F12小彩蛋吧
console.log(String.raw`
 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 ▒          /▒\    \                                             _____                    _____             ▒
 ▒         /▒▒▒\    \                                           /\    \                  /\    \            ▒
 ▒          \▒▒▒\    \                                         /▒▒\    \                /▒▒\    \           ▒
 ▒           \▒▒▒\    \              ___________              /▒▒▒▒\    \              /▒▒▒▒\    \          ▒
 ▒            \▒▒▒\    \            /▒▒▒▒▒▒\    \            /▒▒▒▒▒▒\    \            /▒▒▒▒▒▒\____\         ▒
 ▒             \▒▒▒\    \          /▒▒▒▒▒▒▒▒\    \          /▒▒▒/\▒▒▒\    \          /▒▒▒▒▒▒▒/    /         ▒
 ▒              \▒▒▒\    \        /▒▒▒▒▒/\▒▒▒\    \        /▒▒▒/  \▒▒▒\    \        /▒▒▒▒▒▒▒/    /          ▒
 ▒              /▒▒▒▒\    \      /▒▒▒▒▒/__\▒▒▒\    \       \▒▒▒\   \▒▒▒\    \      /▒▒▒▒▒▒▒/    /           ▒
 ▒             /▒▒▒▒▒▒\    \    /▒▒▒▒▒▒\   \▒▒▒\    \    ___\▒▒▒\   \▒▒▒\    \    /▒▒▒▒▒▒▒/    /            ▒
 ▒            /▒▒▒/\▒▒▒\    \  /▒▒▒▒▒▒▒▒\   \▒▒▒\____\  /\   \▒▒▒\   \▒▒▒\    \  /▒▒▒▒▒▒▒/____/_________    ▒
 ▒           /▒▒▒/  \▒▒▒\____\/▒▒▒▒▒/\▒▒▒\  /▒▒▒|    | /▒▒\   \▒▒▒\   \▒▒▒\____\/▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\____\   ▒
 ▒          /▒▒▒/    \▒▒/    /\▒▒▒▒/  \▒▒▒\/▒▒▒▒|___ | \▒▒▒\   \▒▒▒\   \▒▒/    /\▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒/____/   ▒
 ▒         /▒▒▒/    / \/____/  \▒▒/    \▒▒▒▒▒▒▒▒/    /  \▒▒▒\   \▒▒▒\   \/____/  \▒▒▒▒/|▒▒▒▒▒|    |         ▒
 ▒        /▒▒▒/    /            \/____/ \▒▒▒▒▒▒/    /    \▒▒▒\   \▒▒▒\    \       \▒▒/ |▒▒▒▒▒|    |         ▒
 ▒       /▒▒▒/    /                     /▒▒▒▒▒/    /      \▒▒▒\   \▒▒▒\____\       \/__|▒▒▒▒▒|    |         ▒
 ▒      /▒▒▒/    /                     /▒▒▒▒▒/    /        \▒▒▒\  /▒▒▒/    /           |▒▒▒▒▒|    |         ▒
 ▒     /▒▒▒/    /                     /▒▒▒▒▒/    /          \▒▒▒\/▒▒▒/    /            |▒▒▒▒▒|____|         ▒
 ▒    /▒▒▒/    /                     /▒▒▒▒▒/    /            \▒▒▒▒▒▒/    /             |▒▒▒▒▒|    |         ▒
 ▒   /▒▒▒/    /                     /\▒▒▒▒/    /              \▒▒▒▒/    /              |▒▒▒▒/|   /|         ▒
 ▒  /▒▒▒/    /                     /__\▒▒/    /                \▒▒/    /               |\▒▒/ |  / |         ▒
 ▒ /▒▒▒/    /  _____               \   \/____/                  \/____/                | \/__|_/  |         ▒
 ▒/▒▒▒/    /  /\    \               \  /\    \                  /\    \                | /\  | \  |         ▒
 ▒▒▒▒/    /  /▒▒\    \               \/▒▒\    \                /▒▒\    \               |/▒▒\ |  \ |         ▒
 ▒▒▒/    /  /▒▒▒▒\____\               \▒▒▒\    \              /▒▒▒▒\    \               \▒▒▒\|___\|         ▒
 ▒▒/    /  /▒▒▒▒▒/    /                \▒▒▒\    \            /▒▒▒▒▒▒\    \               \▒▒▒\    \         ▒
 ▒/____/  /▒▒▒▒▒/    /                  \▒▒▒\    \          /▒▒▒/\▒▒▒\    \               \▒▒▒\    \        ▒
 ▒       /▒▒▒▒▒/    /                    \▒▒▒\    \        /▒▒▒/  \▒▒▒\    \               \▒▒▒\    \       ▒
 ▒      /▒▒▒▒▒/    /                     /▒▒▒▒\    \       \▒▒▒\   \▒▒▒\    \              /▒▒▒▒\    \      ▒
 ▒     /▒▒▒▒▒/    /             ____    /▒▒▒▒▒▒\    \    ___\▒▒▒\   \▒▒▒\    \            /▒▒▒▒▒▒\    \     ▒
 ▒    /▒▒▒▒▒/    /             /\   \  /▒▒▒/\▒▒▒\    \  /\   \▒▒▒\   \▒▒▒\    \          /▒▒▒/\▒▒▒\    \    ▒
 ▒   /▒▒▒▒▒▒\    /            /▒▒\   \/▒▒▒/  \▒▒▒\____\/▒▒\   \▒▒▒\   \▒▒▒\____\        /▒▒▒/  \▒▒▒\____\   ▒
 ▒   \▒▒▒▒▒▒▒\    \           \▒▒▒\  /▒▒▒/    \▒▒/    /\▒▒▒\   \▒▒▒\   \▒▒/    /       /▒▒▒/    \▒▒/    /   ▒
 ▒    \▒▒▒▒▒▒▒\    \           \▒▒▒\/▒▒▒/    / \/____/  \▒▒▒\   \▒▒▒\   \/____/       /▒▒▒/    / \/____/    ▒
 ▒     \▒▒▒▒▒▒▒\    \           \▒▒▒▒▒▒/    /            \▒▒▒\   \▒▒▒\    \          /▒▒▒/    /             ▒
 ▒      \▒▒▒▒▒▒▒\    \           \▒▒▒▒/____/              \▒▒▒\   \▒▒▒\____\        /▒▒▒/    /              ▒
 ▒       \▒▒▒▒▒▒▒\    \           \▒▒▒\    \               \▒▒▒\  /▒▒▒/    /        \▒▒/    /               ▒
 ▒        \▒▒▒▒▒▒▒\____\           \▒▒▒\    \               \▒▒▒\/▒▒▒/    /          \/____/  _____         ▒
 ▒         \▒▒▒▒▒▒/    /            \▒▒▒\    \               \▒▒▒▒▒▒/    /                   /\    \        ▒
 ▒          \▒▒▒▒/    /              \▒▒▒\____\               \▒▒▒▒/    /                   /▒▒\    \       ▒
 ▒           \▒▒/    /                \▒▒/    /                \▒▒/    /                    \▒▒▒\    \      ▒
 ▒            \/____/                  \/____/                  \/____/                      \▒▒▒\    \     ▒
 ▒                                                                                            \▒▒▒\    \    ▒
 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
`
)

const $route = useRoute();
const $router = useRouter()
const routerlink = (val) => {
    $router.push({name:val});
}

const reload = ref(0)
const canvasShow = ref(0)
let DataClass = JSON.parse(localStorage.getItem("mainData"));
//偷个鸡 交流会之后删掉
setInterval(() => {
  DataClass = JSON.parse(localStorage.getItem("mainData"));

  canvasShow.value = DataClass.time.theme;
})

//该变量用于记录用户ID 存入数据库 且很重要
const UserID = DataClass.time.userID
const primeID = DataClass.time.primeID
const test = () => {
  if (primeID != 8830300545) {
    routerlink('GetMore')
  } else {
    alert("您没有查看版本信息的权限")
  }
}
//该变量用于记录签到时间 存入数据库
const Signintime = new Date("04 09 2023").getTime();
const NowTime = new Date().getTime();
const Time = (NowTime, Signintime) => {
  return Math.floor((NowTime - Signintime)/(24 * 3600 * 1000))
}
const signuptime = ref(Time(NowTime, Signintime))


//以下用于记录按钮变化 可以不存入loctstroge和数据库
const sidebarstyle = ref("") 
const topstyle = ref({ color: "#969ba7" })
const clockstyle = ref({ color: "#969ba7" })
let isPofTop = 0;
let isPofClock = 0;

const Top = () => {
  topstyle.value.color = ++isPofTop % 2 ? "#1296db" : "#969ba7";
  sidebarstyle.value = isPofTop % 2 ? { width: "250px", opacity: 1, visibility: "visible" } : "";
}
const Clock = () => {
  clockstyle.value.color = ++isPofClock % 2 ? "#1296db" : "#969ba7";
}

//以下用于绑定齿轮和sidebar
const Overstyle = ref("")
const Over = () => {
  Overstyle.value = {
    transform: "rotate(240deg)",
    transition: "all 0.5s ease-in-out"
  }
}

const Leave = () => {
  if (isPofTop % 2 == 0) {
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


//波浪主题函数

//绘制正弦波浪canvas
const wave = ref('')
const canvasWidth = ref(1920)
const canvasHeight = ref(790)
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
            if (DataClass.time.theme == 2) {
              context.fillStyle = "#ffffff"
            } else if (DataClass.time.theme == 3) {
              context.fillStyle = "#000000"
            }
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
        x: 70,
        y: -70,
        z: 500
    }
    draw(visual);
    animationFrame(visual)
})


</script>

<template>
  <div class="main ">
      <div v-if="canvasShow==2||canvasShow==3">
        <canvas class="absolute left-[0] z-[0]" ref="wave" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
      <div id="setting">
        <div @mouseover="Over" :style="Overstyle" id="settingico" >
          <img src="../assets/settings.png">
        </div>
        <div @mouseover="Over" @mouseleave="Leave" id="settingsidebar" :style="sidebarstyle">
          <div @click="Top" id="settingtop">
            <span :style="topstyle" class="iconfont">&#xe9ba;</span>
          </div>
          <div @click="Clock" id="settingclock">
            <span :style="clockstyle" class="iconfont">&#xe630;</span>
          </div>
          <div id="settingshow">
            <span></span>
            <span></span>
          </div>
          <ul>
            <li>
              <div class="flex justify-center"><img src="../assets/Profile.jpg" alt="头像" id="Profile"></div>
              <div class="signin" @click="routerlink('SignIn')">{{ UserID }}</div>
              <div style="cursor: auto;">已注册{{ signuptime }}天</div>
            </li>
            <li @click="routerlink('List')">⏱️任务清单</li>
            <li @click="routerlink('DayList')">🧾每日任务</li>
            <li @click="routerlink('TaskCalendar')">📖任务日历</li>
            <li @click="routerlink('MainList')">📜杂项安排</li>
            <li @click="routerlink('DIY')">✨风格选择</li>
          </ul>
          <div class="absolute bottom-[5px] left-[200px] text-[--theme-sidebar-text-color]">
            <!-- 版本号 -->
            <p @click="test()">1.0.2</p>
          </div>
        </div>
        <clock v-if="isPofClock%2" class="clock"></clock>
      </div>
      <router-view></router-view>
      <loading></loading>
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
  src: url('//at.alicdn.com/t/c/font_4008251_5aw8epeyul3.woff2?t=1689213026781') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_5aw8epeyul3.woff?t=1689213026781') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_5aw8epeyul3.ttf?t=1689213026781') format('truetype');
}

  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    text-decoration: none;
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

  #settingtop {
    position: absolute;
    width: 36px;
    height: 36px;
    left: 30px;
    top: 40px;
    z-index: 9;
  }

  #settingclock {
    position: absolute;
    width: 36px;
    height: 36px;
    left: 69px;
    top: 39px;
    z-index: 9;
  }

  #settingtop:hover~#settingshow :nth-child(1) {
    width: 36px;
    height: 36px;
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }

  #settingclock:hover~#settingshow :nth-child(2) {
    width: 36px;
    height: 36px;
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }

  #settingshow {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 36px;
    left: 32px;
    top: 40px;
    border-radius: 50%;
  }

  #settingshow span{
    width: 24px;
    height: 24px;
    background-color: var(--theme-sidebar-text-color);
    border-radius: 50%;
    margin-right: 15px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    caret-color: var(--hide-cursor);
  }

  #settingtop .iconfont{
    font-size: 24px;
    padding-left: 6px;
    line-height: 36px;
    color:  var(--theme-sidebar-text-color);
    user-select: none;
    cursor: pointer;
    caret-color: var(--hide-cursor);
  }

  #settingclock .iconfont{
    font-size: 24px;
    padding-left: 6px;
    line-height: 36px;
    color:  var(--theme-sidebar-text-color);
    user-select: none;
    cursor: pointer;
    caret-color: var(--hide-cursor);
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
    color: var(--theme-sidebar-text-color);
    font-weight: 900;
    white-space: nowrap;
    user-select: none;
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
  }

  #setting ul li:active {
    color: #686b74;
  }

  #Profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
