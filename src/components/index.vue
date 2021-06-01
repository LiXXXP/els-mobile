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
