<!--
*@描述：规则配置
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
      <div class="button" @click="intoModel()">返回</div>
      <div class="titleName">规则设置</div>
    </div>

    <!-- 内容 -->
    <div class="ruleTemplateBody">
      <!-- 下拉框 -->
      <div class="managementName" v-for="(item,i ) in 3">
        <van-dropdown-menu active-color="#fecd2a">
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>
      </div>

      <!-- 输入任意文本 -->
      <div style="margin-top:30px" v-for="(item,i) in 5">
        <van-field style="border-radius: 5px" v-model="text" label="文本" />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 内容部分： */

/* 下拉框 */
.ruleTemplateBody .managementName {
  border: 1px solid #e0e9ea;
  overflow: hidden;
  margin-top: 40px;
  border-radius: 5px;
  margin: 20px 10px;
}

/* 下拉框文本距离和大小 */
>>> .van-ellipsis {
  margin-left: 20px;
  font-size: 18px;
}

/* 下拉框文字大小： */
.van-dropdown-menu__title {
  font-size: 18px;
}
/* 下拉框名字居左 */
>>> .van-dropdown-menu__item {
  justify-content: left;
}

/* 下拉框内容对齐下拉框名字 */
>>> .van-dropdown-item {
  margin: 2px 12px 2px;
}

/* 下拉框图片位置： */
>>> .van-dropdown-menu__title::after {
  top: 15%;
  right: -236px;
  width: 7px;
  height: 7px;
}

/* 文本输入框两边隔12px */
>>> .van-cell {
  width: auto;
  min-width: 0;
  margin: 12px;
  font-size: 18px;
}

/* 文本内容居左 */
>>> .van-field__label {
  margin-right: 4px;
  margin-left: -8px;
}

/* 抬头部分： */
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
</style>
<script>
export default {
  data() {
    return {
      value: 0,
      option: [
        { text: "组件一", value: 0 },
        { text: "组件二", value: 1 },
        { text: "组件三", value: 2 }
      ],

      text: "",

      ruleTemList: [{ nowName: "", nameList: [] }, {}]
    };
  },
  mounted() {},
  methods: {
    // 抬头左侧按钮跳转到组件管理
    intoModel() {
      this.$router.push({ name: "ruleSetting" });
    },

    onConfirm() {
      this.$refs.item.toggle();
    }
  }
};
</script>
