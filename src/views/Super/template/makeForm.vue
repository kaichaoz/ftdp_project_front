<!--
*@描述:拖拽主页面
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月25日16:49:10
*@最后修改人:herry
*@LastEditTime:2020年3月25日16:49:15
*@说明：
修改注意：
1.  当前页面数据必须是在listenToMakeForm里面使用const定义的，并且在每个子组件中必须数据相同，比如user里面数据和当前const里面第一个数组中templateArray内容一致
-->

<template>
  <div>
    <!-- 抬头 -->
    <titlePerPage
      :title="makeFormTitle.title"
      :leftText="makeFormTitle.leftText"
      :rightText="makeFormTitle.rightText"
      @listenTitlePerPageLeftClick="returnPage"
      @listenTitlePerPageRightClick="nextStep"
    ></titlePerPage>

    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh"
    >
      <!-- 页面框内容 -->
      <div id="addTemplate" class="allTemplate" v-touch:right="eventFun">
        <div v-for="(item ,i) in templateList ">
          <!-- user组件 -->
          <div
            :id="'userComDiv' + i"
            v-if="templateList[i].componentId ==libraryId.userInfoList.user"
          >
            <img @click="spliceList(i)" :src="cross" alt />
            <div @click="isTrue(i)">
              <user :isTrueList="templateList[i].templateArray" class="publicAll user"></user>
            </div>

            <!-- 修改user页面底部弹框 -->
            <siteUser
              :siteUserShowP="templateList[i].isTrue"
              :isTrueListP="templateList[i].templateArray"
              @listenUserToMakeForm="listenUser"
            ></siteUser>
          </div>

          <!-- infoShow组件 -->
          <div
            :id="'infoShowComDiv' + i"
            v-if="templateList[i].componentId ==libraryId.theMessageStatesList.infoShow"
          >
            <img @click="spliceList(i)" :src="cross" alt />
            <div @click="isTrue(i)">
              <infoShow :infoShowListP="templateList[i].templateArray" class="publicAll infoShow"></infoShow>
            </div>
            <!-- 修改infoShow页面底部弹框 -->
            <siteInfoShow
              :siteInfoShowIndexP="i"
              :siteInfoShowShowP="templateList[i].isTrue"
              :siteInfoShowListP="templateList[i].templateArray"
              @listenSiteInfoShowToMakeForm="listenSiteInfoShow"
            ></siteInfoShow>
          </div>

          <!-- numberIndex组件 -->
          <div
            :id="'numberIndexComDiv' + i"
            v-if="templateList[i].componentId ==libraryId.enterInfomationList.numberIndex"
          >
            <img @click="spliceList(i)" :src="cross" alt />
            <div @click="isTrue(i)">
              <numberIndex
                :numuberIndexListP="templateList[i].templateArray"
                class="publicAll numberIndex"
              ></numberIndex>
            </div>
            <!-- 修改NumberIndex页面底部弹框 -->
            <siteNumberIndex
              :siteNumberIndexShowP="templateList[i].isTrue"
              :siteNumberIndexListP="templateList[i].templateArray"
              @listenSiteNumberIndexToMakeForm="listenSiteNumberIndex"
            ></siteNumberIndex>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <div></div>

    <!-- 左滑弹出框 -->
    <van-popup v-model="showPopup" position="left" :style="{ height: '100%' }">
      <div id="sidebar">
        <!-- 侧边栏 -->
        <sidebar :sidebarModel="sidebarModel" @listenToMakeForm="listenToMakeForm"></sidebar>
      </div>
    </van-popup>
  </div>
</template>
<style scoped>
img {
  height: 25px;
  width: 25px;
  /* float: right; */
  /* margin: 20px; */
  position: absolute;
  /* top: 200px; */
  left: 300px;
}

.allTemplate {
  min-height: 550px;
  max-height: auto;
  border: 2px solid #fecd2a;
  margin: 30px;
  background-color: #fff;
}
.publicAll {
  background-color: #fff;
  border: 0 solid #e0e9ea;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

>>> .body {
  border: 0;
  margin: 0;
}
.user {
  /* width: 85%; */
}
.infoShow {
  /* width: 80%; */
}
.numberIndex {
  /* width: 80%; */
}
</style>
<script>
import titlePerPage from "../../../components/publicAll/title_per_page"; // title组件

import sidebar from "../../../components/Super/template/sidebar"; // 侧边栏
import user from "../../../components/Super/library/userInfo/user"; // 子组件用户显示
import infoShow from "../../../components/Super/library/theMessageStates/infoShow"; // 子组件信息显示
import numberIndex from "../../../components/Super/library/enterInformation/numberIndex"; // 子组件数字输入框
import siteUser from "../../../components/Super/template/siteUser"; // 子组件底部弹出修改用户显示
import siteInfoShow from "../../../components/Super/template/siteInfoShow"; // 子组件底部弹框修改信息显示
import siteNumberIndex from "../../../components/Super/template/siteNumberIndex"; // 子组件底部弹框修改输入框

import {
  queryTemplateContent,
  insertTemplateContent,
  queryComponentlibrary,
  deleteTemplateContent
} from "../../../api/Super/template/makeForm"; // 页面接口api

import { mapState } from "vuex"; // vuex全局变量
import { mapMutations } from "vuex"; // vuex方法
export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState([
      "makeFormInitializationList",
      "makeFormDataList",
      "libraryId",
      "libraryIdIndex",
      "notifyInfo",
      "pullRefresh"
    ])
  },
  components: {
    sidebar,
    user,
    infoShow,
    numberIndex,
    siteUser,
    siteInfoShow,
    siteNumberIndex,
    titlePerPage
  },
  data() {
    return {
      makeFormTitle: {
        title: "编辑模板",
        leftText: "返回",
        rightText: "下一步"
      },
      // groupIdList: {}, // 存放分组ID
      showPopup: false, // 遮罩层弹出
      templateList: [], // 存放当前页面显示的几个页面数据，012分别为三个组件
      cross: require("../../../assets/super/template/cross.png"), // 取消（叉号）
      sidebarModel: [], // 存储侧边栏数据
      templateListIndex: "" // 临时存档当前的I值
    };
  },

  created() {
    // 初始化将vuex中存放的组件ID赋值过来
    // this.groupIdList = this.libraryId;
  },
  mounted() {
    this.start(); // 进入页面加载内容

    this.queryGroup(); // 初始化接口
    this.sidbebarStar(); // 初始化侧边栏
  },
  beforeDestroy() {
    this.judgmentIsEmpty(); // 退出页面保存数据
  },
  methods: {
    // =================判断部分：=====================

    /**
     * @description: 判断当前页面数据为空时候走删除，有数据走更新
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    judgmentIsEmpty() {
      if (this.templateList.length == 0) {
        this.deleteTemplateContent();
      } else {
        this.updateTemplateContent();
      }
    },

    // =================页面加载和抬头按钮部分=====================

    /**
     * @description: 初始化内容
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    start() {
      // 解决开始计入页面不能左滑，刷新页面解决
      const a = sessionStorage.getItem("makeFormFirstEntry");
      if (a != "0") {
        sessionStorage.setItem("makeFormFirstEntry", "0");
        window.location.reload(); // 刷新页面
        // window.location.reload() // 刷新页面
        // window.history.go(0); // 出现空白页
        // document.execCommand("Refresh"); // MSDN说适用于IE
      }

      // 当前页面内容：
      this.templateList = []; // 初始化页面有谁：012:表示三个从上排列下去
    },

    /**
     * @description: 初始化界面
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    queryGroup() {
      const sessionTemplateId = sessionStorage.getItem("management_templateId");

      this.$axios.get(queryTemplateContent + sessionTemplateId).then(res => {
        switch (res.data.code) {
          case this.$responseCode.SUCCESSCODE:
            // console.log(res.data.data);

            for (let index = 0; index < res.data.data.length; index++) {
              this.templateList.push({
                templateId: res.data.data[index].templateId, //模板ID
                groupSequence: res.data.data[index].groupSequence, // 模板内容分组排序
                componentId: res.data.data[index].componentId, // 标识是哪个组件
                isTrue: false, // 底部弹框是否显示
                templateArray: []
              });
              for (
                let i = 0;
                i < res.data.data[index].templateContentData.length;
                i++
              ) {
                this.templateList[index].templateArray.push({
                  id: res.data.data[index].templateContentData[i].id, // 模板内容ID
                  isTrue: res.data.data[index].templateContentData[i].isUsable,
                  fieldSequence: i,
                  title: res.data.data[index].templateContentData[i].title,
                  value:
                    res.data.data[index].templateContentData[i].promptField,
                  bottomName:
                    res.data.data[index].templateContentData[i].title +
                    "是否显示",
                  titleList: ["某某得分", "某某信息", "评分"]
                });

                // 将01改为true和false
                if (this.templateList[index].templateArray[i].isTrue == "0") {
                  this.templateList[index].templateArray[i].isTrue = true;
                } else if (
                  this.templateList[index].templateArray[i].isTrue == "1"
                ) {
                  this.templateList[index].templateArray[i].isTrue = false;
                }
              }
            }
            // console.log(this.templateList);
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
     * @description: 初始化加载侧边栏数据，使用定时器页面加载后再调取此接口 / 3秒后再执行
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    sidbebarStar() {
      this.$axios.get(queryComponentlibrary).then(res => {
        switch (res.data.code) {
          case this.$responseCode.SUCCESSCODE:
            this.sidebarModel = [];
            const libraryList = this.libraryIdIndex;

            for (let i = 0; i < res.data.data.length; i++) {
              this.sidebarModel.push({
                groupId: res.data.data[i].groupId,
                libraryId: res.data.data[i].componentId,
                groupSequence: res.data.data[i].groupSequence,
                componentPicture: ""
              });

              let index = this.drop(this.sidebarModel[i].libraryId);
              this.sidebarModel[i].componentPicture =
                libraryList[index].componentId;
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

    // ==============================底部设置弹框==================================

    /**
     * @description:  点击页面内容对应弹出底部弹框
     * @param {i:当前下标值}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    isTrue(i) {
      this.templateListIndex = i;
      this.templateList[i].isTrue = true;
    },

    /**
     * @description: 接收user子组件 底部弹框数据
     * @param {siteuserShow: 底部弹框true/false,istrueUserList:整个数组内容  }
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    listenUser(siteuserShow, istrueUserList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteuserShow;
      this.templateList[i].templateArray = [];
      for (let index = 0; index < istrueUserList.length; index++) {
        this.templateList[i].templateArray.push(istrueUserList[index]);
      }
    },

    /**
     * @description: 接收siteInfoShow改变后的值
     * @param {siteInfoShowShow: 底部弹框true/false,istrueUserList:整个数组内容  }
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    listenSiteInfoShow(siteInfoShowShow, istrueUserList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteInfoShowShow;
      this.templateList[i].templateArray = [];
      this.templateList[i].templateArray = istrueUserList;
    },

    /**
     * @description: 接收siteNumberIndex改变后的值
     * @param {siteNumberIndexShow: 底部弹框true/false,istrueNumberIndexList:整个数组内容  }
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    listenSiteNumberIndex(siteNumberIndexShow, istrueNumberIndexList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteNumberIndexShow;
      this.templateList[i].templateArray = [];
      this.templateList[i].templateArray = istrueNumberIndexList;
    },

    //  ============================离开页面处理=============================

    /**
     * @description: 离开页面保存数据
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    updateTemplateContent() {
      // console.log(this.templateList);
      const sessionTemplateId = sessionStorage.getItem("management_templateId");
      let model = [];
      for (let index = 0; index < this.templateList.length; index++) {
        model.push({
          componentId: this.templateList[index].componentId,
          groupSequence: index,
          templateContentData: [],
          templateId: sessionTemplateId
        });

        for (
          let i = 0;
          i < this.templateList[index].templateArray.length;
          i++
        ) {
          model[index].templateContentData.push({
            fieldSequence: i,
            id: this.templateList[index].templateArray[i].id,
            isUsable: this.templateList[index].templateArray[i].isTrue,
            promptField: this.templateList[index].templateArray[i].value,
            title: this.templateList[index].templateArray[i].title
          });

          // 将true和false改为0/1
          if (model[index].templateContentData[i].isUsable == true) {
            model[index].templateContentData[i].isUsable = "0";
          } else if (model[index].templateContentData[i].isUsable == false) {
            model[index].templateContentData[i].isUsable = "1";
          }
        }
      }

      this.$axios.post(insertTemplateContent, model).then(res => {
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
     * @description: 页面数据为空时候直接删除所有
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    deleteTemplateContent() {
      const _templateId = sessionStorage.getItem("management_templateId");
      this.$axios.post(deleteTemplateContent + "/" + _templateId).then(res => {
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

    //  ============================右划添加组件部分=============================

    /**
     * @description: 添加组件内容：子组件sidebar返回事件，返回是哪个组件
     * @param {newVal1: 当前分组下标，libraryId：标识哪个组件的ID}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    listenToMakeForm(libraryId) {
      // 当前此变量必须使用const放到这里，因为使用全局变量会更改此值，除了第一个组件之外都是如此
      const makeList = [
        {
          templateId: "", //模板ID
          groupSequence: "", // 模板内容分组排序
          componentId: "0", // 标识是哪个组件
          isTrue: false, // 底部弹框是否显示
          templateArray: [
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "姓名",
              value: "张三",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "性别",
              value: "男",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "学号",
              value: "122231231231",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "学院",
              value: "物理与电子信息学院",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "专业",
              value: "电子信息",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "班级",
              value: "二班",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "年级",
              value: "一年级",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            }
          ]
        },
        {
          templateId: "", //模板ID
          groupSequence: "", // 模板内容分组排序
          componentId: "0", // 标识是哪个组件
          isTrue: false, // 底部弹框是否显示
          templateArray: [
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "某某得分",
              value: "110",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "某某信息",
              value: "119",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            },
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "评分",
              value: "120",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            }
          ]
        },
        {
          templateId: "", //模板ID
          groupSequence: "", // 模板内容分组排序
          componentId: "0", // 标识是哪个组件
          isTrue: false, // 底部弹框是否显示
          templateArray: [
            {
              id: "", // 模板内容ID
              isTrue: true,
              fieldSequence: "0",
              title: "请输入成就 单位",
              value: "及格分 >=10",
              bottomName: "姓名是否显示",
              titleList: ["某某得分", "某某信息", "评分"]
            }
          ]
        }
      ];

      const index = this.drop(libraryId);

      // 关闭标签
      this.showPopup = false;
      // 添加一个组件
      this.templateList.push({
        templateId: "", //模板ID
        groupSequence: "", // 模板内容分组排序
        componentId: libraryId, // 标识是哪个组件
        isTrue: false, // 底部弹框是否显示
        templateArray: makeList[index].templateArray
      });
    },

    /**
     * @description: 删除第i个组件
     * @param {i:当前分组的下标}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    spliceList(i) {
      this.templateList.splice(i, 1);
    },

    /**
     * @description: 右划事件
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    eventFun() {
      this.showPopup = true; // 侧边栏左侧显示

      // 动态添加css属性
      // var t = document.getElementById("sidebar");
      // t.style.cssText = "display:inline";
    },

    //  ============================抬头按钮部分============================

    /**
     * @description: 返回按钮
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    returnPage() {
      // window.history.go(-1); // windos的返回上一页
      // this.$router.go(-1) // vue的返回上一页
      this.$router.push({ name: "createName" });
    },

    /**
     * @description:  下一步按钮:如果当前没有数据只保存不跳转页面
     * @param {无}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    nextStep() {
      if (this.templateList.length == "0") {
        this.deleteTemplateContent();
        this.$Notify({
          message: this.notifyInfo[0].dataIsEmpty, // 提示：加载失败.==store.js
          background: this.notifyInfo[1].orange, //橘色：#FF976A
          duration: this.notifyInfo[2].duration //定义时长,1s
        });
      } else {
        this.$router.push({ name: "ruleSetting" });
      }
    },

    /**
     * @description:  根据组件id替换下标值：接收后端/存储后端数据需要进行更换
     * @param {name:componentId值}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    drop(name) {
      let names = {
        "0445946": "0",
        "0473771": "1",
        "4833953": "2"
      };
      return names[name] || names["default"];
    },

    /**
     * @description:  下拉刷新
     * @param {}
     * @return: 无
     * @author: 白爱民
     * @Date: 2020年4月29日09:10:35
     */
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
        this.start(); // 进入页面加载内容

        this.queryGroup(); // 初始化接口
        this.sidbebarStar(); // 初始化侧边栏
      }, 1000); //1000代表刷新时间
    }
  }
};
</script>
