<!--
 * @描述:加载失败界面
 * @版本: 
 * @作者: 刘晓伟
 * @Date: 2020年5月2日15:01:35
 * @最后修改人:
 * @LastEditTime: 
 -->
<template>
  <div>
    <div class="pictureText">
      <div class="img">
        <img :src="load" />
      </div>
      <div @click="loadPageClick">
        网络开小差了，点击
        <span>重新加载</span>
      </div>
    </div>
  </div>
</template>
<script>
//加载整个页面，下拉刷新，点击刷新
/* eslint-disable */
export default {
  data() {
    return {
      load: require("../../assets/publicAll/loadFailed.jpg")
    };
  },
  methods: {
    //重新加载：思路：获取加载界面的路由，在此处界面点击之后重新加载该路由
    reload() {},
    loadPageClick() {
      //重新加载界面
      console.log("name");
      // this.window.reload();
      // this.$router.go(0)
      window.location.reload();
    }
  }
};
</script>
<style scoped>
img {
  margin-top: 20%;
  width: 3.5rem;
  margin-bottom: 0.8rem;
}
.pictureText{
  position:fixed;
  top: 200px;
  left: 0;
  right: 0;
}
</style>