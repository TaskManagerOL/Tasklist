const routes = [
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    },
    {
        path: '/',
        name: 'HOME',
        component: () => import('../views/mainPage.vue'),
        redirect: "/todolist",
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('../views/user/userInfo.vue'),
            },
            {
                path: 'todolist',
                name: 'List',
                component: () => import('../views/list/killTodo.vue'),
            },
            {
                path: 'daytodo',
                name: 'DayList',
                component: () => import('../views/day/dayTodo.vue'),
            },
            {
                path: 'taskcalendar',
                name: 'TaskCalendar',
                component: () => import('../views/calendar/taskCalendar.vue'),
            },
            {
                path: 'mainlist',
                name: 'MainList',
                component: () => import('../views/other/mainList.vue'),
            },
            {
                path: 'diy',
                name: 'DIY',
                component: () => import('../views/diy/DIY.vue'),
            },
            {
                path: 'getmore',
                name: 'GetMore',
                component: () => import('../components/doc/getMore.vue')
            },
            {
                path: 'sign',
                name: 'Sign',
                component: () => import('../views/login/signIn.vue'),
                children: [
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
        path: '/agreement',
        name: 'agreement',
        component: () => import('../components/doc/agreement.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
    }
]
export default routes
