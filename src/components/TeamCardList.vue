<template>
  <div id="teamCardList"></div>
  <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      :title="`${team.name}`"
      :thumb="teamDog"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
        {{
          teamStatusEnum[team.status]
        }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{`队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + team.expireTime }}
      </div>
      <div>
        {{ '创建时间: ' + team.createTime }}
      </div>
    </template>
    <template #footer>
      <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                  @click="preJoinTeam(team)">
        加入队伍
      </van-button>
      <!-- 仅加入队伍可见 -->
      <van-button v-if="team.userId === currentUser?.id || team.hasJoin" size="small" plain
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" plain
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>

  </van-card>
  <van-empty description="搜索结果为空" v-if="!teamList || teamList.length === 0">
  </van-empty>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<script setup lang="ts">

import {TeamType} from "../model/team";
import teamDog from "../assets/teamDog.jpg"
import {teamStatusEnum} from "../constant/team"
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";


const router = useRouter();
const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showSuccessToast('加入成功')
    doJoinCancel();
    location.reload();
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);

/**
 * 判断是不是加密房间，是的话显示密码框
 * @param team
 */
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 退出队伍
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id,
  })
  if (res?.code === 0) {
    showSuccessToast('退出成功');
    location.reload();
  } else {
    showFailToast('退出失败');
  }
}

/**
 * 解散队伍
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    teamId: id,
  })
  if (res?.code === 0) {
    showSuccessToast('退出成功');
    location.reload();
  } else {
    showFailToast('退出失败');
  }
}

/**
 * 更新队伍
 */
const doUpdateTeam = async (id: number) => {
  await router.push({
    path: "team/update",
    query: {
      id,
    }
  });
}

</script>

<style scoped>

</style>