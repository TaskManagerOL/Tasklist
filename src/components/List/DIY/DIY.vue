<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch   } from 'vue'; 
import { events } from '../../../../EventBus/EventBus';

let DataClass = JSON.parse(localStorage.getItem("mainData"));
//写个变量存储选的主题
const themeChoose = ref(0)

const changeData = () => {
    reloadDate()
    localStorage.setItem("mainData", JSON.stringify(DataClass));
    emit()
    console.log("datas have updated");
}

const reload = ref(1)
//主题数量
const mainStyle = reactive([1, 0, 0, 0])

for (var i = 0; i < mainStyle.length; i++){
    mainStyle[i] = ""
}
mainStyle[DataClass.time.theme] = "border-color:#1296db"

//全局bus事件传递主题变化 来源mainPage
const emit = () => {
    let DataClass = JSON.parse(localStorage.getItem("mainData"));
    events.emit('theme', DataClass.time.theme )
}

emit()

const changeMainStyle = (val) => {
    for (var i = 0; i < mainStyle.length; i++){
        mainStyle[i] = ""
    }
    mainStyle[val] = "border-color:#1296db"
    themeChoose.value = val
    DataClass.time.theme = themeChoose.value
    emit()
}

//子任务主任务绑定
const bindMainSub = ref()
bindMainSub.value = DataClass.time.bindMainSub
//主题绑定
const bindTheme = ref()
bindTheme.value = DataClass.time.bindTheme
//主题绑定
const bindCalendar = ref()
bindCalendar.value = DataClass.time.bindCalendar

const reloadDate = () => {
    DataClass.time.bindMainSub = bindMainSub.value
    DataClass.time.bindTheme = bindTheme.value 
    DataClass.time.bindCalendar = bindCalendar.value
}

const bindThemeKill = ref(true)
const bindKill = () => {
    bindThemeKill.value = !DataClass.time.bindTheme
    emit()
}
bindKill()
</script>

<template>
    <div class="flex flex-col h-auto bg-[--theme-color]">
        <div v-if="reload"></div>
        <div class="flex w-auto flex-wrap mt-[30px] justify-center">
            <div id="list" class="my-[30px] overflow-auto" v-if="bindThemeKill">
                <div class="mx-[30px] my-[25px] flex flex-col text-[#959ba7]" >
                    <div class="flex items-center justify-center h-full text-[12px] mb-[20px]">
                        <p class="flex mb-[10px] text-[18px] select-none">{{ "自定义主题" }}</p>
                    </div>
                    <div class="w-full select-none flex flex-wrap">
                        <div class="flex items-center cursor-pointer mx-[25px] my-[10px]">
                            <div class="w-[40px] h-[40px] bg-[#252525] border-2 rounded-3xl" :style="mainStyle[0]" @click="changeMainStyle(0),changeData()"></div>
                            <p class="pl-[10px] text-[--theme-roloc]">暗色纯色主题</p>
                        </div>
                        <div class="flex items-center cursor-pointer mx-[25px] my-[10px]">
                            <div class="w-[40px] h-[40px] bg-[#ffffff] border-2 rounded-3xl" :style="mainStyle[1]" @click="changeMainStyle(1),changeData()"></div>
                            <p class="pl-[10px] text-[--theme-roloc]">亮色纯色主题</p>
                        </div>
                        <div class="flex items-center cursor-pointer mx-[25px] my-[10px]">
                            <div class="w-[40px] h-[40px] bg-[#252525] border-2 rounded-3xl overflow-hidden" :style="mainStyle[2]" @click="changeMainStyle(2),changeData()">
                                <div class="w-[8px] h-[8px] rounded-3xl bg-[#ffffff]"></div>
                                <div class="mx-[10px] w-[8px] h-[8px] rounded-3xl bg-[#ffffff]"></div>
                                <div class="mx-[20px] w-[8px] h-[8px] rounded-3xl bg-[#ffffff]"></div>
                                <div class="mx-[30px] w-[8px] h-[8px] rounded-3xl bg-[#ffffff]"></div>
                            </div>
                            <p class="pl-[10px] text-[--theme-roloc]">暗色点阵主题</p>
                        </div>
                        <div class="flex items-center cursor-pointer mx-[25px] my-[10px]">
                            <div class="w-[40px] h-[40px] bg-[#ffffff] border-2 rounded-3xl overflow-hidden" :style="mainStyle[3]" @click="changeMainStyle(3),changeData()">
                                <div class="w-[8px] h-[8px] rounded-3xl bg-[#252525]"></div>
                                <div class="mx-[10px] w-[8px] h-[8px] rounded-3xl bg-[#252525]"></div>
                                <div class="mx-[20px] w-[8px] h-[8px] rounded-3xl bg-[#252525]"></div>
                                <div class="mx-[30px] w-[8px] h-[8px] rounded-3xl bg-[#252525]"></div>
                            </div>
                            <p class="pl-[10px] text-[--theme-roloc]">亮色点阵主题</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="setting" class="my-[30px] overflow-auto">
                <div class="mx-[30px] my-[25px] flex flex-col text-[#959ba7]" >
                    <div class="flex items-center justify-center h-full text-[12px]">
                        <p class="flex mb-[10px] text-[18px] select-none">{{ "设置" }}</p>
                    </div>
                    <!-- 下面这里jstcenter添加有关设置之后再删掉 -->
                    <div class="w-full flex items-start">
                        <div class="select-none mx-[10px] flex flex-col justify-center items-center">
                            <p class="py-[15px] text-[20px]">任务清单有关设置</p>
                            <div class="flex items-center justify-between w-full" @click="changeData()">
                                <p class="text-[14px] px-[10px]">主任务与子任务是否绑定</p>
                                <el-switch v-model="bindMainSub" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                            </div>
                            <div class="flex items-center justify-between w-full" @click="changeData()">
                                <p class="text-[14px] px-[10px]">任务清单是否随着任务日历实时更新</p>
                                <el-switch v-model="bindCalendar" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                            </div>
                        </div>
                        <div class="select-none mx-[10px] flex flex-col justify-center items-center">
                            <p class="py-[15px] text-[20px] ">主题有关设置</p>
                            <div class="flex items-center justify-between w-full" @click="changeData(),bindKill()">
                                <p class="text-[14px] px-[10px]">页面主题是否跟随系统（仅适用于暗亮色）</p>
                                <el-switch v-model="bindTheme" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

@keyframes init {
    0% {
        opacity: 0;
        margin-top: 50px;
        height:85vh;
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
    opacity: 0;
    border-radius: 15px;
    margin-right: 15px;
    max-width: 500px;
    min-width: 400px;
    transition: all 0.5s ease-in-out;
}

#setting {
    width: 56vw;
    height: 90vh;
    background-color: var(--theme-background-major-color);
    animation: init .6s 0.2s ease-out forwards;
    opacity: 0;
    border-radius: 15px;
    margin-right: 15px;
    max-width: 800px;
    min-width: 400px;
    transition: all 0.5s ease-in-out;
}
</style>