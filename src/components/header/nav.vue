<template>
    <div class="navlist">
        <router-link
            v-for="item in navList"
            :key="item.title"
            :to="item.path"
            :class="['link',{active: toPath === item.path}]"
        >{{item.title}}</router-link>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    
    export default defineComponent({
        setup(props,ctx) {

            const navData = reactive({
                navList: [
                    {
                        title: '首页',
                        path: '/home'
                    },
                    {
                        title: '赛事',
                        path: '/match'
                    },
                    {
                        title: '战队',
                        path: '/mean'
                    }
                ],
                toPath: '/home'
            })

            return {
                ...toRefs(navData)
            }
        },
        watch: {
            $route (to, from) {
                this.toPath = to.path
                if (to.path === '/match/detail') {
                    this.toPath = '/match'
                }
                if (to.path === '/mean/detail') {
                    this.toPath = '/mean'
                }
            }
        }
    })
</script>

<style lang="less" scoped>
    .navlist {
        padding-left: 40px;
        padding-bottom: 24px;
        .link {
            color: #333;
            font-size: 30px;
            line-height: 50px;
            margin-right: 90px;
            &.active {
                color: #B29873;
            }
        }
    }
</style>