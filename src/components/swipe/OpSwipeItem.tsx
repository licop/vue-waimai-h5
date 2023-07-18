// 组件使用jsx，因为相比template可以支持更动态的需求
import { defineComponent, computed, reactive } from 'vue';
import { createNamespace } from '@/utils/create';
import type { CSSProperties } from 'vue';
import { SWIPE_KEY } from './OpSwipe';
import { useExpose } from '@/use/useExpose'
import { useParent } from '@/use/useParent';

const [name, bem] = createNamespace('swipe-item')

export default defineComponent({
  name,
  setup(props, { slots }) {
    // 通过useParent获取父组件传递过来的值
    const { parent } = useParent(SWIPE_KEY)
    const state = reactive({
      offset: 0
    })
    
    const style = computed(() => {
      const style: CSSProperties = {}
      
      if(parent) {
        if(parent.size.value) {
          style[parent.props.vertical ? 'height' : 'width'] = `${parent.size.value}px`
        }
        if(state.offset) {
          style.transform = `translate${parent.props.vertical ? 'Y' : 'X'}(${state.offset}px)`
        }
      }
      
      return style
    })

    const setOffset = (offset: number) => {
      state.offset = offset
    }
    
    // 将子组件的方法暴露给父组件
    useExpose({ setOffset })
    
    return () => (
      <div class={bem()} style={style.value}>
        {slots.default?.()}
      </div>
    )
  }
})
