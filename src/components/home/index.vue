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
