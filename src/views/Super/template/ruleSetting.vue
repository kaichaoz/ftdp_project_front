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
    <div class="title commonColor">
      <img @click="intoSetting()" class="iocName" :src="plus" alt />
      <div class="button" @click="intoModel()">编辑模板</div>
      <div class="titleName" v-text="templateName + '规则'"></div>
    </div>

    <!-- 内容 -->
    <div class="ruleSettingBody" v-for="(item,i) in templateRuleRecord">
      <div
        @click="toRuleTemplate(i)"
        class="toRuleTemplateBut"
        v-text="templateRuleRecord[i].templateRuleTitle"
      ></div>
    </div>
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
import { queryTemplateRecord } from "../../../api/Super/template/ruleSetting"; //引入{初始化模板规则页面}接口的后端地址
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { queryTemplateComponentName } from "../../../api/Super/template/ruleTemplate"; //引入{初始化模板规则页面,初始化模板页面一条规则}接口的后端地址
export default {
  data() {
    return {
      plus: require("../../../assets/super/template/plus.png"), // 底部加号图片

      //编辑模板页面添加的模板Name
      templateName: "",

      //页面加载规则数据,id：具体规则id，templateRuleTitle：具体规则title
      templateRuleRecord: [
        {
          id: "",
          templateRuleTitle: ""
        }
      ],

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

      componentInfo: [{ id: "", componentId: "", templateId: "", title: "" }]
    };
  },
  mounted() {
    this.start();
    // this.queryTemplateRule(); //初始化加载
  },
  methods: {
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
          // 超时20s则自动加载数据并清理定时器
          if (new Date().getTime() - startTime > 3000) {
            clearInterval(interval);
            vm.queryTemplateRule();
            return;
          }
          num++;
        }, 500);
      }
    },
    // 抬头左侧按钮跳转到组件管理
    intoModel() {
      this.$router.push({ name: "makeForm" });
    },

    // 抬头右侧加号按钮跳转到模板设置
    intoSetting() {
      let vm = this;
      vm.$router.push({
        name: "ruleTemplate",
        params: {
          ruleSetting: 1, //1表示从加号进入 ruleTemplate页面
          componentInfo: vm.componentInfo
        }
      });
    },

    //调用 queryTemplateComponentNameRuleRecord接口查询组件个数
    queryTemplateComponent() {
      let vm = this;
      //获取缓存中的templateId
      const templateId = sessionStorage.getItem("management_templateId");
      vm.$axios
        .get(
          queryTemplateComponentName + "/{templateId}?templateId=" + templateId
        )
        .then(res => {
          if (res.data.code == responseCode.SUCCESSCODE) {
            vm.componentInfo = [];
            for (let index = 0; index < res.data.data.length; index++) {
              vm.componentInfo.push({
                id: res.data.data[index].Id,
                componentId: res.data.data[index].componentId,
                templateId: res.data.data[index].templateId,
                title: res.data.data[index].title
              });
            }
          }
        });
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
      //获取缓存中的templateId
      const templateId = sessionStorage.getItem("management_templateId");
      //获取缓存中的 templateName
      vm.templateName = sessionStorage.getItem("management_templateName");
      vm.$axios
        .get(queryTemplateRecord + "/{templateId}?templateId=" + templateId)
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
            vm.$toast({
              message: "暂无数据",
              duration: 1000
            });
          } else {
            vm.$toast({
              message: "加载失败",
              duration: 1000
            });
          }
        });
      this.queryTemplateComponent();
    },

    // 点击具体规则进入编辑模板
    toRuleTemplate(i) {
      let vm = this;
      vm.$router.push({
        name: "ruleTemplate",
        params: {
          ruleSetting: 0, //0表示从具体规则进入ruleTemplate页面
          ruleTemplateId: vm.templateRuleRecord[i].id, //点击的当前具体规则的id
          componentInfo: vm.componentInfo
        }
      });
    },

    /**
     * @description: 将后端性别标识转换为文字
     * @param ：{num:后端sex标识}
     * @return: {string:sex文字}
     * @author: 付媛媛
     * @Date:2020年4月26日11:13:11
     */
    exchangeSex(num) {
      return num == 0 ? "男" : "女";
    }
  }
};
</script>
