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
        <div class="isTrue" v-for="(item,i) in isTrueList">
          <div class="dropDownAndTrueDiv">
            <dropDownBox
              class="drop"
              :id="'item' + i"
              :idP="i"
              :dropDownShowP="isTrueList[i].infoTitle"
              :dropDownListP="isTrueList"
            ></dropDownBox>
            <div class="trueDiv">
              <van-switch v-model="isTrueList[i].isTrue" size="24" />
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<style scoped>
.dropDownAndTrueDiv {
  margin: 20px;
}
.dropDownDiv {
  margin-left: -50px;
  width: 150px;
  height: 30px;
  text-align: center;
  border-radius: 5px;

  /* // 去除样式 */
  /* appearance: none;   */
  /* Firefox */
  /* -moz-appearance: none; */
  /* Safari 和 Chrome */
  /* -webkit-appearance: none;  */

  overflow: hidden;
}

.drop {
  display: inline-block;
}
.trueDiv {
  float: right;
  margin-top: 6px;
  margin-right: 30px;
}
.managementName {
  border: 1px solid #e0e9ea;
  overflow: hidden;
  margin-top: 40px;
  border-radius: 5px;
}
.siteInfoShowbody {
  height: 200px;
}
.isTrue {
  margin-top: 2px;
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
        { isTrue: true, infoTitle: "某某得分", infoNum: "110" },
        { isTrue: true, infoTitle: "某某信息", infoNum: "119" },
        { isTrue: true, infoTitle: "评分", infoNum: "120" }
      ]
    }
  },
  data() {
    return {
      dropDownShow: "",
      dropDownList: ["herry", "白爱民", "老白"], // 当前塔头显示的内容数组
      siteInfoShow: false, //底部弹框是否显示,

      // 底部弹框显示内容和是否显示
      isTrueList: []
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
      this.isTrueList = [];
      this.isTrueList = newVal;
    },

    // isTrue改变值后：返回给父页面数据（打开和关闭都传值）
    siteInfoShow(newVal) {
      this.$emit("listenSiteInfoShowToMakeForm", newVal, this.isTrueList);
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.isTrueList = [];
      this.isTrueList = this.siteInfoShowListP;
    }
  }
};
</script>
