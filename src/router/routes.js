const routes = [
    {
        path: '/:pathMatch(.*)',
        //访问主页的时候 重定向到index页面
        redirect: '/404',
    },
    {
        path: '/',
        name: 'HOME',
        component: () => import('../views/mainPage.vue'),
        redirect: "/todolist",
        children: [
            {
                path: '/todolist',
                name: 'List',
                component: () => import('../views/list/KillTodo.vue'),
            },
            {
                path: '/daytodo',
                name: 'DayList',
                component: () => import('../views/day/DayTodo.vue'),
            },
            {
                path: '/taskcalendar',
                name: 'TaskCalendar',
                component: () => import('../views/calendar/TaskCalendar.vue'),
            },
            {
                path: '/mainlist',
                name: 'MainList',
                component: () => import('../views/other/MainList.vue'),
            },
            {
                path: '/diy',
                name: 'DIY',
                component: () => import('../views/diy/DIY.vue'),
            },
            {
                path: '/getmore',
                name: 'GetMore',
                component: () => import('../components/doc/GetMore.vue')
            },
            {
                path: '/sign',
                name: 'Sign',
                component: () => import('../views/login/SignIn.vue'),
                children: [
                    {
                        path: '/sign/agreement',
                        name: 'agreement',
                        component: () => import('../components/doc/agreement.vue'),
                    },
                    // {
                    //     path: '/signin/foundpassword',
                    //     name: 'foundPsw',
                    //     component: () => import('../components/Sign/forgotPsw.vue'),
                    // },
                ]
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
    }
]
export default routes
