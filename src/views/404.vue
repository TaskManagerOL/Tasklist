<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute();
const $router = useRouter()
const routerlink = (val) => {
    $router.push({name:val});
}

const reload = ref(0)
const gameMode = ref('3x3')
//多添一行快速解决数组溢出
const gamePosition3x3 = [[1, 2, 3], [4, 5, 6], [7, 8, 0],[]]
const imgId = (x,y) => {
    return "div" + gamePosition3x3[x][y];
}

//判断获胜
const victoryjudge = (val) => {
    let saver = []
    let isP = 0
    for (let i = 0; i < val.length; i++){
        for (let j = 0; j < val[i].length; j++){
            saver.push(val[i][j])
        }
    }
    for (let i = 0; i < saver.length; i++) {
        if (saver[i] == 0) {
            saver[i] = saver[i-1]+1
        }
    }
    for (let i = 0; i < saver.length-1; i++) {
        if (saver[i] == saver[i + 1] - 1) {
            isP = 1
        } else {
            isP = 0
            break;
        }
    }
    if (isP == 1) {
        alert("win");
    }
    reload.value = 1 
    setTimeout(() => {
        reload.value = 0  
    });
}

//3x3移动规则
const move3x3 = (x, y) => {
    let saver = 0
    if (gamePosition3x3[x][y] != 0) {
        if (gamePosition3x3[x][y + 1] == 0) {
            saver = gamePosition3x3[x][y]
            gamePosition3x3[x][y] = gamePosition3x3[x][y + 1]
            gamePosition3x3[x][y + 1] = saver
        } else if (gamePosition3x3[x][y - 1] == 0) {
            saver = gamePosition3x3[x][y]
            gamePosition3x3[x][y] = gamePosition3x3[x][y - 1]
            gamePosition3x3[x][y - 1] = saver
        } else if (gamePosition3x3[x + 1][y] == 0) {
            saver = gamePosition3x3[x][y]
            gamePosition3x3[x][y] = gamePosition3x3[x + 1][y]
            gamePosition3x3[x + 1][y] = saver
        } else if (gamePosition3x3[x - 1][y] == 0) {
            saver = gamePosition3x3[x][y]
            gamePosition3x3[x][y] = gamePosition3x3[x - 1][y]
            gamePosition3x3[x - 1][y] = saver
        }
    }
    victoryjudge(gamePosition3x3)
    reload.value = 1 
    setTimeout(() => {
        reload.value = 0  
    });
}
//3x3随机
const randomSuccess = ref(0)

const random3x3 = () => {
    let count = 0
    let saver = []
    for (let i = 0; i < 8 ; i++) {
        saver.push(Math.ceil(Math.random() * 9))
        for (let j = 0; j < saver.length-1; j++){
            if (saver[saver.length-1] == saver[j]) {
                saver.pop()
                i--
            }
        }
    }
    //确保有解
    for (let z = 0; z < saver.length; z += 2){
        if (saver[z] > saver[z + 1]) {
            count++
        }
    }
    if (count % 2 == 1) {
        saver.push(0)
        gamePosition3x3[0][0] = saver[0]
        gamePosition3x3[0][1] = saver[1]
        gamePosition3x3[0][2] = saver[2]
        gamePosition3x3[1][0] = saver[3]
        gamePosition3x3[1][1] = saver[4]
        gamePosition3x3[1][2] = saver[5]
        gamePosition3x3[2][0] = saver[6]
        gamePosition3x3[2][1] = saver[7]
        gamePosition3x3[2][2] = saver[8]
        reload.value = 1 
        setTimeout(() => {
            reload.value = 0  
        });
        randomSuccess.value = 1
    }
}
while (randomSuccess.value != 1) {
    random3x3()
}
const move = (x,y) => {
    if (gameMode.value == "3x3") {
        move3x3(x,y)
    }
}
</script>

<template>
    <div class="w-[100vw] flex items-center justify-center h-[100vh] bg-[--theme-color]">
        <div v-if="reload"></div>
        <div class="w-[800px] h-[700px] flex flex-col items-center">
            <p class="text-[--theme-roloc] py-[50px]">此网页不存在喔，来玩玩小游戏吧 (出现无解时请刷新页面)</p>
            <div class="w-[420px] h-[420px] select-none mb-[20px]">
                <div class="flex">
                    <div :id="imgId(0,0)" class="w-[140px] h-[140px]" @click="move(0,0)"></div>
                    <div :id="imgId(0,1)" class="w-[140px] h-[140px]" @click="move(0,1)"></div>
                    <div :id="imgId(0,2)" class="w-[140px] h-[140px]" @click="move(0,2)"></div>
                </div>
                <div class="flex">
                    <div :id="imgId(1,0)" class="w-[140px] h-[140px]" @click="move(1,0)"></div>
                    <div :id="imgId(1,1)" class="w-[140px] h-[140px]" @click="move(1,1)"></div>
                    <div :id="imgId(1,2)" class="w-[140px] h-[140px]" @click="move(1,2)"></div>
                </div>
                <div class="flex">
                    <div :id="imgId(2,0)" class="w-[140px] h-[140px]" @click="move(2,0)"></div>
                    <div :id="imgId(2,1)" class="w-[140px] h-[140px]" @click="move(2,1)"></div>
                    <div :id="imgId(2,2)" class="w-[140px] h-[140px]" @click="move(2,2)"></div>
                </div>
            </div>
            <div class="flex w-[420px] justify-between">
                <div class="text-[--theme-text-major-color] text-[20px] font-black flex">
                    <p>切换难度(暂未完善):</p>
                    <p class="pl-[20px]">{{ "3x3" }}</p>
                </div>
                <div class="text-[--theme-text-major-color] text-[20px] font-black flex cursor-pointer"  @click="routerlink('HOME')">
                    <i class="iconfont">&#xe72e;</i>
                    <p class="pl-[10px]">返回</p>
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
}

#div1 {
    background-image: url(/game400.png);
    background-position: 0 0;
    border: 1px solid;
    cursor: pointer;
}

#div2 {
    background-image: url(/game400.png);
    background-position: -140px 0;
    border: 1px solid;
    cursor: pointer;
}

#div3 {
    background-image: url(/game400.png);
    background-position: -280px 0;
    border: 1px solid;
    cursor: pointer;
}

#div4 {
    background-image: url(/game400.png);
    background-position: 0 -140px;
    border: 1px solid;
    cursor: pointer;
}

#div5 {
    background-image: url(/game400.png);
    background-position: -140px -140px;
    border: 1px solid;
    cursor: pointer;
}

#div6 {
    background-image: url(/game400.png);
    background-position: -280px -140px;
    border: 1px solid;
    cursor: pointer;
}

#div7 {
    background-image: url(/game400.png);
    background-position: 0 -280px;
    border: 1px solid;
    cursor: pointer;
}

#div8 {
    background-image: url(/game400.png);
    background-position: -140px -280px;
    border: 1px solid;
    cursor: pointer;
}

#div9 {
    background-image: url(/game400.png);
    background-position: -280px -280px;
    border: 1px solid;
    cursor: pointer;
}

#div0 {
    background-color: #fff;
    border: 1px solid;
}
</style>