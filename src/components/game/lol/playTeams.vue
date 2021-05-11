<template>
    <div class="play-teams">
        <div class="detail" v-if="battleInfo != null">
            <div class="team flex flex_between flex_only_center" v-if="teamInfo.length>0">
                <div class="flex flex_only_center" @click="gotoLink(teamInfo[0].team_id)">
                    <img :src="teamInfo[0].team_image">
                    <p class="beyond-ellipsis" :title="teamInfo[0].team_name">
                        {{teamInfo[0].team_name}}
                    </p>
                </div>
                <div>
                    <span>{{teamInfo[0].score}} : {{teamInfo[1].score}}</span>
                </div>
                <div class="flex flex_only_center" @click="gotoLink(teamInfo[1].team_id)">
                    <p class="beyond-ellipsis" :title="teamInfo[1].team_name">
                        {{teamInfo[1].team_name}}
                    </p>
                    <img :src="teamInfo[1].team_image">
                </div>
            </div>
            <div class="type flex flex_between flex_only_start" v-if="teamInfo.length>0">
                <div class="blue flex flex_start flex_only_center flex_wrap">
                    <p v-if="firstEvents.first_blood && firstEvents.first_blood.faction === 'blue'">一血</p>
                    <p v-if="firstEvents.first_to_5_kills && firstEvents.first_to_5_kills.faction === 'blue'">先五杀</p>
                    <p v-if="firstEvents.first_to_10_kills && firstEvents.first_to_10_kills.faction === 'blue'">先十杀</p>
                    <p v-if="firstEvents.first_dragon && firstEvents.first_dragon.faction === 'blue'">首元素巨龙</p>
                    <p v-if="firstEvents.first_turret && firstEvents.first_turret.faction === 'blue'">首塔</p>
                    <p v-if="firstEvents.first_rift_herald && firstEvents.first_rift_herald.faction === 'blue'">首峡谷先锋</p>
                    <p v-if="firstEvents.first_inhibitor && firstEvents.first_inhibitor.faction === 'blue'">首水晶</p>
                    <p v-if="firstEvents.first_baron_nashor && firstEvents.first_baron_nashor.faction === 'blue'">首纳什男爵</p>
                </div>
                <div class="red flex flex_end flex_only_center flex_wrap">
                    <p v-if="firstEvents.first_blood && firstEvents.first_blood.faction === 'red'">一血</p>
                    <p v-if="firstEvents.first_to_5_kills && firstEvents.first_to_5_kills.faction === 'red'">先五杀</p>
                    <p v-if="firstEvents.first_to_10_kills && firstEvents.first_to_10_kills.faction === 'red'">先十杀</p>
                    <p v-if="firstEvents.first_dragon && firstEvents.first_dragon.faction === 'red'">首元素巨龙</p>
                    <p v-if="firstEvents.first_turret && firstEvents.first_turret.faction === 'red'">首塔</p>
                    <p v-if="firstEvents.first_rift_herald && firstEvents.first_rift_herald.faction === 'red'">首峡谷先锋</p>
                    <p v-if="firstEvents.first_inhibitor && firstEvents.first_inhibitor.faction === 'red'">首水晶</p>
                    <p v-if="firstEvents.first_baron_nashor && firstEvents.first_baron_nashor.faction === 'red'">首纳什男爵</p>
                </div>
            </div>
            <div class="gold">
                <div class="title">经济</div>
                <div class="flex flex_between flex_only_center">
                    <p>{{thousands(factions[0].gold)}}</p>
                    <p>{{thousands(factions[1].gold)}}</p>
                </div>
                <div class="bar flex flex_between flex_only_center">
                    <div class="list blue" :style="{'width': `${710/(factions[0].gold + factions[1].gold)*factions[0].gold}%`}"></div>
                    <div class="list red" :style="{'width': `${710/(factions[0].gold + factions[1].gold)*factions[1].gold}%`}"></div>
                </div>
                <div class="flex flex_between flex_only_center">
                    <p>{{parseInt((factions[0].gold/(factions[0].gold + factions[1].gold))*100)}}%</p>
                    <p>{{parseInt((factions[1].gold/(factions[0].gold + factions[1].gold))*100)}}%</p>
                </div>
            </div>
            <div class="out flex flex_between flex_only_center">
                <div class="flex flex_only_center">
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon04.png">
                        <p>{{factions[0].turret_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon05.png">
                        <p>{{factions[0].baron_nashor_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon06.png">
                        <p>{{factions[0].inhibitor_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon07.png">
                        <p>{{factions[0].dragon_kills}}</p>
                    </div>
                </div>
                <div class="flex flex_only_center">
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon04.png">
                        <p>{{factions[1].turret_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon05.png">
                        <p>{{factions[1].baron_nashor_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon06.png">
                        <p>{{factions[1].inhibitor_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/icon07.png">
                        <p>{{factions[1].dragon_kills}}</p>
                    </div>
                </div>
            </div>
            <div class="hero" v-if="factions.length>0">
                <div class="flex flex_between flex_only_center" v-if="factions[0].ban.length>0">
                    <div class="small flex flex_only_center">
                        <img v-for="item in factions[0].ban" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                    <p>BAN</p>
                    <div class="small flex flex_end">
                        <img v-for="item in factions[1].ban" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                </div>
                <div class="flex flex_between flex_only_center" v-if="factions[0].pick.length>0">
                    <div class="small flex flex_only_center">
                        <img v-for="item in factions[0].pick" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                    <p>PICK</p>
                    <div class="small flex flex_end">
                        <img v-for="item in factions[1].pick" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="none" v-else>敬请期待</div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, inject, watch, computed, onUnmounted, onMounted } from 'vue'
    import { useRoute, useRouter } from "vue-router"
    import { battleDetail } from "@/scripts/request"
    import { formatNumber } from '@/scripts/utils'

    export default defineComponent({
        setup(props,ctx) {

            const route = useRoute()

            const teamsData = reactive({
                list: [],
                battleId: 0,
                battleInfo: null,
                teamInfo: [],
                factions: [],
                firstEvents: {},
                timer: null,
                status: ''
            })

            const getbattleDetail = (battleId) => {
                let params = {
                    game_id: parseInt(route.query.gameId),
                    battle_id: battleId,
                }
                battleDetail(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            teamsData.battleInfo = res.data
                            teamsData.teamInfo = res.data.team_info
                            teamsData.factions = res.data.battle_detail.factions
                            teamsData.firstEvents = res.data.battle_detail.first_events
                            teamsData.status = res.data.status

                            if(res.data.battle_detail.factions[0].faction !== 'blue') {
                                teamsData.factions.reverse()
                            }

                            if(res.data.battle_detail.factions[0].team_id !== res.data.team_info[0].team_id) {
                                teamsData.teamInfo.reverse()
                            }
                            
                        } else {
                            clearInterval(teamsData.timer)
                            teamsData.battleInfo = null
                        }
                    } else {
                        clearInterval(teamsData.timer)
                        teamsData.battleInfo = null
                    }
                })
            }
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                teamsData.battleId = battleid
                getbattleDetail(teamsData.battleId)
            })
            

            onMounted(() => {
                teamsData.timer = setInterval( () => {
                    if(battleid.value > 0 && teamsData.status === 'ongoing') {
                        getbattleDetail(teamsData.battleId)
                    }
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(teamsData.timer)
            })

            const thousands = computed(() => {
                return function(num) {
                    return formatNumber(num)
                }
            })

            const router = useRouter()
            const gotoLink = (id) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: id
                    }
                })
            }

            return {
                ...toRefs(teamsData),
                getbattleDetail,
                thousands,
                gotoLink
            }
        }
    })
</script>

<style lang="less" scoped>
    .play-teams {
        padding: 0 20px;
        .detail {
            .team {
                img {
                    width: 60px;
                    height: 60px;
                }
                p {
                    width: 120px;
                    font-size: 18px;
                    padding: 0 10px;
                }
                span {
                    font-size: 30px;
                    font-weight: 600;
                }
            }
            .type {
                color: #fff;
                margin: 15px 0;
                font-size: 12px;
                div {
                    width: 300px;
                    p {
                        color: #fff;
                        padding: 3px 10px;
                        margin-right: 8px;
                        margin-bottom: 8px;
                        border-radius: 5px;
                    }
                }
                .blue {
                    p {
                        background-color: #467CF3;
                    }
                }
                .red {
                    p {
                        background-color: #FF4645;
                    }
                }
            }
            .gold {
                margin-bottom: 30px;
                .title {
                    font-size: 18px;
                    text-align: center;
                }
                .bar {
                    width: 100%;
                    margin: 10px 0;
                    .list {
                        height: 18px;
                        line-height: 12px;
                        box-sizing: border-box;
                        transition: width .3s linear;
                        position: relative;
                        &.blue {
                            border-radius: 12px 0 0 12px;
                            background-color: #457CF4;
                        }
                        &.red {
                            border-radius: 0 12px 12px 0;
                            background-color: #FF4645;
                        }
                    }
                }
            }
            .out {
                .icon {
                    margin-right: 15px;
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: 20px;
                        height: 20px;
                    }
                    p {
                        font-size: 16px;
                        padding-left: 5px;
                    }
                }
            }
            .hero {
                margin-bottom: 30px;
                p {
                    color: #666;
                    font-size: 18px;
                }
                .small {
                    margin: 7px 0;
                    img {
                        width: 60px;
                        height: 60px;
                        margin-right: 5px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .none {
            padding-top: 20px;
        }
    }
</style>
