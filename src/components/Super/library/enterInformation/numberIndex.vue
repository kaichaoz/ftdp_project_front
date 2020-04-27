<!--
*@描述:数字输入组件
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <div class="body">
      <div class="infoTitle" v-text="numberIndexList[0].title"></div>
      <div class="infoInput">
        <van-cell-group>
          <van-field
            input-align="center"
            type="number"
            :maxlength="maxlength"
            v-model="userInputValue"
            :placeholder="numberIndexList[0].value"
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<style scoped>
.body {
  width: 278px;
  height: 98px;
  /* background-color: red; */
  border: 1px solid;
}
.body .infoTitle {
  width: 278px;
  height: 49px;
  font-size: 20px;
  color: black;
  text-align: left;
  margin-left: 10px;
  /* background-color: yellow; */
  /* border: 2px solid black; */
}
.infoInput {
  width: 278px;
  height: 49px;
  /* background-color: blue; */
  /* border: 0; */
}
</style>
<script>
export default {
  props: {
    numuberIndexListP: {
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
      userInputValue: "", // 输入框value值
      maxlength: "4", // 输入框最大为4

      numberIndexList: [] // 接收和存储当前显示值
      // infoTitle: "请输入成绩 单位",
      // infoInput: "及格分 >=10"
    };
  },
  watch: {
    numuberIndexListP(newVal) {
      this.numberIndexList = [];
      this.numberIndexList = newVal;
    }
  },
  mounted() {},
  created() {
    this.start();
  },
  methods: {
    start() {
      this.numberIndexList = [];
      this.numberIndexList = this.numuberIndexListP;
    }
  }
};
</script>
