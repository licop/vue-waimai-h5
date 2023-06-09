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
    
    useExpose({ setOffset })
    
    return () => (
      <div class={bem()} style={style.value}>
        {slots.default?.()}
      </div>
    )
  }
})
