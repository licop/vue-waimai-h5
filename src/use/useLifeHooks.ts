// 解决非 setup 调用生命周期 hooks 问题 
import { onUnmounted as _onUnmounted } from 'vue'

type Hook = () => void
type LifeHook = (hook: Hook) => any

interface IHookItem {
  hooks: LifeHook,
  quene: Hook[]
}

const hookMap: Record<string, IHookItem> = {
  onUnmounted: {
    hooks: _onUnmounted,
    quene: []
  }
}

export function useLifeHooks() {
  const keys = Object.keys(hookMap)
  return keys.reduce((p, key) => {
    const hookItem = hookMap[key]
    hookItem.hooks(() => {
      hookItem.quene.forEach(v => v())
    })
    return {
      ...p,
      [key]: (hook: Hook) => {
        hookItem.quene.push(hook)
      }
    }
  }, {} as Record<string, LifeHook>)
}