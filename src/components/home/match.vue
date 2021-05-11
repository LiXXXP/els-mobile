<template>
    <div class="all">
        <div class="title">赛事筛选</div>
        <SelectView 
            @getSelectIndex="getSelectIndex"
            @getSelectIds="getSelectIds"
            @getSelectAll="getSelectAll"
        />
        <div class="tab-line">
            <div class="line flex flex_between">
                <div :class="['tab',{active: currentIndex === index}]" 
                    v-for="(item,index) in navList" 
                    :key="item.tab"
                    @click="tab(index)"
                >{{item.tab}}</div>
            </div>
        </div>
        <div class="event" v-if="screenList.length>0">
            <van-list
                v-model="loading"
                :finished="finished"
                :offset="0"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="getMatchScreen"
            >
                <div class="list" v-for="item in screenList" :key="item.match_id">
                    <div class="game flex flex_only_center">
                        <img :src="item.game_image">
                        <p>{{item.tournament_name}}</p>
                    </div>
                    <div class="flex flex_center" v-if="item.match_situation">
                        <div class="team" @click="gotoMean(item.match_situation.master_team_id)">
                            <img :src="item.match_situation.master_team_logo">
                            <p class="beyond-ellipsis">{{item.match_situation.master_team_name}}</p>
                        </div>
                        <div class="vs">
                            <div class="score">
                                {{item.match_situation.master_team_score}} : {{item.match_situation.guest_team_score}}
                            </div>
                            <div class="time">{{item.scheduled_begin_at}} - {{item.match_format}}</div>
                            <div :class="['detail',{
                                    disable: item.match_status === '未开始',
                                    ongoing: item.match_status === '进行中',
                                    completed: item.match_status !== '进行中' && item.match_status !== '未开始'
                                }]" 
                                    @click="gotoLink(item.game_id,item.match_id,item.match_status)"
                            >{{item.match_status}}</div>
                        </div>
                        <div class="team" @click="gotoMean(item.match_situation.guest_team_id)">
                            <img :src="item.match_situation.guest_team_logo">
                            <p class="beyond-ellipsis">{{item.match_situation.guest_team_name}}</p>
                        </div>
                    </div>
                </div>
            </van-list>
            
        </div>
        <div v-else class="none">暂无数据</div>
    </div>
</template>

<script>
    import { useRouter } from "vue-router"
    import { defineComponent, defineAsyncComponent, ref, reactive, toRefs, provide, onMounted } from 'vue'
    import { matchScreen, gameList, tournamentList, teamList } from "@/scripts/request"
    import { List } from 'vant'

    export default defineComponent({
        setup(props,ctx) {

            const router = useRouter()
            
            const selectData = reactive({
                selectList: [
                    {
                        placeholder: '游戏',
                        selectValue: '',
                        list: []
                    },
                    {
                        placeholder: '赛事',
                        selectValue: '',
                        list: []
                    },
                    {
                        placeholder: '战队',
                        selectValue: '',
                        list: []
                    }
                ],
                navList: [
                    {
                        tab: '进行中',
                        status: 'ongoing'
                    },
                    {
                        tab: '未开始',
                        status: 'upcoming'
                    },
                    {
                        tab: '已结束',
                        status: 'completed'
                    }
                ],
                page: {
                    limit: 5,    // 条数
                    current: 0
                },
                screenList: [],
                val: 'ongoing',
                currentIndex: 0,
                loading: false,
                finished: false,
            })

            // 筛选 游戏 赛事 战队
            let selectGameId = ref()
            let selectTournamentId = ref()
            let selectTeamId = ref()

            // 游戏列表
            const getGameList = (() => {
                gameList().then(res => {
                    if(res.code === 200) {
                        selectData.selectList[0].list = res.data
                    }
                })
            })

            // 赛事列表
            const getTournamentList = (() => {
                let params = {
                    game_id: selectGameId.value,
                    limit: 10
                }
                tournamentList(params).then(res => {
                    if(res.code === 200) {
                        selectData.selectList[1].list = res.data.tournament_list
                    }
                })
            })

            // 战队列表
            const getTeamList = (() => {
                let params = {
                    game_id: selectGameId.value,
                    tournament_id: selectTournamentId.value,
                    limit: 10
                }
                teamList(params).then(res => {
                    if(res.code === 200) {
                        selectData.selectList[2].list = res.data.team_list
                    }
                })
            })

            const getSelectIndex = (val) => {
                if(val === 0) {
                    getGameList()
                }
                if(val === 1) {
                    getTournamentList()
                }
                if(val === 2) {
                    getTeamList()
                }
            }

            const getSelectIds = (gameId,tournamentId,teamId,index,val) => {
                if(index === 0) {
                    selectGameId.value = gameId
                    selectTournamentId.value = undefined
                    selectTeamId.value = undefined
                    selectData.selectList[1].selectValue = selectData.selectList[1].placeholder
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 1) {
                    selectTournamentId.value = tournamentId
                    selectTeamId.value = undefined
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 2) {
                    selectTeamId.value = teamId
                }
                getMatchScreen()
            }

            const getSelectAll = (index) => {
                if(index === 0) {
                    selectGameId.value = undefined
                    selectTournamentId.value = undefined
                    selectTeamId.value = undefined
                    selectData.selectList[1].selectValue = selectData.selectList[1].placeholder
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 1) {
                    selectTournamentId.value = undefined
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 2) {
                    selectTeamId.value = undefined
                }
                getMatchScreen()
            }

            // 状态切换
            const tab = (index) => {
                selectData.screenList = []
                selectData.page.current = 0
                selectData.loading = true
                selectData.finished = false
                selectData.currentIndex = index
                selectData.val = selectData.navList[index].status
                getMatchScreen()
            }

            const gotoLink = (gameId,matchId,status) => {
                if(status !== '未开始') {
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

            // 比赛列表
            const getMatchScreen = (() => {
                let params = {
                    match_status: selectData.val,
                    game_id: selectGameId.value,
                    tournament_id: selectTournamentId.value,
                    team_id: selectTeamId.value,
                    limit: selectData.page.limit,
                    page: ++selectData.page.current,
                }
                matchScreen(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.list.length>0) {
                            selectData.screenList.push(...res.data.list)
                        }
                        if(selectData.screenList.length === res.data.count) {
                            selectData.loading = false
                            selectData.finished = true
                        }
                    }
                })
            })

            // 生命周期
            onMounted(() => {
                getMatchScreen()
            })

            provide('selectData', selectData)

            return {
                ...toRefs(selectData),
                getSelectAll,
                getSelectIds,
                getSelectIndex,
                tab,
                gotoLink,
                gotoMean,
                getMatchScreen
            }
        },
        components: {
            SelectView: defineAsyncComponent(() => import('@/components/common/select')),         // 下拉框
            [List.name]: List,
        }
    })
</script>

<style lang="less" scoped>
    @green: #01FE9B;
    .all {
        .title {
            font-size: 30px;
            padding: 20px 0;
        }
        .tab-line {
            margin: 20px 0;
            .line {
                border-bottom: 1px solid #999;
                .tab {
                    color: #666;
                    margin: 0 40px;
                    cursor: pointer;
                    font-size: 24px;
                    font-weight: 600;
                    padding-bottom: 7px;
                    border-bottom: 3px solid transparent;
                    &:last-child {
                        padding-right: 0;
                    }
                    &.active {
                        color: #B29873;
                        font-weight: 600;
                        border-bottom: 3px solid #B29873;
                    }
                }
            }
        }
        .event {
            .list {
                height: 190px;
                padding: 20px 0;
                box-sizing: border-box;
                border-bottom: 1px solid #D0D0D0;
                .game {
                    img {
                        width: 25px;
                        height: 25px;
                        margin-right: 20px;
                    }
                    p {
                        color: #666;
                        font-size: 24px;
                    }
                }
                .team {
                    padding: 20px 0;
                    img {
                        width: 75px;
                        height: 50px;
                        margin-bottom: 10px;
                    }
                    p {
                        width: 100px;
                        font-size: 24px;
                    }
                }
                .vs {
                    width: 400px;
                    text-align: center;
                    .score {
                        font-size: 36px;
                        font-weight: 600;
                    }
                    .time {
                        color: #666;
                        font-size: 22px;
                        padding: 10px 0;
                    }
                    .detail {
                        width: 95px;
                        height: 30px;
                        margin: 0 auto;
                        cursor: pointer;
                        font-size: 24px;
                        line-height: 30px;
                        border-radius: 2px;
                        text-align: center;
                        &.disable {
                            color: #666;
                            cursor: not-allowed;
                            background: #ccc;
                        }
                        &.ongoing {
                            color: #fff;
                            background: #B29873;
                        }
                        &.completed {
                            color: #B29873;
                            border: 1px solid #B29873;
                        }
                    }
                }
            }
        }
        .none {
            text-align: center;
            padding-top: 20px;
        }
    }
</style>