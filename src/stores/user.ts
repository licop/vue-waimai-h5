import type { IAuth, IUserInfo } from '@/types';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { ref } from 'vue';

const getDefaultUserInfo = (): IUserInfo => ({
  id: '',
  avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  nickname: '请登录',
})

export const useUserStore = defineStore('user', () => {
  const state = ref({
    userInfo: getDefaultUserInfo(),
    token: ''
  })

  const getUserInfo = computed(() => {
    return state.value.userInfo
  })

  const setInfo = ({token, userInfo}: IAuth) => {
    state.value.userInfo = userInfo
    state.value.token = token
  }

  const removeInfo = () => {
    state.value.userInfo = getDefaultUserInfo()
    state.value.token = ''
  }
  
  return {
    state,
    getUserInfo,
    setInfo,
    removeInfo
  }
})