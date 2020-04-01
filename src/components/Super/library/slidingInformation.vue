<!--
*@描述:组件滑动内容
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <!-- 左滑显示的内容 -->
    <template #right>
      <van-button
        @click="useComponent(index)"
        square
        text="使用"
        type="primary"
        class="delete-button"
      />
      <van-button
        @click="disableComponent()"
        square
        text="停用"
        type="danger"
        class="delete-button"
      />
    </template>
  </div>
</template>
<style scoped>
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      show: true,
      value: "",
      infoShow: require("../../assets/super/library/infoShow.jpg"),
      Loop: "" // 定时器
      // infoShow:require("../../assets/super/libraryinfoShow.jpg")
    };
  },
  mounted() {},
  methods: {
    // 组件右划使用按钮操作
    useComponent(index) {
      console.log(index);
    },

    // 组件右划停用按钮操作
    disableComponent() {}
  }
};
</script>
