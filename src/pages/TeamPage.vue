<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="doSearch"/>
    <van-button class="add-button" type="primary" @click="toAddTeam" icon="plus"></van-button>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {TeamType} from "../model/team";

const router = useRouter();
const teamList = ref([]);
// const myJoinTeamList = ref([]);
const searchText = ref('');
const active = ref('public');

const onTabChange = async (name: string) => {
  if (name === 'public') {
    await listTeam(searchText.value, 0);
  } else {
    await listTeam(searchText.value, 2);
  }
}

/**
 * 搜索
 */
const doSearch = async () => {
  await listTeam(searchText.value)
}

onMounted(async () => {
  await listTeam();
  // await myJoinTeam();
})

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

/**
 * 搜索
 * @param val 关键词
 * @param status 队伍状态条件
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status: status,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast(res.message);
  }
}

// /**
//  * 搜索我加入的队伍
//  */
// const myJoinTeam = async (val = '') => {
//   const res = await myAxios.get("/team/list/my/join", {
//     params: {
//       searchText: val,
//     }
//   });
//   if (res?.code === 0) {
//     myJoinTeamList.value = res.data;
//   } else {
//     showFailToast(res.message);
//   }
// }
</script>

<style scoped>
#teamPage {

}
</style>
