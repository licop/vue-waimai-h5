import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
type ScrollElement = HTMLElement | Window

const defaultRoot = window
const overflowScrollReg = /scroll|auto|overlay/i

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE
}

function getScrollElement(el: Element, root: ScrollElement) {
  let node = el
  while (node && node !== root && isElement(node)) {
    // 获取node的style
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentNode as Element
  }
  return root
}

export function useScrollParent(el: Ref<Element>, root: ScrollElement = defaultRoot) {
  const scrollParent = ref()
  
  onMounted(() => {
    scrollParent.value = getScrollElement(el.value, root)
  })

  return scrollParent
}