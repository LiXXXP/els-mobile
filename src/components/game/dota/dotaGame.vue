<template>
    <div class="lol-game">
        <PlayGame />
        <PlayInfo />
        <PlayScore />
        <PlayAnaly @getBattleId="getBattleId" />
        <!-- 对战分析 -->
        <div v-show="!battleId">
            <MatchNear />
        </div>
        <div v-show="battleId">
            <PlayTeams />
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, ref, provide } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const battleId = ref(0)
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
            PlayGame: defineAsyncComponent(() => import('@/components/game/module/playGame')),   // 对局
            PlayInfo: defineAsyncComponent(() => import('@/components/game/module/playInfo')),   // 比赛信息
            PlayScore: defineAsyncComponent(() => import('@/components/game/module/playScore')), // 当前比分
            PlayAnaly: defineAsyncComponent(() => import('@/components/game/module/playAnaly')), // 对战分析
            PlayTeams: defineAsyncComponent(() => import('@/components/game/dota/playTeams')),   // 队伍对局详情
            MatchNear: defineAsyncComponent(() => import('@/components/game/module/matchNear'))  // 近期比赛情况
        }
    })
</script>

<style lang="less" scoped>

</style>
