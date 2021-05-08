import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        meta: {
            title: '首页',
        },
        component: () => import('@/components/index'),
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('@/components/home/index')
            },
            {
                path: '/match',
                name: 'match',
                meta: {
                    title: '赛事'
                },
                component: () => import('@/components/match/index')
            },
            {
                path: '/mean',
                name: 'mean',
                meta: {
                    title: '战队'
                },
                component: () => import('@/components/mean/index')
            },
        ]
    },
    {
        path: '/match/detail',
        name: 'meanDetail',
        meta: {
            title: '赛事详情'
        },
        component: () => import('@/components/match/detail')
    },
    {
        path: '/mean/detail',
        name: 'meanDetail',
        meta: {
            title: '战队详情'
        },
        component: () => import('@/components/mean/detail')
    },
    {
        path: '/match/game',
        name: 'game',
        meta: {
            title: '比赛详情'
        },
        component: () => import('@/components/game/index')
    },
]

const router = createRouter({
	history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
