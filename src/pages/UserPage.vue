<template>
  <van-cell title="当前用户"  :value="user?.username"/>
  <van-cell title="修改用户信息" is-link to="/user/update"/>
  <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
  <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
</template>
<script setup lang="ts">

import { useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {REQUEST_SUCCESS} from "../constant/constant";
import {showFailToast} from "vant";

const router = useRouter();

const user = ref({});
onMounted(async () => {
  const res = await myAxios.get("/user/current")
      .then(function (response){
        // @ts-ignore
        if (null !== response && response.code == REQUEST_SUCCESS) {
          return response?.data;
        }
        showFailToast("未登录")
      });
  user.value = res;
})
</script>

<style scoped>

</style>