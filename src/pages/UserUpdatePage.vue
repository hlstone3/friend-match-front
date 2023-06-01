<template>
  <van-cell title="昵称" is-link :value="user.username" @click="edit('username',user.username,'昵称')"/>
  <van-cell title="账号" :value="user.userAccount"/>
  <van-cell title="头像" is-link>
    <img :src="user.avatarUrl" style="height: 48px"/>
  </van-cell>
  <van-cell title="性别" is-link :value="userGenderEnum[user.gender]" @click="edit('gender',user.gender,'性别')"/>
  <van-cell title="电话" is-link :value="user.phone" @click="edit('phone',user.phone,'电话')"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="edit('email',user.email,'邮箱')"/>
  <van-cell title="星球编号" :value="user.planetCode"/>
  <van-cell title="注册时间" :value="user.createTime"/>
</template>
<script setup lang="ts">

import { useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {REQUEST_SUCCESS} from "../constant/constant";
import {showFailToast} from "vant";
import {userGenderEnum} from "../constant/user";

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
        router.push({
          path:'/user/login',
        })
        return null;
      });
  user.value = res;
})
const edit = (key: string, value: string, label: string) => {
  router.push({
    path: '/user/edit',
    query: {
      key,
      value,
      label,
    }
  })
}
</script>

<style scoped>

</style>