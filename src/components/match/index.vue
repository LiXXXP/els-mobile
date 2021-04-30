<template>
    <div class="match">
        <div class="gamelist flex flex_only_center flex_wrap">
            <div v-for="item in gameList" :key="item.game_id">
                <img :src="item.image" @click="selectMatch(item.game_id)">
            </div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="0"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="getTournamentList"
        >
            <div class="matchlist flex flex_only_center flex_wrap">
                <div class="block" v-for="item in tournamentList" :key="item.tournament_id" @click="gotoLink(item.tournament_id)">
                    <div class="img flex flex_center">
                        <img :src="item.tournament_image">
                        <i :class="item.status">{{item.status === 'upcoming' ? '未开始' : item.status === 'completed' ? '已结束' : '进行中'}}</i>
                    </div>
                    <div class="statu">
                        <p class="beyond-ellipsis">{{item.tournament_name}}</p>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, onMounted } from 'vue'
    import { useRouter } from "vue-router"
    import { List } from 'vant'
    import { gameList, tournamentList } from "@/scripts/request"
    
    export default defineComponent({
        name: 'match',
        setup(props,ctx) {

            const router = useRouter()

            const listData = reactive({
                gameList: [],
                tournamentList: [],
                page: {
                    limit: 10,    // 条数
                    current: 0   // 当前页
                },
                gameId: undefined,
                loading: false,
                finished: false,
            })

            // 游戏列表
            const getGameList = (() => {
                gameList().then(res => {
                    if(res.code === 200) {
                        listData.gameList = res.data
                    }
                })
            })

            // 赛事列表
            const getTournamentList = (gameId) => {
                let params = {
                    game_id: gameId,
                    limit: listData.page.limit,
                    page: ++listData.page.current
                }
                tournamentList(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.tournament_list.length>0) {
                            listData.tournamentList.push(...res.data.tournament_list)
                        }
                        if(listData.tournamentList.length === res.data.count) {
                            selectData.loading = false
                            selectData.finished = true
                        }
                    }
                })
            }

            const selectMatch = (gameId) => {
                listData.tournamentList = []
                listData.page.current = 0
                getTournamentList(gameId)
            }

            const gotoLink = (id) => {
                router.push({
                    path: '/match/detail',
                    query: {
                        tournamentId: id
                    }
                })
            }

            onMounted(() => {
                getGameList()
                getTournamentList()
            })

            return {
                ...toRefs(listData),
                gotoLink,
                getTournamentList,
                selectMatch
            }

        },
        components: {
            [List.name]: List
        }
    })
</script>

<style lang="less" scoped>
    .match {
        .gamelist {
            img {
                width: 75px;
                height: 75px;
                margin: 15px 33px;
                border-radius: 100%;
            }
        }
        .matchlist {
            margin-top: 50px;
            .block {
                width: 330px;
                height: 200px;
                margin-right: 50px;
                margin-bottom: 25px;
                border-radius: 10px;
                box-shadow: 0px 3px 21px 0px rgba(125, 125, 125, 0.3);
                &:nth-child(2n) {
                    margin-right: 0;
                }
                .img {
                    height: 150px;
                    background: linear-gradient(0deg, #77767D 0%, #F2F2F2 100%);
                    position: relative;
                    i {
                        width: 44px;
                        height: 50px;
                        color: #fff;
                        display: block;
                        font-size: 12px;
                        line-height: 50px;
                        text-align: center;
                        background: url('../../assets/imgs/icon.png') no-repeat 0 0;
                        background-size: 100%;
                        position: absolute;
                        top: -2px;
                        right: 20px;
                        &.ongoing {
                            color: #B29873;
                        }
                    }
                    img {
                        width: 100px;
                        height: 100px;
                    }
                }
                .statu {
                    height: 50px;
                    color: #fff;
                    padding: 0 10px;
                    line-height: 50px;
                    box-sizing: border-box;
                    border-radius: 0 0 10px 10px;
                    background-color: #3C3C3C;
                }
            }
        }
    }
</style>
