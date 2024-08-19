const routes = [
    {
        path: '/:pathMatch(.*)',
        //访问主页的时候 重定向到index页面
        redirect: '/404',
    },
    {
        path: '/',
        name: 'HOME',
        component: () => import('../components/mainPage.vue'),
        redirect: "/todolist",
        children: [
            {
                path: '/todolist',
                name: 'List',
                component: () => import('../components/List/Todolist/KillTodo.vue'),
            },
            {
                path: '/daytodo',
                name: 'DayList',
                component: () => import('../components/List/DayTodo/DayTodo.vue'),
            },
            {
                path: '/taskcalendar',
                name: 'TaskCalendar',
                component: () => import('../components/List/TaskCalendar/TaskCalendar.vue'),
            },
            {
                path: '/mainlist',
                name: 'MainList',
                component: () => import('../components/List/MainList/MainList.vue'),
            },
            {
                path: '/diy',
                name: 'DIY',
                component: () => import('../components/List/DIY/DIY.vue'),
            },
            {
                path: '/getmore',
                name: 'GetMore',
                component: () => import('../components/List/GetMore/GetMore.vue'),
            }
        ]
    },
    {
        path: '/signin/agreement',
        name: 'agreement',
        component: () => import('../components/Sign/agreement.vue'),
    },
    {
        path: '/signin/qqcode',
        name: 'QQCode',
        component: () => import('../components/Sign/code_qq.vue'),
    },{
        path: '/signin/wechatcode',
        name: 'WechatCode',
        component: () => import('../components/Sign/code_wechat.vue'),
    },{
        path: '/signin/foundpassword',
        name: 'foundPsw',
        component: () => import('../components/Sign/forgotPsw.vue'),
    }, {
        path: '/404',
        name: '404',
        component: () => import('../components/Special/404.vue'),
    }
]
export default routes
