<!--
*@描述:用户信息组件
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
*@说明：
当前页面的isTrue必须先声明七个写死的true，然后在赋值才可以
-->

<template>
  <div>
    <div class="body">
      <div class="picture">
        <img :src="picInfo" alt />
      </div>
      <div class="rightDiv">
        <table class="rightTable" border="1" cellspacing="0" cellpadding="0" align="center">
          <tr v-for="(item ,i) in infoName" v-if="nameIsTrue[i]">
            <td>{{infoName[i].title}}</td>
            <td>{{infoName[i].value}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* =====================右边数据=================== */
.rightDiv {
  height: 190px;
  border: 1px solid white;

  /* 使上下居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.rightTable {
  text-align: center;
  border: 1px solid white;
  color: black;
  font-size: 15px;
}
.body {
  width: 298px;
  height: 190px;
  border: 1px solid;
}

/* ==================左边图片===================== */
.picture img {
  width: 100px;
  height: 120px;
  margin: 30px auto;
}
.body .picture {
  float: left;
  width: 100px;
  height: 140px;
  top: 4px;
  bottom: 4px;
  border: 1px solid white;
  /* position: absolute; */
}

/* 左边大边框 */
.body .rightData {
  width: 176px;
  height: 190px;
  position: absolute;
  left: 120px;
  border: 1px solid white;
  font-size: 15px;
  text-align: left;
  color: black;
}

/* ================废弃的右边不服================== */

/* 每行数据边框 */
.body .info {
  border: 1px solid white;
  /* display:inline-block; */
}

/* 每行数据左边的属性边框 */
.infoName {
  margin-right: 20px;
  display: inline-block;
  border: 1px solid white;
}
/* 每行数据左边的数据边框 */
.infoData {
  display: inline-block;
  border: 1px solid white;
}
</style>
<script>
export default {
  props: {
    // 父页面makeForm传递：user在页面要显示的内容数组
    isTrueList: {
      type: Array,
      default: () => [
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "姓名",
          value: "张三",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        },
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "性别",
          value: "男",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        },
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "学号",
          value: "122231231231",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        },
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "学院",
          value: "物理与电子信息学院",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        },
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "专业",
          value: "电子信息",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        },
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "班级",
          value: "二班",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        },
        {
          id: "", // 模板内容ID
          isTrue: true,
          fieldSequence: "0",
          title: "年级",
          value: "一年级",
          bottomName: "姓名是否显示",
          titleList: ["某某得分", "某某信息", "评分"]
        }
      ]
    }
  },
  data() {
    return {
      // user组件右侧框里面默认显示内容
      infoName: [],
      picInfo: require("../../../../assets/super/user.png"), // user左侧默认人图片
      nameIsTrue: [true, true, true, true, true, true, true] // 页面是否显示某个属性数组
    };
  },
  watch: {
    // 监听父页面makeForm传递数组：是否显示数组数据
    isTrueList(newVal) {
      this.nameIsTrue = []; // 清空当前是否显示数组数据--必须留不可删
      this.infoName = []; // 清空当前显示数据数组数据

      for (let i = 0; i < newVal.length; i++) {
        this.nameIsTrue[i] = newVal[i].isTrue;
        this.infoName.push(newVal[i]);
      }
    }
  },
  mounted() {
    this.start(); //不需要执行即可，因为makeform接收后端值后即可改变，监听也会改变
  },
  methods: {
    start() {
      this.infoName = [];
      for (let i = 0; i < this.isTrueList.length; i++) {
        this.infoName.push(this.isTrueList[i]);
      }
    }
  }
};
</script>
