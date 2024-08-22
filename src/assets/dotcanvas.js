import { ref, watch } from 'vue'; 
//绘制正弦波浪canvas
const wave = ref('')
const canvasWidth = ref(1920)
const canvasHeight = ref(790)
import { themeStore } from '/public/stores/theme';// 主题控制
const themeState = themeStore()
let dotcolor = themeState.themeChoose
watch(() => themeState.themeChoose, () => {
    dotcolor = themeState.themeChoose
})
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
            dotcolor ==2?context.fillStyle = "#ffffff":context.fillStyle = "#000000"
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

export { wave,canvasWidth,canvasHeight }