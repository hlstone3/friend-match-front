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
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast(res.message);
  }
}


</script>

<style scoped>
#teamPage {

}
</style>
