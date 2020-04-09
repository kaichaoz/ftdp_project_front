<!--
*@描述:模板管理
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
*@说明：-->
<template>
  <div>
    <div class="title commonColor">
      <!-- <div class="iocNameDiv"> -->
      <img @click="intoSetting()" class="iocName" :src="iocName" alt />
      <!-- </div> -->

      <div class="button" @click="intoModel()">组件管理</div>
      <div class="titleName">模板管理</div>
      <!-- <div class="iocName"> -->
    </div>

    <div class="body">
      <vuedraggable v-model="list" :options="options">
        <div class="bodyDiv" v-for="(item ,index) in list ">
          <van-collapse class="publicClassification" v-model="list[index].activeNames" accordion>
            <van-collapse-item v-if="list" class="collapseOne" :title="list[index].title" name="1">
              <!-- 具体模板 -->
              <swipeCell></swipeCell>
              <swipeCell></swipeCell>
              <swipeCell></swipeCell>

              <!-- 加号 -->
              <div>
                <img @click="plusNum(index)" class="addBut" :src="plus" alt />
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </vuedraggable>
    </div>
  </div>
</template>
<style scoped>
.commonColor {
  background: #fecd2a;
}

.title {
  overflow: hidden;
  border: 1px solid #fecd2a;
  width: auto;
  height: 48px;
  /* background: #FECD2A; */
}
.button {
  float: left;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
}
.titleName {
  margin: 10px auto 10px;
  font-size: 20px;
  width: 100px;
}

.title .iocName {
  /* background: none; */
  float: right;
  /* position: fixed; */
  width: 50px;
  height: 50px;
  /* left: 350px; */
}

.bodyDiv {
  margin-top: 50px;
  /* width: 80%; */
  /* margin: 10px auto 10px; */
  margin-left: 15px;
  margin-right: 15px;
}

/* 对应里面模板和组件名字大小和位置 */
>>> .van-cell {
  /* height: 100px; */
  text-align: left;
  font-size: 20px;
}

.publicClassification {
  margin-top: 20px;
}

.addBut {
  height: 40px;
  width: 40px;
  margin: 10px auto;
}
</style>
<script>
import vuedraggable from "vuedraggable";
import user from "../../../components/Super/library/userInfo/user";
import infoShow from "../../../components/Super/library/theMessageStates/infoShow";
import numberIndex from "../../../components/Super/library/enterInformation/numberIndex";
import swipeCell from "../../../components/Super/template/swipeCell";
export default {
  components: {
    user,
    infoShow,
    numberIndex,
    vuedraggable,
    swipeCell
  },
  data() {
    return {
      iocName: require("../../../assets/super/setting.png"), // 抬头右侧设置图片

      plus: require("../../../assets/super/plus.png"), // 底部加号图片

      // 模板名称
      list: [
        { activeNames: "1", title: "公共项目" },
        { activeNames: "1", title: "男生项目" },
        { activeNames: "1", title: "女生项目" }
      ],

      // 长按后拖动
      options: {
        delayOnTouchOnly: true, //开启触摸延时
        direction: "vertical", //拖动方向
        delay: 500, //延时时长
        touchStartThreshold: 3, //防止某些手机过于敏感(3~5 效果最好)
        chosenClass: "chosen" //选中之后拖拽项添加的class名(用于选中时候添加样式)
      }
    };
  },
  updated() {
    // 数据更新后：
    console.log(this.list);
  },
  mounted() {},
  methods: {
    // 抬头左侧按钮跳转到组件管理
    intoModel() {
      this.$router.push({ name: "library" });
    },
    // 抬头右侧按钮跳转到模板设置
    intoSetting() {
      this.$router.push({ name: "setting" });
    },

    // 加号：跳转添加页面输入信息
    plusNum(index) {
      this.$router.push({
        name: "createName",
        params: {
          managementEdit: "0"
        }
      });
    }
  }
};
</script>
