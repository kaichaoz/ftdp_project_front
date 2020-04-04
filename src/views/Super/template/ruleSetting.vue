<!--
*@描述：规则设置
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <!-- 抬头 -->
    <div class="title commonColor">
      <img @click="intoSetting()" class="iocName" :src="plus" alt />
      <div class="button" @click="intoModel()">编辑模板</div>
      <div class="titleName">50米规则</div>
    </div>

    <!-- 内容 -->
    <div class="ruleSettingBody" v-for="(item,i) in 4">
      <div @click="toRuleTemplate()" class="toRuleTemplateBut">大二男优秀规则</div>
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
export default {
  data() {
    return {
      plus: require("../../../assets/super/template/plus.png") // 底部加号图片
    };
  },
  mounted() {},
  methods: {
    // 抬头左侧按钮跳转到组件管理
    intoModel() {
      this.$router.push({ name: "makeForm" });
    },
    // 抬头右侧按钮跳转到模板设置
    intoSetting() {
      this.$router.push({ name: "ruleTemplate" });
    },
    toRuleTemplate() {
      this.$router.push({ name: "ruleTemplate" });
    }
  }
};
</script>
