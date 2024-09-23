<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 

//本地暂存一下 后面造出后端了再说
//一个数据词条用于存储任务和任务分类——来自用户的数据库

let DataClass = JSON.parse(localStorage.getItem("mainData"));

//设置一个aimData常驻，用于展示用户所选取的数据词条

let aimData = ""
DataClass.MainList ? aimData = DataClass.MainList : []
console.log();

onMounted(() => {
    activeMakeList()
    console.log(aimData);

    if (aimData.length != 0) {
        if (!aimData[aimData.length - 1].name) {
            aimData.splice(aimData.length - 1, 1);
            subEdit.splice(aimData.length - 1, 1)
        }
    }
    closeSubList()
})

const reload = ref(1)
const SearchTest = ref(0)

const changeData = () => {
    if (SearchTest.value == 1) {
        GetBack()
        SearchTest.value = 0
    }
    reload.value = 0
    setTimeout(() => {
        reload.value = 1
    }, 0)
    DataClass.MainList = aimData
    localStorage.setItem("mainData", JSON.stringify(DataClass));
}

//控制编辑模块
const subEdit = reactive([])
const activeMakeList = () => {
    for (let index = 0; subEdit.length < aimData.length; index++){
        subEdit.push({
            titleEdit: 0,
            editStyle: "color:var(--theme-text-major-color)",
            addText: ""
        })
    }
}
activeMakeList()

const editStyleChange = (index) => {
    if (subEdit[index].titleEdit) {
        subEdit[index].titleEdit = 0
        subEdit[index].editStyle = "color:var(--theme-text-major-color)"
    } else {
        subEdit[index].titleEdit = 1
        subEdit[index].editStyle = "color:var(--theme-main-color)"
    }
}

//控制展开
const arrowmove = (index, val) => {
    if (!val) {
        aimData[index].move = 1
    } else {
        aimData[index].move = 0
        subEdit[index].titleEdit = 0
        subEdit[index].editStyle = "color:var(--theme-text-major-color)"
    }
    bigOpen()
}

//简单设置打开
const bigOpen = () => {
    activeMakeList()
    if (!aimData[aimData.length-1].name||aimData[aimData.length-1].sublist.length == 0) {
        subEdit[aimData.length-1].titleEdit = 1
        subEdit[aimData.length-1].editStyle = "color:var(--theme-main-color)"
    }
    for (let i = 0; i < aimData.length; i++){
        if (aimData[i].sublist.length == 0) {
            subEdit[i].titleEdit = 1
            subEdit[i].editStyle = "color:var(--theme-main-color)"
        }
    }
}
bigOpen()
//箭头旋转
const arrowStyle = (val) => {
    if (!val) {
        return "rotate: -90deg"
    } else {
        return "rotate: -180deg"
    }
}

//删除任务
const killData = (index) => {
    aimData.splice(index, 1);
    subEdit.splice(index, 1)
}

//删除项目
const killSubText = (index,i) => {
    aimData[index].sublist.splice(i, 1);
}

//添加项目
const addMianList = () => {
    if (aimData.length == 0) {
        subEdit.push({
            titleEdit: 1,
            editStyle: "color:var(--theme-main-color)",
            addText: ""
        })
        aimData.push({
            name: "",
            move: 0,
            sublist: []
        })
    } else if (aimData.length != 0) {
        if(aimData[aimData.length - 1].name) {
            aimData.push({
                name: "",
                move: 0,
                sublist: []
            })
            subEdit.push({
                titleEdit: 1,
                editStyle: "color:var(--theme-main-color)",
                addText: ""
            })
        }
    }
}

//添加任务
const addList = (index) => {
    if (subEdit[index].addText) {
        aimData[index].sublist.push({
            text: subEdit[index].addText
        })
    }
    subEdit[index].addText = ""
}

//检测修改是否为空
const EmptyBack = ref("")
const textEmpty = (index, val, i,num) => {
    if (!val && EmptyBack && num == 1) {
        aimData[index].name = EmptyBack.value
    } else if(!val && EmptyBack && num == 2){
        aimData[index].sublist[i].text = EmptyBack.value
    }
}

//回车输入文本检测
const enterAdd = (index) => {
    document.addEventListener("keyup", function(e) {
        if (e.key == "Enter") {
            addList(index)
        }
    })
}

//浏览模式
const LookingTime = () => {
    if (!aimData[aimData.length - 1].name) {
        aimData.splice(aimData.length - 1, 1);
        subEdit.splice(aimData.length - 1, 1)
    }
    for (let i = 0; i < subEdit.length; i++) {
        subEdit[i].titleEdit = 0
        subEdit[i].editStyle = "color:var(--theme-text-major-color)"
    }
    for (let i = 0; i < aimData.length; i++) {
        aimData[i].move = 0
    }
    bigOpen()
}

//一键收起
const closeSubList = () => {
    if (!aimData[aimData.length - 1].name) {
        aimData.splice(aimData.length - 1, 1);
        subEdit.splice(aimData.length - 1, 1)
    }
    for (let i = 0; i < aimData.length; i++) {
        aimData[i].move = 1
    }
}

//搜索功能
const SearchText = ref("")
const SearchData = (val) => {
    SearchTest.value = 1
    const reg = RegExp(val);
    for (let i = 0; i < aimData.length; i++){
        if (!reg.test(aimData[i].name)) {
            aimData.splice(i, 1)
            subEdit.splice(i, 1)
            i--
        }
    }
    SearchText.value = ""
}

const runF5 = ref('font-size:22px;rotate: 0deg')
const runTime = ref(0)
const GetBack = () => {
    runTime.value++
    runF5.value = "font-size:22px;rotate:" + runTime.value * 180 + "deg"
    DataClass = JSON.parse(localStorage.getItem("mainData"));
    aimData = DataClass.MainList
    bigOpen()
    activeMakeList()
}

const transition = (index) => {
    if (!aimData[aimData.length - 1].name) { 
        return "animation-delay:0s"
    } else {
        return "animation-delay:" + index*0.2 + "s"
    }
}
</script>

<template>
    <div class="w-full h-full flex flex-col relative overflow-auto">
        <!-- 数据更新函数 -->
        <div v-if="reload"></div>
        <div class="w-full h-[50px] bg-[--theme-background-major-color] rounded-xl mt-[30px] mx-[10vw] flex items-center overflow-hidden min-w-[270px] max-w-[700px] select-none" id="topall">
            <!-- 功能键 -->
            <div class="h-[20px] flex items-center mx-[10px]" id="button">
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" title="点击清除已完成清单" @click="LookingTime(),changeData()">
                    <i class="iconfont" style="font-size: 20px;">&#xe67a;</i>
                    <p class="mx-[5px] w-[90px] font-black">浏览模式</p>
                </div>
                <div class="mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]" @click="closeSubList(),changeData()" title="点击开启/关闭任务详细">
                    <i class="iconfont" style="font-size: 22px;">&#xe68b;</i>
                    <p class="mx-[5px] w-[70px] font-black">一键收起</p>
                </div>
            </div>
            <!-- 搜索栏 -->
            <div class="h-[20px] flex items-center" style="border-left: 1px solid --theme-text-major-color-active;" id="search">
                <div class="flex items-center ml-[20px]">
                    <input type="text" placeholder="请输入关键字" v-model="SearchText" class="my-[5px] text-[--theme-text-major-color] w-[300px] bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded pl-[10px] pr-[50px] focus:bg-[--theme-class-major-color-hover] rounded-2xl ml-[5px]">
                </div>
                <div class="flex">
                    <div class="mx-[10px]" @click="SearchData(SearchText)">
                            <i class="iconfont activeSpecial" style="font-size:22px">&#xe611;</i>
                        </div>
                    <div class="mx-[10px]" @click="GetBack()">
                        <i class="iconfont activeSpecial" :style="runF5">&#xe603;</i>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主页面 -->
        <div class="flex flex-wrap items-start h-[90vh] ml-[10vw] text-left">
            <!-- 显示任务 -->
            <div class="mt-[30px] mr-[20px] flex transition-all" v-for="(item,index) in aimData" :key="index">
                <div class="h-[360px] bg-[--theme-background-major-color] overflow-hidden rounded-2xl flex transition-all" id="transition" :style="transition(index)">
                    <!-- 左侧 -->
                    <div class="h-full px-[5px] w-[45px] flex flex-col items-center justify-between relative">
                        <div class="w-[20px] h-full overflow-hidden top-[10px]" style="word-break: break-all">
                            <p class="w-[20px] h-full my-[10px] text-[--theme-text-major-color] bg-[--theme-background-major-color] overflow-auto">{{ item.name }}</p>
                        </div>
                        <div class="mb-[15px] mt-[20px] bottom-[10px] select-none">
                            <i class="iconfont" v-if="!item.move" @click="editStyleChange(index),changeData()" :style="subEdit[index].editStyle">&#xe602;</i>
                            <br>
                            <i class="iconfont" @click="arrowmove(index,item.move),changeData()" :style="arrowStyle(item.move)">&#xe682;</i>
                        </div>
                    </div>
                    <!-- 右侧 -->
                    <div class="flex flex-col border-solid border-l-2 border-[--theme-class-major-color-hover] justify-start overflow-auto" v-if="!item.move">
                        <!-- edit部分 -->
                        <div class="flex w-full items-center justify-between relative select-none bg-[--theme-text-major-color-input]" v-if="subEdit[index].titleEdit">
                            <div class="flex flex-col h-[35px] mr-[20px]">
                                <input name="label" placeholder="请输入项目名称" class="text-[--theme-text-major-color] w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded pl-[10px] pr-[50px] focus:bg-[--theme-class-major-color-hover] rounded-2xl ml-[5px]" type="text" v-model="item.name" @focus="EmptyBack = item.name" @blur="textEmpty(index,item.name,0,1),changeData()"/>
                                <label for="label" class="h-0 invisible opacity-0 px-[20px]">{{ item.name }}</label>
                            </div>
                            <div class="w-[24px] mr-[18px] cursor-pointer text-[22px]">
                                <i class="iconfont hoverSpecial" style="font-size:22px;" @click="killData(index),changeData()">&#xe65a;</i>
                            </div>
                        </div>
                        <!-- 子任务 -->
                        <div class="w-full">
                            <div class="flex items-center my-[5px] relative justify-between select-none bg-[--theme-background-major-color] mr-[5px] pr-[15px] rounded-r-2xl" v-for="(item,i) in aimData[index].sublist" :key="i">
                                <div class="flex flex-col w-full h-[35px]">
                                    <input type="text" name="label" :disabled="!subEdit[index].titleEdit" v-model="item.text" class="text-[--theme-text-major-color] w-full bg-[--theme-background-major-color] h-[35px] focus:outline-0 rounded pl-[10px] pr-[50px] focus:bg-[--theme-text-major-color-input] rounded-2xl ml-[5px]" @focus="EmptyBack = item.text" @blur="textEmpty(index,item.text,i,2),changeData()"/>
                                    <!-- 做一个隐藏label用于撑大input -->
                                    <label for="label" class="h-0 invisible opacity-0 px-[20px]">{{ item.text }}</label>
                                </div>
                                <div class="w-[24px] ml-[20px] cursor-pointer text-[22px]" @click="killSubText(index,i),changeData()" v-if="subEdit[index].titleEdit">
                                    <i class="iconfont" style="font-size: 22px;">&#xe601;</i>
                                </div>
                            </div>
                            <!-- 添加任务 -->
                            <div class="flex items-center justify-between my-[5px] relative select-none bg-[--theme-text-major-color-input] mx-[5px] pr-[15px] rounded-2xl" v-if="subEdit[index].titleEdit">
                                <input type="text" v-model="subEdit[index].addText" placeholder="添加新的文本" class="text-[--theme-text-major-color] w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded pl-[10px] mr-[15px] focus:bg-[--theme-class-major-color-hover] rounded-2xl" @keyup="enterAdd(index),changeData()"/>
                                <div class="w-[22px] h-full">
                                    <div class="w-[24px] cursor-pointer text-[22px]" @click="addList(index,i),changeData()">
                                        <i class="iconfont" style="font-size: 22px;">&#xe606;</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 添加任务 -->
            <div class="h-[360px] w-[310px] mt-[30px] border-dotted border-[3px] border-[--theme-class-major-color-hover] overflow-hidden rounded-2xl flex items-center justify-center cursor-pointer select-none" @click="addMianList(),changeData()">
                <div class="h-[200px] w-[200px] rounded-full border-dotted border-[--theme-class-major-color-hover] border-[3px] relative flex items-center">
                    <div class="h-[120px] w-[30px] absolute left-[85px] top-[40px] bg-[--theme-class-major-color-hover] rounded-3xl"></div>
                    <div class="h-[30px] w-[120px] absolute left-[40px] top-[85px] bg-[--theme-class-major-color-hover] rounded-3xl"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media screen and (min-width: 550px) and (max-width: 860px) {
    #topall {width: 420px;}
    #button { margin:0;width: 0;opacity: 0;}
	#search { opacity: 1; }
}

@media screen and (min-width: 0px) and (max-width: 550px) {
    #topall { width: 280px;margin-left: 100px;}
    #button { opacity: 1;}
	#search { margin:0;width: 0;opacity: 0; }
}

/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4008251 */
  src: url('//at.alicdn.com/t/c/font_4008251_fag0a4v27m.woff2?t=1692193511461') format('woff2'),
       url('//at.alicdn.com/t/c/font_4008251_fag0a4v27m.woff?t=1692193511461') format('woff'),
       url('//at.alicdn.com/t/c/font_4008251_fag0a4v27m.ttf?t=1692193511461') format('truetype');
}

.iconfont{
    font-family:"iconfont" !important;
    font-size:14px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: var(--theme-text-major-color);
    transition: all .3s ease-out;
    user-select: none;
    display: block;
}

@keyframes init {
    0% {
        opacity: 0;
        margin-top: 50px;
    }
    100% {
        opacity: 1;
        margin-top: 0px;
    }
}

#transition{
    animation: init .6s 0s ease-out forwards;
    opacity: 0;
}

.hoverSpecial:hover {
    color: #e42a28;
}

.activeSpecial:active {
    color: var(--theme-main-color);
}

::-webkit-scrollbar {
    display: none;
}
</style>