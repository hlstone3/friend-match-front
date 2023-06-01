<template>
  <van-skeleton title avatar :row="3" :loading="props.loadind" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="`${user.username} (${user.planetCode})`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 4px; margin-top: 4px">{{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>

  <van-empty description="搜索结果为空" v-if="!userList || userList.length === 0">
  </van-empty>
</template>

<script setup lang="ts">
import {UserType} from "../model/user";

interface UserCardListProps {
  userList: UserType[];
  loadind:boolean;
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  // @ts-ignore
  userList: [],
  // @ts-ignore
  loadind: true,
});
</script>

<style scoped>

</style>