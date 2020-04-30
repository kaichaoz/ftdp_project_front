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
      <!-- <div class="iocName" @click="savePage()">保存</div> -->
      <div class="iocName" @click="savePage()">保存</div>
      <div class="button" @click="returnPage()">返回</div>
      <div class="titleName">规则设置</div>
    </div>

    <!-- 内容 -->
    <div class="ruleTemplateBody">
      <!-- 组件下拉框 -->
      <div>
        <div class="managementName" v-if="dropDownComponent[0].isTrue">
          <van-dropdown-menu active-color="#fecd2a">
            <van-dropdown-item
              v-model="dropDownComponent[0].value"
              :options="dropDownOptionComponent"
            />
          </van-dropdown-menu>
        </div>
      </div>

      <!-- 年级和性别下拉框 -->
      <div v-for="(item,i) in dropDownOptionList">
        <div class="managementName">
          <van-dropdown-menu active-color="#fecd2a">
            <van-dropdown-item v-model="dropDownModel[i]" :options="dropDownOptionList[i]" />
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
import {
  addTemplateRuleRecord,
  queryTemplateRuleRecord
} from "../../../api/Super/template/ruleTemplate"; //引入{初始化模板规则页面,初始化模板页面一条规则}接口的后端地址
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { Loading } from "vant";
export default {
  data() {
    return {
      // 年级、性别下拉框当前值
      dropDownModel: [],

      // 年级、性别下拉框渲染数据：里面的数据是从数据库来的，所以value需要动态赋值出来
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
      fieldText: [
        { textName: "开始范围" },
        { textName: "结束范围" },
        { textName: "原始得分" },
        { textName: "权重" },
        { textName: "评级" }
      ],

      //输入框渲染数据
      fieldValue: [
        { isTrue: "", textValue: "" },
        { isTrue: "", textValue: "" },
        { isTrue: "", textValue: "" }, // 变为false，则不显示原始得分
        { isTrue: "", textValue: "" },
        { isTrue: "", textValue: "" }
      ],

      //存放组件Id
      templateContentId: "",

      // 组件下拉框的值
      dropDownOptionComponent: [{ text: "", value: 0 }],

      // 组件下拉框当前值以及是否显示
      dropDownComponent: [{ isTrue: "", text: "", value: "" }],

      //存储点击具体规则显示当前componet值
      currentComponent: "",

      //页面文本框数量计数
      fieldNumer: ""
    };
  },

  mounted() {
    // 初始化页面存缓存字段为1
    sessionStorage.setItem("ruleTemplate_leave", "1");

    this.loaderRuleTemplate();
  },
  methods: {
    //点击具体规则加载当前页面
    concreteRuleToThis() {
      let vm = this;
      let arrayFieldData = []; //用于存放用户输入文本框的值
      vm.fieldValue = [];

      vm.$axios
        .get(
          queryTemplateRuleRecord +
            "/{Id}?Id=" +
            this.$route.params.ruleTemplateId
        )
        .then(res => {
          if (res.data.code == responseCode.SUCCESSCODE) {
            let finData = res.data.data[0]; //后端返回数据

            //获取当前具体规则的 templateContentId，在保存新规则时使用
            // sessionStorage.setItem(
            //   "ruleTemplate_templateContentId",
            //   finData.templateContentId
            // );

            //显示文本框数据
            arrayFieldData.push(
              finData.startRange,
              finData.endRange,
              finData.originalScore,
              finData.weight,
              finData.level
            );
            //渲染输入框数据
            for (let index = 0; index < arrayFieldData.length; index++) {
              vm.fieldValue.push({
                isTrue: "true",
                textValue: arrayFieldData[index]
              });
            }

            //渲染年级性别 下拉框
            vm.dropDownModel.push(
              this.exchangeDropDown(finData.grade),
              finData.sex
            );

            //获取组件下拉框所有选项
            vm.dropDownOptionComponent = [];
            for (
              let index = 0;
              index < vm.$route.params.componentInfo.length;
              index++
            ) {
              vm.dropDownOptionComponent.push({
                text: vm.$route.params.componentInfo[index].title,
                value: index
              });

              //判断组件下拉框中选项与当前组件默认值相等，返回下拉框中值的索引
              if (vm.dropDownOptionComponent[index].text == finData.title) {
                vm.currentComponent = vm.dropDownOptionComponent[index].value;
              }
            }

            //渲染组件下拉框默认值
            vm.dropDownComponent = [];
            vm.dropDownComponent.push({
              isTrue: "true",
              text: finData.title,
              value: vm.currentComponent
            });
          } else {
            vm.$toast({
              message: "加载失败",
              duration: 1000
            });
          }
        });
    },

    //显示下拉框
    dropDownDisplay(num) {
      let vm = this;
      if (num == 2) {
        vm.dropDownComponent.isTrue = "false";
      } else {
        vm.dropDownComponent.isTrue = "true";
      }
    },

    //显示文本框
    fieldTextDisplay(num) {
      let vm = this;
      let i = 0;
      if (num == 4) {
        //显示4个文本框
        for (let index = 0; index < 5; index++) {
          if (index == 2) {
          } else {
            vm.fieldValue[index].isTrue = "true";
            i++;
          }
        }
        vm.fieldNumer = i;
      } else {
        //显示所有文本框
        for (let index = 0; index < 5; index++) {
          vm.fieldValue[index].isTrue = "true";
          i++;
        }
        vm.fieldNumer = i;
      }
    },

    //当组件数为2时，计算值
    calcuValue() {
      let vm = this;
      //第一个输入框：开始范围的值
      let inputStart = vm.fieldValue[0].textValue;
      //第二个输入框：结束范围的值
      let inputEnd = vm.fieldValue[1].textValue;
      let value = inputEnd/(inputStart/100*inputStart/100);
      return value;
    },

    //点击加号加载页面
    plusToThis() {
      let vm = this;
      //年级、性别下拉框赋默认值
      vm.dropDownModel.push(0, 0);
      //case 1 :  2个下拉框+5个输入框
      if (vm.$route.params.componentInfo.length == 1) {
        vm.dropDownDisplay(2);
        vm.fieldTextDisplay(5);
      } else if (vm.$route.params.componentInfo.length == 2) {
        //case2 ： 2个下拉框+4个输入框
        vm.dropDownDisplay(2);
        vm.fieldTextDisplay(4);
      } else {
        //case3 ： 3个下拉框+5个输入框
        vm.dropDownDisplay(3);
        vm.fieldTextDisplay(5);
      }
    },
    //初始化加载页面
    loaderRuleTemplate() {
      if (this.$route.params.ruleSetting == "0") {
        //0表示点击具体规则进入当前页面
        this.concreteRuleToThis();
      } else if (this.$route.params.ruleSetting == "1") {
        //1表示点击加号进入当前页面
        this.plusToThis();
      }
    },

    //将年级转换为数字标识
    exchangeDropDown(grade) {
      switch (grade) {
        case "大一":
          return 0;
          break;
        case "大二":
          return 1;
          break;
        case "大三":
          return 2;
          break;
        case "大四":
          return 3;
          break;
      }
    },

    exchangeDropDownToNum(num) {
      switch (num) {
        case 0:
          return "大一";
          break;
        case 1:
          return "大二";
          break;
        case 2:
          return "大三";
          break;
        case 3:
          return "大四";
          break;
      }
    },

    /**
     * @description: 将后端性别标识转换为文字
     * @param ：{num:后端sex标识}
     * @return: {string:sex文字}
     * @author: 付媛媛
     * @Date:2020年4月26日21:03:03
     */
    exchangeSex(num) {
      return num == 0 ? "男" : "女";
    },

    // 抬头左侧按钮跳转到组件管理：需要做判断，如果更改了则提示是否保存
    returnPage() {
      this.$router.push({ name: "ruleSetting" });
    },

    //判断文本框是否为空 与 限制文本框长度
    isEmpty() {
      let vm = this;
      let empty = false;
      //vm.fieldNumer ：表示当前页面文本框的数量
      for (let index = 0; index < vm.fieldNumer; index++) {
        if (
          vm.fieldValue[index].textValue == undefined ||
          vm.fieldValue[index].textValue == ""
        ) {
          vm.$toast({
            message: "文本框不能为空，请输入数据",
            duration: 1000
          });
          return false;
        } else {
          if (vm.fieldValue[index].textValue.length > 11) {
            vm.$toast({
              message: "文本框输入长度过长",
              duration: 1000
            });
            return false;
          }
        }
      }
      return true;
    },
    //判断文本框是否为数字
    isNumber() {
      let vm = this;
      var numReg = /^[+-]?((\d*(\.\d{1,2})$)|(\d+$))/;
      var numRe = new RegExp(numReg);
      for (let index = 0; index < vm.fieldNumer - 1; index++) {
        if (!numRe.test(vm.fieldValue[index].textValue)) {
          vm.$toast({
            message: "请输入数字，并保证小数位数不超过2位！",
            duration: 1000
          });
          return false;
        }
      }
      return true;
    },

    // 抬头右侧按钮保存页面数据
    savePage() {
      let vm = this;
      let comInfo = vm.$route.params.componentInfo;
      // console.log(comInfo);

      vm.calcuValue();

      //点击加号进入的当前页面，需要添加一条数据
      if (this.$route.params.ruleSetting == "1") {
        if (vm.isEmpty() && vm.isNumber()) {
          //获取缓存中templateId
          let templateId = sessionStorage.getItem("management_templateId");

          //获取组件id
          if (vm.dropDownComponent[0].isTrue == false) {
            //组件框不显示时，获取templateContentId
            // console.log("1213");
            // console.log("1111");
          } else {
            //组件框显示时，获取templateContentId
            console.log("222");
          }
          const model = {
            creater: "admin",
            endRange: this.fieldValue[1].textValue,
            grade: this.exchangeDropDownToNum(vm.dropDownModel[0]),
            id: "",
            level: this.fieldValue[4].textValue,
            modifier: "",
            originalScore: this.fieldValue[2].textValue,
            sex: this.dropDownModel[1],
            startRange: this.fieldValue[0].textValue,
            // templateContentId: ,
            templateId: templateId,
            weight: this.fieldValue[3].textValue
          };
          //调用添加模板规则 接口
          vm.$axios.post(addTemplateRuleRecord, model).then(res => {
            if (res.data.code == responseCode.SUCCESSCODE) {
              vm.$toast({
                message: "保存成功",
                duration: 1000
              });

              //保存成功后输入框置为空
              for (let index = 0; index < vm.fieldNumer; index++) {
                vm.fieldValue[index].textValue = "";
              }

              sessionStorage.setItem("ruleTemplate_leave", "0");
            } else {
              vm.$toast({
                message: "保存失败",
                duration: 1000
              });
            }
          });
        }

        //点击具体规则进入的当前页面，需要修改数据
      } else if (this.$route.params.ruleSetting == "0") {
        //判断是否修改数据，否 进行提醒，是 更新数据
      }
    },

    // 默认不需要更改
    onConfirm() {
      this.$refs.item.toggle();
    }
  }
};
</script>
