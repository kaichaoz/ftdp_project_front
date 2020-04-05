<!--
*@描述：规则配置
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月28日08:22:14
*@最后修改人:白爱民
*@LastEditTime:2020年3月28日08:22:14
*@说明：-->
<template>
  <div>
    <!-- 抬头 -->
    <div class="title commonColor">
      <!-- <img @click="intoSetting()" class="iocName" :src="plus" alt /> -->
      <div class="iocName" @click="savePage()">保存</div>
      <div class="button" @click="returnPage()">返回</div>
      <div class="titleName">规则设置</div>
    </div>

    <!-- 内容 -->
    <div class="ruleTemplateBody">
      <!-- 下拉框 -->
      <div>
        <div class="managementName">
          <van-dropdown-menu active-color="#fecd2a">
            <van-dropdown-item v-model="dropDownComponent" :options="dropDownOptionComponent" />
          </van-dropdown-menu>
        </div>
      </div>

      <!-- 下拉框 -->
      <div v-for="(item,i) in dropDownOptionList">
        <div class="managementName">
          <van-dropdown-menu active-color="#fecd2a">
            <van-dropdown-item v-model="dropdownModel[i]" :options="dropDownOptionList[i]" />
          </van-dropdown-menu>
        </div>
      </div>

      <!-- 输入任意文本 -->
      <div style="margin-top:30px" v-for="(item,i) in fieldValue" v-if="fieldValue[i].isTrue">
        <van-field
          type="text"
          style="border-radius: 5px"
          v-model="fieldValue[i].textValue"
          :label="fieldText[i].textName"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 内容部分： */

/* 下拉框 */
.ruleTemplateBody .managementName {
  border: 1px solid #e0e9ea;
  overflow: hidden;
  margin-top: 40px;
  border-radius: 5px;
  margin: 20px 10px;
}

/* 下拉框文本距离和大小 */
>>> .van-ellipsis {
  margin-left: 20px;
  font-size: 18px;
}

/* 下拉框文字大小： */
.van-dropdown-menu__title {
  font-size: 18px;
}
/* 下拉框名字居左 */
>>> .van-dropdown-menu__item {
  justify-content: left;
}

/* 下拉框内容对齐下拉框名字 */
>>> .van-dropdown-item {
  margin: 2px 12px 2px;
}

/* 下拉框图片位置： */
>>> .van-dropdown-menu__title::after {
  /* top: 15%;
  right: -236px;
  width: 7px;
  height: 7px; */
}

/* 文本输入框两边隔12px */
>>> .van-cell {
  width: auto;
  min-width: 0;
  margin: 12px;
  font-size: 18px;
}

/* 文本内容居左 */
>>> .van-field__label {
  margin-right: 4px;
  margin-left: -8px;
}

/* 文本输入内容居中 */
>>> .van-field__control {
  text-align: center;
}

/* 抬头部分： */
.commonColor {
  background: #fecd2a;
}
.title .iocName {
  float: right;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
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
</style>
<script>
export default {
  data() {
    return {
      // 组件下拉框当前值，默认显示第一个
      dropDownComponent: 0,

      // 本页面：下拉框显示绑定的三个值
      dropdownModel: [0, 0],

      // 下拉框渲染数据：里面的数据是从数据库来的，所以value需要动态赋值出来
      dropDownOptionList: [
        [
          { text: "大一", value: 0 },
          { text: "大二", value: 1 },
          { text: "大三", value: 2 },
          { text: "大四", value: 3 }
        ],
        [
          { text: "男", value: 0 },
          { text: "女", value: 1 }
        ]
      ],

      //输入框渲染数据
      fieldValue: [
        { isTrue: true, textValue: "3200" },
        { isTrue: true, textValue: "4000" },
        { isTrue: true, textValue: "30" },
        { isTrue: true, textValue: "30" },
        { isTrue: true, textValue: "优秀" }
      ],

      // 需要传入或更改：--------------

      //输入框渲染数据
      fieldText: [
        { textName: "开始范围" },
        { textName: "结束范围" },
        { textName: "原始得分" },
        { textName: "权重" },
        { textName: "评级" }
      ],

      // 组件下拉框
      dropDownOptionComponent: [
        { text: "组件一", value: 0 },
        { text: "组件二", value: 1 },
        { text: "组件三", value: 2 }
      ]

      //下拉框是否显示
      // dropDownIsTrue: [],
      //输入框是否显示
      // fieldIsTrue: [],
    };
  },

  mounted() {
    // this.dropDownIsTrue = [];
    // this.dropDownOptionList = [];
    // this.fieldIsTrue = [];
    // this.fieldTextList = [];
    // this.dropDownIsTrue = this.$route.params.dropDownIsTrue;
    // this.dropDownOptionList = this.$route.params.dropDownOptionList;
    // this.fieldIsTrue = this.$route.params.fieldIsTrue;
    // this.fieldTextList = this.$route.params.fieldTextList;
  },
  methods: {
    // 抬头左侧按钮跳转到组件管理
    returnPage() {
      this.$router.push({ name: "ruleSetting" });
    },

    // 抬头右侧按钮保存页面数据
    savePage() {},
    onConfirm() {
      this.$refs.item.toggle();
    }
  }
};
</script>
