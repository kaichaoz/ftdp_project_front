<!--
*@描述:test
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月25日16:49:10
*@最后修改人:herry
*@LastEditTime:2020年3月25日16:49:10
*@说明：-->

<template>
  <div>
    <van-action-sheet v-model="siteInfoShow" title="图片信息">
      <div class="siteInfoShowbody">
        <dropDownBox :siteInfoShowListP="toDropDownBoxList" @litenDropDownBox="litenDropDownBox"></dropDownBox>
      </div>
    </van-action-sheet>
  </div>
</template>
<style scoped>
.dropDownDiv {
  margin-left: -50px;
  width: 150px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
}

.siteInfoShowbody {
  height: 200px;
  margin: 20px;
}

/* van组件所有居左 */
>>> .van-cell__title,
.van-cell__value {
  text-align: left;
}

/* van组件所有字体大小 */
>>> .van-cel {
  font-size: 20px;
}
</style>
<script>
import dropDownBox from "../dropDownBox.vue";
export default {
  components: {
    dropDownBox
  },
  props: {
    siteInfoShowShowP: { default: false }, // 接收父页面makeForm传递过来: 显示底部弹框
    // 接收父页面makeForm传递过来: 显示底部数据
    siteInfoShowListP: {
      type: Array,
      default: () => [
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
      ]
    }
  },
  data() {
    return {
      siteInfoShow: false, //底部弹框是否显示,
      // 底部弹框显示内容和是否显示

      toDropDownBoxList: [] // 与dropDownBox同步的数据
    };
  },
  watch: {
    // 监听父页面传来数据：是否显示siteUser底部弹框
    siteInfoShowShowP(newVal) {
      if (newVal == true) {
        this.siteInfoShow = newVal;
      }
    },

    // 监听父页面传来数据：底部弹框数组内容
    siteInfoShowListP(newVal) {
      this.toDropDownBoxList = [];
      this.toDropDownBoxList = newVal;
    },

    // 父组件makeForm中isTrue改变值后：返回给父页面makeForm数据（打开和关闭都传值）
    siteInfoShow(newVal) {
      this.$emit(
        "listenSiteInfoShowToMakeForm",
        newVal,
        this.toDropDownBoxList
      );
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    // 初始化
    start() {
      this.toDropDownBoxList = [];
      this.toDropDownBoxList = this.siteInfoShowListP;
    },

    // 接收子组件dropDownBox返回的数据
    litenDropDownBox(newVal) {
      this.toDropDownBoxList = [];
      this.toDropDownBoxList = newVal;
    }
  }
};
</script>
