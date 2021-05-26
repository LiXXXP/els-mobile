<template>
    <div class="index">
        <HeaderView />
        <!-- 路由页面 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import { defineComponent, defineAsyncComponent } from 'vue'

    export default defineComponent({
        name: 'home',
        metaInfo: {
            title: '电竞比分网', // set a title
            meta: [{                 // set meta
              name: 'keyWords',
              content: '电竞比分网 - eSportLiveScore.cn|实时比分直播|比赛日程|比赛结果|历史数据'
            }],
            link: [{                 // set link
              rel: 'asstes',
              href: 'http://m.esportlivescore.cn/'
            }]
        },
        setup() {
            
        },
        components: {
            HeaderView: defineAsyncComponent(() => import('@/components/header/nav')) // 导航栏
        }
    })
</script>

<style lang="less" scoped>
    .index {
        padding: 20px
    }
</style>
