<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <UserCardList :user-list="userList" :loadind="loading"/>
</template>
<script setup lang="ts">

import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../model/user";

const userList = ref([]);
const isMatchMode = ref<boolean>(false);
const loading = ref<boolean>();


/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;
  let userListData;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match/index', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match/index', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match/index error', error);
          showFailToast('请求失败');
        })
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/index', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })

        .then(function (response) {
          return response?.data?.records;
        })
        .catch(function (error) {
          showFailToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    loading.value = false;
  }
}
watchEffect(() => {
  loadData();
})


</script>

<style scoped>

</style>