<!--
*@描述:test
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <!-- <img @click.prevent="test($event)" :src="infoShow" alt /> -->

   <van-action-sheet v-model="show" title="标题">
  <div class="content">内容</div>
</van-action-sheet>
  </div>
</template>
<style scoped>
.content {
  padding: 16px 16px 160px;
}
</style>
<script>
export default {
  data() {
    return {
      show: true,
      value: "",
      infoShow: require("../../assets/super/library/infoShow.jpg"),
      Loop:""  // 定时器
      // infoShow:require("../../assets/super/libraryinfoShow.jpg")
    };
  },
  mounted() {},
  methods: {
    touchin() {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          // alert("是否确认删除");
        }.bind(this),
        1000
      );
    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },



    
  }
};
</script>
