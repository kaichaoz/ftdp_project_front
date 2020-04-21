<!--
*@描述:模板设置
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
*@说明：-->
<template>
  <div>
    <div class="title commonColor">
      <div class="button" @click="intoModel()">模板管理</div>
      <div class="titleName">模板设置</div>
    </div>

    <div class="body">
      <div class="nameTitle">分组设置</div>

      <div class="nameNum">
        <vuedraggable v-model="projectName" :options="options">
          <div class="project" v-for="(item,index) in projectName">
            <div
              @click="popupInput(index)"
              class="projectName"
            >{{projectName[index].templateGroupName}}</div>
            <!-- <div class="projectBut"> -->
            <img @click="lessNum(index)" class="projectBut" :src="less" alt />
            <!-- </div> -->
          </div>
        </vuedraggable>
      </div>

      <div>
        <img @click="plusNum()" class="addBut" :src="plus" alt />
      </div>
    </div>
    <popup
      :boolean="boolean"
      :projectInfo="projectInfo"
      :projectIndex="projectIndex"
      @listenToChildSetting="receivePopup"
      @listenToSettingInfo="receivePopupInfo"
    ></popup>
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

.body {
  margin: 20px auto 20px;
  width: 335px;
  height: 500px;
  border: 1px solid #e0e9ea;
}

.nameTitle {
  border: 1px solid #e0e9ea;
  float: left;
  margin: 10px;
}

.nameNum {
  border: 1px solid #e0e9ea;
  width: 300px;
  /* height: 300px; */
  margin: 50px auto 20px;
}

.project {
  width: 300px;
  height: 40px;
  border: 1px solid #fecd2a;
  background-color: #fecd2a;
  margin-top: 20px;
}

.projectName {
  float: left;
  /* text-align: center; */
  margin: 3%;
}

.projectBut {
  width: 40px;
  height: 40px;
  float: right;
}

.addBut {
  height: 40px;
  width: 40px;
  margin: 10px auto;
}
</style>
<script>
import popup from "../../../../src/components/Super/popup";
import vuedraggable from "vuedraggable";

import {queryTemplateGroupd} from "../../../../src/api/Super/template/setting";
import {modifyTemplateGroup} from "../../../../src/api/Super/template/setting";
import {responseCode} from "../../../../src/utils/responseCode";

export default {
  components: {
    popup,
    vuedraggable,
    responseCode
  },
  data() {
    return {
      //   show: false,
      //   value: ""

      less: require("../../../assets/super/Less.png"),
      plus: require("../../../assets/super/plus.png"),
      // projectName: [
      //   { id:"", templateGroupname:"公共项目"},
      //   { id:"", templateGroupname:"男生项目"},
      //   { id:"", templateGroupname:"女生项目"}
      //   ],
      projectName: [
        { id: "", templateGroupName: "", isUsable: "", groupSequence: "" }
      ],

      boolean: "", // 弹出框输入是否可见
      projectInfo: "", // 传递给弹出框名字信息
      projectIndex: "", // 传递给弹出框的名字在projectName中位置

      options: {
        delayOnTouchOnly: true, //开启触摸延时
        direction: "vertical", //拖动方向
        delay: 500, //延时时长
        touchStartThreshold: 3, //防止某些手机过于敏感(3~5 效果最好)
        chosenClass: "chosen" //选中之后拖拽项添加的class名(用于选中时候添加样式)
      }
    };
  },

  watch: {},

  // 销毁前（退出界面）
  beforeDestroy() {
    this.modifyTemplateGroupPost();
  },

  updated() {},

  mounted() {
    this.queryTemplateGroupGet();
  },

  methods: {
    // 初始化请求后端数据
    queryTemplateGroupGet() {
      this.projectName = [];
      const vm = this;

      // const componentUrl =
      //   "http://127.0.0.1:8091/ftdp-web/TemplateGroup/queryTemplateGroup";
      // 请求方法
      vm.$axios.get(queryTemplateGroupd).then(res => {
        if (res.data.code == responseCode.SUCCESSCODE) {
          for (let i = 0; i < res.data.data.length; i++) {
            // const element = array[i];
            // 将后端数据存放到数组中
            this.projectName.push({
              id: res.data.data[i].id,
              templateGroupName: res.data.data[i].templateGroupName,
              isUsable: res.data.data[i].isUsable,
              groupSequence: res.data.data[i].groupSequence
            });
          }
          // this.projectName = res.data.data
          //  const a = this.replaceTF(this.projectName);
        } else {
          // this.$router.push({ name: "login" });
          this.$toast({
            message: ""
          });
        }
      });
    },
    
    modifyTemplateGroupPost() {
      const projectNamePosition = this.changeLocation(this.projectName);

      const resData = [];
      for (let i = 0; i < projectNamePosition.length; i++) {

        resData.push({
          id: projectNamePosition[i].id,
          templateGroupName: projectNamePosition[i].templateGroupName,
          isUsable: projectNamePosition[i].isUsable,
          groupSequence: projectNamePosition[i].groupSequence
        });
        // console.log(projectNamePosition, "zzz");
      }

      console.log(resData);
      
    //  console.log(this.projectNamePosition[i].isUsable, "zzz");

      const vm = this;
      // const componentUrl =
      //   "http://127.0.0.1:8091/ftdp-web/TemplateGroup/modifyTemplateGroup";
      // 请求方法  
      vm.$axios.post(modifyTemplateGroup, resData).then(res => {
        if (res.data.code == responseCode.SUCCESSCODE) {
          this.$toast({
            message: "修改成功"
          });
        } else {
          vm.$toast({
            message: "抱歉，，，",
            duration: 1000
          });
        }
      });
    },

    //删除分组设置
    addDeleteRecord(i) {
      const resData = [];
      resData.push({
        id: this.projectName[i].id,
        templateGroupName: this.projectName[i].templateGroupName,
        isUsable: this.projectName[i].isUsable,
        groupSequence: this.projectName[i].groupSequence
      });
      // console.log(this.projectName[i].isUsable, "zzz");

      const vm = this;
      // const componentUrl =
      //   "http://127.0.0.1:8091/ftdp-web/TemplateGroup/modifyTemplateGroup";
      vm.$axios.post(modifyTemplateGroup, resData).then(res => {
        if (res.data.code == responseCode.SUCCESSCODE) {
          this.$toast({
            message: "删除成功"
          });
        } else {
          vm.$toast({
            message: "抱歉，，，",
            duration: 1000
          });
        }
      });
    },

    // 修改classList数组中位置，随着位置改变，数据改变
    changeLocation(arrayList) {
      for (let i = 0; i < arrayList.length; i++) {
        arrayList[i].groupSequence = i;
      }
      return arrayList;
    },

    // 替换前端true和false分别改为01
    replace01(arrayList) {
      for (let index = 0; index < arrayList.length; index++) {
        if (arrayList[index].isUsable == true) {
          arrayList[index].isUsable = 0;
        } else if (arrayList[index].isUsable == false) {
          arrayList[index].isUsable = 1;
        }
        
        return arrayList;
      }
    },
    //替换后端的01分别改为true和false
    replaceTF(arrayList) {
      for (let index = 0; index < arrayList.length; index++) {
        if (arrayList[index].isUsable == "0") {
          arrayList[index].isUsable = true;
        } else if (arrayList[index].isUsable == "1") {
          arrayList[index].isUsable = false;
        }

        return arrayList;
      }
    },

    // 修改isUsable的状态
    replaceTFF(i) {
      if (this.projectName[i].isUsable == 0) {
        this.projectName[i].isUsable = 1;
      } else if (this.projectName[i].isUsable == 1) {
        this.projectName[i].isUsable = 0;
      }
      // console.log(projectName,"修改")
    },

    // 点击抬头左侧按钮
    intoModel() {
      this.$router.push({ name: "management" });
    },

    // 删除内容
    lessNum(i) {
      this.replaceTFF(i);
      // this.projectName[i].isUsable = 1;
      this.addDeleteRecord(i);
      this.projectName.splice(i, 1);
      // console.log(projectName,"删除")
    },

    // 增加内容
    plusNum() {
      this.projectName.push({
        templateGroupName: "请输入信息",
        id: "",
        isUsable: "0",
        groupSequence: ""
      });
    },

    // 点击每个名字进弹框修改
    popupInput(i) {
      //alert("我是白爱民"+i)
      this.boolean = true;
      this.projectInfo = this.projectName[i].templateGroupName;
      this.projectIndex = i;
    },

    //接收弹出框页面是否可见的boolean值
    receivePopup(newVal) {
      this.boolean = newVal;
    },

    // 接收输入弹框中修改的内容
    receivePopupInfo(newInfo, newI) {
      this.projectName[newI].templateGroupName = newInfo;
    }
  }
};
</script>
