<template>
    <div class="play-score">
        <div class="score flex flex_between flex_only_center" v-if="masterTeam&&guestTeam">
            
            <div class="team flex flex_only_center" 
                :title="masterTeam.team_name"
                @click="gotoLink(masterTeam.team_id)">
                <img :src="masterTeam.team_image">
                <p class="beyond-ellipsis">{{masterTeam.team_name}}</p>
            </div>

            <div class="flex flex_center">
                <slot name="csgo_ct"></slot>

                <div class="vs">
                    {{masterTeam.team_score}} : {{guestTeam.team_score}}
                </div>

                <slot name="csgo_t"></slot>
            </div>

            <div class="team flex flex_only_center" 
                :title="guestTeam.team_name"
                @click="gotoLink(guestTeam.team_id)">
                <p class="beyond-ellipsis">{{guestTeam.team_name}}</p>
                <img :src="guestTeam.team_image">
            </div>

        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'
    import { useRouter } from "vue-router"

    export default defineComponent({
        setup(props,ctx) {

            const scoreData = reactive({
                masterTeam: null,
                guestTeam: null
            })

            const gameData = inject('detail')
            watch(gameData, () => {
                scoreData.masterTeam = gameData.gameDetail.teams_info.master_team_info
                scoreData.guestTeam = gameData.gameDetail.teams_info.guest_team_info
            })

            const battleData = inject('battle')
            watch(battleData, () => {
                scoreData.masterTeam = battleData.teamsInfo.master_team_info
                scoreData.guestTeam = battleData.teamsInfo.guest_team_info
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
                ...toRefs(scoreData),
                gotoLink
            }
        }
    })
</script>

<style lang="less" scoped>
    .play-score {
        .score {
            padding: 20px;
            .team {
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 100%;
                }
                p {
                    width: 120px;
                    padding: 0 20px;
                    font-size: 18px;
                }
            }
            .vs {
                margin: 0 18px;
                font-size: 30px;
                font-weight: 600;
            }
        }
    }
</style>
