<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="item.value"
          :name="item.key"
          :label="item.label"
          :placeholder="'请输入'+item.label"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {getCurrentUser} from "../services/user";
import {REQUEST_SUCCESS} from "../constant/constant";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute();
const router =useRouter();

const item = ref({
  key: route.query.key,
  value: route.query.value,
  label: route.query.label,
});

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  const res = await myAxios.put("/user/update", {
    "id": currentUser.id,
    [item.value.key as string]: item.value.value
  })
  // @ts-ignore
  if (null !== res && res.code == REQUEST_SUCCESS) {
    showSuccessToast("修改成功");
    router.back();
  }else {
    showFailToast("修改失败");
  }
};

</script>

<style scoped>

</style>