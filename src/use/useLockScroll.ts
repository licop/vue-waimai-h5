// 禁止滚动
import { onDeactivated, watch, onBeforeUnmount } from 'vue'
import { onMountedOrActivated } from './onMountedOrActivated'

const BODY_LOCK_CLASS = 'op-overflow-hidden'
let totalLockCount = 0

export function useLockScroll(shouldLock: () => boolean) {
  const lock = () => {
    if(!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS)
    }
    totalLockCount++
  }
  
  const unlock = () => {
    if(totalLockCount) {
      totalLockCount--
      if(totalLockCount === 0) {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
  }

  onMountedOrActivated(() => {
    if(shouldLock()) {
      lock()
    }
  })

  const destory = () => shouldLock() && unlock()
  onDeactivated(() => destory)
  onBeforeUnmount(() => destory)

  watch(shouldLock, (v) => {
    if(v) {
      lock()
    } else {
      unlock()
    }
  })
}