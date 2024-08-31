<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { events } from '../../../EventBus/EventBus';
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute();
const $router = useRouter()

//当前点击日历的时间
const value = ref(new Date())
const cursorDay = new Date().getDate()
const reload = ref(0)
const listopen = ref(0)
const listdescopen = ref(0)
const setStartTime = ref()
const setEndTime = ref()


onMounted(() => {
    roundSetLeave()
    activeMakeList()
    activeMakeMainList()
    upData()
})

//本地暂存一下 后面造出后端了再说
//一个数据词条用于存储任务和任务分类——来自用户的数据库
let DataClass = JSON.parse(localStorage.getItem("mainData"));
//需要一个aimMainData来存储当前时间的全部任务
//需要一个aimSubData来存储当前时间选取的某个任务

let aimMainData = undefined
let aimIndex = ref(0);
let aimData = DataClass.Calendar[aimIndex.value]

//用于检测是否全展开，控制日历样式防止屏幕闪烁
const halfCheck = ref(0)
const fullCheck = ref(0)


const upData = () => {
    let Saver = []
    let today = new Date().getTime()
    for (let i = 0; i < DataClass.Calendar.length; i++) {
        if ((today >= new Date(DataClass.Calendar[i].startTime).getTime()) && (today <= new Date(DataClass.Calendar[i].endTime).getTime()+1000*60*60*24-1)) {
            Saver.push(DataClass.Calendar[i])
        }
    }
    if (Saver.length == 0) {
        for (let i = 0; i < DataClass.tableData.length; i++) {
            if (DataClass.tableData[i].taskclass == "Calendar") {
                DataClass.tableData.splice(i,1)
            }
        }
    } else {
        for (let i = 0; i < Saver.length; i++) {
            if (DataClass.tableData.map(function (e) { return e.name }).indexOf(Saver[i].name) != -1) {
                DataClass.tableData[DataClass.tableData.map(function (e) { return e.name }).indexOf(Saver[i].name)] = Saver[i]
            } else if (DataClass.tableData.map(function (e) { return e.name }).indexOf(Saver[i].name) == -1) {
                DataClass.tableData.push(Saver[i])
            }
        }
    }
    activeMakeMainList()
}

const changeData = () => {
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    }, 0)
    localStorage.setItem("mainData", JSON.stringify(DataClass));
    console.log("datas have updated");
}

//写个展示日历任务的函数,遍历本月
const reloadsecond = ref(1)
let showCalendarDataStyle = reactive([])
const showCalendarData = () => {
    let Saver = []
    //data 用于存放 一个判断时间的字符串
    let data = ""
    let chooseYear = (value.value.getFullYear())
    let chooseMonth = (value.value.getMonth()+1)
    for (let i = 0; i < 32; i++) {
        data = chooseYear + "-" + chooseMonth + "-" + i;
        for (let j = 0; j < DataClass.Calendar.length; j++) {
            if ((new Date(data).getTime() >= new Date(DataClass.Calendar[j].startTime).getTime()) && (new Date(data) <= new Date(DataClass.Calendar[j].endTime))) {
                Saver.push(DataClass.Calendar[j].name)
            }
        }
        showCalendarDataStyle.push(Saver)
        Saver = [];
    }
    reloadsecond.value = 0
    setTimeout(() => {
        reloadsecond.value = 1 
    });
}
showCalendarData()

//控制值来实现不闪烁
const dateStyle = (val) => {
    if(val == 1){
        if (fullCheck.value == 1) {
            return "width:300px"
        } else if (fullCheck.value == 0 && halfCheck.value == 1) {
            return "width:700px"
        } else if (fullCheck.value == 0 && halfCheck.value == 0) {
            return "width:1200px"
        }
    } else if (val == 0) {
        if (fullCheck.value == 1) {
            return "width:400px"
        }
    }
}

const returndata = ref()
const rtdata = (val) => {
    returndata.value = val
}

const chooseDay = (data) => {
    halfCheck.value = 1
    listopen.value = 0
    setTimeout(() => {
        listopen.value = 1
    }, 0)
    fullCheck.value = 0
    listdescopen.value = 0
    setStartTime.value = data
    setEndTime.value = data
    if (data == undefined) 
        data = returndata.value
        aimMainData = []
    //记得写一个判断起始时间和结束时间的函数
    for (let i = 0; i < DataClass.Calendar.length; i++) {
        if ((new Date(data) >= new Date(DataClass.Calendar[i].startTime)) && (new Date(data) <= new Date(DataClass.Calendar[i].endTime))) {
            aimMainData.push(DataClass.Calendar[i])
            aimIndex.value = i
        }
    }
    value.value = new Date(data)
    reloadsecond.value = 0
    setTimeout(() => {
        reloadsecond.value = 1 
    });
    showCalendarDataStyle = []
    showCalendarData()
}

//手动更新按钮 
const runF5 = ref('font-size:40px;rotate: 0deg')
const runTime = ref(0)
const GetBack = () => {
    runTime.value++
    runF5.value = "font-size:40px;rotate:" + runTime.value * 180 + "deg"
    upData()
    showCalendarDataStyle = []
    showCalendarData()
    reload.value = 1 
    setTimeout(() => {
        reload.value = 0   
    });
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
    for (let index = 0; mainList.length < DataClass.Calendar.length; index++){
        if (DataClass.Calendar[index].remove) {
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
    showCalendarDataStyle = []
    showCalendarData()
}
activeMakeMainList()

//任务日历和任务清单绑定
const emit = (val) => {
    events.emit('bindCalendar', val)
}

//主列表删
const deleteMainList = (index) => {
    fullCheck.value = 0
    listdescopen.value = 0
    // 任务日历和任务清单绑定
    if (DataClass.time.bindCalendar && $route.name == "TaskCalendar") {
        emit(aimMainData[index].name);
    } 
    mainList.splice(index, 1);
    DataClass.Calendar.splice(DataClass.Calendar.findIndex(item => item.name == aimMainData[index].name), 1);
    let data = returndata.value
    aimMainData = []
    //记得写一个判断起始时间和结束时间的函数
    for (let i = 0; i < DataClass.Calendar.length; i++) {
        if ((new Date(data) >= new Date(DataClass.Calendar[i].startTime)) && (new Date(data) <= new Date(DataClass.Calendar[i].endTime))) {
            aimMainData.push(DataClass.Calendar[i])
            aimIndex.value = i
        }
    }
    showCalendarDataStyle = []
    showCalendarData()
    GetBack()
}


const calendaropen = ref(1)
//主列表增
const addMainList = () => {
    for (let i = 0; i < DataClass.Calendar.length; i++) {
        if (DataClass.Calendar[i].name == "新增任务") {
            return 
        }
    }
    mainList.push({
        pointerStyle: "font-size:0px;opacity: 0;",
        deleteLine: "text-decoration:none",
        deleteRound: "margin-left: 40px;opacity: 0"
    })
    DataClass.Calendar.push({
        startTime: returndata.value,
        endTime: returndata.value,
        taskclass: "Calendar",  
        name: "新增任务",  
        class: "生活",     
        index: 5,    
        note: "",   
        subaim: [],
        document: { 

        },
        remove: 0   
    })
    let data = returndata.value
    aimMainData = []
    //记得写一个判断起始时间和结束时间的函数
    for (let i = 0; i < DataClass.Calendar.length; i++) {
        if ((new Date(data) >= new Date(DataClass.Calendar[i].startTime)) && (new Date(data) <= new Date(DataClass.Calendar[i].endTime))) {
            aimMainData.push(DataClass.Calendar[i])
            aimIndex.value = i
        }
    }
    showCalendarDataStyle = []
    showCalendarData()
    GetBack()
    calendaropen.value = 0
    setTimeout(() => {
        calendaropen.value = 1 
    });
}

//主列表切换控制列表清单
const mainListChange = (index) => {
    listdescopen.value = 0
    setTimeout(() => {
        listdescopen.value = 1
    })
    fullCheck.value = 1 
    setStartTime.value = aimMainData[index].startTime
    setEndTime.value = aimMainData[index].endTime
    aimData = aimMainData[index]
    aimIndex.value = index
    roundSetLeave()
    classIconChange()
    subList = []
    activeMakeList()
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    })
    showCalendarDataStyle = []
    showCalendarData()
}

const namerule = (val) => {
    let time = 0
    for (let i = 0; i < DataClass.Calendar.length; i++) {
        if ((DataClass.Calendar[i].name == val)||(val == "")) {
            time++
        }
    }
    if (time == 2) {
        aimData.name = "新增任务"
    }
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

//小圆点样式
const littleRoundStyleSet = (val) => { //优先级部分控制
    switch (aimMainData[val].index) {
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

//键盘回车添加任务
const enterAdd = () => {
    document.addEventListener("keyup", function(e) {
        if (e.key == "Enter") {
            addList()
        }
    })
}

const FirstStartTime = ref()
const FirstEndTime = ref()

const getFirstStartTime = () => {
    FirstStartTime.value = setStartTime.value
}
const getFirstEndTime = () => {
    FirstEndTime.value = setEndTime.value
}

const checkStartTime = (val) => {
    if (val > setEndTime.value) {
        setStartTime.value = FirstStartTime.value
    } else {
        setStartTime.value = val
        aimMainData[aimIndex.value].startTime = setStartTime.value
        changeData()
    }
    upData()
}

const checkEndTime = (val) => {
    if (new Date(val.getTime()+1000*60*60*24-1) < setStartTime.value) {
        setEndTime.value = FirstEndTime.value
    } else {
        setEndTime.value = new Date(val.getTime() + 1000 * 60 * 60 * 24 - 1)
        aimMainData[aimIndex.value].endTime = setEndTime.value
        changeData()
    }
    upData()
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    });
}

</script>

<template>
    <div class="flex flex-col h-full overflow-auto bg-[--theme-color]">
        <div v-if="reload"></div>
        <div class="flex w-auto mx-[10vw] mt-[30px]" id="phoneshow">
            <!-- 日历 -->
            <div id="date" class="my-[30px] select-none overflow-auto text-[--theme-text-major-color] transition-all" :style="dateStyle(1)">
                <el-calendar v-model="value" >
                    <template #date-cell="{ data }">
                        <div v-if="calendaropen %2 ==1" class="flex flex-col w-full h-full overflow-auto"  @click="chooseDay(data.day),rtdata(data.day),changeData()">
                            <p class="font-black text-[26px] pb-[5px]" >{{ data.day.split('-').slice(2).join('-') }}</p>
                            <div v-for="(item,index) in showCalendarDataStyle[parseInt(data.day.split('-').slice(2).join('-'))]" :key="index">
                                <div v-if="reloadsecond">
                                    <div v-if="new Date(data.day).getMonth() == value.getMonth()" class="text-[14px]">{{ item }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-calendar>
            </div>
            <!-- 任务清单 -->
            <div id="list" class="my-[30px] overflow-auto relative" v-if="listopen %2 == 1" :style="dateStyle(0)">
                <div class="mx-[30px] my-[25px] flex flex-col text-[--theme-text-major-color]">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="flex mb-[10px] text-[24px] font-black select-none transition-all">{{  value.getFullYear() + "年" + (value.getMonth()+1) + "月" + value.getDate() + "日" }}</p>
                            <div class="flex h-full text-[12px] text-[--theme-text-major-color-tip]">
                                <p class="text-left">任务请勿重名喔，保存的任务日历点击按钮更新到任务清单中哦</p>
                            </div>
                        </div>
                        <div class="text-[--theme-text-major-color] font-black flex items-center select-none hover:text-[#e42a28]" @click="listopen=0,listdescopen=0,halfCheck=0,fullCheck=0">
                            <i class="iconfont" style="font-size: 24px;">&#xe65a;</i>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between w-full my-[5px] relative select-none transition-all " v-for="(item,index) in aimMainData" :key="index">
                            <div class="flex items-center">
                                <div class="bg-[--theme-background-major-color] flex items-center h-[35px] focus:outline-0 rounded cursor-pointer" @click="mainListChange(index),changeData()">
                                    <div class="w-[15px] h-[15px] ml-[2px] mr-[16px] rounded-3xl" :style="littleRoundStyleSet(index)"></div>
                                    <div class="h-full flex items-center">{{ item.name }}</div>
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
                       <div class="flex items-center justify-center my-[15px] select-none mx-[-15px] px-[15px] rounded-2xl" >
                            <div class="flex items-center">
                                <div class="h-full bg-[--theme-text-major-color-input] rounded-2xl mx-[20px]">
                                    <div class=" outline outline-2 w-[50px] h-[50px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center" @click="addMainList(),changeData()">
                                        <i class="iconfont" style="font-size: 40px;">&#xe606;</i>
                                    </div>
                                </div>
                                <div class="h-full bg-[--theme-text-major-color-input] rounded-2xl mx-[20px]">
                                    <div class="outline outline-2 w-[50px] h-[50px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center" @click="GetBack(),changeData()">
                                        <i class="iconfont activeSpecial" :style="runF5">&#xe603;</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 任务详细 -->
            <div id="listdesc" v-if="listdescopen%2 ==1" class="my-[30px] overflow-auto">
                <div class="mx-[30px] flex flex-col" v-if="(aimData != undefined)">
                    <!-- 任务详细头部 -->
                    <div class="flex justify-between items-center my-[25px]">
                        <p class="text-[--theme-text-major-color] text-[24px] font-black">
                            <input type="text" v-model="aimData.name" class="bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] ml-[-10px]" @keyup="namerule(aimData.name)" @blur="GetBack(),changeData()">
                        </p>
                        <div class="text-[--theme-text-major-color] font-black mx-[10px] flex items-center select-none hover:text-[#e42a28]" @click="listdescopen=0,fullCheck=0">
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
                    <!-- 时间起始 -->
                    <div class="flex overflow-hidden ">
                        <div class="flex text-[14px] mt-[15px] font-black overflow-hidden cursor-pointer select-none ">
                            <div class="w-[150px] h-[40px] bg-[--theme-text-major-color-input] mr-[10px] flex justify-center items-center rounded-3xl text-[--theme-text-major-color] hover:bg-[--theme-class-major-color-hover] active:text-[--theme-text-major-color-active]">
                                <div class="flex items-center justify-center">
                                    <el-date-picker
                                    v-model="setStartTime"
                                    type="date"
                                    placeholder="选择起始时间"
                                    prefix-icon="none"
                                    :clearable="false"
                                    @focus="getFirstStartTime"
                                    @change="checkStartTime"
                                    />
                                </div>
                            </div>
                        </div>
                        <p class="w-[30px] mt-[22px] mr-[5px] text-[--theme-text-major-color]">到</p>
                        <div class="flex text-[14px] mt-[15px] font-black overflow-hidden cursor-pointer select-none ">
                            <div class="w-[150px] h-[40px] bg-[--theme-text-major-color-input] mr-[10px] flex justify-center items-center rounded-3xl text-[--theme-text-major-color] hover:bg-[--theme-class-major-color-hover] active:text-[--theme-text-major-color-active]">
                                <div>
                                    <el-date-picker
                                    v-model="setEndTime"
                                    type="date"
                                    placeholder="选择结束时间"
                                    prefix-icon="none"
                                    :clearable="false"
                                    @focus="getFirstEndTime"
                                    @change="checkEndTime"
                                    />
                                </div>
                            </div>
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
                        <el-upload class="w-full min-w-[330px]" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple >
                            <div class="border-dotted border-2 border-[--theme-text-major-color] rounded">
                                <el-button color="--theme-background-major-color" class="w-full min-w-[330px]" type="primary">
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
@media screen and (orientation:portrait) {
    #phoneshow {flex-wrap:wrap;}
}

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

#date{
    height: 90vh;
    background-color: var(--theme-background-major-color);
    animation: init .6s 0s ease-out forwards;
    border-radius: 15px;
    margin-right: 15px;
    min-width: 400px;
}

#list{
    width: 30vw;
    height: 90vh;
    background-color: var(--theme-background-major-color);
    animation: init .6s 0.2s ease-out forwards;
    border-radius: 15px;
    opacity: 0;
    margin-right: 15px;
    max-width: 500px;
    min-width: 400px;
}

#listdesc{
    height: 90vh;
    background-color: var(--theme-background-major-color);
    animation: init .6s .2s ease-out forwards;
    border-radius: 15px;
    margin-right: 15px;
    max-width: 500px;
    min-width: 400px;
    opacity: 0;
}

::-webkit-scrollbar {
    display: none;
}

/* 日历前一个月修改 */
:deep(.el-calendar-table__row .prev .el-calendar-day)  {
    color: #4b4b4b!important;

}

/* 日历后一个月修改 */
:deep(.el-calendar-table__row .next .el-calendar-day)  {
    color: #4b4b4b!important;

}

/* 日历背景颜色 */
:deep(.el-calendar) {
    background-color: var(--theme-background-major-color);
}

/* 日历选中样式 */
:deep(.el-calendar-table .is-selected) {
    color: var(--theme-roloc);
    background-color: var(--theme-text-major-color-input)!important;
}

/* 日历hover样式 */
:deep(.el-calendar-table .el-calendar-day:hover) {
    color: var(--theme-roloc) !important;
    background-color: var(--theme-text-major-color-input) !important;
  }

/* 日历今天的样式 */
:deep(.is-today){
    color: var(--theme-main-color) !important;
}

/* 日历标题样式 */
:deep(.el-calendar__title) {
    color: var(--theme-roloc) !important;
    font-size: 18px;
    font-weight: bolder;
}

/* 星期颜色 */
:deep(.el-calendar-table thead th) {
    padding-top: 15px;
    padding-bottom: 15px;
    color: var(--theme-roloc);
}

/* 按钮颜色 */
:deep(button) {
    background-color: var(--theme-text-major-color-input);
}

:deep(button:hover) {
    background-color: #4b4b4b;
}

:deep(.el-calendar-day) {
    height: 120px;
}

.activeSpecial:active {
    color: var(--theme-main-color);
}

.datepicker {
    background-color: var(--theme-color);
}

:deep(.el-input__inner) {
    background-color: var(--theme-text-major-color-input);
    outline:none;
    border: 0;
}

:deep(.el-input__inner:hover) {
    background-color: var(--theme-class-major-color-hover);
}

:deep(.el-input__wrapper) {
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
}

:deep(.el-input__wrapper input) {
    width: 100px;
    height: 40px;
    border-radius: 50px;
    margin:0;
    padding-left:35px ;
    color: var(--theme-text-major-color);
}

:deep(.el-input__prefix) {
    width: 0;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper){
    height: 0px;
    width: 150px;
    background-color: var(--theme-text-major-color-input);
    margin-left: 0px;
}

:deep(.el-calendar__button-group) {
    opacity: 0;
    visibility: hidden;
}
</style>