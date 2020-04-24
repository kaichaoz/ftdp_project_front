<!--
*@描述:模板500米
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:付媛媛
*@LastEditTime:2020年4月21日19:24:33
*@说明：-->
<template>
  <div>
    <!-- 左右滑动 -->

    <div v-for="(item,i) in title" :before-close="beforeClose">
      <van-swipe-cell>
        <!-- 显示内容 -->
        <van-cell :border="false" :title="title[i].templateName" :value="value" />
        <!-- 右划内容 -->
        <template slot="right">
          <!-- 编辑按钮 -->
          <van-button @click="intoCreateName(i)" square type="primary" :text="textEdit" />
          <!-- 删除按钮 -->
          <van-button @click="deleteName(i)" square type="danger" :text="textDelete" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import { Dialog } from "vant";
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

    /**
     * @description: 具体模板左滑编辑按钮
     * @param ：{i:具体模板索引}
     * @return: 无
     * @author: 付媛媛
     * @Date:2020-4-21 19:24:12
     */
    intoCreateName(i) {
      this.$emit("listenSwipeCellToManagementEdit", this.groupIndexP, i);
    },

    /**
     * @description: 删除具体模板
     * @param ：{i:具体模板索引}
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年4月21日19:23:33
     */
    deleteName(i) {
      this.$emit("listenSwipeCellToManagement", i, this.groupIndexP);
    }
  }
};
</script>
