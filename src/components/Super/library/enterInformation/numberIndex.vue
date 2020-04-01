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
      <div class="infoTitle">{{infoTitle}}</div>
      <div class="infoInput">
        <van-cell-group>
          <van-field input-align="center" type="number" :maxlength="maxlength" v-model="value" :placeholder="infoInput" />
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
  data() {
    return {
      // show: false,
      value: "",
      infoTitle: "体育项目名（单位）",
      infoInput: "300分及格",
      maxlength:"4"
    };
  },
  mounted() {},
  methods: {}
};
</script>
