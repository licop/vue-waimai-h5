// 组件使用jsx，因为相比template可以支持更动态的需求
import { defineComponent, ref, onMounted, onUpdated, nextTick } from 'vue'
import { Loading as VanLoading } from 'vant'
import { createNamespace } from '@/utils/create'
import { useEventListener } from '@/use/useEventListener'
import { useRect } from '@/use/useRect'
import { useScrollParent } from '@/use/useScrollParent'
import './OpList.scss'

const [name, bem] = createNamespace('list')

export default defineComponent({
  name,
  props: {
    offset: {
      type: Number,
      default: 300,
    },
    direction: {
      type: String,
      default: 'down',
    },
    loading: {
      type: Boolean,
    },
    finished: {
      type: Boolean,
    },
    finishedText: {
      type: String,
    },
    loadingText: {
      type: String,
    },
  },

  setup(props, { slots, emit }) {
    const root = ref()
    const placeholder = ref()
    const scrollParent = useScrollParent(root)
    
    const check = () => {
      nextTick(() => {
        if(props.loading || props.finished) {
          return 
        }
        const scrollParentRect = useRect(scrollParent)
        if(!scrollParentRect.height) {
          return
        }
        const placeholderRect = useRect(placeholder)
        const {direction, offset} = props
        let isReachEdge = false

        if(direction === 'up') {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset
        }

        if(isReachEdge) {
          emit('update:loading', true)
          emit('load')
        }
      })
    }

    const renderLoading = () => {
      if (props.loading && !props.finished) {
        return (
          <div class={bem('loading')}>
            {slots.loading ? (
              slots.loading()
            ) : (
              <VanLoading class={bem('loading-icon')}>{props.loadingText || '加载中'}</VanLoading>
            )}
          </div>
        )
      }
    }
    
    const renderFinishedText = () => {
      if (props.finished) {
        const text = slots.finished ? slots.finished() : props.finishedText
        if (text) {
          return <div class={bem('finished-text')}>{text}</div>
        }
      }
    }

    onMounted(() => {
      check()
    })

    useEventListener('scroll', check, {
      target: scrollParent,
      passive: true,
    })

    return () => {
      const Content = slots.default?.()
      const Placeholder = <div ref={placeholder} class={bem('palceholder')}></div>
      
      return (
        <div ref={root} class={bem()}>
          {props.direction === 'down' ? Content : Placeholder}
          {renderLoading()}
          {renderFinishedText()}
          {props.direction === 'up' ? Content : Placeholder}
        </div>
      )
    }
  }
})
