import { createRouter, createWebHashHistory } from "vue-router"

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

// })

export default router
