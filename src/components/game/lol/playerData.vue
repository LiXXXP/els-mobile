<template>
    <div class="player">
        <div class="title">选手数据</div>
        <div v-if="battleId&&teamList.length>0">
            <table v-for="item in teamList" :key="item.team_id">
                <thead :class="[item.faction]">
                    <th class="team">
                        <div class="flex flex_center" :title="item.team_name" @click="gotoLink(item.team_id)">
                            <img :src="item.team_image">
                            <p class="beyond-ellipsis">{{item.team_name}}</p>
                        </div>
                    </th>
                    <th>KDA</th>
                    <th>补刀</th>
                    <th>经济</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="key in item.players" :key="key.seed">
                        <td>{{key.champion_name}}</td>
                        <td>{{key.kills}} / {{key.deaths}} / {{key.assists}}</td>
                        <td>{{key.cs}}</td>
                        <td>{{key.gold_earned}}</td>
                        <td>
                            <div class="skill flex flex_center">
                                <div class="item flex flex_only_center">
                                    <div v-for="img in key.item" :key="img.item_id" class="imgs">
                                        <img :src="img.item_image" :title="img.item_name" v-if="!img.is_trinket">
                                    </div>
                                </div>
                                <div v-for="img in key.item" :key="img.item_id" class="trinket">
                                    <img :src="img.item_image" :title="img.item_name" v-if="img.is_trinket">
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="none" v-else>敬请期待</div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, inject, watch, onMounted, onUnmounted } from 'vue'
    import { useRouter } from "vue-router"
    import { lolPlayerBattle } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const playerData = reactive({
                battleId: 0,
                teamList: [],
                timer: null,
                status: ''
            })
            
            const getplayerData = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                lolPlayerBattle(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            playerData.teamList = res.data.factions
                        } else {
                            playerData.teamList = []
                        }
                        playerData.status = res.data.status
                    } else {
                        clearInterval(playerData.timer)
                    }
                })
            }

            const battleid = inject('battleid')
            watch(battleid, () => {
                if(battleid.value > 0) { 
                    playerData.battleId = battleid
                    getplayerData(playerData.battleId)
                }
            })

            onMounted(() => {
                playerData.timer = setInterval( () => {
                    if(battleid.value > 0 && playerData.status === 'ongoing') {
                        getplayerData(playerData.battleId)
                    }
                }, 600000)
            })

            onUnmounted(() => {
                clearInterval(playerData.timer)
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
                ...toRefs(playerData),
                battleid,
                getplayerData,
                gotoLink
            }
        }
    })
</script>

<style lang="less" scoped>
    .player {
        padding: 0 20px;
        .title {
            font-size: 30px;
            font-weight: 600;
            padding-bottom: 20px;
        }
        table {
            width: 100%;
            margin-bottom: 10px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            th {
                height: 50px;
                color: #fff;
                font-weight: 400;
                &:nth-child(1) {
                    text-align: left;
                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 10px;
                    }
                }
            }
            td {
                height: 60px;
                color: #666;
                font-size: 20px;
                text-align: center;
                border-top: 1px solid #D5D7DB;
            }
        }
        thead {
            &.blue {
                background-color: #457CF4;
            }
            &.red {
                background-color: #FF4645;
            }
        }
        td {
            .blue {
                color: #457CF4;
            }
            .red {
                color: #FF4645;
            }
        }
        .team {
            cursor: pointer;
            p {
                width: 60px;
            }
        }
        .skill {
            height: 35px;
            .imgs {
                width: 35px;
                height: 35px;
                cursor: pointer;
                margin-left: 3px;
                img {
                    width: 35px;
                    height: 35px;
                }
            }
            .item {
                width: 230px;
                margin: 0 15px;
            }
            .trinket {
                img {
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
