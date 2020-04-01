<!--
*@描述:首页
*@版本:V1.0
*@作者:白爱民
*@Date:2020年1月22日11:00:06
*@最后修改人:herry
*@LastEditTime:2020年1月22日11:00:12
*@说明：-->
<style scoped>
>>> .van-grid-item__content {
  background-color: rgb(224, 233, 234);
}

.imageStyle {
  height: 90%;
  width: 90%;
}
</style>
<template>
  <div>
    <div style="margin-top: 120px;">
      <!-- 照片组件 -->
      <van-grid :gutter="10" :column-num="2">
        <van-grid-item
          v-for="(item,index) in homePicture"
          :key="index"
          icon="photo-o"
          style="border-width:0px;"
        >
          <van-image
            class="imageStyle"
            @click.native="jumpUrl(index)"
            style="box-shadow:2px 2px 12px #696969;border-radius: 15px;"
            :src="homePicture[index]"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <drag-comp @goNext="watchCar" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      homePicture: [], // 界面图片
      pageUrl: [] // 界面地址
    };
  },
  mounted() {
    this.initialization();
  },
  methods: {
    jumpUrl(index) {
      this.$router.push({
        name: this.pageUrl[index],
        params: {
          userId: "herry"  // 传递参数
        }
      });
    },

    initialization() {
      const checkbox = require("../../assets/home/checkbox-multiple-fill.png");
      const reply = require("../../assets/home/reply_comment.png");
      const test = require("../../assets/home/test.png");
      const valculator = require("../../assets/home/valculator.png");

      this.homePicture.push(valculator, test, checkbox, reply);

      this.pageUrl.push("valculator", "test", "resumeDatabase", "reply");

      // this.pageUrl.push({
      //     valculator: 'valculator'
      // })
      // this.pageUrl.push({
      //     test: 'test'
      // })
      // this.pageUrl.push({
      //     resumeDatabase: 'resumeDatabase'
      // })
      // this.pageUrl.push({
      //     reply: 'reply'
      // })
    }
  }
};
</script>