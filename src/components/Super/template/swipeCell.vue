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
    <!-- 左右滑动 -->

    <div v-for="(item,i) in title">
      <van-swipe-cell :before-close="beforeClose">
        <!-- 显示内容 -->
        <van-cell :border="false" :title="title[i].templateName" :value="value" />
        <!-- 右划内容 -->
        <template slot="right">
          <!-- 编辑按钮 -->
          <van-button @click="intoCreateName(i)" square type="primary" :text="textEdit" />
          <!-- 删除按钮 -->
          <van-button @click="deleteName(i,index)" square type="danger" :text="textDelete" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  props: {
    groupIndexP: { default: "" },
    titleP: { default: "" }
  },
  data() {
    return {
      // 左侧title--只读
      title: [],
      // 右侧内容（当前不显示）--只读
      value: "",

      textEdit: "编辑",
      textDelete: "删除"
    };
  },

  created() {},

  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.title = this.titleP;
    },
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

    //编辑按钮
    intoCreateName(i) {
      this.$router.push({
        name: "createName",
        params: {
          managementEdit: "1", // 表示从编辑进入
          title: this.groupIndexP
        }
      });
    },

    // 删除按钮
    deleteName(i,index) {
      this.$emit("listenSwipeCellToManagement", i, this.groupIndexP);
    }
  }
};
</script>
