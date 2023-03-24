import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Tabbar, TabbarItem, Search, Icon } from 'vant'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)

const rootValue = 16 // 设计稿的字体
const rootWidth = 390 // 设计稿宽度
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'

app.mount('#app')
