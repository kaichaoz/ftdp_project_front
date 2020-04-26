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
    <van-action-sheet v-model="siteUserShow" title="图片信息">
      <div class="body">
        <div class="isTrue" v-for="(item,i) in isTrueList">
          <van-cell center :title="isTrueList[i].name">
            <template #right-icon>
              <van-switch v-model="isTrueList[i].isTrue" size="24" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<style scoped>
.body {
  height: 350px;
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
export default {
  props: {
    siteUserShowP: "", // 接收父页面makeForm传递过来: 显示底部弹框
    isTrueListP: { type: Array, default: () => {} } // 接收父页面makeForm传递过来: 显示底部数据
  },
  data() {
    return {
      siteUserShow: false, //底部弹框是否显示
      userName: "", // 输入名字

      // 底部弹框显示内容和是否显示
      isTrueList: [
        { name: "姓名是否显示", isTrue: true },
        { name: "性别是否显示", isTrue: true },
        { name: "学号是否显示", isTrue: true },
        { name: "学院是否显示", isTrue: true },
        { name: "专业是否显示", isTrue: true },
        { name: "班级是否显示", isTrue: true },
        { name: "年级是否显示", isTrue: true }
      ]
    };
  },
  watch: {
    // 监听父页面传来数据：是否显示siteUser底部弹框
    siteUserShowP(newVal) {
      if (newVal == true) {
        this.siteUserShow = newVal;
      }
    },

    // 监听父页面传来数据：底部弹框数组内容
    isTrueListP(newVal) {
      for (let i = 0; i < newVal.length; i++) {
        this.isTrueList[i].isTrue = newVal[i].isTrue;
      }
    },

    // isTrue改变值后：返回给父页面数据（打开和关闭都传值）
    siteUserShow(newVal) {
      this.$emit("listenUserToMakeForm", newVal, this.isTrueList);
    }
  },
  mounted() {},
  methods: {}
};
</script>
