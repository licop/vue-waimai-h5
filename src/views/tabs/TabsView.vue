<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 用来记录当前选择的tab
const active = ref(route.name as string)

watch(active, (nv) => {
  router.push({
    name: nv
  })
})
</script>

<template>
  <!-- 路由匹配到的组件将渲染在这里 -->
  <RouterView />
  <VanTabbar v-model="active">
    <VanTabbarItem name="home" icon="home-o">首页</VanTabbarItem>
    <VanTabbarItem name="order" icon="bars">订单</VanTabbarItem>
    <VanTabbarItem name="me" icon="contact">我的</VanTabbarItem>
  </VanTabbar>
</template>

<style scoped></style>
