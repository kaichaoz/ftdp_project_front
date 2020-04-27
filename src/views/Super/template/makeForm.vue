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
    <div class="title commonColor">
      <div class="buttonLeft" @click="returnPage()">返回</div>
      <div class="buttonRight" @click="nextStep()">下一步</div>
      <div class="titleName">编辑模板</div>
    </div>

    <!-- 页面框内容 -->
    <div id="addTemplate" class="allTemplate" v-touch:right="eventFun">
      <div v-for="(item ,i) in templateList ">
        <!-- user组件 -->
        <div :id="'userComDiv' + i" v-if="templateList[i].componentId ==groupIdList.userInfo">
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
          v-if="templateList[i].componentId ==groupIdList.theMessageStates"
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
          v-if="templateList[i].componentId ==groupIdList.enterInfomation"
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

    <div></div>

    <!-- 左滑弹出框 -->
    <van-popup v-model="showPopup" position="left" :style="{ height: '100%' }">
      <div id="sidebar">
        <!-- 侧边栏 -->
        <sidebar :sidebarModel="sidbebarModel" @listenToMakeForm="listenToMakeForm"></sidebar>
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
.commonColor {
  background: #fecd2a;
}

.title {
  overflow: hidden;
  border: 1px solid #fecd2a;
  width: auto;
  height: 48px;
  /* background: #FECD2A; */
}
.buttonLeft {
  float: left;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
}
.buttonRight {
  float: right;
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
import sidebar from "../../../components/Super/template/sidebar";
import user from "../../../components/Super/library/userInfo/user";
import infoShow from "../../../components/Super/library/theMessageStates/infoShow";
import numberIndex from "../../../components/Super/library/enterInformation/numberIndex";
import siteUser from "../../../components/Super/template/siteUser";
import siteInfoShow from "../../../components/Super/template/siteInfoShow";
import siteNumberIndex from "../../../components/Super/template/siteNumberIndex";

import {
  queryTemplateContent,
  insertTemplateContent,
  queryComponentlibrary
} from "../../../api/Super/template/makeForm";

import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["makeFormInitializationList", "makeFormDataList", "libraryId"])
  },
  components: {
    sidebar,
    user,
    infoShow,
    numberIndex,
    siteUser,
    siteInfoShow,
    siteNumberIndex
  },
  data() {
    return {
      groupIdList: {},
      showPopup: false, // 遮罩层弹出
      templateList: [], // 存放当前页面显示的几个页面数据，012分别为三个组件
      cross: require("../../../assets/super/template/cross.png"), // 取消（叉号）
      sidbebarModel: [], // 存储侧边栏数据
      templateListIndex: "" // 临时存档当前的I值
    };
  },

  created() {
    this.groupIdList = this.libraryId;
  },
  mounted() {
    this.start(); // 进入页面加载内容

    this.queryGroup(); // 初始化接口
    this.sidbebarStar(); // 初始化侧边栏
  },
  methods: {
    // ====================底部设置弹框========================

    // 点击页面内容对应弹出底部弹框
    isTrue(i) {
      this.templateListIndex = i;
      this.templateList[i].isTrue = true;
    },

    // 接收user子组件 底部弹框数据
    listenUser(siteuserShow, istrueUserList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteuserShow;
      this.templateList[i].templateArray = [];
      for (let index = 0; index < istrueUserList.length; index++) {
        this.templateList[i].templateArray.push(istrueUserList[index]);
      }
    },

    // 接收siteInfoShow改变后的值
    listenSiteInfoShow(siteInfoShowShow, istrueUserList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteInfoShowShow;
      this.templateList[i].templateArray = [];
      this.templateList[i].templateArray = istrueUserList;
    },

    // 接收siteNumberIndex改变后的值
    listenSiteNumberIndex(siteNumberIndexShow, istrueNumberIndexList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteNumberIndexShow;
      this.templateList[i].templateArray = [];
      this.templateList[i].templateArray = istrueNumberIndexList;
    },

    // =================页面加载和抬头按钮部分=====================

    // 初始化内容
    start() {
      // 当前页面内容：
      this.templateList = []; // 初始化页面有谁：012:表示三个从上排列下去
    },
    // 返回按钮
    returnPage() {
      // window.history.go(-1); // windos的返回上一页
      // this.$router.go(-1) // vue的返回上一页
      this.$router.push({ name: "createName" });
    },

    //下一步按钮
    nextStep() {
      this.$router.push({ name: "ruleSetting" });
    },

    // 初始化界面
    queryGroup() {
      this.$axios.get(queryTemplateContent + "8541535").then(res => {
        if (res.data.code == this.$responseCode.SUCCESSCODE) {
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
                value: res.data.data[index].templateContentData[i].promptField,
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
        }
      });
    },

    //  ==================右划添加组件部分=======================
    // 子组件sidebar返回事件，返回是哪个组件
    listenToMakeForm(newVal1, libraryId) {
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

      // 关闭标签
      this.showPopup = false;
      // 添加一个组件
      this.templateList.push({
        templateId: "", //模板ID
        groupSequence: "", // 模板内容分组排序
        componentId: libraryId, // 标识是哪个组件
        isTrue: false, // 底部弹框是否显示
        templateArray: makeList[newVal1].templateArray
      });
    },
    // 初始化加载侧边栏数据
    sidbebarStar() {
      this.$axios.get(queryComponentlibrary).then(res => {
        if (res.data.code == this.$responseCode.SUCCESSCODE) {
          // console.log(res.data.data);
          this.sidbebarModel = [];
          this.sidbebarModel = res.data.data;
        }
      });
    },

    // 删除第i个组件
    spliceList(i) {
      this.templateList.splice(i, 1);
    },

    // 右划事件
    eventFun() {
      this.showPopup = true; // 侧边栏左侧显示

      // 动态添加css属性
      // var t = document.getElementById("sidebar");
      // t.style.cssText = "display:inline";
    }
  }
};
</script>
