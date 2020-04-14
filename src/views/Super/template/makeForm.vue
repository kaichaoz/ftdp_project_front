<!--
*@描述:拖拽主页面
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月25日16:49:10
*@最后修改人:herry
*@LastEditTime:2020年3月25日16:49:15
*@说明：
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
        <div :id="'userComDiv' + i" v-if="templateList[i].templateId =='0'">
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
        <div :id="'infoShowComDiv' + i" v-if="templateList[i].templateId =='1'">
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
        <div :id="'numberIndexComDiv' + i" v-if="templateList[i].templateId =='2'">
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
        <sidebar @listenToMakeForm="listenToMakeForm"></sidebar>
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
  height: 550px;
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
export default {
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
      showPopup: false, // 遮罩层弹出
      templateList: [{ templateId: "", isTrue: false, templateArray: [] }], // 存放当前页面显示的几个页面数据，012分别为三个组件
      cross: require("../../../assets/super/template/cross.png"), // 取消（叉号）

      templateListIndex: "" // 临时存档当前的I值
    };
  },
  mounted() {
    this.start(); // 进入页面加载内容
  },
  methods: {
    // ====================底部设置弹框========================

    // 点击页面内容对应弹出底部弹框
    isTrue(i) {
      this.templateListIndex = i;
      this.templateList[i].isTrue = true;
      // console.log(i);
      // console.log(this.makeFormInitializationList[i]);
      // console.log(this.templateList[i].templateArray);
    },

    // 接收user子组件 底部弹框数据
    listenUser(siteuserShow, istrueUserList) {
      const i = this.templateListIndex;
      this.templateList[i].isTrue = siteuserShow;
      this.templateList[i].templateArray = [];
      for (let index = 0; index < istrueUserList.length; index++) {
        this.templateList[i].templateArray.push(istrueUserList[index].isTrue);
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
      this.makeFormInitializationList = this.$store.state.makeFormInitializationList;
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

    //  ==================右划添加组件部分=======================

    // 子组件sidebar返回事件，返回是哪个组件
    listenToMakeForm(newVal1) {
      // const makeList = [
      //   [true, true, true, true, true, true, true],
      //   [
      //     {
      //       isTrue: true,
      //       infoTitle: "某某得分",
      //       infoNum: "110",
      //       infoList: ["某某得分", "某某信息", "评分"]
      //     },
      //     {
      //       isTrue: true,
      //       infoTitle: "某某信息",
      //       infoNum: "119",
      //       infoList: ["某某得分", "某某信息", "评分"]
      //     },
      //     {
      //       isTrue: true,
      //       infoTitle: "评分",
      //       infoNum: "120",
      //       infoList: ["某某得分", "某某信息", "评分"]
      //     }
      //   ],
      //   [
      //     {
      //       infoNum: "请输入成就 单位"
      //     },
      //     {
      //       infoNum: "及格分 >=10"
      //     }
      //   ]
      // ];

      const makeList = [
        [
          {
            componentId: "",
            data: [
              { isTrue: true },
              { isTrue: true },
              { isTrue: true },
              { isTrue: true },
              { isTrue: true },
              { isTrue: true }
            ]
          }
        ],
        [
          {
            isTrue: true,
            infoTitle: "某某得分",
            infoNum: "110",
            infoList: ["某某得分", "某某信息", "评分"]
          },
          {
            isTrue: true,
            infoTitle: "某某信息",
            infoNum: "119",
            infoList: ["某某得分", "某某信息", "评分"]
          },
          {
            isTrue: true,
            infoTitle: "评分",
            infoNum: "120",
            infoList: ["某某得分", "某某信息", "评分"]
          }
        ],
        [
          {
            infoNum: "请输入成就 单位"
          },
          {
            infoNum: "及格分 >=10"
          }
        ]
      ];
      // 关闭标签
      this.showPopup = false;
      // 添加一个组件
      this.templateList.push({
        templateId: newVal1,
        isTrue: false,
        templateArray: makeList[newVal1]
      });
    },

    // 删除第i个组件
    spliceList(i) {
      this.templateList.splice(i, 1);
    },

    // 右划事件
    eventFun() {
      this.showPopup = true; // 侧边栏左侧显示

      // var t = document.getElementById("sidebar");
      // t.style.cssText = "display:inline";
    }
  }
};
</script>
