<template>
    <div class="home">
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
            SliderView: defineAsyncComponent(() => import('@/components/home/slider')),
            MatchView: defineAsyncComponent(() => import('@/components/home/match')),
        }
    })
</script>

<style lang="less" scoped>

</style>
