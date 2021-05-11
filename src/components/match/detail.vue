<template>
    <div class="detail">
        <div class="card">
            <div class="top flex flex_only_center">
                <img :src="tournamentDetail.tournament_logo">
                <div>
                    <p class="name">{{tournamentDetail.tournament_name}}</p>
                    <p class="time">比赛时间：{{tournamentDetail.tournament_time}}</p>
                </div>
            </div>
            <div class="info">
                <p class="flex flex_between">
                    <span>总奖金</span>
                    <span>{{tournamentDetail.prize_bonus || '暂无数据'}}</span>
                </p>
                <p class="flex flex_between">
                    <span>参赛战队</span>
                    <span>{{tournamentDetail.number_of_teams || teamLength}}</span>
                </p>
                <p class="flex flex_between">
                    <span>举办方</span>
                    <span>{{tournamentDetail.organizer}}</span>
                </p>
                <p class="flex flex_between">
                    <span>举办地</span>
                    <span>{{tournamentDetail.location}}</span>
                </p>
                <div class="icon">
                    <img :src="tournamentDetail.game_image">
                    <p :class="tournamentDetail.status">{{tournamentDetail.status === 'upcoming' ? '未开始' : tournamentDetail.status === 'completed' ? '已结束' : '进行中'}}</p>
                </div>
            </div>
        </div>
        <div class="title">参赛战队</div>
        <div class="teams flex flex_only_center flex_wrap">
            <div v-for="item in teams" :key="item.team_id" class="flex flex_center">
                <img :src="item.team_logo">
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, onMounted } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { tournamentDetail } from "@/scripts/request"

    export default defineComponent({
        name: 'matchDetail',
        setup(props,ctx) {

            const route = useRoute()

            const detailData= reactive({
                tournamentDetail: {},
                teams: [],
                teamLength: 0
            })

            const getTournamentDetail = (tournamentId) => {
                let params = {
                    tournament_id: parseInt(tournamentId),
                }
                tournamentDetail(params).then(res => {
                    if(res.code === 200) {
                        detailData.tournamentDetail = res.data
                        detailData.teams = res.data.teams
                        detailData.teamLength = res.data.teams.length
                    }
                })
            }

            onMounted(() => {
                getTournamentDetail(route.query.tournamentId)
            })

            onBeforeRouteUpdate((to) => {
                getTournamentDetail(to.query.tournamentId)
            })

            return {
                ...toRefs(detailData)
            }
        }
    })
</script>

<style lang="less" scoped>
    .detail {
        .card {
            width: 710px;
            height: 330px;
            border-radius: 10px;
            .top {
                height: 180px;
                border-radius: 10px 10px 0px 0px;
                background: linear-gradient(0deg, #292929 0%, #3C3C3C 100%);
                img {
                    width: 140px;
                    height: 140px;
                    margin: 0 30px;
                    border-radius: 100%;
                }
                .name {
                    color: #fff;
                    font-size: 30px;
                    margin-bottom: 20px;
                }
                .time {
                    color: #A6A6A6;
                    font-size: 20px;
                }
            }
            .info {
                height: 150px;
                color: #A6A6A6;
                padding: 0 140px;
                box-sizing: border-box;
                background-color: #3C3C3C;
                position: relative;
                border-radius: 0px 0px 10px 10px;
                p {
                    padding-left: 60px;
                    padding-top: 6px;
                }
                .icon {
                    width: 78px;
                    height: 100px;
                    color: #fff;
                    display: block;
                    font-size: 18px;
                    text-align: center;
                    background: url('../../assets/imgs/icon.png') no-repeat 0 0;
                    background-size: 100%;
                    position: absolute;
                    top: -2px;
                    right: 20px;
                    img {
                        width: 30px;
                        height: 30px;
                        margin: 7px auto 5px;
                    }
                    p {
                        padding: 0;
                        &.ongoing {
                            color: #B29873;
                        }
                    }
                }
            }
        }
        .title {
            font-size: 30px;
            padding: 30px 0;
        }
        .teams {
            div {
                width: 105px;
                height: 105px;
                margin-bottom: 30px;
                margin-right: 45px;
                border-radius: 50%;
                background-color: #fff;
                box-shadow: 0px 3px 10px 0px rgba(125, 125, 125, 0.3);
                &:nth-child(5n) {
                    margin-right: 0;
                }
                img {
                    width: 70px;
                    height: 60px;
                }
            }
        }
    }
</style>
