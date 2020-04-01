/*
 * @Description:轻提示时长
 * @Version: 1.0
 * @Author: 杨子颍
 * @Date: 2019-10-05 16:52:43
 * @LastEditors: 杨子颍
 * @LastEditTime: 2019-10-09 15:32:39
 */
import { Toast } from 'vant'
import 'vant/lib/index.css'

export function toast(message, duration = 1000) {
  Toast({
    message, duration
  })
}
