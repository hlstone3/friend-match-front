<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        <van-col>{{ tag }}</van-col>
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px" @click="doSearch()">
    <van-button type="primary" block>搜索</van-button>
  </div>

</template>

<script setup>
  import {ref} from 'vue';
  import {useRouter} from "vue-router";

  //已选择标签
  const activeIds = ref([]);
  const activeIndex = ref(0);

  const router = useRouter()

  const doSearch = () => {
    router.push({
      path: "/search/list",
      query: {
        tags: activeIds.value
      }
    })
  }

  //标签列表
  const originalTagList = [
    {
      text: '性别',
      children: [
        {text: '男', id: '男'},
        {text: '女', id: '女'},
      ],
    },
    {
      text: '年级',
      children: [
        {text: '大一', id: '大一'},
        {text: '大二', id: '大二'},
        {text: '大一', id: '大0'},
        {text: '大二', id: '大1'},
        {text: '大一', id: '大3'},
        {text: '大二', id: '大4'},
        {text: '大一', id: '大5'},
        {text: '大二', id: '大6'},
      ],
    },
  ];
  const tagList = ref(originalTagList);

  const searchText = ref('');
  const onSearch = (val) => {
    tagList.value = originalTagList.map(parentTag => {
      const tempChildren = [...parentTag.children];
      const tempParentTag = {...parentTag}
      tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
      return tempParentTag;
    })

  };
  const onCancel = () => {
    tagList.value = originalTagList;
  };


  //移除标签
  const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
      return item !== tag;
    })
  }


</script>

<style scoped>

</style>