<!--
*@描述:组件库
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月17日11:11:28
*@最后修改人:白爱民
*@LastEditTime:2020年3月17日11:11:34
*@说明： 让每个类型组件抽成一个，然后在这个页面可以跳转顺序，停用使用在各自的里面使用、

-->
<template>
  <div>
    <div class="title commonColor">
      <div class="button" @click="intoManagement()">模板管理</div>
      <div class="titleName">组件管理</div>
    </div>

    <!-- 可以长按拖动内容 -->
    <vuedraggable v-model="classList" :options="options">
      <div class="bodyDiv" v-for="(item ,index) in classList">
        <userInfo
          :userInfoListP="componentInvalidTouserInfoList[0].isTrue"
          @listenUserInfoToLibrary="listenUserInfo"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].position == 0"
        ></userInfo>
        <theMessageStates
          :theMessageStatesListP="componentInvalidToTheMessageStatesList[0].isTrue"
          @listenTheMessageStatesToLibrary="listenTheMessageStates"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].position == 1 "
        ></theMessageStates>
        <enterInformation
          :enterInfomationListP="componentInvalidToEnterInfomationList[0].isTrue"
          @listenEnterInfomationToLibrary="listenEnterInfomation"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].position == 2"
        ></enterInformation>

        <invalidComponents
          @listen_Invalid_ToLibrary_userInfo="listenToUserInfo"
          @listen_Invalid_ToLibrary_infoShow="listenToInfoShow"
          @listen_Invalid_ToLibrary_numberIndex="listenToNumberIndex"
          :userInfoP="componentuserInfoToInvalidList[0].isTrue"
          :theMessageStatesListP="componentTheMessageStatesToInvalidList[0].isTrue"
          :enterInfomationListP="componentEnterInfomationToInvalidList[0].isTrue"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].position == 'Invalid'"
        ></invalidComponents>
      </div>
    </vuedraggable>
  </div>
</template>
<style scoped>
/* ===============抬头部分================= */

.title {
  overflow: hidden;
  border: 1px solid #fecd2a;
  width: auto;
  height: 48px;
  /* background: #FECD2A; */
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

.commonColor {
  background: #fecd2a;
}
/* ===============抬头部分================= */

.bodyDiv {
  margin-top: 50px;
  margin-left: 15px;
  margin-right: 15px;
}

/* 每个模板名字居左 */
>>> .van-cell {
  text-align: left;
  font-size: 20px;
}
</style>


<script>
import userInfo from "../../../components/Super/library/userInfo/userInfo"; // 用户信息组件类
import theMessageStates from "../../../components/Super/library/theMessageStates/theMessageStates"; // 信息显示组件类
import enterInformation from "../../../components/Super/library/enterInformation/enterInformation"; // 输入信息组件类
import vuedraggable from "vuedraggable"; //拖动
import invalidComponents from "../../../components/Super/library/invalidComponents"; // 无效组件
import swipeCell from "../../../components/Super/template/swipeCell"; // 左右滑动

export default {
  components: {
    userInfo,
    theMessageStates,
    enterInformation,
    vuedraggable,
    swipeCell,
    invalidComponents
  },
  data() {
    return {
      // 由各个组件类传递过来，并传送给invalidComponents
      componentuserInfoToInvalidList: [{ isTrue: false, position: 0 }],
      componentTheMessageStatesToInvalidList: [{ isTrue: false, position: 0 }],
      componentEnterInfomationToInvalidList: [{ isTrue: false, position: 0 }],

      // 由invalidComponents传递过来，并传送给各自组件类
      componentInvalidTouserInfoList: [{ isTrue: true, position: 0 }],
      componentInvalidToTheMessageStatesList: [{ isTrue: true, position: 0 }],
      componentInvalidToEnterInfomationList: [{ isTrue: true, position: 0 }],

      //渲染当前library页面数据
      classList: [
        { title: "用户信息组件", isTrue: true, position: 0 },
        { title: "信息显示组件", isTrue: true, position: 1 },
        { title: "数组输入组件", isTrue: true, position: 2 },
        { title: "无效组件", isTrue: true, position: "Invalid" }
      ],

      // 拖动长按拖动长按
      options: {
        delayOnTouchOnly: true, //开启触摸延时
        direction: "vertical", //拖动方向
        delay: 500, //延时时长
        touchStartThreshold: 3, //防止某些手机过于敏感(3~5 效果最好)
        chosenClass: "chosen" //选中之后拖拽项添加的class名(用于选中时候添加样式)
      }
    };
  },
  updated() {},
  mounted() {
    // this.start();
  },
  methods: {
    start() {},
    // 抬头左侧点击模板管理跳转
    intoManagement() {
      this.$router.push({ name: "management" });
    },

    // 监听userInfo传递过来信息：传递给invalid,组件已经停用
    listenUserInfo(i) {
      this.componentuserInfoToInvalidList[i].isTrue = true; // 无效组件库为true
      this.componentInvalidTouserInfoList[i].isTrue = false; // userInfo 为false
    },

    // 监听TheMessageStates传递过来信息：传递给invalid,组件已经停用
    listenTheMessageStates(i) {
      this.componentTheMessageStatesToInvalidList[i].isTrue = true;
      this.componentInvalidToTheMessageStatesList[i].isTrue = false;
    },

    // 监听EnterInfomation传递过来信息：传递给invalid,组件已经停用
    listenEnterInfomation(index) {
      this.componentEnterInfomationToInvalidList[index].isTrue = true;
      this.componentInvalidToEnterInfomationList[index].isTrue = false;
    },

    // 监听invalid传递过来信息：传递给userinfo,组件已经使用
    listenToUserInfo(isTrue) {
      this.componentInvalidTouserInfoList[0].isTrue = isTrue;
      this.componentuserInfoToInvalidList[0].isTrue = false;
    },
    // 监听invalid传递过来信息：传递给theMessageStates,组件已经使用

    listenToInfoShow(isTrue) {
      this.componentInvalidToTheMessageStatesList[0].isTrue = isTrue;
      this.componentTheMessageStatesToInvalidList[0].isTrue = false;
    },
    // 监听invalid传递过来信息：传递给enterInformation,组件已经使用
    listenToNumberIndex(isTrue) {
      this.componentInvalidToEnterInfomationList[0].isTrue = isTrue;
      this.componentEnterInfomationToInvalidList[0].isTrue = false;
    }
  }
};
</script>
