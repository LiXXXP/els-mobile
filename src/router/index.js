import { createRouter, createWebHashHistory } from "vue-router"
import { isMobile } from '@/scripts/utils'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        component: () => import('@/components/index'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/components/home/index')
            },
            {
                path: '/match',
                name: 'match',
                component: () => import('@/components/match/index')
            },
            {
                path: '/match/detail',
                name: 'matchDetail',
                component: () => import('@/components/match/detail')
            },
            {
                path: '/mean',
                name: 'mean',
                component: () => import('@/components/mean/index')
            },
            {
                path: '/mean/detail',
                name: 'meanDetail',
                component: () => import('@/components/mean/detail')
            },
        ]
    },
    {
        path: '/match/game',
        name: 'game',
        component: () => import('@/components/game/index')
    }
]

const router = createRouter({
	history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {

//     // if(isMobile(true)) {
//     //     if(window.location.host !== 'm.esportlivescore.cn') {
//     //         window.location.href = 'https://m.esportlivescore.cn/#/home'
//     //     } else {
//     //         next()
//     //     }
//     // } else {
//     //     window.location.href = 'https://esportlivescore.cn/#/index'
//     // }

// })

export default router
