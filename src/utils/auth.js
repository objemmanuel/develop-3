import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

/**
 * 获取时间戳
 * Get timestamp
 */
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 * Set timestamp
 */
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 判断token是否超时
 * Check whether the token timed out
 */
export function isCheckTimeout () {
  // 当前时间戳
  // current timestamp
  const currentTime = Date.now()
  // 缓存时间戳
  // timestamp in localStorage
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
