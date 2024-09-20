<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import updateData from '../../assets/utils/version'

let DataClass = JSON.parse(localStorage.getItem("mainData"));
const inputID = ref(DataClass.time.studyID)
const sign = () => {
    DataClass.time.studyID = inputID.value;
    localStorage.setItem("mainData", JSON.stringify(DataClass));
}
</script>

<template>
    <div class="text-[--theme-text-major-color] bg-[--theme-color] w-full flex flex-col h-full overflow-auto">
        <div class="flex">发现问题请email或issue 十分感谢</div>
        <div class="flex">
            <input v-model="inputID" @blur="sign()" type="num" placeholder="科协人员在此处输入学号（输入一次即可）" class="bg-[#000000] text-[#ffffff] w-[20rem]">
        </div>
        <div class="my-[10px] mx-[10px] relative flex flex-col items-start">
            <p class="text-[22px] flex">版本更新预计项目</p>
            <div class="ml-[2rem] flex flex-col items-start">
                <div class="ml-[2rem] flex flex-col items-start">
                    <p>更新:分类:作业</p>
                    <p>更新:自定义:添加词汇自动适配分类。</p>
                    <p>更新:移动端适配问题</p>
                    <p>更新:任务清单页面的任务查找</p>
                    <p>更新:主页面：添加任务时点选很难受，加入一个输入自动选择的快捷方法如（name+w+9）即表示添加一个name任务，分类工作，优先度9</p>
                    <p>更新:自定义:添加自动排序</p>
                    <p>优化:代码优化，有点太乱了</p>
                    <p>优化:任务清单页面:以及右侧sublist的自由排序</p>
                    <p>优化:子任务太多内容展示不完整问题</p>
                    <p>优化:添加任务主题、添加备注限定字数</p>
                    <p>优化:绑定更多键盘事件方便使用</p>
                </div>
                <p>优化:加载页面及进入加载所有页面</p>
                <p>Bug:手机端开电脑显示出现canvas错位问题</p>
                <p>Bug:进入路由重定向失败问题</p>
                <p>更新:新增草稿纸页面，用于乱涂乱画乱写东西。（canvas）</p>
                <p>更新:自定义:任务清单页面增加选择时间功能</p>
                <p>更新:自定义:任务清单添加任务自动跳转descopen</p>
                <p>更新:自定义:任务日历预提醒</p>
                <p>更新:自定义:用户预设添加任务后的配置（优先级等）</p>
                <p>更新:任务导出功能（加密）</p>
                <p>更新:后端连接问题及文件上传问题</p>
                <p>更新:多用户处理（预方向）</p>
                <p>更新:添加404页面游戏种类(5x5)(7x7)以及自由上传图片</p>
                <p>更新:添加任务提醒功能</p>
                <p>更新:添加任务清单任务下备注显示子任务（加入自定义）</p>
                <p>更新:添加使用指南模块</p>
                <p>更新:添加spline背景</p>
            </div>
        </div>
        <div class="my-[10px] mx-[10px] relative flex flex-col items-start" v-for="(item,index) in updateData" :key="index">
            <div class="flex items-end">
                <p class="text-[22px] flex">{{ item.version }}</p>
                <p class="text-[10px] flex">[{{ item.date }}]</p>
            </div>
            <div class="ml-[2rem] flex flex-col items-start">
                <div class="text-left" v-if="item.optimize.length">
                    <p>优化:</p>
                    <div class="ml-[2rem]">
                        <p v-for="(i,num) in item.optimize" :key="num">{{ i }}</p>
                    </div>
                </div>
                <div class="text-left" v-if="item.bug.length">
                    <p>修复bug:</p>
                    <div class="ml-[2rem]">
                        <p v-for="(i, num) in item.bug" :key="num">{{ i }}</p>
                    </div>
                </div>
                <div class="text-left" v-if="item.update.length">
                    <p>更新:</p>
                    <div class="ml-[2rem]">
                        <p v-for="(i, num) in item.update" :key="num">{{ i }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>
