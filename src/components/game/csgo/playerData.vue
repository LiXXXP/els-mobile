<template>
    <div class="player">
        <div class="title">选手数据</div>
        <div v-if="battleId&&teamList.length>0">
            <table v-for="item in teamList" :key="item.team_id">
                <thead>
                    <th class="team">
                        <div class="flex flex_center" :title="item.team_name" @click="gotoLink(item.team_id)">
                            <img :src="item.team_image">
                            <p class="beyond-ellipsis">{{item.team_name}}</p>
                        </div>
                    </th>
                    <th>爆头击杀</th>
                    <th>闪光弹助攻</th>
                    <th>死亡</th>
                    <th>KAST</th>
                    <th>K-D Diff</th>
                    <th>平均每局伤害</th>
                    <th>FK Diff</th>
                    <th>Rating2.0</th>
                </thead>
                <tbody>
                    <tr v-for="key in item.players" :key="key.player_id">
                        <td>{{key.nick_name}}</td>
                        <td>{{key.kills || 0}}({{key.headshot_kills || 0}})</td>
                        <td>{{key.assists || 0}}({{key.flash_assists || 0}})</td>
                        <td>{{key.deaths || 0}}</td>
                        <td>{{parseInt(key.kast*100) || 0}}%</td>
                        <td>{{parseInt(key.kills - key.deaths) || 0}}</td>
                        <td>{{key.adr || 0}}</td>
                        <td>{{key.first_kills_diff || 0}}</td>
                        <td>{{key.rating || 0}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="none" v-else>敬请期待</div>
    </div>
</template>

<script>

    import { csgoPlayerInfo } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch, onMounted, onUnmounted } from 'vue'
    import { useRouter } from "vue-router"

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
                csgoPlayerInfo(params).then(res => {
                    if(res.code === 200) {
                        playerData.teamList = res.data.team_info
                        playerData.status = res.data.battle_status
                    } else {
                        clearInterval(playerData.timer)
                    }
                })
            }

            const battleid = inject('battleid')
            watch(battleid, () => {
                if(battleid.value>0) {
                    playerData.battleId = battleid
                    getplayerData(playerData.battleId)
                }
            })

            onMounted(() => {
                playerData.timer = setInterval( () => {
                    if(playerData.battleId>0 && playerData.status === 'ongoing') {
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
            margin: 30px 0 20px;
        }
        table {
            width: 100%;
            font-size: 18px;
            margin-bottom: 10px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            th {
                color: #333;
                font-weight: 400;
                line-height: 50px;
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
                color: #666;
                line-height: 50px;
                text-align: center;
                border-top: 1px solid #D5D7DB;
            }
        }
        .team {
            cursor: pointer;
            p {
                width: 50px;
            }
        }
    }
</style>
