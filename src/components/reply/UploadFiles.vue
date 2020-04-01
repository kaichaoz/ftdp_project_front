<!--
 * @Description:图片上传
 * @Version: 1.0
 * @Autor: 白爱民
 * @Date: 2019年12月23日16:07:24
 * @LastEditors  : 杨晓尚
 * @LastEditTime : 2019-12-23 10:02:18

 当前父组件调用子组件，子组件将值传递给父组件，当前传递的是假数据
 -->
<template>
  <!-- 上传文件 -->
  <van-uploader
    multiple
    preview-size="0px"
    :max-count="3"
    accept="file/*"
    :after-read="onfile"
    :max-size="10485760"
  >
    <img
      :src="imgSrc"
      style="margin-top:7px;margin-left:55px;"
    >
  </van-uploader>
</template>

<script>
import { METHODS } from 'http'
export default {
  data() {
    return {
      imgSrc: require('../../assets/reply/file.png'), // 页面显示的图片
      imgUrl:
        'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg' // 当前像父页面传递的假数据
    }
  },
  methods: {
    // 作答文件上传
    onfile(file) {
      var formData = new FormData()
      formData.append('file', file.file)
      this.Insertfile()
    },
    // 向父组件传递当前值
    Insertfile() {
      this.$emit('listenToChildEvent', this.imgUrl)
    }
  }
}
</script>
