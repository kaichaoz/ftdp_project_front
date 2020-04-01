<!--
 * @Description:学单词设置
 * Version: 4.0
 * @Author: 白爱民
 * @Date:2019年11月9日14:45:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-26 09:33:16
 -->
<template>
  <div>np
    <!-- <div @click="gohome">返回</div> -->
    <div class="settingPart">
      <div class="settingList">
        <!-- <van-icon name="browsing-history" size="25px" class="settingLogo" /> -->
        <img class="settingLogo" src="../../assets/settings/显示.png" />

        <span class="settingText">显示单词</span>
        <!-- <van-switch v-model="checked" bind:change="onChange" /> -->
        <van-switch
          v-model="checkedDisplayWord"
          @change="checkedDisplay"
          size="24px"
          class="switch"
        />
      </div>
      <div class="settingList">
        <!-- <van-icon name="smile" size="25px" class="settingLogo" /> -->
        <img class="settingLogo" src="../../assets/settings/自动.png" />

        <span class="settingText">自动模式</span>
        <!-- <van-switch v-model="checked" bind:change="onChange" /> -->
        <van-switch v-model="checkedAutomatic" @change="checkedAuto" size="24px" class="switch" />
      </div>

      <!-- 需要弹框的5个标签 -->
      <div>
        <!-- 之前for循环 -->
        <!-- <div v-if="(item,i)in allColumnsTitle" :key="i" class="settingList">
          <img class="settingLogo" :src="allColumnsImg[i]" />

          <span class="settingText">{{allColumnsTitle[i]}}</span>
          <div v-if="(item,i)in allColumnsArray" :key="i">
            <van-field
              readonly
              clickables
              label
              :value="playIntervalNow"
              placeholder
              @click="showPicker1 = true"
            />
            <van-popup v-model="showPicker1" position="bottom">
              <van-picker
                :id="i"
                title
                show-toolbar
                :columns="allColumnsArray[i]"
                @cancel="showPicker1 = false"
                @confirm="onConfirm1"
              />
            </van-popup>
          </div>

          <img class="arrowIcon" src="../../assets/settings/右.png" />
        </div>-->
        <div class="settingList">
          <img class="settingLogo" :src="allColumnsImg[0]" />

          <span class="settingText">{{allColumnsTitle[0]}}</span>
          <!-- <span class="settingTextName">秒</span> -->
          <span class="settingTextName">秒</span>

          <img class="arrowIcon" src="../../assets/settings/右.png" />
          <div>
            <van-field
              readonly
              clickables
              label
              :value="delayedJumpNow"
              placeholder
              @click="showPicker0 = true"
            />
            <van-popup v-model="showPicker0" position="bottom">
              <van-picker
                title
                show-toolbar
                :columns="allColumnsArray[0]"
                @cancel="showPicker0 = false"
                @confirm="onConfirm0"
              />
            </van-popup>
          </div>
        </div>

        <div class="settingList">
          <img class="settingLogo" :src="allColumnsImg[1]" />

          <span class="settingText">{{allColumnsTitle[1]}}</span>
          <span class="settingTextName">个</span>

          <img class="arrowIcon" src="../../assets/settings/右.png" />
          <div class="vanFieldDiv">
            <van-field
              readonly
              clickables
              label
              :value="learningNumNow"
              placeholder
              @click="showPicker1 = true"
            />
            <van-popup v-model="showPicker1" position="bottom">
              <van-picker
                title
                show-toolbar
                :columns="allColumnsArray[1]"
                @cancel="showPicker1 = false"
                @confirm="onConfirm1"
              />
            </van-popup>
          </div>
        </div>
        <div class="settingList">
          <img class="settingLogo" :src="allColumnsImg[2]" />

          <span class="settingText">{{allColumnsTitle[2]}}</span>
          <span class="settingTextName">次</span>

          <img class="arrowIcon" src="../../assets/settings/右.png" />
          <div>
            <van-field
              readonly
              clickables
              label
              :value="viewsNow"
              placeholder
              @click="showPicker2 = true"
            />
            <van-popup v-model="showPicker2" position="bottom">
              <van-picker
                title
                show-toolbar
                :columns="allColumnsArray[2]"
                @cancel="showPicker2 = false"
                @confirm="onConfirm2"
              />
            </van-popup>
          </div>
        </div>
        <div class="settingList">
          <img class="settingLogo" :src="allColumnsImg[3]" />

          <span class="settingText">{{allColumnsTitle[3]}}</span>
          <span class="settingTextName">秒</span>

          <img class="arrowIcon" src="../../assets/settings/右.png" />
          <div>
            <van-field
              readonly
              clickables
              label
              :value="playIntervalNow"
              placeholder
              @click="showPicker3 = true"
            />
            <van-popup v-model="showPicker3" position="bottom">
              <van-picker
                title
                show-toolbar
                :columns="allColumnsArray[3]"
                @cancel="showPicker3 = false"
                @confirm="onConfirm3"
              />
            </van-popup>
          </div>
        </div>
        <div class="settingList">
          <img class="settingLogo" :src="allColumnsImg[4]" />

          <span class="settingText">{{allColumnsTitle[4]}}</span>
          <span class="settingTextName">秒</span>

          <img class="arrowIcon" src="../../assets/settings/右.png" />
          <div>
            <van-field
              readonly
              clickables
              label
              :value="residenceTimeNow"
              placeholder
              @click="showPicker4 = true"
            />
            <van-popup v-model="showPicker4" position="bottom">
              <van-picker
                title
                show-toolbar
                :columns="allColumnsArray[4]"
                @cancel="showPicker4 = false"
                @confirm="onConfirm4"
              />
            </van-popup>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <van-popup v-model="bulletoxShow0" class="content">
      <div class="title">请输入延迟跳转秒数</div>
      <div>
        <van-field
          oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
          class="txtstyle"
          focus="1"
          maxlength="3"
          v-model="delayedJumpTemporary"
          placeholder="随便输个数"
        ></van-field>
      </div>
      <div style="margin-top:15%;font-size: 17px;">
        <span class="cancel" @click="cancel0">取消</span>
        <span class="determine0" @click="determine0">确定</span>
      </div>
    </van-popup>

    <van-popup v-model="bulletoxShow1" class="content">
      <div class="title">请输入学习数量</div>
      <div>
        <van-field
          oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
          class="txtstyle"
          focus="1"
          maxlength="3"
          v-model="learningNumTemporary"
          placeholder="随便输个数"
        ></van-field>
      </div>
      <div style="margin-top:15%;font-size: 17px;">
        <span class="cancel" @click="cancel1">取消</span>
        <span class="determine" @click="determine1">确定</span>
      </div>
    </van-popup>
    <van-popup v-model="bulletoxShow2" class="content">
      <div class="title">请输入播放次数</div>
      <div>
        <van-field
          oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
          class="txtstyle"
          focus="1"
          maxlength="3"
          v-model="viewsTemporary"
          placeholder="随便输个数"
        ></van-field>
      </div>
      <div style="margin-top:15%;font-size: 17px;">
        <span class="cancel" @click="cancel2">取消</span>
        <span class="determine" @click="determine2">确定</span>
      </div>
    </van-popup>
    <van-popup v-model="bulletoxShow3" class="content">
      <div class="title">请输入播放间隔</div>
      <div>
        <van-field
          oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
          class="txtstyle"
          focus="1"
          maxlength="3"
          v-model="playIntervalTemporary"
          placeholder="随便输个数"
        ></van-field>
      </div>
      <div style="margin-top:15%;font-size: 17px;">
        <span class="cancel" @click="cancel3">取消</span>
        <span class="determine" @click="determine3">确定</span>
      </div>
    </van-popup>
    <van-popup v-model="bulletoxShow4" class="content">
      <div class="title">请输入大图停留时间</div>
      <div>
        <van-field
          oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
          class="txtstyle"
          focus="1"
          maxlength="3"
          v-model="residenceTimeTemporary"
          placeholder="随便输个数"
        ></van-field>
      </div>
      <div style="margin-top:15%;font-size: 17px;">
        <span class="cancel" @click="cancel4">取消</span>
        <span class="determine" @click="determine4">确定</span>
      </div>
    </van-popup>

    <!-- 弹出框 -->
  </div>
</template>
<script scoped>
import Vue from "vue";
// import { Field } from "vant";
// import { queryUserIdEAllNum } from "../../api/mine/e-currency-ranking";
// import { login } from "../../api/Login/login";
// import { log } from "util";
// import { businessCode } from "../../utils/ResponseCode/response-code";
// import { modifyById } from "../../api/mine/settings";
export default {
  data() {
    return {
      bulletoxShow0: false, // 弹出框是否显示
      bulletoxShow1: false, // 弹出框是否显示
      bulletoxShow2: false, // 弹出框是否显示
      bulletoxShow3: false, // 弹出框是否显示
      bulletoxShow4: false, // 弹出框是否显示

      //弹框： html临时存放当前:value选择的值。
      delayedJumpTemporary: "", // 延迟跳转临时数据
      learningNumTemporary: "", // 学习数量临时数据
      viewsTemporary: "", // 播放次数临时数据
      playIntervalTemporary: "", // 播放间隔临时数据
      residenceTimeTemporary: "", // 大图停留时间临时数据

      // learnNum: "", // 输入的学习数量

      // --------------------上滑弹框参数 --------------------------------------

      //弹框： 控制每一个是否可以点击开
      showPicker0: false,
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,

      //弹框： 最左边的五个图片
      allColumnsImg: [
        require("../../../public/settings/时间.png"),
        require("../../../public/settings/学习.png"),
        require("../../../public/settings/播放次数.png"),
        require("../../../public/settings/时间.png"),
        require("../../../public/settings/停留时间.png"),
      ],
      // allColumnsImg: [],

      //弹框：暂时没用 placeholder属性的值，但是当前没有用到显示的字
      allColumnsTitle: [
        "延迟跳转",
        "学习数量",
        "播放次数",
        "播放间隔",
        "大图停留时间"
      ],

      //弹框：暂时用下边的 columns: ["3秒", "5秒", "10秒", "15秒"],
      delayedJumpSelect: ["1秒", "2秒", "3秒", "4秒", "5秒", "自定义"], // 延迟跳转选择数据
      learningNumSelect: ["20个", "30个", "50个", "100次", "自定义"], // 学习数量选择数据
      viewsSelect: ["1次", "2次", "3次", "5次", "10次", "自定义"], // 播放次数选择数据
      playIntervalSelect: ["1秒", "2秒", "3秒", "4秒", "5秒", "自定义"], // 播放间隔选择数据
      residenceTimeSelect: ["3秒", "5秒", "10秒", "15秒", "自定义"], // 大图停留时间选择数据

      //弹框： 当前所有弹出按钮中的内容
      allColumnsArray: [
        ["1秒", "2秒", "3秒", "4秒", "5秒", "自定义"],
        ["20个", "30个", "50个", "100个", "自定义"],
        ["1次", "2次", "3次", "5次", "10次", "自定义"],
        ["1秒", "2秒", "3秒", "4秒", "5秒", "自定义"],
        ["3秒", "5秒", "10秒", "15秒", "自定义"]
      ],

      //弹框： html存放当前:value选择的值。
      delayedJumpNow: "1秒", // 延迟跳转当前数据
      learningNumNow: "20个", // 学习数量当前数据
      viewsNow: "1次", // 播放次数当前数据
      playIntervalNow: "1秒", // 播放间隔当前数据
      residenceTimeNow: "3秒", // 大图停留时间当前数据

      // --------------------弹框参数 --------------------------------------

      checkedDisplayWord: true, // 显示单词式控制开关
      checkedAutomatic: true // 自动模式
    };
  },
  mounted() {
    // this.functionSettings();
    this.initializationConfire();
    // this.modifyById();

    // this.consolog();
  },

  // 组件销毁前调用
  beforeDestroy() {
    // this.modifyById();
  },
  methods: {
    // 显示单词开关
    checkedDisplay() {
      const vm = this;
      if (vm.checkedDisplayWord == true) {
        localStorage.setItem("setting_checkedDisplayWord", 1);
      } else {
        localStorage.setItem("setting_checkedDisplayWord", 0);
      }
      // console.log(this.checkedDisplayWord);
    },
    // 是否自动模式开关
    checkedAuto() {
      if (this.checkedAutomatic == true) {
        localStorage.setItem("setting_checkedAutomatic", 1);
      } else {
        localStorage.setItem("setting_checkedAutomatic", 0);
      }

      // console.log(this.checkedAutomatic);
    },
    // gohome() {
    //   this.$router.push("home-main");
    // },

    // 离开设置页面的时候，把当前localStorage中的数据，同步插入到数据库--邢美玲--2019年11月10日
    modifyById() {
      const vm = this;
      vm.$axios
        .post(modifyById, {
          // playNums: localStorage.getItem("setting_viewsNow"),
          // turnDelayTime: localStorage.getItem("setting_delayedJumpNow"),
          // studyNumber: localStorage.getItem("setting_learningNumNow"),
          // playInterval: localStorage.getItem("setting_playIntervalNow"),
          // pictureStayTime: localStorage.getItem("setting_pictureStayTime"),
          isTurnAuto: localStorage.getItem("setting_checkedAutomatic"),
          isShowWord: localStorage.getItem("setting_checkedDisplayWord"),

          playNums: vm.viewsNow,
          turnDelayTime: vm.delayedJumpNow,
          studyNumber: vm.learningNumNow,
          playInterval: vm.playIntervalNow,
          pictureStayTime: vm.residenceTimeNow
          // isTurnAuto: vm.checkedAutomatic,
          // isShowWord: vm.checkedDisplayWord
        })
        .then(res => {
          if (res.data.code == "0000") {
            // console.log("设置成功");
            this.$toast({
              message: "设置成功"
            });
          } else {
            // console.log("设置失败");
            this.$toast({
              message: "服务器跑路了，正在追~~"
            });
          }
        });
    },

    //进入页面获取缓存中弹框数据
    initializationConfire() {
      this.checkedDisplayWord = localStorage.getItem(
        "setting_checkedDisplayWord"
      );
      if (this.checkedDisplayWord == "0") {
        this.checkedDisplayWord = false;
      } else if (this.checkedDisplayWord == "1") {
        this.checkedDisplayWord = true;
      }
      this.checkedAutomatic = localStorage.getItem("setting_checkedAutomatic");
      if (this.checkedAutomatic == 0) {
        this.checkedAutomatic = false;
      } else if (this.checkedAutomatic == 1) {
        this.checkedAutomatic = true;
      }

      // 首先获取缓存的数据 ，如果缓冲没有则为默认值
      this.delayedJumpNow = localStorage.getItem("setting_delayedJumpNow");
      this.learningNumNow = localStorage.getItem("setting_learningNumNow");
      this.viewsNow = localStorage.getItem("setting_viewsNow");
      this.playIntervalNow = localStorage.getItem("setting_playIntervalNow");
      this.residenceTimeNow = localStorage.getItem("setting_residenceTimeNow");
      if (this.delayedJumpNow == "") {
        this.delayedJumpNow = "1";
      }
      if (this.learningNumNow == "") {
        this.learningNumNow = "20";
      }
      if (this.viewsNow == "") {
        this.viewsNow = "1";
      }
      if (this.playIntervalNow == "") {
        this.playIntervalNow = "1";
      }
      if (this.residenceTimeNow == "") {
        this.residenceTimeNow = "3";
      }
    },
    //-------------------

    //延迟跳转弹出框取消按钮
    cancel0() {
      if ((this.delayedJumpNow = "自定义")) {
        this.delayedJumpNow = "1";
      }
      localStorage.setItem("setting_delayedJumpNow", this.delayedJumpNow);
      this.bulletoxShow0 = false;
    },
    //弹出框确定按钮
    determine0() {
      if ((this.delayedJumpNow = "")) {
        this.delayedJumpNow = "1";
      }
      // console.log(this.delayedJumpNow);

      this.delayedJumpNow = this.delayedJumpTemporary / 1;
      localStorage.setItem("setting_delayedJumpNow", this.delayedJumpNow);

      this.bulletoxShow0 = false;
    },
    // 弹出框方法
    showPopup0() {
      this.bulletoxShow0 = true;
    },

    //弹出框取消按钮
    cancel1() {
      if ((this.learningNumNow = "自定义")) {
        this.learningNumNow = "20";
      }
      localStorage.setItem("setting_learningNumNow", this.learningNumNow);
      this.bulletoxShow1 = false;
    },
    //弹出框确定按钮
    determine1() {
      // this.delayedJumpNow = value; //当前的value值
      if ((this.learningNumNow = "")) {
        this.learningNumNow = "1";
      }
      this.learningNumNow = this.learningNumTemporary / 1;
      localStorage.setItem("setting_learningNumNow", this.learningNumNow);

      this.bulletoxShow1 = false;
    },
    // 弹出框方法
    showPopup1() {
      this.bulletoxShow1 = true;
    },
    //弹出框取消按钮
    cancel2() {
      if ((this.viewsNow = "自定义")) {
        this.viewsNow = "1";
      }
      localStorage.setItem("setting_viewsNow", this.viewsNow);
      this.bulletoxShow2 = false;
    },
    //弹出框确定按钮
    determine2() {
      // this.delayedJumpNow = value; //当前的value值
      if ((this.viewsNow = "" || this.viewsNow == "")) {
        this.viewsNow = "1";
      }
      this.viewsNow = this.viewsTemporary / 1;
      localStorage.setItem("setting_viewsNow", this.viewsNow);

      this.bulletoxShow2 = false;
    },
    // 弹出框方法
    showPopup2() {
      this.bulletoxShow2 = true;
    },
    //弹出框取消按钮
    cancel3() {
      // this.close();
      // this.$props.cancel();

      if ((this.playIntervalNow = "自定义")) {
        this.playIntervalNow = "1";
      }
      localStorage.setItem("setting_playIntervalNow", this.playIntervalNow);
      this.bulletoxShow3 = false;
    },
    //弹出框确定按钮
    determine3() {
      // this.delayedJumpNow = value; //当前的value值
      if ((this.playIntervalNow = "")) {
        this.playIntervalNow = "1";
      }
      this.playIntervalNow = this.playIntervalTemporary / 1;
      localStorage.setItem("setting_playIntervalNow", this.playIntervalNow);

      this.bulletoxShow3 = false;
    },
    // 弹出框方法
    showPopup3() {
      this.bulletoxShow3 = true;
    },
    //弹出框取消按钮
    cancel4() {
      // this.close();
      // this.$props.cancel();

      if ((this.residenceTimeNow = "自定义")) {
        this.residenceTimeNow = "1";
      }
      localStorage.setItem("setting_residenceTimeNow", this.residenceTimeNow);
      this.bulletoxShow4 = false;
    },
    //弹出框确定按钮
    determine4() {
      // this.delayedJumpNow = value; //当前的value值
      if ((this.residenceTimeNow = "")) {
        this.residenceTimeNow = "1";
      }
      this.residenceTimeNow = this.residenceTimeTemporary / 1;
      localStorage.setItem("setting_residenceTimeNow", this.residenceTimeNow);

      this.bulletoxShow4 = false;
    },
    // 弹出框方法
    showPopup4() {
      this.bulletoxShow4 = true;
    },

    functionSettings() {},

    //弹框方法：点击确定后的值 利用swath case 传过来的1-5 调取方法
    onConfirm4(value) {
      if (value == "自定义") {
        this.showPopup4();
      }

      this.residenceTimeNow = value.substring(0, value.length - 1); //去掉最后一个字符串

      localStorage.setItem("setting_residenceTimeNow", this.residenceTimeNow);
      this.showPicker4 = false; // 默认弹框状态关闭
    },
    onConfirm3(value) {
      if (value == "自定义") {
        this.showPopup3();
      }
      this.playIntervalNow = value.substring(0, value.length - 1); //去掉最后一个字符串
      localStorage.setItem("setting_playIntervalNow", this.playIntervalNow);
      this.showPicker3 = false; // 默认弹框状态关闭
    },
    onConfirm2(value) {
      if (value == "自定义") {
        this.showPopup2();
      }
      this.viewsNow = value.substring(0, value.length - 1); //去掉最后一个字符串
      localStorage.setItem("setting_viewsNow", this.viewsNow);

      this.showPicker2 = false; // 默认弹框状态关闭
    },
    onConfirm1(value) {
      if (value == "自定义") {
        this.showPopup1();
      }
      this.learningNumNow = value.substring(0, value.length - 1); //去掉最后一个字符串
      localStorage.setItem("setting_learningNumNow", this.learningNumNow);

      this.showPicker1 = false; // 默认弹框状态关闭
    },
    onConfirm0(value) {
      if (value == "自定义") {
        this.showPopup0();
      }
      this.delayedJumpNow = value.substring(0, value.length - 1); //去掉最后一个字符串
      localStorage.setItem("setting_delayedJumpNow", this.delayedJumpNow);

      this.showPicker0 = false; // 默认弹框状态关闭
    }
  }
};
</script>

<style scoped>
/* -------------------自定义弹出框--------------------------- */
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

/* 让弹出框中取消和确定分开 */
span.determine0 {
  margin-left: 38%;
}
/* -------------------弹出框--------------------------- */

/* 让弹出层van-popup正常显示 */
/deep/ .van-field__control {
  margin-left: 54%;
  text-align: center;
  margin-top: 3px;
}
/* 让点击的van-field不覆盖 */
/deep/ .van-cell {
  position: initial;
}

/* 向右 */
.arrowIcon {
  position: absolute;
  height: 20px;
  margin-left: 43%;
  margin-top: 3.5%;
}
/* 秒 */
.settingTextName {
  font-size: 0.4rem;
  position: absolute;
  /* top: 30%; */
  /* left: 85%; */
  margin-top: 3.5%;
  margin-left: 37%;
}

.settingPart {
  margin-top: 80px;
}
.settingList {
  height: 41px;
  width: 100%;
  position: relative;
  margin-bottom: 5%;
}
.settingLogo {
  height: 24px;
  width: 25px;
  position: absolute;
  top: 22%;
  left: 7%;
}
.settingText {
  font-size: 15px;
  position: absolute;
  top: 30%;
  left: 18%;
}

.switch {
  position: absolute;
  top: 17%;
  right: 5%;
}
.steper {
  position: absolute;
  top: 17%;
  right: 5%;
}
.vanFieldDiv {
  /* position:absolute; */
}
</style>