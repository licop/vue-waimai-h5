<script setup lang="ts">
import { ref, watch } from 'vue'
import OpLoadingView from '@/components/OpLoadingView.vue';
import { useAsync } from '@/use/useAsync';
import { useRoute } from 'vue-router';
import { fetchGoodsListData } from '@/api/goods.js'
import { useCartStore } from '@/stores/cart';
import type { IGood, IMenu } from '@/types'
import GoodItem from './GoodItem.vue';

const route = useRoute()
const id = route.params.id

const { data, pending } = useAsync(
  () => fetchGoodsListData(id as string).then(v => v.data),
  [] as IMenu[]
)
const { setCartItems } = useCartStore()

watch(data, (nv) => {
  const cartGoods = nv
    .reduce((p: IGood[], v: IMenu) => [...p, ...v.goods], [])
    .filter(v => v.cartCount)
  setCartItems(cartGoods)
})

const categoryActive = ref(0)
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-goods-list">
      <VanSidebar v-model="categoryActive">
        <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"></VanSidebarItem>
      </VanSidebar>
      <div class="list">
        <template v-for="v in data" :key="v.label">
          <div class="category-name">{{ v.label }}</div>
          <GoodItem v-for="cv in v.goods" :key="cv.id" :data="cv" />
        </template>
        
      </div>
    </div>
  </OpLoadingView>
  
</template>

<style lang="scss">
.shop-goods-list {
  --van-sidebar-selected-border-color: none;
  --van-sidebar-padding: 14px var(--van-padding-sm);
  --van-sidebar-font-size: 13px;

  display: flex;

  .list {
    flex: 1;
    margin: 0 10px;

    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
    }
  }
}
</style>