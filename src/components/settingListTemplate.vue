<!--
 * @描述: 抽象出来的设置界面的组件
 * @版本: 1.0
 * @作者: 王靖凡
 * @Date: 2019-11-19 09:05:46
 * @最后修改人: herry
 * @LastEditTime: 2019年12月1日23:26:18
 -->
<template>
  <div>
    <!-- // ------------------------------switch---------------------------------- -->
    <div v-show="switchModel">
      <div class="settingPartSwitch">
        <div class="settingListSwitch">
          <img class="settingLogoSwitch" :src="arrowIconSwitchT" />
          <span class="settingTextSwitch">{{allColumnsTitleT}}</span>
          <van-switch v-model="isTrueT" @change="checkedDisplay" size="24px" class="switchSwitch" />
        </div>
      </div>
    </div>
    <!-- // ------------------------------switch---------------------------------- -->
    <div v-show="selectModel">
      <!-- <div class="settingList"> -->
      <div class="settingList" @click="isShowPicker">
        <img class="settingLogo" :src="settingLogoT" />
        <span class="settingText">{{allColumnsTitleT}}</span>
        <span class="settingTextName">{{acceptSubValueT}}{{unitT}}</span>
        <img class="arrowIcon" :src="arrowIconT" />
      </div>
      <!-- </div> -->
      <!-- 底部弹出选择框 -->
      <div>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :value="value"
            :columns="settingTextName"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <!-- </div> -->

      <!-- 选择自定义的时候的弹出框 -->
      <van-popup v-model="popUpInput" class="content">
        <div class="title">{{userInputTitleT}}</div>
        <div class="txtstyleInputDiv">
          <input
            class="txtStyleInput"
            oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
            focus="1"
            maxlength="3"
            v-model="userInputText"
            placeholder="请输入信息"
          />
        </div>
        <div style="margin-top:22px;font-size: 17px;">
          <span class="cancel" @click="cancel">取消</span>
          <span class="determine" @click="determine">确定</span>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
// props的优先级 > data中的优先级 > menthods中的优先级
export default {

  //设置默认值样子 required: true表示必传字段，defaulat:3 表示有默认值3
  props: {
    index:"",
    settingLogo: { default: require("../../public/settings/时间.png") }, // 最左边显示图文图片
    allColumnsTitle: { default: "延迟跳转" }, // 显示图文内容
    settingTextName: {
      type: Array,
      default: () => ["1", "2", "3", "4", "5", "自定义"]
    }, // 选择器中要显示的数组
    unit: { default: "秒" }, // 显示的单位
    arrowIcon: { default: require("../../public/settings/右.png") }, // 最右边图片箭头
    userInputTitle: { default: "请输入自定义数量" }, //用户自定义输入框的标题
    acceptSubValue: { default: "1" }, // 当前显示默认值--从父组件的local取出的来
    select: { default: "select" }, // 选择进入的是哪个，默认是数据的，switch是开关
    // ------------------------------switch----------------------------------

    arrowIconSwitch: { default: require("../../public/settings/显示.png") }, // 最右边图片箭头
    // allColumnsTitle: { default: "显示单词" }, // 显示图文内容
    isTrue: { default: "false" } // 是否为true

    // ------------------------------switch----------------------------------
  },

  data() {
    return {
      // ----------------------接受传递过来的prop值的变量---------------------------
      settingLogoT: "", // 最左边显示图文图片
      allColumnsTitleT: "", // 显示图文内容
      settingTextNameT: [], // 选择器中要显示的数组
      unitT: "", // 显示的单位
      arrowIconT: "", // 最右边图片箭头
      userInputTitleT: "", //用户自定义输入框的标题
      acceptSubValueT: "", // 当前显示默认值--从父组件的local取出的来
      selectT: "", // 选择进入的是哪个，默认是数据的，switch是开关
      // ----------------------接受传递过来的prop值的变量---------------------------


      // ------------------本窗体用到的变量-------------------
      userInputText: "", // 自定义弹框用户输入的数字
      value: "", // 当前选择的值
      // 选择框属性
      settingTextNameNow: "", // 存放当前选择的数值，主运用于自定义
      showPicker: false, // 是否显示选择框，默认不弹
      // 弹框属性
      popUpInput: false, // 用于显示是否弹出自定义输入框
      childValue: "", // 向父组件传值
      switchModel: false, // 开关默认关闭
      selectModel: true, // 选择器默认开启
      // ------------------本窗体用到的变量-------------------


      // ------------------------------switch----------------------------------

      //接收父组件传递过来的值--开关
      arrowIconSwitchT: "", // 最左边图片
      allColumnsTitleT: "", // 显示的内容
      isTrueT: "" // 是否为true
      // ------------------------------switch----------------------------------
    };
  },
  mounted() {
    this.selectValue(); //判断父组件传递过来的是开关还是数据
  },
  methods: {
    /**
     * @description: 判断父组件传递过来的是开关还是数据
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    selectValue() {
      this.selectT = this.select; // 接收判断是开关还是选择器
      if (this.selectT == "select") {
        this.selectModel = true;
        this.switchModel = false;
        this.receiveList();
      } else if (this.selectT == "switch") {
        this.switchModel = true;
        this.selectModel = false;
        this.receiveSwitch();
      }
    },
    /**
     * @description: 接受从父组件传递过来的值--数据
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    receiveList() {
        (this.settingLogoT = this.settingLogo), // 最左边显示图文图片
        (this.allColumnsTitleT = this.allColumnsTitle), // 显示图文内容
        (this.settingTextNameT = this.settingTextName), // 选择器中要显示的数组
        (this.unitT = this.unit), // 显示的单位
        (this.arrowIconT = this.arrowIcon), // 最右边图片箭头
        (this.userInputTitleT = this.userInputTitle), //用户自定义输入框的标题
        (this.acceptSubValueT = this.acceptSubValue); // 当前默认值
    },
    // ------------------------------switch----------------------------------

    /**
     * @description: 接受从父组件传递过来的值--开关
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    receiveSwitch() {
      this.arrowIconSwitchT = this.arrowIconSwitch;
      this.allColumnsTitleT = this.allColumnsTitle;
      this.isTrueT = this.isTrue;
    },
    /**
     * @description: 当值发生变化时候将当前的true或者false传递给父组件
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    checkedDisplay() {
      this.childValue = this.isTrueT;
      this.$emit("listenToChildEvent", this.childValue);
    },
    // ------------------------------switch----------------------------------

    /**
     * @description: 显示底部选择框
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    isShowPicker() {
      this.showPicker = true;
    },

    /**
     * @description: 用户点击选择框的确定按钮
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    onConfirm(value) {
      this.settingTextNameNow = this.acceptSubValueT; // 将屏幕显示的值暂时存放起来，用于自定义

      if (value === "自定义") {
        this.popUpInput = true; // 打开输入数字弹出框
      } else {
        this.acceptSubValueT = value; // 选择后的值显示出来
        // this.acceptSubValueT = value; // 选择后的值显示出来

        //将当前选择后的值返回父窗体
        this.childValue = value;
        this.$emit("listenToChildEvent", this.childValue);
      }
      this.showPicker = false; // 关闭选择框
    },

    /**
     * @description: 用户点击自定义确认按钮
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    determine() {
      if (this.userInputText) {
        // this.acceptSubValueT = this.userInputText;
        this.acceptSubValueT = this.userInputText; // 输入后的值显示出来

        // 将当前输入后的值返回父窗体
        this.childValue = this.acceptSubValueT;
        this.$emit("listenToChildEvent", this.userInputText);
      }
      this.popUpInput = false;
    },

    /**
     * @description: 用户点击取消按钮
     * @param {type} 无
     * @return: 无
     * @author: 白爱民
     * @Date: 2019年12月1日23:31:09
     */
    cancel() {
      this.acceptSubValueT = this.settingTextNameNow; // 显示当前显示的值
      this.popUpInput = false; //关闭
    }
  }
};
</script>

<style scoped>
/* 向右 */
.arrowIcon {
  position: absolute;
  height: 20px;
  margin-left: 43%;
  margin-top: 3.5%;
  vertical-align: middle;
}
.settingList {
  /* background-color: pink; */
  height: 41px;
  width: 100%;
  position: relative;
  margin-bottom: 5%;
  /* background-color: pink; */
  display: inline-block;
  /* display:table-cell; */
  vertical-align: middle;
  text-align: center;
}
.settingLogo {
  vertical-align: middle;

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
/* 秒 */
.settingTextName {
  font-size: 0.4rem;
  position: absolute;
  top: 30%;
  left: 80%;
  /* margin-top: 3.5%; */
  /* margin-left: 32%; */
  text-align: center;
}
/* -------------------自定义弹出框--------------------------- */
.content {
  width: 8.5rem;
  height: 4.7rem;
  border-radius: 0.533333rem;
  /* position: relative; */
}
.title {
  font-size: 22px;
  margin-top: 0.58rem;
  /* font-family: "PingFang SC", Helvetica, "STHeiti STXihei", "Microsoft YaHei", Tohoma, Arial, sans-serif; */
  font-family: 宋体;
}
.txtstyle {
  width: 80%;
  margin-left: 10%;
  padding-left: 22%;
  border-bottom: 1px solid gray;
  margin-top: 10%;
}
.txtStyleInput {
  border: none;
  font-size: 16px;
  margin-left: -13px;
  margin-top: 0.453333rem;
  margin-bottom: 0.133333rem;
  text-align: center;
  font-family: 宋体;
}
.txtstyleInputDiv {
  width: 69%;
  margin-left: 15%;
  /* padding-left: 22%; */
  /* text-align: center; */
  border-bottom: 0.026667rem solid gray;
  margin-top: 5%;
}
.cancel {
  /* margin-left: -35%; */
  color: darkolivegreen;
  font-size: 20px;
  font-family: 宋体;
}

span.determine {
  margin-left: 38%;
  /* color: blue; */
  font-size: 20px;
  color: #1989fb;
  font-family: 宋体;
}

/* 让弹出框中取消和确定分开 */
span.determine0 {
  margin-left: 38%;
}

/* // ------------------------------switch---------------------------------- */

/* .settingPartSwitch {
  margin-top: 80px;
} */
.settingListSwitch {
  height: 41px;
  width: 100%;
  position: relative;
  margin-bottom: 5%;
}
.settingLogoSwitch {
  height: 24px;
  width: 25px;
  position: absolute;
  top: 22%;
  left: 7%;
}
.settingTextSwitch {
  font-size: 15px;
  position: absolute;
  top: 30%;
  left: 18%;
}
.switchSwitch {
  position: absolute;
  top: 17%;
  right: 5%;
}

/* // ------------------------------switch---------------------------------- */
</style>