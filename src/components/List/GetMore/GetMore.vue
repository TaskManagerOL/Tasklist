<script setup>

</script>

<template>
    <div class="text-[--theme-text-major-color] bg-[--theme-color] w-full flex flex-col h-full overflow-auto">
        <div class="flex">发现问题请联系QQ:1975771886 十分感谢</div>
        <div class="my-[10px] mx-[10px] relative flex flex-col items-start">
            <div class="flex items-end">
                <p class="text-[22px] flex">0.0.1</p>
                <p class="text-[10px] flex">[2023.09.04]</p>
            </div>
            <div class="ml-[2rem] flex flex-col items-start">
                <p>Tasklist从9月3号起可以简易使用，此版本所有任务存储在本地。</p>
                <p>此版本无法适配移动端。完成度排序可能有bug，但是只出现过一次。</p>
                <p>此版本无法第三方登录，无法注册，无法找回密码，登录功能只是能使用，与Tasklist的基础功能并不挂钩。</p>
                <p>此版本所有数据只是保存到本地，cookie被清除后所有任务将会被清除。</p>
                <p>数据是不安全的，请不要在这里写很重要的数据。</p>
            </div>
        </div>
        <div class="my-[10px] mx-[10px] relative flex flex-col items-start">
            <div class="flex items-end">
                <p class="text-[22px] flex">0.1.1</p>
                <p class="text-[10px] flex">[2023.11.12]</p>
            </div>
            <div class="ml-[2rem] flex flex-col items-start">
                <div class="text-left">
                    <p>优化:</p>
                    <div class="ml-[2rem]">
                        <p>更改任务文字描述增加用户体验</p>
                        <p>杂项安排功能栏自适应优化</p>
                        <p>任务清单功能栏自适应优化</p>
                        <p>任务删除按钮判定范围增大</p>
                    </div>
                </div>
                <div class="text-left">
                    <p>修复bug:</p>
                    <div class="ml-[2rem]">
                        <p>绑定遍历错误删除问题</p>
                        <p>添加文件按钮错位问题</p>
                        <p>修复日历删除错误</p>
                        <p>修复日历显示错误</p>
                    </div>
                </div>
                <div class="text-left">
                    <p>更新:</p>
                    <div class="ml-[2rem]">
                        <p>添加主题随浏览器切换功能(已加入风格选择)</p>
                        <p>添加日历与任务清单绑定功能(已加入风格选择)</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-[10px] mx-[10px] relative flex flex-col items-start">
                <div class="flex items-end">
                    <p class="text-[22px] flex">1.0.1</p>
                    <p class="text-[10px] flex">[2023.11.30]</p>
                </div>
                <div class="ml-[2rem] flex flex-col items-start">
                    <div class="text-left">
                        <p>优化:</p>
                        <div class="ml-[2rem]">
                            <p>部署方式优化</p>
                        </div>
                    </div>
                    <div class="text-left">
                        <p>更新:</p>
                        <div class="ml-[2rem]">
                            <p>添加F12彩蛋</p>
                        </div>
                    </div>
                </div>
            </div>
        <div class="my-[10px] mx-[10px] relative flex flex-col items-start">
            <p class="text-[22px] flex">版本更新预计项目</p>
            <div class="ml-[2rem] flex flex-col items-start">
                <div class="ml-[2rem] flex flex-col items-start">
                    <p>修复bug:每日任务在某种情况下会划掉（好像是任务清单划掉就会）</p>
                    <p>更新:科协用户签到签退功能</p>
                    <p>更新:分类:作业</p>
                    <p>更新:自定义:添加词汇自动适配分类。</p>
                    <p>更新:sidebar加上全屏</p>
                    <p>更新:移动端适配问题</p>
                    <p>更新:任务清单页面的任务查找</p>
                    <p>优化:任务清单页面:以及右侧sublist的自由排序</p>
                    <p>优化:子任务太多内容展示不完整问题</p>
                    <p>优化:添加任务主题、添加备注限定字数</p>
                    <p>优化:绑定更多键盘事件方便使用</p>
                </div>
                <p>优化:加载页面及进入加载所有页面</p>
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
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>