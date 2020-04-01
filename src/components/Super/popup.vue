<template>
  <div>
    <!-- 弹出框 -->
    <van-popup v-model="bulletoxShow" class="content">
      <div class="title">{{title}}</div>
      <div>
        <van-field
          oninput="value=value.replace(/[^\d]/g, '')"
          class="txtstyle"
          focus="1"
          maxlength="3"
          v-model="inputInfo"
          :placeholder="placeholder"
        ></van-field>
      </div>
      <div style="margin-top:15%;font-size: 17px;">
        <span class="cancel" @click="cancel()">取消</span>
        <span class="determine" @click="determine()">确定</span>
      </div>
    </van-popup>
    <!-- 弹出框 -->
  </div>
</template>

<script>
export default {
  props: {
    boolean: { default: false },
    projectInfo: { default: "请修改内容" },
    projectIndex:{default: "0"}
  },
  data() {
    return {
      active: 0,
      //弹出框
      bulletoxShow: false, // 弹出框是否显示
      inputInfo: "", // 输入的学习数量
      placeholder: "请修改内容",
      title: "请输入修改内容"
    };
  },
  watch: {

      //监听传入的boolean值
    boolean(newVal) {
      this.bulletoxShow = newVal;
    },
      //监听传入的修改内容值
    projectInfo(newVal) {
      this.inputInfo = newVal;
    },
      //监听boolean值变化传给父页面
    bulletoxShow(newVal) {
      this.$emit("listenToChildSetting", newVal);
    }
  },

  methods: {
    //弹出框取消按钮
    cancel() {
      this.bulletoxShow = false;
    },
    //弹出框确定按钮
    determine() {
      this.bulletoxShow = false;
      this.$emit("listenToSettingInfo", this.inputInfo ,this.projectIndex);
    }
  }
};
</script>

<style scoped>
/* -------------------弹出框--------------------------- */
.content {
  width: 7.8rem;
  height: 6.72rem;
  border-radius: 10px;
  /* position: relative; */
}
.title {
  font-size: 20px;
  margin-top: 10%;
}
.txtstyle {
  width: 80%;
  margin-left: 10%;
  padding-left: 5%;
  border-bottom: 1px solid gray;
  margin-top: 15%;
}
.cancel {
  /* margin-left: -35%; */
  color: darkolivegreen;
}
.determine {
  margin-left: 38%;
  color: blue;
}
/* -------------------弹出框--------------------------- */
</style>
