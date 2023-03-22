<script setup lang="ts">
import { ref, watch } from 'vue';
import { Tabbar, TabbarItem } from 'vant'
import { RouterView, useRouter, useRoute } from 'vue-router';

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
  <RouterView />
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="me" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>

<style scoped>

</style>