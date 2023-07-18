import { createRouter, createWebHistory } from 'vue-router'
import TabsView from '@/views/tabs/TabsView.vue'
import HomeView from '@/views/tabs/home/HomeView.vue'
import OrderView from '@/views/tabs/order/OrderView.vue'
import MeView from '@/views/tabs/me/MeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import ShopView from '@/views/shop/ShopView.vue'
import GoodsView from '@/views/goods/GoodsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/order',
          name: 'order',
          component: OrderView
        },
        {
          path: '/me',
          name: 'me',
          component: MeView
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: LoginView
    },
    {
      name: 'shop',
      path: '/shop/:id',
      component: ShopView
    },
    {
      name: 'goods',
      path: '/goods/:id',
      component: GoodsView
    }
  ]
})

// router.beforeEach((to, from) => {
//   if(to.meta.reqeireAuth && !auth.isLoginedIn()) {
//     return {
//       path: '/login',
//       // 保存我们所在的位置，以便以后再来
//       query: {
//         redirect: to.fullPath
//       }
//     }
//   }  
// })

export default router
