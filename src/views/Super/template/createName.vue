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
          <van-field v-model="createNameDataList.managementNamevalue" placeholder="请输入模板名称" />
        </van-cell-group>
      </div>

      <div class="managementName">
        <van-dropdown-menu active-color="#fecd2a">
          <van-dropdown-item
            v-model="createNameDataList.groupValue"
            :options="createNameDataList.groupOption"
          />
        </van-dropdown-menu>
      </div>

      <div class="managementName">
        <van-dropdown-menu active-color="#fecd2a">
          <van-dropdown-item
            v-model="createNameDataList.personValue"
            :options="createNameDataList.personOption"
          />
        </van-dropdown-menu>
      </div>

      <div class="remark">
        <div class="remarkLabel">表单备注:</div>
        <div
          id="editer"
          contenteditable="canEdit"
          class="remarkTxt"
          v-text="createNameDataList.remarkTxt"
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
import escape from "../../../api/escape"; // 导入转移符html
import { ContactCard } from "vant";
export default {
  data() {
    return {
      // 当前页面所有数据
      createNameDataList: {
        managementNamevalue: "", // 模板名称输入框输入内容
        groupValue: "", // 分组选择后的分组value
        personValue: "", //人员选择后的value
        // 所属分组
        groupOption: [
          { text: "", value: "" },
          { text: "", value: "" },
          { text: "", value: "" }
        ],
        personOption: [{ text: "", value: "" }], // 人员下拉框
        remarkTxt: "" //备注输入内容
      }
    };
  },
  mounted() {
    // this.jumpToPageLoading();
    this.start();
  },

  updated() {
    // 存储到vuex
    this.$store.commit("setCreateNameDataList", this.createNameDataList);

    // 从vuex获取
    // const a = this.$store.state.createNameDataList;
  },
  methods: {
    start() {
      // 初始化从vuex读取，后改为后端
      this.createNameDataList = {};
      this.createNameDataList = this.$store.state.createNameDataList;
    },
    // 上一级页面跳转进来传参：
    jumpToPageLoading() {
      // 接收上一个页面传参内容
      const a = this.$route.params.managementEdit; // 接收判断从哪个按钮进入
      const a1 = this.$route.params.title; // 接收从编辑进入的title名字

      //从任何地方过来都需要当前所有分组名字：公共项目、男生项目、女生项目等的集合

      if (a == "0") {
        // 从加号过来的
      } else if (a == "1") {
        //从编辑过来的，还需要给我是哪个id，我在这个页面按照id去后端查询
      }
    },
    // 返回
    returnPage() {
      // window.history.go(-1); // windos的返回上一页
      // this.$router.go(-1) // vue的返回上一页
      this.$router.push({ name: "management" });
    },

    //下一步
    nextStep() {
      // console.log("2");
      this.$router.push({ name: "makeForm" });
    },

    // 光标离开备注输入框执行存储
    changeText() {
      this.storageTxtNode();
    },
    // 将输入内容存储，需要转html格式，有些字符无法存数据库
    storageTxtNode() {
      var temp = document.getElementById("editer").innerText; // 获取文本框内容
      temp = escape.htmlEncode(temp); // 将特殊字符转格式
      console.log(temp);
    }
  }
};
</script>
