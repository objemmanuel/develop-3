import { computed } from 'vue'

export const sliceStr = computed(() => {
  return function (val, len) {
    return val.length > len ? val.slice(0, len) + '...' : val
  }
})
