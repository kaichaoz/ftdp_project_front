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
      <!-- <div class="content"></div> -->
      <div class="body">
        <!-- <van-field v-model="userName" label="组件名称" placeholder="请输入名称" /> -->

        <div class="isTrue" v-for="(item,i) in isTrueList">
          <!-- <van-cell center :title="isTrueList[i].name">
            <template #right-icon>
              <van-switch v-model="isTrueList[i].isTrue" size="24" />
            </template>
          </van-cell>-->

          <div class="dropDownAndTrueDiv">
            <!-- <dropDownBox></dropDownBox> -->

            <select class="dropDownDiv">
              <option style="width:auto" class="optionList" value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>

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
>>> .option {
  width: 50px;
  height: 30px;
}
.optionList {
  width: 50px;
  height: 30px;
}
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
.trueDiv {
  float: right;
  margin-top: 6px;
  margin-right: 30px;
  /* width: 30px; */
  /* height: 30px; */
}
.managementName {
  border: 1px solid #e0e9ea;
  overflow: hidden;
  margin-top: 40px;
  border-radius: 5px;
}
.body {
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
    isTrueListP: { type: Array, default: () => {} } // 接收父页面makeForm传递过来: 显示底部数据
  },
  data() {
    return {
      optionList: ["Volvo", "Saab"],

      //  下拉框
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],

      siteInfoShow: false, //底部弹框是否显示
      userName: "", // 输入名字

      // 底部弹框显示内容和是否显示
      isTrueList: [
        { name: "输入成绩", isTrue: true },
        { name: "实际成绩", isTrue: true },
        { name: "等级", isTrue: true }
      ]
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
    isTrueListP(newVal) {
      for (let i = 0; i < newVal.length; i++) {
        this.isTrueList[i].isTrue = newVal[i];
      }
    },

    // isTrue改变值后：返回给父页面数据（打开和关闭都传值）
    siteInfoShow(newVal) {
      this.$emit("listenSiteInfoShowToMakeForm", newVal, this.isTrueList);
    }
  },
  mounted() {},
  methods: {}
};
</script>
