const updateData = [{
    version: "0.0.1",
    date: "2023.09.04",
    bug: [],
    optimize: [],
    update: ["Tasklist从2023年9月3号起可以简易使用，此版本所有任务存储在本地。","此版本无法适配移动端。","此版本无法第三方登录，无法注册，无法找回密码，登录功能只是能使用，与Tasklist的基础功能并不挂钩。","此版本所有数据只是保存到本地，cookie被清除后所有任务将会被清除。","数据是不安全的，请不要在这里写很重要的数据。"]
},{
    version: "0.1.1",
    date: "2023.11.12",
    bug: ["绑定遍历错误删除问题", "添加文件按钮错位问题", "修复日历删除错误", "修复日历显示错误"],
    optimize: ["更改任务文字描述增加用户体验", "杂项安排功能栏自适应优化", "任务清单功能栏自适应优化", "任务删除按钮判定范围增大"],
    update: ["添加主题随浏览器切换功能(已加入风格选择)","添加日历与任务清单绑定功能(已加入风格选择)"]
}, {
    version: "1.0.1",
    date: "2023.11.30",
    bug: [],
    optimize: ["部署方式优化"],
    update: ["添加F12彩蛋"]
}, {
    version: "1.0.2",
    date: "2023.11.30",
    bug: ["紧急修正图标展示bug"],
    optimize: [],
    update: []
}, {
    version: "1.0.3",
    date: "2023.12.01",
    bug: [],
    optimize: [],
    update: ["封装更新展示页面","侧边栏全屏模式","科协用户一键签到签退功能"]
}, {
    version: "1.1.0",
    date: "2024.08.18",
    bug: ["scope造成边栏错位问题"],
    optimize: ["登录注册页面路由优化","注册登录页面结构优化"],
    update: ["注册逻辑完善部分","注册登录页面svg制作"]
}, {
    version: "1.1.1",
    date: "2024.08.19",
    bug: [],
    optimize: [],
    update: ["注册登录页面视差滚动制作","隐私政策","登录逻辑完善部分"]
}, {
    version: "1.1.2",
    date: "2024.08.20",
    bug: [],
    optimize: [],
    update: ["vercel重部署"]
}, {
    version: "1.1.3",
    date: "2024.09.01",
    bug: [],
    optimize: ["路由重构","重构submain部分","重构更换部分MITT为Pinia"],
    update: []
},{
    version: "1.1.4",
    date: "2024.09.10",
    bug: [],
    optimize: [],
    update: ["submain处icon更新","token认证"]
},{
    version: "1.1.5",
    date: "2024.09.20",
    bug: [],
    optimize: [],
    update: ["info创建成功，现在用户可以自由切换昵称和头像啦！"]
},{
    version: "1.1.6",
    date: "2024.09.24",
    bug: [],
    optimize: [],
    update: ["初期后端完成"]
}]
updateData.reverse();
export default updateData