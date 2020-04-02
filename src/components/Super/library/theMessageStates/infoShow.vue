<!--
*@描述:信息显示组件
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <div class="body">
      <div class="info1" v-for="(item, index) in isTrueList" v-model="isTrueList[index].isTrue">
        <div class="showTitle1" v-text="isTrueList[index].infoTitle">{{isTrueList[index].infoTitle}}</div>
        <div class="showInfo1" v-text="isTrueList[index].infoNum"></div>
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

div .info1 {
  overflow: hidden;
  width: 68px;
  height: 78px;
  margin: 10px;
  float: left;
  /* background-color: yellow; */
  border: 1px solid white;
  position: relative;
  font-size: 14px;
  color: black;
}
.info1 .showTitle1 {
  width: 58px;
  height: 28px;
  /* background-color: black; */
  border: 1px solid white;
  position: absolute;
  top: 5px;
  left: 4px;
}

.info1 .showInfo1 {
  width: 58px;
  height: 28px;
  /* border: 1px solid white; */
  background-color: white;
  position: absolute;
  /* top:165; */
  bottom: 5px;
  left: 4px;
}
</style>
<script>
export default {
  props: {
    // 父页面makeForm传递：user在页面要显示的内容数组
    infoShowListP: {
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
      isTrueList: []
    };
  },
  watch: {
    infoShowListP(newVal) {
      this.isTrueList = [];
      this.isTrueList = newVal;
      console.log(newVal);
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.isTrueList = [];
      this.isTrueList = this.infoShowListP;
    }
  }
};
</script>
