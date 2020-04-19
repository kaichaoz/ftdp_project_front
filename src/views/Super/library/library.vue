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
          v-if="classList[index].isTrue && classList[index].groupId == '5856212'"
        ></userInfo>
        <theMessageStates
          :theMessageStatesListP="componentInvalidToTheMessageStatesList[0].isTrue"
          @listenTheMessageStatesToLibrary="listenTheMessageStates"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue
          && classList[index].groupId == '8706797' "
        ></theMessageStates>
        <enterInformation
          :enterInfomationListP="componentInvalidToEnterInfomationList[0].isTrue"
          @listenEnterInfomationToLibrary="listenEnterInfomation"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].groupId == '0342524'"
        ></enterInformation>

        <invalidComponents
          @listen_Invalid_ToLibrary_userInfo="listenToUserInfo"
          @listen_Invalid_ToLibrary_infoShow="listenToInfoShow"
          @listen_Invalid_ToLibrary_numberIndex="listenToNumberIndex"
          :userInfoP="componentuserInfoToInvalidList[0].isTrue"
          :theMessageStatesListP="componentTheMessageStatesToInvalidList[0].isTrue"
          :enterInfomationListP="componentEnterInfomationToInvalidList[0].isTrue"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].groupId == '1111111'"
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

import { modifyById } from "../../../api/Super/library/library";
import { responseCode } from "../../../utils/responseCode";
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

      // componentList: [
      //   [{ isTrue: false, position: 0 }],
      //   [{ isTrue: false, position: 0 }],
      //   [{ isTrue: false, position: 0 }]
      // ],

      // 由invalidComponents传递过来，并传送给各自组件类
      componentInvalidTouserInfoList: [{ isTrue: true, position: 0 }],
      componentInvalidToTheMessageStatesList: [{ isTrue: true, position: 0 }],
      componentInvalidToEnterInfomationList: [{ isTrue: true, position: 0 }],

      //渲染当前library页面数据
      classList: [
        {
          groupId: "000",
          title: "用户信息组件",
          isTrue: true,
          position: 0
        },
        {
          groupId: "111",
          title: "信息显示组件",
          isTrue: true,
          position: 1
        },
        {
          groupId: "222",
          title: "数组输入组件",
          isTrue: true,
          position: 2
        },
        {
          groupId: "999",
          title: "无效组件",
          isTrue: true,
          position: 3
        }
      ],
      // classList: [],

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
  // 初始化注入校验后，在el挂载前
  created() {
    this.getQueryComponent(); // 接收后端数据
  },
  // 虚拟DOM重新渲染并应用更新前
  beforeUpdate() {},
  // 虚拟DOM重新渲染并应用更新后：
  updated() {
    // console.log(this.classList);
  },

  // 解除绑定销毁子组件以及事件监听器之前：
  beforeDestroy() {
    this.changeLocation(); //离开页面前，修改classList数组中位置
    // 调取后端接口
  },

  mounted() {
    // this.start();
    this.getQueryComponent();
  },
  methods: {
    // 修改classList数组中位置，随着位置改变，数据改变
    changeLocation() {
      for (let i = 0; i < this.classList.length; i++) {
        this.classList[i].position = i;
      }
    },

    // 初始化查询接口
    getQueryComponent() {
      this.classList = []; // 清空数据
      console.log(modifyById);

      // 请求后端地址路径：需要封装
      const componentURl =
        "http://localhost:8090/ftdp-web/Componentlibrary/queryComponent";
      // 请求方法
      this.$axios.get(modifyById).then(res => {
        console.log(modifyById);

        if (res.data.code == responseCode.SUCCESSCODE) {
          for (let i = 0; i < res.data.data.length; i++) {

            // 将后端数据存放到数组中
            this.classList.push({
              componentId: res.data.data[i].componentId,
              groupId: res.data.data[i].groupId,
              title: res.data.data[i].groupName,
              isTrue: res.data.data[i].isUsable,
              position: res.data.data[i].groupSequence
            });
          }

          // 替换后端的01分别改为true和false
          for (let index = 0; index < this.classList.length; index++) {
            if (this.classList[index].isTrue == 0) {
              this.classList[index].isTrue = true;
            } else if (this.classList[index].isTrue == 1) {
              this.classList[index].isTrue = false;
            }
          }
          console.log(this.classList);
        }
      });
    },
    start() {
      this.getQueryComponent();
    },

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
