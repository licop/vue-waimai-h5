// 倒计时组件
import { ref, computed } from 'vue'
import { rAF, cancelRAF } from '@/utils/raf'

type CurrentTime = {
  days: number
  hours: number
  mintutes: number
  seconds: number,
  milliseconds: number,
  total: number
}

type UseCountDownOptions = {
  time: number
  millisecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const parseTime = (time: number) => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const mintutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    days,
    hours,
    mintutes,
    seconds,
    milliseconds,
    total: time
  }
}

const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountDown(options: UseCountDownOptions) {
  const remain = ref(options.time)
  let endTime: number
  let counting: boolean
  let rafId: number
  let current = computed(() => parseTime(remain.value))
  
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)
  
  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(current.value)

    if(value === 0) {
      pause()
      options.onFinish?.()
    }
  }

  // 毫秒级别的
  const microTick = () => {
    rafId = rAF(() => {
      if(counting) {
        const _remain = getCurrentRemain()
        setRemain(_remain)

        if(remain.value > 0) {
          microTick()
        }
      }
    })
  }
  // 非毫秒级别
  const macroTick = () => {
    rafId = rAF(() => {
      if (counting) {
        const _remain = getCurrentRemain()
        if (!isSameSecond(_remain, remain.value) || _remain === 0) {
          setRemain(_remain)
        }

        if (remain.value > 0) {
          macroTick()
        }
      }
    })
  }

  const tick = () => {
    if(options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }

  const start = () => {
    if(!counting) {
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }

  const pause = () => {
    counting = false
    cancelRAF(rafId)
  }
  
  const reset = (totalTime = options.time) => {
    pause()
    remain.value = totalTime
  }

  return {
    start,
    pause,
    reset,
    current
  }
}