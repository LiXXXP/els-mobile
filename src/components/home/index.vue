<template>
    <div class="home">
        <SwipeView />
        <SliderView />
        <MatchView />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent } from 'vue'

    export default defineComponent({
        name: 'index',
        metaInfo: {
            title: '电竞比分网 - 首页', // set a title
            meta: [{                 // set meta
              name: 'keyWords',
              content: '电竞比分网 - eSportLiveScore.cn|实时比分直播|比赛日程|比赛结果|历史数据'
            }],
            link: [{                 // set link
              rel: 'asstes',
              href: 'http://m.esportlivescore.cn/'
            }]
        },
        setup(props,ctx) {

        },
        components: {
            SwipeView: defineAsyncComponent(() => import('@/components/home/swipe')),
            SliderView: defineAsyncComponent(() => import('@/components/home/slider')),
            MatchView: defineAsyncComponent(() => import('@/components/home/match')),
        }
    })
</script>

<style lang="less" scoped>

</style>
