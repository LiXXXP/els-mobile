<template>
    <div class="play-analy">
        <p class="title">对局详情</p>
        <div class="analy flex flex_only_center flex_wrap" v-if="battleList.length>0">
            <div :class="['nav flex flex_center',{active: currentIndex === index}]" 
                v-for="(item,index) in battleList" 
                :key="item.battle_id"
                @click="getBattleId(index,item.battle_id)">
                <img :src="item.winner_team_image" v-if="item.winner_team_image">
                <p>第{{item.order}}局</p>
                <i class="win" v-if="item.winner_team_id">胜利</i>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'

    export default defineComponent({

        emits: ['getBattleId'],

        setup(props,{ emit }) {

            const battleDate = reactive({
                currentIndex: 0,
                battleList: []
            })

            const gameData = inject('detail')
            watch(gameData, () => {
                battleDate.battleList = gameData.gameDetail.battle_info
            })

            const battleData = inject('battle')
            watch(battleData, () => {
                battleDate.battleList = battleData.battleInfo
            })

            const getBattleId = (index,battleId) => {
                battleDate.currentIndex = index
                emit('getBattleId',battleId)
            }

            return {
                ...toRefs(battleDate),
                getBattleId
            }
        }
    })
</script>

<style lang="less" scoped>
    .play-analy {
        padding: 0 20px;
        .title {
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .analy {
            .nav {
                width: 130px;
                height: 50px;
                margin-right: 12px;
                margin-bottom: 12px;
                border-radius: 5px;
                background-color: #CACCCF;
                position: relative;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    color: #fff;
                    background-color: #B29873;
                }
                img {
                    width: 26px;
                    height: 26px;
                    margin-left: -15px;
                    margin-right: 5px;
                }
                p {
                    font-size: 16px;
                    font-weight: 500;
                }
                .win {
                    width: 29px;
                    height: 29px;
                    color: #fff;
                    display: block;
                    font-size: 12px;
                    line-height: 29px;
                    text-align: center;
                    background: url('../../../assets/imgs/icon03.png') no-repeat 0 0;
                    background-size: 100%;
                    position: absolute;
                    top: 0;
                    right: 5px;
                }
            }
        }
    }
</style>
