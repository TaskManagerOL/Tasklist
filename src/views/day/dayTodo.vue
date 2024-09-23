<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
//本地暂存一下 后面造出后端了再说
//一个数据词条用于存储任务和任务分类——来自用户的数据库
let DataClass = JSON.parse(localStorage.getItem("mainData"));

//设置一个aimData常驻，用于展示用户所选取的数据词条
let aimData = DataClass.DataTask[0]
let aimIndex = ref(0);

const reload = ref(1)
const listdescopen = ref(0)
onMounted(() => {
    roundSetLeave()
    activeMakeList()
    activeMakeMainList()
    updateTime()
})

const changeData = () => {
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    }, 0)
    DataClass.DataTask[aimIndex] = aimData
    localStorage.setItem("mainData", JSON.stringify(DataClass));
}

//主要有一个相互保存的函数，需要做到从DayTask中能存到tableData中，在任务清单中修改也能改到DayTask
//逻辑是 检测TableData中含有DayTask的，同nameDayTask覆盖TableData，然后再将多余的DayTask加入到TableData中 
const upData = () => {
    for (let i = 0; i < DataClass.DataTask.length; i++) {
        if (DataClass.tableData.map(function(e){return e.name}).indexOf(DataClass.DataTask[i].name) != -1) {
            DataClass.tableData[DataClass.tableData.map(function(e){return e.name}).indexOf(DataClass.DataTask[i].name)] = DataClass.DataTask[i]
        } else if (DataClass.tableData.map(function (e) { return e.name }).indexOf(DataClass.DataTask[i].name) == -1) {
            DataClass.tableData.push(DataClass.DataTask[i])
        }
    }
}

const titleMain = ref('每日任务')

const classIcon = ref("");
const classChange = () => { // 用于切换任务分类
    (aimData.class == "生活") ? aimData.class = "工作" : aimData.class = "生活"
}
const classIconChange = () => {
    if(aimData != undefined)
        (aimData.class == "生活") ? classIcon.value = "🎉" : classIcon.value = "👔"
}
classIconChange()

const roundColor = ref(0)
const roundStyle = ref("")
const roundopen = ref(1)
const roundSetOver = () => { //优先级部分控制
    roundStyle.value = "visibility: hidden;"
}
const roundSetLeave = () => { //优先级部分控制
    if (aimData != undefined) {
        switch (aimData.index) {
            case 0:
                roundStyle.value = "visibility: visible;background-color:#252525"
                break
            case 1:
                roundStyle.value = "visibility: visible;background-color:#00ff3c"
                break
            case 2:
                roundStyle.value = "visibility: visible;background-color:#39ff00"
                break
            case 3:
                roundStyle.value = "visibility: visible;background-color:#bbff00"
                break
            case 4:
                roundStyle.value = "visibility: visible;background-color:#ffed00"
                break
            case 5:
                roundStyle.value = "visibility: visible;background-color:#ffc700"
                break
            case 6:
                roundStyle.value = "visibility: visible;background-color:#ffb900"
                break
            case 7:
                roundStyle.value = "visibility: visible;background-color:#ff9200"
                break
            case 8:
                roundStyle.value = "visibility: visible;background-color:#ff5c00"
                break
            case 9:
                roundStyle.value = "visibility: visible;background-color:#ff2500"
                break
            case 10:
                roundStyle.value = "visibility: visible;background-color:#ff003d"
                break
            default:
                roundStyle.value = "visibility: visible;background-color:#252525"
                break
        }
    }
}

//小圆点样式
const littleRoundStyleSet = (val) => { //优先级部分控制
    switch (DataClass.DataTask[val].index) {
        case 0:
            return "visibility: visible;background-color:#252525"
        case 1:
            return "visibility: visible;background-color:#00ff3c"
        case 2:
            return "visibility: visible;background-color:#39ff00"
        case 3:
            return "visibility: visible;background-color:#bbff00"
        case 4:
            return "visibility: visible;background-color:#ffed00"
        case 5:
            return "visibility: visible;background-color:#ffc700"
        case 6:
            return "visibility: visible;background-color:#ffb900"
        case 7:
            return "visibility: visible;background-color:#ff9200"
        case 8:
            return "visibility: visible;background-color:#ff5c00"
        case 9:
            return "visibility: visible;background-color:#ff2500"
        case 10:
            return "visibility: visible;background-color:#ff003d"
        default:
            return "visibility: visible;background-color:#252525"
    }
}

//新建子任务不及时更新
let subList = reactive([])
//动态创建子列表
const activeMakeList = () => {
    if (aimData != undefined) {
        for (let index = 0; subList.length < aimData.subaim.length; index++) {
            subList.push({
                pointerStyle: "font-size:24px;opacity: 1;",
                deleteRound: "margin-left:0;opacity: 1"
            })
        }
    }
}
activeMakeList()
// 子列表删
const deleteList = (index) => {
    subList.splice(index, 1);
    aimData.subaim.splice(index, 1);
}
//子列表增
const addSubTask = ref("")
const addList = () => {
    if (addSubTask.value) {
        subList.push({
            pointerStyle: "font-size:24px;opacity: 1;",
                deleteRound: "margin-left:0;opacity: 1"
        })
        aimData.subaim.push({
            text: addSubTask.value,
            remove: 0
        })
    }
    addSubTask.value = ""
}


const mainList = reactive([])
//动态创建主列表
const activeMakeMainList = () => {
    for (let index = 0; mainList.length < DataClass.DataTask.length; index++){
        if (DataClass.DataTask[index].remove) {
            mainList.push({
                pointerStyle: "font-size:24px;opacity: 1;",
                deleteLine: "text-decoration:line-through",
                deleteRound: "margin-left:0;opacity: 1"
            })
        } else {
            mainList.push({
                pointerStyle: "font-size:0px;opacity: 0;",
                deleteLine: "text-decoration:none",
                deleteRound: "margin-left: 40px;opacity: 0"
            })
        }
    }
}
activeMakeMainList()

//主列表删
const deleteMainList = (index) => {
    mainList.splice(index, 1);
    DataClass.DataTask.splice(index, 1);
    aimData = undefined
}
//主列表增
const addMainTask = ref("")
const addMainList = () => {
    if (addMainTask.value) {
        mainList.push({
            pointerStyle: "font-size:0px;opacity: 0;",
            deleteLine: "text-decoration:none",
            deleteRound: "margin-left: 40px;opacity: 0"
        })
        DataClass.DataTask.push({
            taskclass: "DataTask",   
            name: addMainTask.value,  
            class: "生活",     
            index: 5,    
            note: "",   
            subaim: [],
            document: { 

            },
            remove: 0   
        })
    }
    addMainTask.value = ""
}

//主列表切换控制列表清单
const mainListChange = (index) => {
    listdescopen.value = 1
    aimData = DataClass.DataTask[index]
    aimIndex.value = index
    roundSetLeave()
    classIconChange()
    subList = []
    activeMakeList()
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    })
}

//键盘回车添加任务
const enterAdd = () => {
    document.addEventListener("keyup", function(e) {
        if (e.key == "Enter") {
            addMainList()
            addList()
        }
    })
}

//手动更新按钮
const runF5 = ref('font-size:22px;rotate: 0deg')
const runTime = ref(0)
const GetBack = () => {
    runTime.value++
    runF5.value = "font-size:22px;rotate:" + runTime.value * 180 + "deg"
    upData()
}

//每日更新函数
const updateTime = () => {
    if (DataClass.time.day != new Date().getDate()||DataClass.time.year != new Date().getFullYear()) {
        GetBack()
        DataClass.time.day = new Date().getDate()
        DataClass.time.month = new Date().getMonth()+1
        DataClass.time.year = new Date().getFullYear()
        changeData()
    }
}
</script>

<template>
    <div class="flex flex-col bg-[--theme-color] h-auto">
        <div v-if="reload"></div>
        <div class="flex w-[80%] justify-center ml-[10vw] mt-[30px]">
            <div id="list" class="my-[30px] overflow-auto">
                <div class="mx-[30px] my-[25px] flex flex-col text-[--theme-text-major-color]">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <p class="flex mb-[10px] text-[18px] font-black select-none transition-all">{{ titleMain }}</p>
                            <div class="flex items-center h-full mx-[10px] text-[12px] text-[--theme-text-major-color-tip]">
                                <p class="text-left">保存的每日任务点击按钮更新到任务清单中哦</p>
                            </div>
                        </div>
                        <div class="mx-[2px] cursor-pointer" @click="GetBack(),changeData()">
                            <i class="iconfont activeSpecial" :style="runF5">&#xe603;</i>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between w-full my-[5px] relative select-none transition-all " v-for="(item,index) in DataClass.DataTask" :key="index">
                            <div class="flex items-center">
                                <div class="bg-[--theme-background-major-color] flex items-center h-[35px] focus:outline-0 rounded cursor-pointer" @click="mainListChange(index),changeData()">
                                    <div class="w-[15px] h-[15px] ml-[2px] mr-[16px] rounded-3xl" :style="littleRoundStyleSet(index)"></div>
                                    <div class="h-full flex items-center" :style="mainList[index].deleteLine">{{ item.name }}</div>
                                    <div class="flex items-center h-full mx-[20px] text-[12px] text-[--theme-text-major-color-tip]">
                                        <p class="text-left"> {{ item.note }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[24px] cursor-pointer text-[22px]" @click="deleteMainList(index),changeData()">
                                <i class="iconfont">&#xe601;</i>
                            </div>
                        </div>
                       <!-- 添加任务 -->
                       <div class="flex items-center my-[15px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl" >
                            <div class="w-[24px] h-full">
                                <div class="outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center" @click="addMainList(),changeData()">
                                    <i class="iconfont" style="font-size: 22px;">&#xe606;</i>
                                </div>
                            </div>
                            <input type="text" v-model="addMainTask" placeholder="在此处输入新的任务" class="w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px]" @keyup="enterAdd(),changeData()"/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="listdesc" v-if="(listdescopen%2==1)" class="my-[30px] overflow-auto">
                <div class="mx-[30px] flex flex-col" v-if="(aimData != undefined)">
                    <!-- 任务详细头部 -->
                    <div class="flex justify-between items-center my-[25px]">
                        <p class="text-[--theme-text-major-color] text-[24px] font-black">
                            <input type="text" v-model="aimData.name" class="bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] mx-[-10px]" @blur="changeData()">
                        </p>
                        <div class="text-[--theme-text-major-color] font-black mx-[10px] flex items-center select-none hover:text-[#e42a28]" @click="listdescopen=0">
                            <i class="iconfont" style="font-size: 24px;">&#xe65a;</i>
                        </div>
                    </div>
                    <!-- 任务详细类型及index -->
                    <div class="flex text-[14px] font-black overflow-hidden cursor-pointer select-none ">
                        <!-- 任务类型 -->
                        <div class="w-[100px] h-[40px] bg-[--theme-text-major-color-input] mr-[10px] flex justify-center items-center rounded-3xl text-[--theme-text-major-color] hover:bg-[--theme-class-major-color-hover] active:text-[--theme-text-major-color-active]" @click="classChange(),classIconChange(),changeData()">
                            <p>{{ classIcon }}</p><p>{{ aimData.class }}</p>
                        </div>
                        <!-- 任务index -->
                        <div class="w-[40px] h-[40px] bg-[--theme-text-major-color-input] flex justify-center items-center rounded-3xl text-[--theme-color] hover:w-[300px] transition-all duration-700 relative overflow-hidden" @mouseover="roundSetOver()" @mouseleave="roundSetLeave()">
                            <div class="w-full h-full z-10 rounded-3xl absolute opacity-100 hover:opacity-0 transition-all duration-700" :style="roundStyle"></div>
                            <div class="w-full h-full flex justify-start" @click="changeData()">
                                <div class="h-full w-[10%] bg-[#00ff3c] active:bg-[#00cc2f]" style="border-radius: 50% 0 0 50%;" @click="roundColor=1,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#39ff00] active:bg-[#2dcc00]" @click="roundColor=2,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#bbff00] active:bg-[#95cc00]" @click="roundColor=3,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ffed00] active:bg-[#ccbd00]" @click="roundColor=4,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ffc700] active:bg-[#cc9f00]" @click="roundColor=5,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ffb900] active:bg-[#cc9300]" @click="roundColor=6,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ff9200] active:bg-[#cc7400]" @click="roundColor=7,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ff5c00] active:bg-[#cc4900]" @click="roundColor=8,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ff2500] active:bg-[#cc1d00]" @click="roundColor=9,aimData.index=roundColor"></div>
                                <div class="h-full w-[10%] bg-[#ff003d] active:bg-[#cc0030]" style="border-radius: 0 50% 50% 0;" @click="roundColor=10,aimData.index=roundColor"></div>
                            </div>
                            <p class="w-full h-full flex justify-center items-center transition-all duration-1000 absolute pointer-events-none" v-if="roundopen">优先级：{{ aimData.index }}</p>
                        </div>
                    </div>
                    <!-- 任务备注 -->
                    <div class="flex my-[25px] flex-col text-[--theme-text-major-color] select-none">
                        <p class="flex mb-[10px] text-[14px] select-none">备注</p>
                        <input type="text" placeholder="➕在这里输入备注" v-model="aimData.note" class="bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] mx-[-10px]" @blur="changeData()">
                    </div>
                    <!-- 子步骤 -->
                    <div class="flex flex-col text-[--theme-text-major-color]">
                        <p class="flex mb-[10px] text-[14px] select-none">子任务</p>
                        <!-- 子任务列表 -->
                        <div class="w-full">
                            <div class="flex w-full items-center my-[5px] relative select-none" v-for="(item,index) in aimData.subaim" :key="index">
                                <input type="text" v-model="item.text" class="w-full bg-[--theme-background-major-color] h-[35px] focus:outline-0 rounded  " @blur="changeData()"/>
                                <div class="w-[24px] cursor-pointer text-[22px]" @click="deleteList(index),changeData()">
                                    <i class="iconfont" :style="subList[index].deleteRound" >&#xe601;</i>
                                </div>
                            </div>
                            <!-- 添加任务 -->
                            <div class="flex items-center my-[5px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl" >
                                <input type="text" v-model="addSubTask" placeholder="添加新的子任务" class="w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[2px]" @keyup="enterAdd(),changeData()"/>
                                <div class="w-[22px] h-full">
                                    <div class="outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center" @click="addList(),changeData()">
                                        <i class="iconfont" style="font-size: 22px;">&#xe606;</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 任务文件 -->
                    <div class="flex my-[25px] flex-col text-[--theme-text-major-color] select-none">
                        <p class="flex mb-[10px] text-[14px] select-none">附件</p>
                        <!-- 模拟接口 -->
                        <el-upload class="w-[29vw] min-w-[330px] max-w-[400px]" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple >
                            <div class="border-dotted border-2 border-[--theme-text-major-color] rounded">
                                <el-button color="var(--theme-background-major-color)" class="w-[29vw] min-w-[330px] max-w-[400px]" type="primary">
                                    <p class="text-[--theme-text-major-color]">点击此处上传文件</p>
                                </el-button>
                            </div>
                        </el-upload>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4008251 */
  src: url('//at.alicdn.com/t/c/font_4008251_fag0a4v27m.woff2?t=1692193511461') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_fag0a4v27m.woff?t=1692193511461') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_fag0a4v27m.ttf?t=1692193511461') format('truetype');
}

.iconfont{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    transition: all .3s ease-out;
    user-select: none;
    display: block;
}

::-webkit-scrollbar {
    display: none;
}

@keyframes init {
    0% {
        opacity: 0;
        margin-top: 50px;
        height: 85vh;
    }
    100% {
        opacity: 1;
        margin-top: 0px;
        height: 90vh;
    }
}

#list{
    width: 30vw;
    height: 90vh;
    background-color: var(--theme-background-major-color);
    animation: init .6s 0s ease-out forwards;
    border-radius: 15px;
    margin-right: 15px;
    max-width: 500px;
    min-width: 400px;
    opacity: 0;
}

#listdesc{
    width: 35vw;
    height: 90vh;
    background-color: var(--theme-background-major-color);
    animation: init .6s .2s ease-out forwards;
    border-radius: 15px;
    margin-right: 15px;
    max-width: 500px;
    min-width: 400px;
    opacity: 0;
}

.activeSpecial:active {
    color: var(--theme-main-color);
}
</style>