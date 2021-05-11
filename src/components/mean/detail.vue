<template>
    <div class="detail">
        <div class="card flex flex_start">
            <div class="logo flex flex_center">
                <img :src="teamsDetail.team_logo">
            </div>
            <div class="info">
                <p>{{teamsDetail.team_full_name}}</p>
                <p class="text">{{teamsDetail.team_introduction}}</p>
            </div>
        </div>
        <div class="title">战队队员</div>
        <div class="teams flex flex_only_center flex_wrap">
            <div class="block" v-for="item in players" :key="item.player_id">
                <div class="img flex flex_center">
                    <img :src="item.player_logo">
                </div>
                <div>
                    <span class="name">{{item.player_name}}</span>
                    <span class="role">{{item.player_role}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { teamDetail } from "@/scripts/request"

    export default defineComponent({
        name: 'meanDetail',
        setup(props,ctx) {

            const route = useRoute()

            const detailData= reactive({
                teamsDetail: {},
                players: []
            })

            const getTeamDetail = (teamId) => {
                let params = {
                    team_id: parseInt(teamId),
                }
                teamDetail(params).then(res => {
                    if(res.code === 200) {
                        detailData.teamsDetail = res.data
                        detailData.players = res.data.players
                    }
                })
            }

            onMounted(() => {
                getTeamDetail(route.query.teamId)
            })

            onBeforeRouteUpdate((to) => {
                getTeamDetail(route.query.teamId)
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
            height: 300px;
            box-sizing: border-box;
            background: #3C3C3C;
            border-radius: 10px;
            .logo {
                width: 175px;
                height: 257px;
                margin: 0 40px;
                background: url('../../assets/imgs/icon02.png') no-repeat 0 0;
                background-size: 100%;
                img {
                    width: 150px;
                    height: 100px;
                }
            }
            .info {
                width: 425px;
                color: #fff;
                font-size: 30px;
                p {
                    padding-top: 40px;
                }
                .text {
                    color: #D3D3D3;
                    font-size: 24px;
                }
            }
        }
        .title {
            font-size: 30px;
            padding: 30px 0;
        }
        .teams {
            .block {
                &:nth-child(4n) {
                    .img {
                        margin-right: 0;
                    }
                }
                .img {
                    width: 135px;
                    height: 135px;
                    border-radius: 50%;
                    margin: 50px 50px 20px 0;
                    background: linear-gradient(0deg, #787d7e 0%, #909293 100%);
                    box-shadow: 0px 3px 10px 0px rgba(125, 125, 125, 0.3);
                    
                    img {
                        width: 100px;
                        height: 80px;
                    }
                }
                .name {
                    font-size: 24px;
                    margin-right: 5px;
                    vertical-align: middle;
                }
                .role {
                    color: #fff;
                    padding: 0 2px;
                    font-size: 12px;
                    border-radius: 5px;
                    background-color: #B29873;
                }
            }
        }
    }
</style>
