<!--
*@描述：规则设置
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：

进入页面前将数据存储到local里面
-->
<template>
  <div>
    <!-- 抬头 -->
    <titlePerPage
      :title="ruleSetting.title"
      :leftText="ruleSetting.leftText"
      :rightText="ruleSetting.rightText"
      :iconName="ruleSetting.iconName"
      :iconIsTrue="ruleSetting.iconIsTrue"
      @listenTitlePerPageLeftClick="intoModel"
      @listenTitlePerPageRightClick="intoSetting"
    ></titlePerPage>
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh"
    >
      <!-- 内容 -->
      <div class="ruleSettingBody" v-for="(item,i) in ruleSettingInfo">
        <div
          v-touch:long="(e)=>touchin(i)"
          @click="toRuleTemplate()"
          class="toRuleTemplateBut"
          v-text="ruleSettingInfo[i].text"
        ></div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<style scoped>
.toRuleTemplateBut {
  border: 1px solid #fff;
  width: 300px;
  height: 30px;
  align-items: center;
  margin: 20px auto 10px;
  font-size: 18px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
<script>
import titlePerPage from "../../../components/publicAll/title_per_page"; // title组件
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { Dialog, Loading } from "vant"; // 引用dialog弹出框
import { mapState } from "vuex"; // vuex全局变量
export default {
  components: {
    titlePerPage
  },
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["notifyInfo", "pullRefresh", "TipsStore"])
  },
  data() {
    return {
      //title 属性
      ruleSetting: {
        title: "规则",
        leftText: "编辑模板",
        iconName: "plus",
        iconIsTrue: true
      },

      ruleSettingInfo: [
        {
          ruleId: "", // 具体规则ID
          text: "大一女优秀规则" // 具体规则名字
        },
        {
          ruleId: "",
          text: "大二男优秀规则"
        },
        {
          ruleId: "",
          text: "大二男优秀规则"
        },
        {
          ruleId: "",
          text: "大二男优秀规则"
        },
        {
          ruleId: "",
          text: "大二男优秀规则"
        }
      ],
      templateName: "" //模板名称
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    start() {},
    //初始化加载
    initialize() {
      this.templateName = sessionStorage.getItem("management_templateName"); //读取缓存--当前模板名称
      this.ruleSetting.title = this.templateName + "规则"; //当前页面title名称
    },
    //下拉刷新
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
        this.start(); // 进入页面加载内容
      }, 1000); //1000代表刷新时间
    },
    // 抬头左侧按钮跳转到组件管理
    intoModel() {
      this.$router.push({ name: "makeForm" });
    },
    // 抬头右侧按钮跳转到模板设置
    intoSetting() {
      sessionStorage.setItem("ruleSettingJumpNum", "1");
      this.$router.push({
        name: "ruleTemplate"
      });
    },

    // 点击具体规则进入编辑模板
    toRuleTemplate() {
      sessionStorage.setItem("ruleSettingJumpNum", "0");
      this.$router.push({
        name: "ruleTemplate"
      });
    },

    //长按删除规则
    touchin(i) {
      Dialog.confirm({
        message: this.TipsStore[0].message, //提示框内容：确定删除吗？(store.js)
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          //删除页面长按规则
          this.ruleSettingInfo.splice(i, 1);
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>
