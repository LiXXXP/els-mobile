<template>
    <div class="mean">
        <div class="gamelist flex flex_only_center flex_wrap">
            <div v-for="item in gameList" :key="item.game_id">
                <img :src="item.image" @click="selectMatch(item.game_id)">
            </div>
        </div>
        <div class="title">战队列表</div>
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="0"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="getTeamList"
        >
            <div class="teamlist flex flex_only_center flex_wrap">
                <div class="img flex flex_center" v-for="item in teamList" :key="item.team_id" @click="gotoLink(item.team_id)">
                    <img :src="item.team_image">
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, onMounted } from 'vue'
    import { useRouter } from "vue-router"
    import { List } from 'vant'
    import { gameList, teamList } from "@/scripts/request"
    
    export default defineComponent({
        name: 'match',
        setup(props,ctx) {

            const router = useRouter()

            const listData = reactive({
                gameList: [],
                teamList: [],
                page: {
                    limit: 30,    // 条数
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

            const getTeamList = (gameId) => {
                let params = {
                    game_id: gameId,
                    limit: listData.page.limit,
                    page: ++listData.page.current
                }
                teamList(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.team_list.length>0) {
                            listData.teamList.push(...res.data.team_list)
                        }
                        if(listData.teamList.length === res.data.count) {
                            selectData.loading = false
                            selectData.finished = true
                        }
                    }
                })
            }

            const selectMatch = (gameId) => {
                listData.teamList = []
                listData.page.current = 0
                getTeamList(gameId)
            }

            const gotoLink = (id) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: id
                    }
                })
            }

            onMounted(() => {
                getGameList()
                getTeamList()
            })

            return {
                ...toRefs(listData),
                gotoLink,
                selectMatch,
                getTeamList
            }

        },
        components: {
            [List.name]: List
        }
    })
</script>

<style lang="less" scoped>
    .mean {
        .gamelist {
            img {
                width: 75px;
                height: 75px;
                margin: 15px 33px;
                border-radius: 100%;
            }
        }
        .title {
            font-size: 30px;
            padding: 30px 0;
        }
        .teamlist {
            .img {
                width: 105px;
                height: 105px;
                margin-bottom: 30px;
                margin-right: 45px;
                background: #F2F2F2;
                box-shadow: 0px 3px 10px 0px rgba(125, 125, 125, 0.3);
                border-radius: 50%;
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
