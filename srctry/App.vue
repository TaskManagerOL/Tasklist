<template>
  <router-view></router-view>
  
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute();
const $router = useRouter()
const routerlink = (val) => {
    $router.push({path:val});
}

let DataSaver = reactive({
    time: {
        day: 0,
        month: 0,
        year: 0,
        userID: "登录/注册",
        studyID: "",
        primeID: "",
        theme: 0,
        bindMainSub: false,
        bindTheme: false,
        bindCalendar: false,
    },
    tableData: [{
            taskclass: "tableData",
            name: "欢迎使用Tasklist",  //任务名称
            class: "工作",      //任务分类（工作/生活）
            index: 10,    //任务重要程度标签
            note: "Tasklist还没长大，请多包涵",     //笔记内容
            subaim: [{      //子步骤内容和index以及移除状态
                text: "但是tasklist永远是最棒的",
                remove: 0 //0未被移除1被移除
            }],
            document: {   //文件

            },
            remove: 0   //是否完成（用于划线）
    }],
    DataTask: [{
            taskclass: "DataTask",
            name: "喝水",  //任务名称
            class: "生活",      //任务分类（工作/生活）
            index: 10,    //任务重要程度标签
            note: "保持健康",     //笔记内容
            subaim: [{      //子步骤内容和index以及移除状态
                text: "当你看见这段文字时请你去喝一杯水",
                remove: 0 //0未被移除1被移除
            }],
            document: {   //文件

            },
            remove: 0   //是否完成（用于划线）
        }, {
            taskclass: "DataTask",
            name: "吃饭",  //任务名称
            class: "生活",      //任务分类（工作/生活）
            index: 10,    //任务重要程度标签
            note: "保持健康",     //笔记内容
            subaim: [{      //子步骤内容和index以及移除状态
                text: "千万不要忘记吃饭",
                remove: 0 //0未被移除1被移除
            }],
            document: {   //文件

            },
            remove: 0   //是否完成（用于划线）
            
            }],
    MainList: [{
        name: "这里是杂项",
        move: 0,
        sublist: [{
            text: "一只绵羊"
        },{
            text: "两只绵羊"
        },{
            text: "三只绵羊"
        },{
            text: "四只绵羊"
        },{
            text: "五只绵羊"
        }],
               
    }],
    Calendar: [{
        startTime: new Date("2023-09-03"),
        endTime: new Date("2023-09-03"),
        taskclass: "Calendar",
        name: "今天是tasklist诞生的日子✨",  //任务名称
        class: "工作",      //任务分类（工作/生活）
        index: 10,    //任务重要程度标签
        note: "😶‍🌫️",     //笔记内容
        subaim: [{      //子步骤内容和index以及移除状态
            text: "",
            remove: 0 //0未被移除1被移除
        }],
        document: {   //文件

        },
        remove: 0,  //是否完成（用于划线）
    }]
})
if ((localStorage.getItem("mainData"))==null) {
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
