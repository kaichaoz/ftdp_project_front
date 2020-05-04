<!--
*@描述:模板设置
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:张颖娟
*@LastEditTime:2020年4月21日09:39:41
*@说明：-->
<template>
  <div>
    <titlePerPage
      :title="settingTitle.title"
      :leftText="settingTitle.leftText"
      :rightText="settingTitle.rightText"
      @listenTitlePerPageLeftClick="intoModel"    
    ></titlePerPage>
    <!-- <div class="title commonColor">
      <div class="button" @click="intoModel()">模板管理</div>
      <div class="titleName">模板设置</div>
    </div> -->

    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh" >

    <div class="body">
      <div class="nameTitle">分组设置</div>

      <div class="nameNum"> 
        <vuedraggable v-model="projectName" :options="options">
          <div class="project" v-for="(item,index) in projectName">
            <div
              @click="popupInput(index)"
              class="projectName"
            >{{projectName[index].templateGroupName}}</div>
            <img @click="lessNum(index)" class="projectBut" :src="less" alt />
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
    </van-pull-refresh>
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
  /* height: 500px; */
  border: 1px solid #e0e9ea;
  min-height: auto;
  max-height: auto;
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
import popup from "../../../../src/components/Super/popup"; //引入弹出框
import vuedraggable from "vuedraggable";

import { queryTemplateGroupd } from "../../../../src/api/Super/template/setting"; //引入初始化模板分组接口的后端地址
import { modifyTemplateGroup } from "../../../../src/api/Super/template/setting"; //引入修改模板分组接口的后端地址

import  titlePerPage  from "../../../components/publicAll/title_per_page"; // 引入title组件
import { responseCode } from "../../../../src/utils/responseCode";  // 引入状态码
import { Dialog } from "vant"; // 引用dialog弹出框
import { mapState } from "vuex"; // 全局调取：可使用this.

export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["notifyInfo", "pullRefresh"]),// 映射store变量notigyInfo为当前页面变量，直接使用this即可
    ...mapState(["TipsStore", ""]), // 映射store变量TipsStore为当前页面变量，直接使用this即可

  },
  components: {
    // 组件
    popup,
    vuedraggable,
    titlePerPage
  },
  data() {
    return {
      settingTitle:{
        title:"模板设置",
        leftText:"模板管理",  
        rightText:""   
      },
      less: require("../../../assets/super/Less.png"), //右边减号图片图片
      plus: require("../../../assets/super/plus.png"), //底部加号图片

      //渲染当前setting页面数据
      projectName: [
        {
          id: "",
          templateGroupName: "", // 模板分组名
          isUsable: "", // 是否可用，0可用、1不可
          groupSequence: "" // 分组位置
        }
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

  beforeDestroy() {
    // 退出界面保存数据
    this.modifyTemplateGroupPost();
  },

  updated() {},

  mounted() {
    //进入setting页面缓存setting_Leave的值为1,（定时器使用，management页面）
    sessionStorage.setItem("setting_Leave", "1");
    // 初始化请求后端数据
    this.queryTemplateGroupGet();
  },

  methods: {
    /**
     * @description:  初始化请求后端数据
     * @param {i:分组索引}
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月21日09:37:36
     */
    queryTemplateGroupGet() {
      this.projectName = [];
      const vm = this;

      // 请求后端数据
      vm.$axios.get(queryTemplateGroupd).then(res => {
        switch (res.data.code){
          case responseCode.SUCCESSCODE:
            //遍历当前页面所有分组
            for (let i = 0; i < res.data.data.length; i++) {
            // 将后端数据存放到数组中
            this.projectName.push({
              id: res.data.data[i].id,
              templateGroupName: res.data.data[i].templateGroupName,
              isUsable: res.data.data[i].isUsable,
              groupSequence: res.data.data[i].groupSequence
            });
            }
            break;
          case responseCode.NULLCODE:
            this.$Notify({
              message: this.notifyInfo[0].loadFailed, // 提示：加载失败.==store.js
              background: this.notifyInfo[1].orange, //橘色：#FF976A
              duration: this.notifyInfo[2].duration //定义时长,1s
            });
            break;
          default:
            this.$Notify({
              message: this.notifyInfo[0].loadFailed, // 提示：加载失败.==store.js
              background: this.notifyInfo[1].orange, //橘色：#FF976A
              duration: this.notifyInfo[2].duration //定义时长,1s
          });                   
        }     
      });
    },

    /**
     * @description: 保存当前setting页面数据
     * @param {i:分组索引}
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月21日09:37:36
     */
    modifyTemplateGroupPost() {
      //修改classList数组中位置，随着位置改变，数据改变
      const projectNamePosition = this.changeLocation(this.projectName);

      const resData = [];
      for (let i = 0; i < projectNamePosition.length; i++) {
        // 将前端页面数据存放到数组中
        resData.push({
          id: projectNamePosition[i].id, //分组id
          templateGroupName: projectNamePosition[i].templateGroupName, //模板分组名称
          isUsable: projectNamePosition[i].isUsable, //是否可用
          groupSequence: projectNamePosition[i].groupSequence //分组位置
        });
      }

      const vm = this;
      // const componentUrl =
      // "http://127.0.0.1:8091/ftdp-web/TemplateGroup/modifyTemplateGroup";

       // 请求后端数据
      vm.$axios.post(modifyTemplateGroup, resData).then(res => {
        switch (res.data.code) {
          case responseCode.SUCCESSCODE:
            this.$Notify({
              message: this.notifyInfo[0].modifySucceed, // 提示：修改成功
              background: this.notifyInfo[1].blue, // 蓝色：#29B8DB
              duration: this.notifyInfo[2].duration //定义时长,1s
            });
            //保存数据，离开页面，setting_Leave的值为0（定时器使用，management页面）
            sessionStorage.setItem("setting_Leave", "0");
            break;
          case responseCode.NULLCODE:
            this.$Notify({
              message: this.notifyInfo[0].noData, // 提示：暂无数据
              background: this.notifyInfo[1].orange, // 橘色:#FF976A
              duration: this.notifyInfo[2].duration //定义时长,1s
            });
            break;
          default:
            this.$Notify({
              message: this.notifyInfo[0].sorry, // 提示：抱歉,,,
              background: this.notifyInfo[1].orange, // 橘色:#FF976A
              duration: this.notifyInfo[2].duration //定义时长,1s
            });
        }
      });
    },

    /**
     * @description: 删除分组设置
     * @param {i:分组索引}
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月21日09:37:36
     */
    addDeleteRecord(i) {
      const resData = [];
      //获取所选分组信息
      resData.push({
        id: this.projectName[i].id, //分组id
        templateGroupName: this.projectName[i].templateGroupName, //模板分组名称
        isUsable: this.projectName[i].isUsable, //是否可用
        groupSequence: this.projectName[i].groupSequence //分组位置
      });
      const vm = this;
      //请求后端数据
      vm.$axios.post(modifyTemplateGroup, resData).then(res => {
        // if (res.data.code == this.$responseCode.SUCCESSCODE) {
        //   // this.$toast({
        //   // message: "修改成功"
        //   // });
        // } else {
        //   this.$Notify({
        //     message: this.notifyInfo[0].sorry, // 提示：抱歉,,,
        //     background: this.notifyInfo[1].orange, // 橘色:#FF976A
        //     duration: this.notifyInfo[2].duration //定义时长,1s
        //   });
        // }
        switch (res.data.code) {
          case responseCode.SUCCESSCODE:
            break;
          case responseCode.NULLCODE:
            this.$Notify({
              message: this.notifyInfo[0].noData, // 提示：暂无数据
              background: this.notifyInfo[1].orange, // 橘色:#FF976A
              duration: this.notifyInfo[2].duration //定义时长,1s
            });
            break;
          default:
            this.$Notify({
              message: this.notifyInfo[0].sorry, // 提示：抱歉,,,
              background: this.notifyInfo[1].orange, // 橘色:#FF976A
              duration: this.notifyInfo[2].duration //定义时长,1s
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
    },

    // 点击抬头左侧按钮
    intoModel() {
      this.$router.push({ name: "management" });
    },

    // 删除内容
    lessNum(i) {
      // dialog();
      Dialog.confirm({
        // title: "标题",
        message: this.TipsStore[0].message, //提示框内容：确定删除吗？(store.js)
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.replaceTFF(i); //修改isUsable的状态(由0改为1)
          this.addDeleteRecord(i); //删除分组设置（后端）
          this.projectName.splice(i, 1); //删除分组设置（前端）
        })
        .catch(() => {
          return;
        });
    },

    // 增加内容
    plusNum() {
      this.projectName.push({
        templateGroupName: "请输入信息", //模板分组名称
        id: "", //分组id
        isUsable: "0", //是否可用
        groupSequence: "" //分组位置
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
    },

    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
      }, 1000); //1000代表刷新时间
      this.queryTemplateGroupGet(); //重新加载页面
    }
  }
};
</script>
