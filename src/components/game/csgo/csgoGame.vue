<template>
    <div class="csgo-game">
        <VideoLive />
        <PlayGame />
        <PlayMap />
        <PlayAnaly @getBattleId="getBattleId" />
        <PlayKill />
        <PlayerData />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, ref, provide, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {

            let battleId = ref(0)

            const gameData = inject('detail')
            watch(gameData, () => {
                battleId.value = gameData.gameDetail.battle_info.length > 0 ? gameData.gameDetail.battle_info[0].battle_id : 0
            })

            const getBattleId = (val) => {
                battleId.value = val
            }

            provide('battleid',battleId)

            return {
                battleId,
                getBattleId
            }
        },
        components: {
            VideoLive: defineAsyncComponent(() => import('@/components/game/module/videoLive')), // 视频
            PlayGame: defineAsyncComponent(() => import('@/components/game/module/playGame')),   // 对局
            PlayAnaly: defineAsyncComponent(() => import('@/components/game/module/playAnaly')), // 对战分析
            PlayMap: defineAsyncComponent(() => import('@/components/game/csgo/playMap')),       // 地图信息
            PlayKill: defineAsyncComponent(() => import('@/components/game/csgo/playKill')),     // 对局详情
            PlayerData: defineAsyncComponent(() => import('@/components/game/csgo/playerData')), // 选手数据
        }
    })
</script>

<style lang="less" scoped>
    .csgo-game {
        .bar {
            width: 3px;
            height: 22px;
            margin: 0 2.5px;
            border-radius: 1px;
            background-color: #999;
            &.win {
                background-color: #333;
            }
        }
    }
</style>
