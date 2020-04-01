<!--
 * @Description:相机上传
 * @Version: 1.0
 * @Autor: 白爱民
 * @Date: 2019年12月23日16:07:24
 * @LastEditors  : 杨晓尚
 * @LastEditTime : 2019-12-23 10:02:18

 当前父组件调用子组件，子组件将值传递给父组件，当前传递的是假数据
 -->
<template>
  <!-- 相机图片 -->
  <van-uploader
    capture="camera"
    :max-count="3"
    :max-size="10485760"
    :after-read="onRead"
    :before-read="beforeRead"
  >
    <img :src="imgSrc" style="margin-top:1px;margin-left:55px;" />
  </van-uploader>
</template>

<script>
import { toast } from "../../api/toast.js";
// import { replyphoto } from "@/api/reply.js";
export default {
  props: {
    urlLocalPicture: { default: "" } // 传递当前上传的图片
  },
  data() {
    return {
      imgSrc: require("../../assets/reply/camera.png"),
      imgURL:
        "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg"
    };
  },
  methods: {
    // 作答图片上传
    onRead(file) {
      var vm = this;
      var formData = new FormData();
      formData.append("file", file.file);

      //上传图片方法
      // replyphoto(formData).then(response => {
      //   vm.imgURL = response.data;
        this.InsertImgNode();
      // });
    },

    // 向父组件传递当前值
    InsertImgNode() {
      this.$emit("listenToChildEvent", this.imgURL);
    },

    // 限制上传图片大小不超过10M
    beforeRead(file) {
      if (file.size > 1048576) {
        toast("亲，请选择小于1M的图片哦");
        return false;
      }
      return true;
    }
  }
};
</script>
