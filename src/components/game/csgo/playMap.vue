<template>
    <div class="play-map">
        <div class="title">地图信息</div>
        <div class="info">
            <div class="map-tab flex flex_end">
                <div v-for="(item,index) in mapNav"
                    :key="item.name"
                    :class="{active: index === currentIndex}"
                    @click="currentIndex = index"
                >{{item.name}}</div>
            </div>
            <div class="map-bp flex flex_only_center" v-if="currentIndex===0">
                <div class="map flex flex_only_center">
                    <div class="map-item" v-for="item in mapInfo" :key="item.map_id">
                        <div class="block">
                            <img :src="item.map_square_image">
                            <p>{{item.map_name}}</p>
                        </div>
                        <p class="text">{{item.map_short_name}}</p>
                    </div>
                </div>
            </div>
            <div v-else class="map-fight flex flex_only_center">
                <img v-for="item in mapInfo"
                    :key="item.map_id"
                    :src="item.map_thumbnail">
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {

            const mapData = reactive({
                currentIndex: 0,   // 当前index
                mapNav: [          // 地图切换导航
                    {
                        name: '地图BP'
                    },
                    {
                        name: '对战地图'
                    }
                ],
                mapInfo: []
            })

            const gameData = inject('detail')
            watch(gameData, () => {
                mapData.mapInfo = gameData.gameDetail.map_info
            })

            return {
                ...toRefs(mapData)
            }
        }
    })
</script>

<style lang="less" scoped>
    .play-map {
        padding: 0 20px;
        margin-bottom: 30px;
        .title {
            font-size: 30px;
            font-weight: 600;
        }
        .info {
            .map-tab {
                margin-top: -40px;
                margin-bottom: 55px;
                div {
                    width: 100px;
                    height: 30px;
                    color: #999;
                    font-size: 16px;
                    margin-left: 10px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 5px;
                    background-color: #D2D2D2;
                    &.active {
                        color: #fff;
                        background-color: #B29873;
                    }
                }
            }
            .map-bp {
                .map {
                    .map-item {
                        margin-right: 15px;
                        position: relative;
                        &:last-child {
                            margin-right: 0;
                        }
                        .block {
                            width: 138px;
                            height: 80px;
                            border-radius: 5px;
                            position: relative;
                            &:after,
                            &:before {
                                width: 0;
                                height: 0;
                                content: ' ';
                                margin: 3px 0;
                                display: block;
                                border: solid transparent;
                                position: absolute;
                            }
                            &:after {
                                left: 50%;
                                border-width: 5px;
                                transform: translate(-50%, 0);
                            }
                            &:before {
                                left: 50%;
                                border-width: 7px;
                                transform: translate(-50%, 0);
                            }
                            img {
                                width: 100%;
                                height: 100%;
                            }
                            p {
                                width: 100%;
                                color: #fff;
                                padding: 3px 0;
                                font-size: 12px;
                                text-align: center;
                                background-color: rgba(39,45,61,0.88);
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                        }
                        .text {
                            padding: 10px 0;
                            position: absolute;
                            left: 50%;
                            transform: translate(-50%, 0);
                        }
                        &:nth-child(odd) {
                            .block {
                                border: 1px solid #666;
                                &:after,
                                &:before {
                                    bottom: 100%;
                                }
                                &:after {
                                    border-bottom-color: #666;
                                }
                                &:before {
                                    border-bottom-color:#666;
                                }
                            }
                            .text {
                                bottom: 100%;
                                color: #666;
                            }
                        }
                        &:nth-child(even) {
                            .block {
                                border: 1px solid #B29873;
                                &:after,
                                &:before {
                                    top: 100%;
                                }
                                &:after {
                                    border-top-color: #B29873;
                                }
                                &:before {
                                    border-top-color: #B29873;
                                }
                            }
                            .text {
                                color: #B29873;
                            }
                        }
                    }
                }
            }
            .map-fight {
                img {
                    width: 138px;
                    height: 80px;
                    margin-left: 15px;
                    border-radius: 5px;
                    &:first-child {
                        margin-left: 0;
                    }
                }
            }
        }
    }
</style>
