<!--
*@描述:无效组件
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
            <user
              v-if="componentList[index].isTrue && componentList[index].componentId ==libraryId.userInfoList.user"
            ></user>
            <infoShow
              v-if="componentList[index].isTrue && componentList[index].componentId ==libraryId.theMessageStatesList.infoShow"
            ></infoShow>
            <numberIndex
              v-if="componentList[index].isTrue && componentList[index].componentId ==libraryId.enterInfomationList.numberIndex"
            ></numberIndex>

            <!-- 左滑显示的内容 -->
            <template #right>
              <van-button
                @click="useComponent(index)"
                square
                text="使用"
                type="primary"
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

/* 左滑 */
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
<script>
import user from "../library/userInfo/user"; // 用户信息
import infoShow from "../library/theMessageStates/infoShow"; // 信息显示
import numberIndex from "../library/enterInformation/numberIndex"; // 数字输入框

import swipeCell from "../template/swipeCell"; // 左右滑动
import { mapState } from "vuex";

export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["libraryId", ""])
  },
  components: {
    user,
    infoShow,
    numberIndex,
    swipeCell
  },
  props: {
    // 接收父组件（libarry)传递过来是否显示的值
    userInfoP: { default: false },
    theMessageStatesListP: { default: false },
    enterInfomationListP: { default: false },
    titleP: { default: "无效组件" } // library传递过来抬头信息
  },
  data() {
    return {
      activeNames: "1", // 下拉框默认1，不需要修改
      title: "", // 模板名称

      // 每个下拉框内容，默认是不显示的
      componentList: [
        { isTrue: false, position: 0, componentId: "0445946" },
        { isTrue: false, position: 1, componentId: "0473771" },
        { isTrue: false, position: 2, componentId: "4833953" }
      ]
    };
  },
  watch: {
    // 数据变化时：监听父页面library数据:此页面组件类名
    titleP(newVal) {
      this.title = newVal;
    },
    // 数据变化时：监听父页面library数据:userInfo里面单个组件是否显示
    userInfoP(newVal) {
      this.componentList[0].isTrue = newVal;
    },
    // 数据变化时：监听父页面library数据:themessagStates里面单个组件是否显示
    theMessageStatesListP(newVal) {
      this.componentList[1].isTrue = newVal;
    },
    // 数据变化时：监听父页面library数据:enterInfomation里面单个组件是否显示
    enterInfomationListP(newVal) {
      this.componentList[2].isTrue = newVal;
    }
  },
  mounted() {
    // 初始化监听父页面library数据:此页面组件类名
    this.componentList[0].isTrue = this.userInfoP; // userInfo中user为false
    this.componentList[1].isTrue = this.theMessageStatesListP; // theMessageStates中infoShow为falses
    this.componentList[2].isTrue = this.enterInfomationListP; // enterInfomation中numberIndex为false
    this.title = this.titleP; // 组件类名字
  },
  methods: {
    // 组件右划使用按钮操作
    useComponent(i) {
      // 当前页面不显示
      this.componentList[i].isTrue = false;
      // 根据第几个传递给相应的组件类库
      switch (i) {
        case 0:
          this.$emit("listen_Invalid_ToLibrary_userInfo", true);
          break;
        case 1:
          this.$emit("listen_Invalid_ToLibrary_infoShow", true);
          break;
        case 2:
          this.$emit("listen_Invalid_ToLibrary_numberIndex", true);
          break;
        default:
          break;
      }
    }
  }
};
</script>
