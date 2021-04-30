<template>
    <div class="swipe">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
            <van-swipe-item v-for="item in list" :key="item.id">
                <a :href="item.jump_address" target="_blank">
                    <img :src="item.image" :title="item.image_name">
                </a>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs } from 'vue'
    import { Swipe, SwipeItem } from 'vant'
    import { homeCarousel } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const carouselList = reactive({
                list: []
            })
            
            const getCarousel = () => {
                homeCarousel().then(res => {
                    if(res.code === 200) {
                        carouselList.list = res.data
                    }
                })
            }

            onMounted(() => {
                getCarousel()
            })
            
            return {
                ...toRefs(carouselList)
            }
        },
        components: {
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem
        }
    })
</script>

<style lang="less" scoped>
    .swipe {
        .van-swipe {
            width: 710px;
            height: 270px;
            border-radius: 10px;
        }
        img {
            width: 100%;
            height: 270px;
        }
    }
</style>
