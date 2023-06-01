<template>

  <UserCardList :user-list="userList" :loadind="lode"/>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";
import myAxios from "../plugins/myAxios";

const route = useRoute()
const {tags} = route.query;
const userList = ref([]);
const lode = ref<boolean>(true);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: function (params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    }
  })
      .then(function (response) {
        return response.data;

      })
      .catch(function (error) {
        console.log('/user/search/tags', error);
      })
  if (userListData) {
    userListData.forEach((user: { tags: string; }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
    lode.value = false;
  }
})

</script>

<style scoped>

</style>