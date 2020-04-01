<!--
*@描述:输入信息组件
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <!-- 下拉框所有内容 -->
    <van-collapse class="publicClassification" v-model="activeNames" accordion>
      <!-- 折叠面板 -->
      <van-collapse-item :title="title" name="1">
        <div class="componentBody" v-for="(item,index) in componentList">
          <!-- 左滑显示添加删除等 -->
          <van-swipe-cell>
            <!-- 不同下拉框里面不同内容 -->
            <numberIndex v-if="componentList[index].isTrue && componentList[index].position ==0"></numberIndex>

            <!-- 左滑显示的内容 -->
            <template #right>
              <van-button
                @click="disableComponent(index)"
                square
                text="停用"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<style scoped>
.componentBody {
  margin-bottom: 20px;
}
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
<script>
import numberIndex from "./numberIndex"; // 引入数字输入组件
import swipeCell from "../../template/swipeCell"; // 左右滑动

export default {
  components: {
    numberIndex,
    swipeCell
  },

  props: {
    titleP: { default: "数据输入组件" }, // 接收父组件传递当前抬头名字
    enterInfomationListP: { default: true } // 接收父组件library传递的theMessageStatesList是否显示
  },
  data() {
    return {
      activeNames: "1", // 下拉框默认1，不需要修改
      title: "", // 模板名称
      componentList: [{ isTrue: true, position: 0 }] // 每个下拉框下面的组件内容
    };
  },
  watch: {
    // 数据变化时：监听父页面library数据:此页面组件类名
    titleP(newVal) {
      this.title = newVal;
    },
    enterInfomationListP(newVal) {
      this.componentList[0].isTrue = newVal;
    }
  },
  mounted() {
    // 初始化监听父页面library数据:此页面组件类名
    this.title = this.titleP;
    this.componentList[0].isTrue = this.enterInfomationListP;
  },
  methods: {
    // 组件右划停用按钮操作
    disableComponent(index) {
      this.componentList[index].isTrue = false; // 不显示此组件
      this.$emit("listenEnterInfomationToLibrary", index); // 向library通知消息
    }
  }
};
</script>
