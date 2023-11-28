<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { events } from '../../../../EventBus/EventBus';
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute();
const $router = useRouter()

onMounted(() => {
    roundSetLeave()
    activeMakeList()
    activeMakeMainList()
    updateTime()
})

//本地暂存一下 后面造出后端了再说
//一个数据词条用于存储任务和任务分类——来自用户的数据库
let DataClass = JSON.parse(localStorage.getItem("mainData"));

//设置一个aimData常驻，用于展示用户所选取的数据词条
let aimData = DataClass.tableData[0]
let aimIndex = ref(0);

//任务详细开关
const listdescopen = ref(1)
const listopen = ref(1)
const reload = ref(1)

const changeData = () => {  //更新数据函数
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    }, 0)
    DataClass.tableData[aimIndex] = aimData
    localStorage.setItem("mainData", JSON.stringify(DataClass));
    console.log("datas have updated");
}

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

//新建子任务不及时更新
let subList = reactive([])
//动态创建子列表
const activeMakeList = () => {
    if (aimData != undefined) {
        for (let index = 0; subList.length < aimData.subaim.length; index++) {
            if (aimData.subaim[index].remove) {
                subList.push({
                    pointerStyle: "font-size:24px;opacity: 1;",
                    deleteLine: "text-decoration:line-through",
                    deleteRound: "margin-left:0;opacity: 1"
                })
            } else {
                subList.push({
                    pointerStyle: "font-size:0px;opacity: 0;",
                    deleteLine: "text-decoration:none",
                    deleteRound: "margin-left:40px;opacity: 0"
                })
            }
        }
    }
}
activeMakeList()
const killList = (index, val) => {
    if (val) {
        subList[index].pointerStyle = "font-size:24px;opacity: 1;"
        setTimeout(() => {
            subList[index].deleteLine = "text-decoration:line-through"
            subList[index].deleteRound = "margin-left:0;opacity: 1"
        })
    } else {
        subList[index].pointerStyle = "font-size:0px;opacity: 0;"
        subList[index].deleteLine = "text-decoration:none"
        subList[index].deleteRound = "margin-left:40px;opacity: 0"
    }
}
// 子列表删
const deleteList = (index) => {
    subList.splice(index, 1);
    aimData.subaim.splice(index, 1);
}
// 子列表增
const addSubTask = ref("")
const addList = () => {
    if (addSubTask.value) {
        subList.push({
            pointerStyle: "font-size:0px;opacity: 0;",
            deleteLine: "text-decoration:none",
            deleteRound: "margin-left:100px;opacity: 0"
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
    for (let index = 0; mainList.length < DataClass.tableData.length; index++){
        if (DataClass.tableData[index].remove) {
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
const killMainList = (index, val) => {
    if (val) {
        if (DataClass.time.bindMainSub) {//自定义部分
            for (let i = 0; i < DataClass.tableData[index].subaim.length; i++){
                DataClass.tableData[index].subaim[i].remove = 1;
                listdescopen.value = 0
            }
        }
        mainList[index].pointerStyle = "font-size:24px;opacity: 1;"
        mainList[index].deleteLine = "text-decoration:line-through",
        setTimeout(() => {
            mainList[index].deleteRound = "margin-left:0;opacity: 1"
        }, 100)
    } else {
        if (DataClass.time.bindMainSub) {//自定义部分
            for (let i = 0; i < DataClass.tableData[index].subaim.length; i++){
                DataClass.tableData[index].subaim[i].remove = 0;
                listdescopen.value = 0
            }
        }
        mainList[index].pointerStyle = "font-size:0px;opacity: 0;"
        mainList[index].deleteLine = "text-decoration:none"
        mainList[index].deleteRound = "margin-left: 40px;opacity: 0"
    }
    
}

//自定义任务清单和任务日历绑定   似乎需要每次都先初始化这个页面才能执行？
const emit = () => {
    events.on('bindCalendar', (val) => {
        for (let i = 0; i < DataClass.tableData.length; i++){
            if (val == DataClass.tableData[i].name && DataClass.tableData[i].taskclass == "Calendar") {
                deleteMainList()
                changeData()
                activeMakeMainList()
                break
            }
        }
    } )
}
emit()

// 主列表删
const deleteMainList = (index) => {
    if (DataClass.time.bindCalendar && $route.name =="List") { 
        for (let i = 0; i < DataClass.Calendar.length; i++){
            if (DataClass.tableData[index].name == DataClass.Calendar[i].name) {
                DataClass.Calendar.splice(i, 1);
            }
        }
    }
    mainList.splice(index, 1);
    DataClass.tableData.splice(index, 1);
    listdescopen.value = 0
    aimData = undefined;
}
// 主列表增
const addMainTask = ref("")
const addMainList = () => {
    if (addMainTask.value) {
        mainList.push({
            pointerStyle: "font-size:0px;opacity: 0;",
            deleteLine: "text-decoration:none",
            deleteRound: "margin-left: 40px;opacity: 0"
        })
        DataClass.tableData.push({
            taskclass: "tableData",   
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

//键盘回车添加任务
const enterAdd = () => {
    document.addEventListener("keyup", function(e) {
        if (e.key == "Enter") {
            addMainList()
            addList()
            changeData()
        }
    })
}

//主列表切换控制列表清单
const mainListChange = (index) => {
    aimData = DataClass.tableData[index]
    aimIndex.value = index
    roundSetLeave()
    classIconChange()
    subList = []
    activeMakeList()
    listdescopen.value = 0
    setTimeout(() => {
        listdescopen.value = 1
    })
}

//小圆点样式
const littleRoundStyleSet = (val) => { //优先级部分控制
    switch (DataClass.tableData[val].index) {
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

//实时更新子任务完成进度
const subSaveCheck = (index) => {
    let saver = 0;
    for (let i = 0; i < DataClass.tableData[index].subaim.length; i++){
        saver += DataClass.tableData[index].subaim[i].remove;
    }
    if(DataClass.time.bindMainSub){//自定义部分
        if ((saver == DataClass.tableData[index].subaim.length)&&(DataClass.tableData[index].subaim.length != 0)) {
            DataClass.tableData[index].remove = 1
            mainList[index].pointerStyle = "font-size:24px;opacity: 1;"
            mainList[index].deleteLine = "text-decoration:line-through",
            setTimeout(() => {
                mainList[index].deleteRound = "margin-left:0;opacity: 1"
            },100)
        } else if (saver < DataClass.tableData[index].subaim.length) {
            DataClass.tableData[index].remove = 0
            mainList[index].pointerStyle = "font-size:0px;opacity: 0;"
            mainList[index].deleteLine = "text-decoration:none"
            mainList[index].deleteRound = "margin-left: 40px;opacity: 0"
        }
    }
    return saver
}

//功能栏实现

//清除完成任务清单
const thorwFinish = () => {
    for (let i = 0; i < DataClass.tableData.length; i++){
        if (DataClass.tableData[i].remove) { 
            mainList.splice(i, 1);
            DataClass.tableData.splice(i, 1);
            thorwFinish()
        }
    }
    listdescopen.value = 0
    aimData = undefined
}

//展示工作列表按钮
const showClass = ref('all')
const titleMain = ref('任务列表')
const showMainTask = (val) => {
    if (showClass.value == 'all') {
        titleMain.value = '任务列表'
        return 1
    } else if (showClass.value == 'life') {
        titleMain.value = '生活'
        return (val == '生活')
    } else if (showClass.value == 'work') {
        titleMain.value = '工作'
        return (val == '工作')
    }
}

//优先级排序
const indexSortTime = ref(0)
const indexSort = (val) => {
    if (val % 2 == 1) {
        DataClass.tableData.sort((a, b) => a.index - b.index)
        for (let i = 0; i < DataClass.tableData.length; i++) {
            killMainList(i, DataClass.tableData[i].remove)
        }
    } else if(val % 2 == 0) {
        DataClass.tableData.sort((a, b) => b.index - a.index)
        for (let i = 0; i < DataClass.tableData.length; i++) {
            killMainList(i, DataClass.tableData[i].remove)
        }
    }
}

//完成度排序
const finishSortTime = ref(0)
const finishSort = (val) => {
    let saver = 0;
    let saverArray = []
    for (let i = 0; i < DataClass.tableData.length; i++){
        for (let j = 0; j < DataClass.tableData[i].subaim.length; j++) {
            saver += DataClass.tableData[i].subaim[j].remove;
        }
        saver = saver/DataClass.tableData[i].subaim.length
        saverArray.push(saver)
        saver = 0;
    }
    let part = 0
    if (val % 2 == 1) {
        for (let i = 0; i < saverArray.length; i++){
            for (let j = 0; j < i+1; j++){
                if (saverArray[j] > saverArray[i]){
                    part = saverArray[j]
                    saverArray[j] = saverArray[i]
                    saverArray[i] = part
                    part = DataClass.tableData[j]
                    DataClass.tableData[j] = DataClass.tableData[i]
                    DataClass.tableData[i] = part
                }
            }
        }
        for (let i = 0; i < DataClass.tableData.length; i++) {
            killMainList(i, DataClass.tableData[i].remove)
        }
    } else {
        for (let i = 0; i < saverArray.length; i++){
            for (let j = 0; j < i+1; j++){
                if (saverArray[j] < saverArray[i]){
                    part = saverArray[j]
                    saverArray[j] = saverArray[i]
                    saverArray[i] = part
                    part = DataClass.tableData[j]
                    DataClass.tableData[j] = DataClass.tableData[i]
                    DataClass.tableData[i] = part
                }
            }
        }
        for (let i = 0; i < DataClass.tableData.length; i++) {
            killMainList(i, DataClass.tableData[i].remove)
        }
    }
}


//每日更新DayTask
const upData = () => {
    for (let i = 0; i < DataClass.DataTask.length; i++) {
        if (DataClass.tableData.map(function(e){return e.name}).indexOf(DataClass.DataTask[i].name) != -1) {
            DataClass.tableData[DataClass.tableData.map(function(e){return e.name}).indexOf(DataClass.DataTask[i].name)] = DataClass.DataTask[i]
        } else if (DataClass.tableData.map(function (e) { return e.name }).indexOf(DataClass.DataTask[i].name) == -1) {
            DataClass.tableData.push(DataClass.DataTask[i])
        }
    }
}

const updateTime = () => {
    if (DataClass.time.day != new Date().getDate()||DataClass.time.year != new Date().getFullYear()) {
        upData()
        DataClass.time.day = new Date().getDate()
        DataClass.time.year = new Date().getFullYear()
        changeData()
    }
}
</script>

<template>
    <div class="flex flex-col bg-[--theme-color] h-full overflow-auto">
        <div v-if="reload"></div>
        <!-- 操作栏 -->
        <div id="topall" class="w-[930px] min-h-[50px] bg-[--theme-background-major-color] rounded-xl mt-[30px] mx-[10vw] flex items-center min-w-[310px] z-20">
            <!-- 开关设置 -->
            <div id="part1" class="h-[20px] flex items-center mx-[10px]" style="border-right: 1px solid var(--theme-text-major-color-active);">
                <div id="clean" class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" title="点击清除已完成清单" @click="thorwFinish(),changeData()">
                    <i class="iconfont" style="font-size: 24px;">&#xe655;</i>
                    <p class="mx-[5px] w-[90px] font-black">清除已完成</p>
                </div>
                <div id="desc" class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" @click="listdescopen++,changeData()" title="点击开启/关闭任务详细">
                    <i class="iconfont">&#xe600;</i>
                    <p class="mx-[5px] w-[70px] font-black">任务详细</p>
                </div>
            </div>
            <!-- 类型显示设置 -->
            <div id="classchoose" class="h-[20px] flex items-center" style="border-right: 1px solid var(--theme-text-major-color-active);">
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" @click="showClass = 'work',changeData()">
                    <i class="iconfont" style="font-size: 24px;">&#xe656;</i>
                    <p class="mx-[5px] w-[40px] font-black">工作</p>
                </div>
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" @click="showClass = 'work',changeData()">
                    <i class="iconfont" style="font-size: 24px;">&#xe656;</i>
                    <p class="mx-[5px] w-[40px] font-black">作业</p>
                </div>
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]"  @click="showClass = 'life',changeData()">
                    <i class="iconfont">&#xe66c;</i>
                    <p class="mx-[5px] w-[40px] font-black">生活</p>
                </div>
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]"  @click="showClass = 'all',changeData()">
                    <i class="iconfont">&#xe610;</i>
                    <p class="mx-[5px] w-[40px] font-black">全部</p>
                </div>
            </div>
            <!-- 排序设置 -->
            <div id="sort" class="h-[20px] flex items-center">
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" @click="indexSortTime++,indexSort(indexSortTime),changeData()">
                    <i class="iconfont" style="font-size: 18px;">&#xe6bf;</i>
                    <p class="mx-[5px] w-[90px] font-black">优先级排序</p>
                </div>
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" @click="finishSortTime++,finishSort(finishSortTime),changeData()">
                    <i class="iconfont" style="font-size: 18px;">&#xe628;</i>
                    <p class="mx-[5px] w-[90px] font-black">完成度排序</p>
                </div>
            </div>
        </div>
        <!-- 主页面 -->
        <div class="flex w-full h-auto ml-[10vw] flex-wrap mt-[30px]">
            <!-- 任务清单 -->
            <div id="list" class="my-[30px] overflow-auto w-[30vw] max-w-[500px] min-w-[400px] h-[80vh]">
                <div class="mx-[30px] my-[25px] flex flex-col text-[--theme-text-major-color]" v-if="(listopen%2==1)">
                    <div class="flex items-center h-full text-[12px]">
                        <p class="flex mb-[10px] text-[18px] select-none">{{ titleMain }}</p>
                        <p class="text-left mx-[10px] text-[--theme-text-major-color-tip]">注意任务清单中的修改不会影响每日任务哦</p>
                    </div>
                    <div class="w-full">
                        <div class="flex w-full flex-col my-[5px] relative select-none transition-all" v-for="(item,index) in DataClass.tableData" :key="index">
                            <div v-if="showMainTask(item.class)">
                                <div class="flex w-full items-center">
                                    <div class="w-[32px] h-[32px] ml-[-6px] flex justify-center items-center cursor-pointer" @click="item.remove=(item.remove+1)%2,killMainList(index,item.remove),changeData()">
                                        <div class="outline outline-2 w-[16px] h-[16px] z-10 select-none rounded-3xl flex items-center justify-center" >
                                            <i class="iconfont" :style="mainList[index].pointerStyle">&#xe69e;</i>
                                        </div>
                                    </div>
                                    <div class="w-full bg-[--theme-background-major-color] flex items-center h-[35px] focus:outline-0 pl-[10px] rounded cursor-pointer" @click="mainListChange(index),changeData()">
                                        <div class="h-full text-left flex items-center" :style="mainList[index].deleteLine">{{ item.name }}</div>
                                        <div class="w-[10px] h-[10px] mx-[10px] rounded-3xl" :style="littleRoundStyleSet(index)"></div>
                                        <div class="text-left flex items-center" v-if="item.subaim.length">
                                            <i class="iconfont" style="font-size:12px;" >&#xe625;</i>
                                            <div class="flex items-center text-[12px] mx-[6px]">
                                                <p>{{ subSaveCheck(index) }}</p>/<p>{{ item.subaim.length }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[24px] cursor-pointer text-[22px]" v-if="item.remove" @click="deleteMainList(index),changeData()">
                                        <i class="iconfont" :style="mainList[index].deleteRound" >&#xe601;</i>
                                    </div>
                                </div>
                                <div v-if="!item.remove" class="flex flex-col mx-[34px] text-[12px] text-[--theme-text-major-color-tip]">
                                    <p class="text-left"> {{ item.note }}</p>
                                </div>
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
            <!-- 任务详细 -->
            <div id="listdesc" v-if="(listdescopen%2==1)" class="my-[30px] overflow-auto w-[35vw] max-w-[500px] min-w-[400px] h-[80vh]">
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
                        <div class="w-[40px] h-[40px] bg-[--theme-text-major-color-input] flex justify-center items-center rounded-3xl text-[#000000] hover:w-[300px] transition-all duration-700 relative overflow-hidden" @mouseover="roundSetOver()" @mouseleave="roundSetLeave()">
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
                                <div class="w-[32px] h-[32px] ml-[-6px] flex justify-center items-center cursor-pointer"  @click="aimData.subaim[index].remove=(aimData.subaim[index].remove+1)%2,killList(index,aimData.subaim[index].remove),subSaveCheck(index),changeData()">
                                    <div class="outline outline-2 w-[16px] h-[16px] z-10 select-none rounded-3xl flex items-center justify-center">
                                        <i class="iconfont" :style="subList[index].pointerStyle">&#xe69e;</i>
                                    </div>
                                </div>
                                <input type="text" :disabled="item.remove%2==1" v-model="item.text" class="w-full bg-[--theme-background-major-color] h-[35px] focus:outline-0 rounded px-[10px]" :style="subList[index].deleteLine" @blur="changeData()"/>
                                <div class="w-[24px] cursor-pointer text-[22px]" v-if="aimData.subaim[index].remove" @click="deleteList(index),changeData()">
                                    <i class="iconfont" :style="subList[index].deleteRound" >&#xe601;</i>
                                </div>
                            </div>
                            <!-- 添加任务 -->
                            <div class="flex items-center my-[5px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl" >
                                <div class="w-[24px] h-full">
                                    <div class="outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center" @click="addList(),changeData()">
                                        <i class="iconfont" style="font-size: 22px;">&#xe606;</i>
                                    </div>
                                </div>
                                <input type="text" v-model="addSubTask" placeholder="添加新的子任务" class="w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px]" @keyup="enterAdd(),changeData()"/>
                            </div>
                        </div>
                    </div>
                    <!-- 任务文件 -->
                    <div class="flex my-[25px] flex-col text-[--theme-text-major-color] select-none">
                        <p class="flex mb-[10px] text-[14px] select-none">附件</p>
                        <!-- 模拟接口 -->
                        <el-upload class="w-[29vw] min-w-[330px] max-w-[400px] flex" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple >
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
@media screen and (min-width: 995px) and (max-width: 1120px) {
    #topall {width: 820px;}
    #desc { margin:0;width: 0;opacity: 0;}
}

@media screen and (min-width: 800px) and (max-width: 995px) {
    #topall {width: 640px;}
    #desc { margin:0;width: 0;opacity: 0;}
    #clean { margin:0;width: 0;opacity: 0;}
    #part1 { margin:0;width: 0;opacity: 0;}
}

@media screen and (min-width: 500px) and (max-width: 830px) {
    #list { max-width: 640px;width:80vw;}
    #listdesc { max-width: 640px;width:80vw;}
}

@media screen and (min-width: 710px) and (max-width: 800px) {
    #topall {width: 560px;}
    #classchoose { margin:0;width: 0;opacity: 0; }
}

@media screen and (min-width: 570px) and (max-width: 710px) {
    #topall {width: 440px;}
    #classchoose { margin:0;width: 0;opacity: 0; }
    #desc { margin:0;width: 0;opacity: 0;}
}

@media screen and (min-width: 0px) and (max-width: 570px) {
    #topall {width: 0px; min-width: 0px;height: 0;min-height: 0;}
    #classchoose { margin:0;width: 0;opacity: 0;visibility: hidden;}
    #sort { margin:0;width: 0;opacity: 0;visibility: hidden; }
    #part1 { margin:0;width: 0;opacity: 0;visibility: hidden; }
}

/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4008251 */
  src: url('//at.alicdn.com/t/c/font_4008251_2me46qts4uh.woff2?t=1691483274817') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_2me46qts4uh.woff?t=1691483274817') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_2me46qts4uh.ttf?t=1691483274817') format('truetype');
}

.iconfont{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    transition: all .3s ease-out;
    user-select: none;
}

@keyframes init {
    0% {
        opacity: 0;
        margin-top: 50px;
        height: 75vh;
    }
    100% {
        opacity: 1;
        margin-top: 0px;
        height: 80vh;
    }
}

#list{
    background-color: var(--theme-background-major-color);
    animation: init .6s 0s ease-out forwards;
    border-radius: 15px;
    opacity: 0;
    margin-right: 15px;
}

#listdesc{
    background-color: var(--theme-background-major-color);
    animation: init .6s .2s ease-out forwards;
    opacity: 0;
    border-radius: 15px;
    margin-right: 15px;
}

::-webkit-scrollbar {
    display: none;
}

:deep(.el-upload-list__item-file-name){
    color: var(--theme-text-major-color)
}

:deep(.el-upload-list__item:hover) {
    background-color: var(--theme-text-major-color-input);
}

:deep(.el-icon.el-icon--close:hover) {
    color:var(--theme-roloc)
}
</style>