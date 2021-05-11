<template>
    <div class="lol-game">
        <VideoLive />
        <PlayGame />
        <PlayAnaly @getBattleId="getBattleId" />
        <PlayTeams />
        <PlayDiff />
        <PlayerData />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, ref, provide, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {

            const battleId = ref(0)

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
            PlayTeams: defineAsyncComponent(() => import('@/components/game/lol/playTeams')),    // 队伍对局详情
            PlayDiff: defineAsyncComponent(() => import('@/components/game/lol/playDiff')),      // 经济差/经验差
            PlayerData: defineAsyncComponent(() => import('@/components/game/lol/playerData')),  // 选手对局详情
        }
    })
</script>

<style lang="less" scoped>

</style>
