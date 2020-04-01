<!--
*@描述:模板500米
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
*@说明：-->
<template>
  <div>
    <van-swipe-cell :before-close="beforeClose">
      <van-cell :border="false" :title="title" :value="value" />
      <template slot="right">
        <van-button @click="intoCreateName()" square type="primary" :text="text1" />

        <van-button @click="deleteName()" square type="danger" :text="text2" />
      </template>
    </van-swipe-cell>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      title: "500米",
      value: "",
      text1:"编辑",
      text2:"删除"
    };
  },
  mounted() {},
  methods: {
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
    intoCreateName(){
      this.$router.push({ name: "createName" });
    },
    deleteName(){

    }
  }
};
</script>
