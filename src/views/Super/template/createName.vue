<!--
*@描述:创建模板--名字
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
*@说明：
// 所有输入框要添加转格式
-->


<template>
  <div>
    <div class="title commonColor">
      <div class="buttonLeft" @click="returnPage()">返回</div>
      <div class="buttonRight" @click="nextStep()">下一步</div>
      <div class="titleName">编辑模板</div>
    </div>

    <div class="body">
      <div class="managementName">
        <van-cell-group>
          <van-field v-model="managementNamevalue" placeholder="请输入模板名称" />
        </van-cell-group>
      </div>

      <div class="managementName">
        <van-dropdown-menu active-color="#fecd2a">
          <van-dropdown-item v-model="groupValue" :options="groupOption" />
        </van-dropdown-menu>
      </div>

      <div class="managementName">
        <van-dropdown-menu active-color="#fecd2a">
          <van-dropdown-item v-model="personValue" :options="personOption" />
        </van-dropdown-menu>
      </div>

      <div class="remark">
        <div class="remarkLabel">表单备注:</div>
        <div
          id="editer"
          contenteditable="canEdit"
          class="remarkTxt"
          v-text="remarkTxt"
          @blur="changeText()"
        ></div>
      </div>
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
.buttonLeft {
  float: left;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
}
.buttonRight {
  float: right;
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

.body {
  border: 1px solid #e0e9ea;
  margin: 10px;
}

.body .managementName {
  border: 1px solid #e0e9ea;
  overflow: hidden;
  margin-top: 40px;
  border-radius: 5px;
}

/* 下拉框名字居左 */
>>> .van-dropdown-menu__item {
  justify-content: left;
}

/* 下拉框内容对齐下拉框名字 */
>>> .van-dropdown-item {
  margin: 2px 12px 2px;
}

.body .remark {
  border: 1px solid #e0e9ea;
  overflow: hidden;
  margin-top: 70px;
}

.remarkLabel {
  float: left;
}

/* div文本框 */
.remarkTxt {
  border: 1px solid #e0e9ea;
  height: 100px;
  border-radius: 5px;
  background-color: white;
  margin-top: 30px;
  text-align: left;
}
</style>
<script>
import escape from "../../../api/escape"
import { ContactCard } from 'vant';
export default {
  data() {
    return {
      // show: false,
      managementNamevalue: "", // 模板名称输入框输入内容
      groupValue: 0, // 分组选择后的分组value
      personValue: 0, //人员选择后的value

      // 所属分组
      groupOption: [
        { text: "公共项目", value: 0},
        { text: "男生项目", value: 1 },
        { text: "女生项目", value: 2 }
      ],
      personOption: [{ text: "自己", value: 0 }], // 人员下拉框

      remarkTxt: "" //备注输入内容
    };
  },
  mounted() {},
  methods: {

    // 返回
    returnPage() {
      window.history.go(-1); // windos的返回上一页
      // this.$router.go(-1) // vue的返回上一页
    },

    //下一步
    nextStep() {
      // console.log("2");
      this.$router.push({name:"makeForm"})
    },

    // 光标离开备注输入框执行存储
    changeText() {
      this.storageTxtNode();
    },
    // 将输入内容存储，需要转html格式，有些字符无法存数据库
    storageTxtNode() {
      var temp = document.getElementById("editer").innerText; // 获取文本框内容
      temp = escape.htmlEncode(temp); // 将特殊字符转格式
      console.log(temp)
    }
  }
};
</script>
