<script setup lang="ts">
import TheTop from './components/TheTop.vue';
import SearchView from '@/views/search/SearchView.vue';
import { useToggle } from '@/use/useToggle';
import { useAsync } from '@/use/useAsync';
import { fetchHomePageData } from '@/api/home';
import type { IHomeInfo } from '@/types';

const recomments = [
  {
    value: 1,
    label: '牛腩'
  }, 
  {
    value: 2,
    label: '色拉'
  }
]

const [ isSearchViewShow, toggleSearchView ] = useToggle(false)
const { pending, data } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
    {{ pending }}
    {{ data }}
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
