<template>
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view></router-view>
  </div>
  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {showToast} from "vant";
import {useRouter} from "vue-router";
import routes from "../configs/router.js";


const router = useRouter();
const title = ref("伙伴匹配");

router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  });
  if (route?.title) {
    title.value = route?.title;
  }else {
    title.value = ""
  }
})


const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
};


const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>