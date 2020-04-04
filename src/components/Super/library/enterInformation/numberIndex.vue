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
      <div class="infoTitle" v-text="numberIndexList[0].infoNum"></div>
      <div class="infoInput">
        <van-cell-group>
          <van-field
            input-align="center"
            type="number"
            :maxlength="maxlength"
            v-model="userInputValue"
            :placeholder="numberIndexList[1].infoNum"
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
          infoNum: "请输入成绩 单位"
        },
        {
          infoNum: "及格分 >=10"
        }
      ]
    }
  },
  data() {
    return {
      userInputValue: "",
      maxlength: "4",

      numberIndexList: [],
      infoTitle: "请输入成绩 单位",
      infoInput: "及格分 >=10"
    };
  },
  watch: {
    numuberIndexListP(newVal) {
      this.numberIndexList = [];
      this.numberIndexList = newVal;
      console.log("更改后：" + this.numberIndexList);
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
