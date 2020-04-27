<!--
*@描述:设置输入框（底部弹框）
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月25日16:49:10
*@最后修改人:herry
*@LastEditTime:2020年3月25日16:49:10
*@说明：-->

<template>
  <div>
    <van-action-sheet v-model="siteNumberIndexShow" :title="title">
      <div class="siteNumberIndexbody">
        <van-field
          class="fieldVan"
          v-model="siteNumberIndexList[0].title"
          label="组件名称"
          :formatter="formatter"
          placeholder="格式化输入内容"
        />
        <van-field
          class="fieldVan"
          v-model="siteNumberIndexList[0].value"
          label="提示信息"
          :formatter="formatter"
          placeholder="格式化输入内容"
        />
      </div>
    </van-action-sheet>
  </div>
</template>
<style scoped>
.siteNumberIndexbody {
  height: 200px;
  margin: 20px;
  font-size: 40;
}

.fieldVan {
  margin-top: 20px;
  margin-right: 20px;
}

/* 输入框居右 */
>>> .van-field__control {
  margin-left: 30px;
}

/* 显示名字居左 */
>>> .van-cell__title,
.van-cell__value {
  text-align: left;
}

/* van组件所有字体大小 */
>>> .van-cell {
  font-size: 18px;
}
</style>
<script>
export default {
  props: {
    siteNumberIndexShowP: { default: false }, // 接收父页面makeForm传递过来: 显示底部弹框
    // 接收父页面makeForm传递过来: 显示底部数据
    siteNumberIndexListP: {
      type: Array,
      default: () => [
        {
          title: "请输入成就 单位",
          value: "及格分 >=10"
        }
      ]
    }
  },
  data() {
    return {
      // field组件内容：

      //   nameValue: "", // 第一个输入框组件名称值
      //   infoValue: "", // 第二个输入框组件名称值
      title: "成绩提示输入组件",
      componetnName: ["组件名称", "提示信息"],

      // 接收父组件与本组件交互：
      siteNumberIndexShow: false, //底部弹框是否显示,
      siteNumberIndexList: [{ title: "", value: "" }] // 返还给父组件内容
    };
  },
  watch: {
    // 监听父页面传来数据：是否显示siteUser底部弹框
    siteNumberIndexShowP(newVal) {
      if (newVal == true) {
        this.siteNumberIndexShow = newVal;
      }
    },

    // 监听父页面传来数据：底部弹框数组内容
    siteNumberIndexListP(newVal) {
      this.siteNumberIndexList = [];
      this.siteNumberIndexList = this.siteNumberIndexListP;
    },

    // 本页面isTrue变化后：返回给父页面makeForm数据（打开和关闭都传值）
    siteNumberIndexShow(newVal) {
      this.$emit(
        "listenSiteNumberIndexToMakeForm",
        newVal,
        this.siteNumberIndexList
      );
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    // 初始化
    start() {
      this.siteNumberIndexList = [];
      this.siteNumberIndexList = this.siteNumberIndexListP;
    },
    formatter(value) {
      // 过滤输入的数字
      return value.replace(/\d/g, "");
    }
  }
};
</script>
