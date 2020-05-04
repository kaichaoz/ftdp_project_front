<!--
*@描述：规则设置
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:付媛媛
*@LastEditTime:2020年5月4日16:38:51
*@说明：
-->
<template>
  <div>
    <!-- 抬头 -->
    <titlePerPage
      :title="ruleSettingTitle.title"
      :leftText="ruleSettingTitle.leftText"
      :iconName="ruleSettingTitle.iconName"
      :iconIsTrue="ruleSettingTitle.iconIsTrue"
      @listenTitlePerPageLeftClick="intoModel()"
      @listenTitlePerPageRightClick="intoSetting()"
    ></titlePerPage>
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh"
    >
      <!-- 内容 -->
      <div class="ruleSettingBody" v-for="(item,i) in templateRuleRecord">
        <div
          @click="toRuleTemplate(i)"
          v-touch:long="(e)=>touchin(i)"
          class="toRuleTemplateBut"
          v-text="templateRuleRecord[i].templateRuleTitle"
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
  /* left: 350px; */
}
</style>
<script>
import { Dialog, Loading } from "vant"; // 引用dialog弹出框
import { mapState } from "vuex"; //全局调取，可使用this
// import touch from 'vue-directive-touch';
import {
  queryTemplateRecord,
  deleteTemplateRuleRecord
} from "../../../api/Super/template/ruleSetting"; //引入{初始化模板规则页面}接口的后端地址
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { queryTemplateComponent } from "../../../api/Super/template/ruleTemplate"; //引入{初始化模板规则页面,初始化模板页面一条规则}接口的后端地址
import titlePerPage from "../../../components/publicAll/title_per_page"; // title组件

export default {
  computed: {
    ...mapState(["notifyInfo", "pullRefresh", ""])
  },
  components: {
    titlePerPage
  },
  data() {
    return {
      //缓存中读取--当前模板的模板Name
      templateName: "",
      //缓存中读取--当前模板的模板Id
      templateId: "",

      ruleSettingTitle: {
        title: "规则",
        leftText: "编辑模板",
        iconName: "plus",
        iconIsTrue: true
      },
      //页面加载规则数据,id：具体规则id，templateRuleTitle：具体规则title
      templateRuleRecord: [],

      // 传递给ruleTemplate中输入框数据
      fieldList: [
        { isTrue: true, textValue: "" },
        { isTrue: true, textValue: "" },
        { isTrue: true, textValue: "" },
        { isTrue: true, textValue: "" },
        { isTrue: true, textValue: "" }
      ],

      // 传递给ruleTemplate中下拉框数据
      dropdownList: [
        {
          isTrue: true,
          dropdownNow: 0,
          componentList: [
            { text: "", value: 0 },
            { text: "", value: 1 },
            { text: "", value: 2 }
          ]
        },
        {
          isTrue: true,
          dropdownNow: 0
        },
        {
          isTrue: true,
          dropdownNow: 0
        }
      ],
      Loop: "" // 定时器
    };
  },
  mounted() {
    this.initialization();
    this.start();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
      }, 1000); //1000代表刷新时间
      this.start(); //重新加载页面
    },

    initialization() {
      //获取缓存----当前模板name
      this.templateName = sessionStorage.getItem("management_templateName");
      this.ruleSettingTitle.title = this.templateName + "规则";

      //获取缓存----当前模板id
      this.templateId = sessionStorage.getItem("management_templateId");
    },

    //==========================================初始化加载当前页面================================================

    /**
     * @description: 定时器-加载页面模板规则先访问缓存，获取不到访问数据库查询
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月2日11:48:49
     */
    start() {
      const vm = this;
      let ruleTemplate_leave = sessionStorage.getItem("ruleTemplate_leave");
      // 如果此值为0 加载数据
      if (ruleTemplate_leave == 0) {
        //初始化加载
        vm.queryTemplateRule();
        return;
      } else {
        var startTime = new Date().getTime();
        var num = 0;
        // 不为0则起定时器每1/2s查询是否为0，为0则加载数据返回并清理定时器
        var interval = setInterval(function() {
          ruleTemplate_leave = sessionStorage.getItem("ruleTemplate_leave");
          if (ruleTemplate_leave == 0) {
            clearInterval(interval);
            vm.queryTemplateRule();
            return;
          }
          // 超时3s则自动加载数据并清理定时器
          if (new Date().getTime() - startTime > 3000) {
            clearInterval(interval);
            vm.queryTemplateRule();
            return;
          }
          num++;
        }, 500);
      }
    },

    /**
     * @description: 进入模板规则页面加载数据
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年4月27日20:41:58
     */
    queryTemplateRule() {
      let vm = this;
      vm.templateRuleRecord = [];

      vm.$axios
        .get(queryTemplateRecord + "/{templateId}?templateId=" + vm.templateId)
        .then(res => {
          if (res.data.code == responseCode.SUCCESSCODE) {
            sessionStorage.setItem("ruleTemplate_leave", "0");

            let str = "";
            for (let index = 0; index < res.data.data.length; index++) {
              str =
                res.data.data[index].grade +
                this.exchangeSex(res.data.data[index].sex) +
                res.data.data[index].level +
                "规则"; //拼接后端具体规则title

              vm.templateRuleRecord.push({
                id: res.data.data[index].id, //具体规则id
                templateRuleTitle: str //拼接的规则title
              });
            }
          } else if (res.data.code == responseCode.NULLCODE) {
            vm.$Notify({
              message: this.notifyInfo[0].noData,
              background: this.notifyInfo[1].orange,
              duration: this.notifyInfo[2].duration
            });
          } else {
            vm.$Notify({
              message: this.notifyInfo[0].loadFailed,
              background: this.notifyInfo[1].orange,
              duration: this.notifyInfo[2].duration
            });
          }
        });
      vm.queryTemplateComponent();
    },

    /**
     * @description: 调用 queryTemplateComponentNameRuleRecord接口查询组件信息
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月2日11:48:49
     */
    queryTemplateComponent() {
      let vm = this;
      vm.componentInfo = [];
      vm.$axios
        .get(
          queryTemplateComponent + "/{templateId}?templateId=" + vm.templateId
        )
        .then(res => {
          if (res.data.code == responseCode.SUCCESSCODE) {
            for (let index = 0; index < res.data.data.length; index++) {
              vm.componentInfo.push({
                id: res.data.data[index].id,
                title: res.data.data[index].title
              });
            }
            sessionStorage.setItem(
              "ruleSetting_templateContentId",
              vm.componentInfo[0].id
            );
            sessionStorage.setItem(
              "ruleSetting_componentInfo",
              JSON.stringify(vm.componentInfo)
            );

            //标识组件下拉框是否显示，0表示不显示，1表示显示
            sessionStorage.setItem("ruleSetting_componentIsTrue", 1);
          } else if (res.data.code == responseCode.NULLCODE) {
            vm.$Notify({
              message: this.notifyInfo[0].noData,
              background: this.notifyInfo[1].orange,
              duration: this.notifyInfo[2].duration
            });
            //标识组件下拉框是否显示，0表示不显示，1表示显示
            sessionStorage.setItem("ruleSetting_componentIsTrue", 0);
          }
        });
    },

    //=================================================页面路由跳转===================================================

    /**
     * @description: 抬头左侧按钮跳转到组件管理
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月2日11:48:49
     */
    intoModel() {
      this.$router.push({ name: "makeForm" });
    },

    /**
     * @description: 抬头右侧加号按钮跳转到模板设置
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月2日11:48:49
     */
    intoSetting() {
      let vm = this;
      vm.$axios
        .get(
          queryTemplateComponent + "/{templateId}?templateId=" + vm.templateId
        )
        .then(res => {
          switch (res.data.code) {
            case responseCode.SUCCESSCODE:
              vm.$router.push({
                name: "ruleTemplate"
              });
              //1表示点击加号进入ruleTemplate页面
              sessionStorage.setItem("ruleSetting_addOrEditToRule", 1);
              break;
            case responseCode.NULLCODE:
              vm.$Notify({
                message: this.notifyInfo[0].noTemplateRule,
                background: this.notifyInfo[1].orange,
                duration: this.notifyInfo[2].duration
              });
              break;
            default:
              vm.$Notify({
                message: this.notifyInfo[0].failed,
                background: this.notifyInfo[1].orange,
                duration: this.notifyInfo[2].duration
              });
          }
        });
    },

    /**
     * @description: 点击具体规则进入编辑模板
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月2日11:48:49
     */
    toRuleTemplate(i) {
      let vm = this;
      vm.$router.push({
        name: "ruleTemplate"
      });
      //0表示点击具体规则进入ruleTemplate页面
      sessionStorage.setItem("ruleSetting_addOrEditToRule", 0);
      sessionStorage.setItem(
        "ruleSetting_ruleTemplateId",
        vm.templateRuleRecord[i].id
      );
    },
    //==============================================性别转换标识方法+长按删除=======================================
    /**
     * @description: 将后端性别标识转换为文字
     * @param ：{num:后端sex标识}
     * @return: {string:sex文字}
     * @author: 付媛媛
     * @Date:2020年4月26日11:13:11
     */
    exchangeSex(num) {
      return num == 0 ? "男" : "女";
    },

    /**
     * @description: 长按模板规则删除
     * @param ：{i:长按的规则索引}
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月2日11:46:59
     */
    touchin(i) {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          let vm = this;
          Dialog.confirm({
            title: "标题",
            message: "确定删除吗？",
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              //删除当前具体规则
              vm.$axios
                .post(
                  deleteTemplateRuleRecord + "/" + vm.templateRuleRecord[i].id
                )
                .then(res => {
                  vm.$Notify({
                    message: this.notifyInfo[0].deleteSucceed,
                    background: this.notifyInfo[1].blue,
                    duration: this.notifyInfo[2].duration
                  });

                  //删除页面长按模板规则
                  vm.templateRuleRecord.splice(i, 1);
                });
            })
            .catch(() => {
              return;
            });
        }.bind(this),
        500
      );
    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    }
  }
};
</script>
