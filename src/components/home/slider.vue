<template>
    <div class="slider">
        <div class="cont flex flex_nowrap flex_only_center">
            <div class="block" v-for="item in shortList" :key="item.match_id">
                <div :class="['title flex flex_between',{
                    ongoing: item.status === '比赛进行中'
                }]">
                    <div class="game flex flex_only_center">
                        <img :src="item.game_logo">
                        <p>{{item.status}}</p>
                    </div>
                    <p>{{item.scheduled_begin_at.substring(5,16)}}</p>
                </div>
                <div class="info">
                    <div class="flex flex_between flex_only_center">
                        <div class="team" 
                            @click="gotoMean(item.master_team_id)">
                            <img :src="item.master_team_logo">
                            <p class="beyond-ellipsis" :title="item.master_team_name">{{item.master_team_name}}</p>
                        </div>
                        <div class="vs">
                            <p class="score">{{item.master_team_score}} : {{item.guest_team_score}}</p>
                            <p :class="['status',{
                                    ongoing: item.match_feedback === '进入直播',
                                    hope: item.match_feedback === '敬请期待'
                                }]"
                                @click="gotoLink(item.match_feedback,item.game_id,item.match_id)"
                            >{{item.match_feedback}}</p>
                        </div>
                        <div class="team"
                            @click="gotoMean(item.guest_team_id)">
                            <img :src="item.guest_team_logo">
                            <p class="beyond-ellipsis" :title="item.guest_team_name">{{item.guest_team_name}}</p>
                        </div>
                    </div>
                    <p>{{item.tournament_name}}</p>
                    <p>{{item.match_config}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRouter } from "vue-router"
    import { defineComponent, reactive, toRefs, onMounted } from 'vue'
    import { shortMatch } from "@/scripts/request"

    export default defineComponent({
        setup(props,{ emit }) {

            const router = useRouter()

            const shortData = reactive({
                shortList: []
            })

            const getShortMatch = (() => {
                shortMatch().then(res => {
                    if(res.code === 200) {
                        shortData.shortList = res.data
                    }
                })
            })

            const gotoLink = (status, gameId,matchId) => {
                if(status !== '敬请期待') {
                    router.push({
                        path: '/match/game',
                        query: {
                            gameId: gameId,
                            matchId: matchId
                        }
                    })
                }
            }
            const gotoMean = (teamId) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: teamId
                    }
                })
            }

            onMounted(() => {
                getShortMatch()
            })

            return {
                ...toRefs(shortData),
                gotoLink,
                gotoMean
            }
        },
    })
</script>

<style lang="less" scoped>
    @green: #01FE9B;
    .slider {
        .cont {
            width: 100%;
            height: 250px;
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            .block {
                flex: 0 0 300px;
                height: 190px;
                overflow: hidden;
                margin-right: 20px;
                border-radius: 5px;
                background: linear-gradient(180deg, #E5E5E5 1%, #F3F3F3 100%);
                box-shadow: 0px 3px 20px 0px rgba(125, 125, 125, 0.3);
                .title {
                    width: 100%;
                    height: 30px;
                    color: #fff;
                    padding: 0 5px;
                    line-height: 30px;
                    box-sizing: border-box;
                    background-color: #D1D1D1;
                    &.ongoing {
                        background-color: #B29873;
                        p:first-child {
                            color: @green;
                        }
                    }
                    .game {
                        img {
                            width: 20px;
                            height: 20px;
                            margin-right: 10px;
                        }
                    }
                }
                .info {
                    padding: 20px;
                    box-sizing: border-box;
                    .flex {
                        margin-bottom: 15px;
                        .team {
                            width: 50px;
                            img {
                                width: 35px;
                                height: 35px;
                                display: block;
                                margin: 0 auto;
                            }
                            p {
                                font-size: 16px;
                                font-weight: 600;
                                margin-top: 10px;
                                text-align: center;
                            }
                        }
                        .vs {
                            .score {
                                font-size: 30px;
                                font-weight: 600;
                            }
                            .status {
                                width: 100px;
                                height: 25px;
                                font-size: 16px;
                                margin-top: 10px;
                                color: #B29873;
                                line-height: 25px;
                                text-align: center;
                                border-radius: 5px;
                                border: 1px solid #B29873;
                                &.ongoing {
                                    color: #fff;
                                    background-color: #B29873;
                                }
                                &.hope {
                                    cursor: not-allowed;
                                }
                            }
                        }
                    }
                    p {
                        font-size: 14px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
