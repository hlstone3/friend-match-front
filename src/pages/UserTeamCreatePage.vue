<template>
  <div id="teamPage">
    <team-card-list :teamList="teamList"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref('');

/**
 * 搜索
 */
const doSearch = async () => {
  await listTeam(searchText.value)
}

onMounted(async () => {
  await listTeam();
})

/**
 * 搜索
 * @param val 关键词
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("系统故障，请重试");
  }
}


</script>

<style scoped>
#teamPage {

}
</style>
