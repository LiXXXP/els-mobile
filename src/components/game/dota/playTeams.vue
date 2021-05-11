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
                <div class="radiant flex flex_start flex_only_center flex_wrap">
                    <p v-if="firstEvents.first_blood && firstEvents.first_blood.faction === 'radiant'">一血</p>
                    <p v-if="firstEvents.first_to_5_kills && firstEvents.first_to_5_kills.faction === 'radiant'">先五杀</p>
                    <p v-if="firstEvents.first_to_10_kills && firstEvents.first_to_10_kills.faction === 'radiant'">先十杀</p>
                    <p v-if="firstEvents.first_barracks && firstEvents.first_barracks.faction === 'radiant'">首兵营</p>
                    <p v-if="firstEvents.first_tower && firstEvents.first_tower.faction === 'radiant'">首塔</p>
                    <p v-if="firstEvents.first_roshan && firstEvents.first_roshan.faction === 'radiant'">首肉山</p>
                </div>
                <div class="dire flex flex_end flex_only_center flex_wrap">
                    <p v-if="firstEvents.first_blood && firstEvents.first_blood.faction === 'dire'">一血</p>
                    <p v-if="firstEvents.first_to_5_kills && firstEvents.first_to_5_kills.faction === 'dire'">先五杀</p>
                    <p v-if="firstEvents.first_to_10_kills && firstEvents.first_to_10_kills.faction === 'dire'">先十杀</p>
                    <p v-if="firstEvents.first_dragon && firstEvents.first_dragon.faction === 'dire'">首元素巨龙</p>
                    <p v-if="firstEvents.first_turret && firstEvents.first_turret.faction === 'dire'">首塔</p>
                    <p v-if="firstEvents.first_rift_herald && firstEvents.first_rift_herald.faction === 'dire'">首峡谷先锋</p>
                </div>
            </div>
            <div class="out flex flex_between flex_only_center">
                <div class="flex flex_only_center">
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota01.png">
                        <p>{{factions[0].tower_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota02.png">
                        <p>{{factions[0].melee_barrack_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota03.png">
                        <p>{{factions[0].ranged_barrack_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota04.png">
                        <p>{{factions[0].roshan_kills}}</p>
                    </div>
                </div>
                <div class="flex flex_only_center">
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota01.png">
                        <p>{{factions[1].tower_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota02.png">
                        <p>{{factions[1].melee_barrack_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota03.png">
                        <p>{{factions[1].ranged_barrack_kills}}</p>
                    </div>
                    <div class="icon flex flex_only_center">
                        <img src="../../../assets/imgs/dota04.png">
                        <p>{{factions[1].roshan_kills}}</p>
                    </div>
                </div>
            </div>
            <div class="hero" v-if="factions.length>0">
                <div class="flex flex_between flex_only_center" v-if="factions[0].ban.length>0">
                    <div class="ban flex flex_only_center">
                        <img v-for="item in factions[0].ban" 
                            :key="item.hero_name"
                            :src="item.hero_image" 
                            :title="item.hero_name"
                        >
                    </div>
                    <p>BAN</p>
                    <div class="ban flex flex_end">
                        <img v-for="item in factions[1].ban" 
                            :key="item.hero_name"
                            :src="item.hero_image" 
                            :title="item.hero_name"
                        >
                    </div>
                </div>
                <div class="flex flex_between flex_only_center" v-if="factions[0].pick.length>0">
                    <div class="pick flex flex_only_center">
                        <img v-for="item in factions[0].pick" 
                            :key="item.hero_name"
                            :src="item.hero_image" 
                            :title="item.hero_name"
                        >
                    </div>
                    <p>PICK</p>
                    <div class="pick flex flex_end">
                        <img v-for="item in factions[1].pick" 
                            :key="item.hero_name"
                            :src="item.hero_image" 
                            :title="item.hero_name"
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

                            if(res.data.battle_detail.factions[0].faction !== 'radiant') {
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
                .radiant {
                    p {
                        background-color: #1FA262;
                    }
                }
                .dire {
                    p {
                        background-color: #DE5347;
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
                        &.radiant {
                            border-radius: 12px 0 0 12px;
                            background-color: #1FA262;
                        }
                        &.dire {
                            border-radius: 0 12px 12px 0;
                            background-color: #DE5347;
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
                .ban {
                    margin: 7px 0;
                    img {
                        width: 42px;
                        height: 40px;
                        margin-right: 5px;
                        border-radius: 5px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
                .pick {
                    margin: 7px 0;
                    img {
                        width: 61px;
                        height: 40px;
                        margin-right: 5px;
                        border-radius: 5px;
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
