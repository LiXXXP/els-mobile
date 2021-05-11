<template>
    <div class="video-live">
        <div v-if="list.length > 0">
            <div class="flex flex_start flex_wrap flex_wrap_reverse">
                <div :class="['item flex flex_start',{active: index === currentIndex}]" 
                    v-for="(item,index) in list" 
                    :key="item.stream_id"
                    @click="tabStream(item.embed_url,index)">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div class="video">
                <iframe :src="embedUrl" frameborder="0"></iframe>
            </div>
        </div>
        <div class="none" v-else>
            暂无视频直播内容呢！
        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, onMounted } from 'vue'
    import { useRoute } from "vue-router"
    import { liveStreaming } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {

            const route = useRoute()

            const streamData = reactive({
                list: [],
                embedUrl: '',
                currentIndex: 0
            })

            const getLiving = (matchId) => {
                let params = {
                    match_id: parseInt(matchId),
                }
                liveStreaming(params).then(res => {
                    if(res.code === 200) {
                        streamData.list = res.data.stream_list
                        streamData.embedUrl = res.data.stream_list.length > 0 ? res.data.stream_list[0].embed_url : ''
                    }
                })
            }

            onMounted(() => {
                getLiving(route.query.matchId)
            })

            const tabStream = (url,index) => {
                streamData.embedUrl = url
                streamData.currentIndex = index
            }

            return {
                ...toRefs(streamData),
                tabStream
            }
        }
    })
</script>

<style lang="less" scoped>
    .video-live {
        .item {
            cursor: pointer;
            padding: 10px 20px;
            background-color: #F2F2F2;
            border: 1px solid #CFCFCF;
            border-left: 0;
            &:first-child {
                border-left: 1px solid #CFCFCF;
            }
            &.active {
                background-color: #fff;
                border-bottom: 1px solid #fff;
            }
            p {
                color: #2F3A5A;
                font-size: 12px;
            }
        }
        .video {
            width: 750;
            height: 420px;
            margin-top: -1px;
            iframe {
                width: 750px;
                height: 420px;
                display: block;
            }
        }
    }
</style>
