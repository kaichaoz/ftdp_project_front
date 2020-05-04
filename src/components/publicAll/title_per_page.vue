<!--
*@描述:title组件
*@版本:V1.0
*@作者:白爱民
*@Date:2020年5月4日10:08:47
*@最后修改人:白爱民
*@LastEditTime:2020年5月4日10:08:50
*@说明：-->
<template>
  <div>
    <!-- 抬头 -->
    <!-- <div class="title commonColor">
      <img @click="intoSetting()" class="iocName" :src="plus" alt />
      <div class="button" @click="intoModel()">编辑模板</div>
      <div class="titleName" v-text=" '规则'"></div>
    </div>-->
    <div class>
      <van-nav-bar
        :title="titlePerPageData.title"
        :left-text="titlePerPageData.leftText"
        :right-text="titlePerPageData.rightText"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right v-if="titlePerPageData.iconIsTrue">
          <van-icon
            :name="titlePerPageData.iconName"
            :size="titlePerPageData.iconSize"
            :color="titlePerPageData.iconColor"
          />
        </template>
      </van-nav-bar>
    </div>
  </div>
</template>
<style scoped>
.van-nav-bar {
  background-color: #fecd2a;
}
.van-nav-bar__text {
  color: #2f4f4f;
  font-size: 15px;
}
.van-nav-bar__title {
  font-size: 20px;
}
/* .commonColor {
  background-color: #fecd2a;
} */

/* .title {
  overflow: hidden;
  border: 1px;
  width: auto;
  height: 48px;  
}
.button {
  float: left;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
}
.titleName {
  margin: 10px auto 10px;
  font-size: 20px;
  width: 100px;
}

.title .iocName {
  float: right;
  width: 35px;
  height: 35px;
  margin-top: 5px;
} */
</style>
<script>
import { NavBar } from "vant";
export default {
  props: {
    title: { default: "标题" },
    leftText: { default: "返回" },
    rightText: { default: "按钮" },
    iconName: { default: "setting-o" },
    iconSize: { default: "24" },
    iconColor: { default: "#2F4F4F" },
    iconIsTrue: { default: false }
  },
  data() {
    return {
      // plus: require("../../assets/super/template/plus.png") // 底部加号图片

      titlePerPageData: {
        title: "", // title文字
        leftText: "", // left文字
        rightText: "", // right文字
        iconName: "", // 图片名
        iconSize: "", // 图片大小
        iconColor: "", // 图片颜色
        iconIsTrue: "" // 图片是否显示，默认不显示
      }
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    // 初始化页面显示数据
    start() {
      this.titlePerPageData.title = this.title;
      this.titlePerPageData.leftText = this.leftText;
      this.titlePerPageData.rightText = this.rightText;
      this.titlePerPageData.iconName = this.iconName;
      this.titlePerPageData.iconSize = this.iconSize;
      this.titlePerPageData.iconColor = this.iconColor;
      this.titlePerPageData.iconIsTrue = this.iconIsTrue;
    },
    onClickLeft() {
      this.$emit("listenTitlePerPageLeftClick"); // 返回左侧按钮click事件
    },
    onClickRight() {
      this.$emit("listenTitlePerPageRightClick"); // 返回右侧按钮click事件
    }
  }
};
</script>
