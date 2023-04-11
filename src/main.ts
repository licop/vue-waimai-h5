import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { 
  Tabbar, 
  TabbarItem, 
  Search, 
  Icon, 
  Loading, 
  Skeleton, 
  Tabs, 
  Tab, 
  Sticky,
  NavBar,
  Form,
  CellGroup,
  Field,
  Button 
} from 'vant'

import App from './App.vue'
import router from './router'
import lazyPlugin from './directives/lazyLoading'

import 'vant/lib/index.css'

import './assets/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)
app.use(Loading)
app.use(Skeleton)
app.use(Tabs)
app.use(Tab)
app.use(Sticky)
app.use(NavBar)
app.use(Form)
app.use(CellGroup)
app.use(Field)
app.use(Button)


app.use(lazyPlugin)

const rootValue = 16 // 设计稿的字体
const rootWidth = 390 // 设计稿宽度
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'

app.mount('#app')
