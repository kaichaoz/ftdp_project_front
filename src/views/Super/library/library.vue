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
    <titlePerPage
      :title="libraryTitle.title"
      :leftText="libraryTitle.leftText"
      :rightText="libraryTitle.rightText"
      @listenTitlePerPageLeftClick="intoManagement"
    ></titlePerPage>

    <!-- 可以长按拖动内容 -->
    <vuedraggable v-model="classList" :options="options">
      <div class="bodyDiv" v-for="(item ,index) in classList">
        <userInfo
          :userInfoListP="componentInvalidTouserInfoList"
          @listenUserInfoToLibrary="listenUserInfo"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].groupId == groupIdList.userInfo"
        ></userInfo>
        <theMessageStates
          :theMessageStatesListP="componentInvalidToTheMessageStatesList"
          @listenTheMessageStatesToLibrary="listenTheMessageStates"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue
          && classList[index].groupId == groupIdList.theMessageStates "
        ></theMessageStates>
        <enterInformation
          :enterInfomationListP="componentInvalidToEnterInfomationList"
          @listenEnterInfomationToLibrary="listenEnterInfomation"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].groupId == groupIdList.enterInfomation"
        ></enterInformation>

        <invalidComponents
          @listen_Invalid_ToLibrary_userInfo="listenToUserInfo"
          @listen_Invalid_ToLibrary_infoShow="listenToInfoShow"
          @listen_Invalid_ToLibrary_numberIndex="listenToNumberIndex"
          :userInfoP="componentuserInfoToInvalidList[0].isTrue"
          :theMessageStatesListP="componentTheMessageStatesToInvalidList[0].isTrue"
          :enterInfomationListP="componentEnterInfomationToInvalidList[0].isTrue"
          :titleP="classList[index].title"
          v-if="classList[index].isTrue && classList[index].groupId == groupIdList.invalid"
        ></invalidComponents>
      </div>
    </vuedraggable>
  </div>
</template>
<style scoped>
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
import titlePerPage from "../../../components/publicAll/title_per_page"; // title组件
import userInfo from "../../../components/Super/library/userInfo/userInfo"; // 用户信息组件类
import theMessageStates from "../../../components/Super/library/theMessageStates/theMessageStates"; // 信息显示组件类
import enterInformation from "../../../components/Super/library/enterInformation/enterInformation"; // 输入信息组件类
import vuedraggable from "vuedraggable"; //拖动
import invalidComponents from "../../../components/Super/library/invalidComponents"; // 无效组件
import swipeCell from "../../../components/Super/template/swipeCell"; // 左右滑动
import {
  queryComponent,
  updateComponent
} from "../../../api/Super/library/library";
import { mapState } from "vuex";
export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["libraryId", "notifyInfo"])
  },
  components: {
    userInfo,
    theMessageStates,
    enterInformation,
    vuedraggable,
    swipeCell,
    invalidComponents,
    titlePerPage
  },
  data() {
    return {
      libraryTitle: {
        title: "模板管理",
        leftText: "组件管理",
        rightText: ""
      },

      // 分组ID：与数据库同步
      groupIdList: {},
      // 由invalidComponents传递过来，并传送给各自组件类(组件是否显示)
      componentInvalidTouserInfoList: [
        { isTrue: true, position: 0, componentId: "0445946" }
      ],
      componentInvalidToTheMessageStatesList: [
        { isTrue: true, position: 0, componentId: "0473771" }
      ],
      componentInvalidToEnterInfomationList: [
        { isTrue: true, position: 0, componentId: "4833953" }
      ],
      // 由各个组件类传递过来，并传送给invalidComponents（无效组件是否显示）
      componentuserInfoToInvalidList: [
        { isTrue: false, position: 0, componentId: "0445946" }
      ],
      componentTheMessageStatesToInvalidList: [
        { isTrue: false, position: 0, componentId: "0473771" }
      ],
      componentEnterInfomationToInvalidList: [
        { isTrue: false, position: 0, componentId: "4833953" }
      ],
      //渲染当前library页面数据
      classList: [
        {
          groupId: "5856212" /* 分组ID */,
          title: "用户信息组件" /* 分组名字 */,
          isTrue: true /* 组件为true */,
          position: 0 /* 组件位置 */,
          componentId: "" /* 组件ID */
        },
        {
          groupId: "8706797",
          title: "信息显示组件",
          isTrue: true,
          position: 1
        },
        {
          groupId: "0342524",
          title: "数组输入组件",
          isTrue: true,
          position: 2
        },
        {
          groupId: "1111111",
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
    this.groupIdList = this.libraryId;
  },
  // 虚拟DOM重新渲染并应用更新前
  beforeUpdate() {},
  // 虚拟DOM重新渲染并应用更新后：
  updated() {
    // console.log(this.classList);
  },
  // 解除绑定销毁子组件以及事件监听器之前：
  beforeDestroy() {
    // this.changeLocation(); //离开页面前，修改classList数组中位置
    // 调取后端接口
    this.postUpdateComponent();
  },
  mounted() {},
  methods: {
    // 修改classList数组中位置，随着位置改变，数据改变
    changeLocation() {
      for (let i = 0; i < this.classList.length; i++) {
        this.classList[i].position = String(i);
      }
    },
    /**
     * @description: 更新数据
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月21日10:01:19
     */
    postUpdateComponent() {
      var modelData = [];
      this.changeLocation();
      for (let i = 0; i < this.classList.length; i++) {
        modelData.push({
          groupId: this.classList[i].groupId,
          groupName: this.classList[i].title,
          isUsable: this.classList[i].isUsable,
          groupSequence: this.classList[i].position,
          componentId: this.classList[i].componentId
        });
        const b = this.assignment01(modelData[i].groupId);
        // console.log(b);
        modelData[i].isUsable = b;
        modelData[i].isUsable = modelData[i].isUsable == true ? "0" : "1";
      }
      this.$axios.post(updateComponent, modelData).then(res => {
        switch (res.data.code) {
          case this.$responseCode.SUCCESSCODE:
            this.$Notify({
              message: this.notifyInfo[0].saveSucceed,
              background: this.notifyInfo[1].blue, //   橘色：#FF976A
              duration: this.notifyInfo[2].duration
            });
            break;
          default:
            this.$Notify({
              message: this.notifyInfo[0].saveFailed,
              background: this.notifyInfo[1].orange, //   橘色：#FF976A
              duration: this.notifyInfo[2].duration
            });
            break;
        }
      });
    },
    /**
     * @description: 为前面六个01赋值
     * @param {groupId:组件ID}
     * @return: isTrue: true/false
     * @author: 白爱民
     * @Date: 2020年4月21日10:02:29
     */
    assignment01(groupId) {
      switch (groupId) {
        case this.groupIdList.userInfo:
          var isTrue = this.componentInvalidTouserInfoList[0].isTrue;
          break;
        case this.groupIdList.theMessageStates:
          var isTrue = this.componentInvalidToTheMessageStatesList[0].isTrue;
          break;
        case this.groupIdList.enterInfomation:
          var isTrue = this.componentInvalidToEnterInfomationList[0].isTrue;
          break;
        default:
          break;
      }
      return isTrue;
    },
    /**
     * @description: 初始化查询接口
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月21日10:03:38
     */
    getQueryComponent() {
      this.classList = []; // 清空数据
      // 请求方法
      this.$axios.get(queryComponent).then(res => {
        switch (res.data.code) {
          case this.$responseCode.SUCCESSCODE:
            for (let i = 0; i < res.data.data.length; i++) {
              // 将后端数据存放到数组中
              this.classList.push({
                groupId: res.data.data[i].groupId,
                title: res.data.data[i].groupName,
                isTrue: "true",
                isUsable: res.data.data[i].isUsable,
                position: res.data.data[i].groupSequence,
                componentId: res.data.data[i].componentId
              });
              // 替换后端的01分别改为true和false
              this.classList[i].isUsable =
                this.classList[i].isUsable === "0" ? true : false;
              // 将上面六个字段赋值：用于是否显示
              this.assignmentTF(
                this.classList[i].groupId,
                this.classList[i].isUsable
              );
            }
            break;
          case this.$responseCode.NULLCODE:
            this.$Notify({
              message: this.notifyInfo[0].noData,
              background: this.notifyInfo[1].orange, //   橘色：#FF976A
              duration: this.notifyInfo[2].duration
            });
            break;
          default:
            this.$Notify({
              message: this.notifyInfo[0].loadFailed,
              background: this.notifyInfo[1].orange, //   橘色：#FF976A
              duration: this.notifyInfo[2].duration
            });
            break;
        }
      });
    },
    /**
     * @description: 为前面六个isTrue赋值
     * @param {groupId:组件ID,isTrue：true/false}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月21日10:03:07
     */
    assignmentTF(groupId, isTrue) {
      switch (groupId) {
        case this.groupIdList.userInfo:
          this.componentInvalidTouserInfoList[0].isTrue = isTrue;
          this.componentuserInfoToInvalidList[0].isTrue =
            isTrue == true ? false : true;
          break;
        case this.groupIdList.theMessageStates:
          this.componentInvalidToTheMessageStatesList[0].isTrue = isTrue;
          this.componentTheMessageStatesToInvalidList[0].isTrue =
            isTrue == true ? false : true;
          break;
        case this.groupIdList.enterInfomation:
          this.componentInvalidToEnterInfomationList[0].isTrue = isTrue;
          this.componentEnterInfomationToInvalidList[0].isTrue =
            isTrue == true ? false : true;
          break;
        default:
          break;
      }
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