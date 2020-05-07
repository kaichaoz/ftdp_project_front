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
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh"
    >
      <div class="pictureText">
        <div class="img">
          <img :src="load" />
        </div>
        <div @click="loadPageClick">连接失败，点击重新连接</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mapState } from "vuex";
//加载整个页面，下拉刷新，点击刷新
/* eslint-disable */
export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["pullRefresh"])
  },
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
    },
    //下拉刷新功能
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能 
      }, 1000); //1000代表刷新时间
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
.pictureText {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
}
</style>