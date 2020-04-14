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
      <div :id="'info' + index" class="info" v-for="(item, index) in isTrueList">
        <div class="showTitle" v-text="isTrueList[index].infoTitle"></div>
        <div class="showInfo" v-text="isTrueList[index].infoNum"></div>
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

div .info {
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
.info .showTitle {
  width: 58px;
  height: 28px;
  /* background-color: black; */
  border: 1px solid white;
  position: absolute;
  top: 5px;
  left: 4px;
}

.info .showInfo {
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
    // 父页面数据更改后冲洗接收数组数据
    infoShowListP(newVal) {
      this.isTrueList = [];
      this.isTrueList = newVal;
      this.swapPosition();
    }
  },
  mounted() {
    this.start();
  },
  updated() {
    // this.swapPosition();
  },
  methods: {
    start() {
      this.isTrueList = [];
      this.isTrueList = this.infoShowListP;
      this.swapPosition();
    },

    // 当前值如果和其他显示的框的值相同，则返回其他相同值的下标,否则返回-1
    swapPosition() {
      for (let index = 0; index < this.isTrueList.length; index++) {
        var a = document.getElementById("info" + index);
        if (this.isTrueList[index].isTrue == false) {
          a.style.display = "none";
        }
      }
    }
  }
};
</script>
