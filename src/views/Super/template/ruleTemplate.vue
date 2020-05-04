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
    <titlePerPage
      :title="ruleTemplateTitle.title"
      :leftText="ruleTemplateTitle.leftText"
      :rightText="ruleTemplateTitle.rightText"
      @listenTitlePerPageLeftClick="returnPage()"
      @listenTitlePerPageRightClick="savePage()"
    ></titlePerPage>

    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh"
    >
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
        <div
          style="margin-top:30px"
          v-for="(item,i) in fieldValue"
          v-if="fieldValue[i].isTrue"
          @blur="notFocus()"
        >
          <van-field
            type="text"
            style="border-radius: 5px"
            v-model="fieldValue[i].textValue"
            :label="fieldText[i].textName"
          />
        </div>
      </div>
    </van-pull-refresh>
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
import { mapState } from "vuex"; //全局调取，可queryTemplateComponentName使用this
import {
  addTemplateRuleRecord,
  queryTemplateRuleRecord,
  queryTemplateComponent
} from "../../../api/Super/template/ruleTemplate"; //引入{初始化模板规则页面,初始化模板页面一条规则}接口的后端地址
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { Loading } from "vant";
import titlePerPage from "../../../components/publicAll/title_per_page"; // title组件
export default {
  computed: {
    ...mapState(["notifyInfo", "pullRefresh"])
  },
  components: {
    titlePerPage
  },
  data() {
    return {
      ruleTemplateTitle: {
        title: "规则设置",
        leftText: "返回",
        rightText: "保存"
      },
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
      // 组件下拉框所有值
      dropDownOptionComponent: [{ text: "", value: 0, id: "" }],
      // 组件下拉框当前值以及是否显示
      dropDownComponent: [{ isTrue: "", text: "", value: "" }],
      //存储点击具体规则显示当前componet值
      currentComponent: "",
      //页面文本框数量计数
      fieldNumer: "",
      resData: "",
      isModify: 0
    };
  },

  mounted() {
    // 初始化页面存缓存字段为1
    sessionStorage.setItem("ruleTemplate_leave", "1");

    this.loaderRuleTemplate();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
      }, 1000); //1000代表刷新时间
      this.loaderRuleTemplate(); //重新加载页面
    },
    //==========================================初始化加载当前页面================================================

    //初始化加载页面
    loaderRuleTemplate() {
      //0表示点击具体规则进入当前页面
      if (sessionStorage.getItem("ruleSetting_addOrEditToRule") == 0) {
        this.concreteRuleToThis();
        //1表示点击加号进入当前页面
      } else if (sessionStorage.getItem("ruleSetting_addOrEditToRule") == 1) {
        this.plusToThis();
      }
    },

    /**
     * @description: 点击具体规则加载当前页面
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月3日16:10:32
     */
    concreteRuleToThis() {
      let vm = this;
      // let arrayFieldData = []; //用于存放用户输入文本框的值
      vm.fieldValue = [];
      //此模板所有输入组件信息
      let component = JSON.parse(
        sessionStorage.getItem("ruleSetting_componentInfo")
      );

      vm.$axios
        .get(
          queryTemplateRuleRecord +
            "/{Id}?Id=" +
            sessionStorage.getItem("ruleSetting_ruleTemplateId")
        )
        .then(res => {
          if (res.data.code == responseCode.SUCCESSCODE) {
            let finData = res.data.data[0];

            switch (component.length) {
              case 1:
                vm.dropDownDisplay(2);
                vm.disPlayConcreteRule(finData, 1);
                break;
              case 2:
                vm.dropDownDisplay(2);
                vm.disPlayConcreteRule(finData, 2);
                break;
              default:
                vm.dropDownDisplay(3);
                vm.disPlayConcreteRule(finData, 3);
                break;
            }
          } else if (res.data.code == responseCode.NULLCODE) {
            vm.$Notify({
              message: this.notifyInfo[0].noData,
              background: this.notifyInfo[1].orange,
              duration: this.notifyInfo[2].duration
            });
          } else {
            vm.$Notify({
              message: this.notifyInfo[0].loadFailed,
              background: this.notifyInfo[1].orange,
              duration: this.notifyInfo[2].duration
            });
          }
        });
    },

    //点击具体规则渲染当前页面
    disPlayConcreteRule(finData, c) {
      let vm = this;
      let arrayFieldData = []; //用于存放用户输入文本框的值
      switch (c) {
        case 1:
          //================渲染年级性别 下拉框
          vm.dropDownModel.push(
            this.exchangeDropDown(finData.grade),
            finData.sex
          );
          //=================渲染输入框数据
          arrayFieldData.push(
            finData.startRange,
            finData.endRange,
            finData.originalScore,
            finData.weight,
            finData.level
          );
          for (let index = 0; index < arrayFieldData.length; index++) {
            vm.fieldValue.push({
              isTrue: "true",
              textValue: arrayFieldData[index]
            });
          }
          break;
        case 2:
          //================渲染年级性别 下拉框
          vm.dropDownModel.push(
            this.exchangeDropDown(finData.grade),
            finData.sex
          );
          //=================渲染输入框数据
          arrayFieldData.push(
            finData.startRange,
            finData.endRange,
            finData.weight,
            finData.level
          );
          for (let index = 0; index < arrayFieldData.length; index++) {
            vm.fieldValue.push({
              isTrue: "true",
              textValue: arrayFieldData[index]
            });
          }
          break;
        default:
          //================渲染组件下拉框，分为两种情况，显示(1)/不显示(0)组件下拉框
          let componentIsTrue = sessionStorage.getItem(
            "ruleSetting_componentIsTrue"
          );

          if (componentIsTrue == 0) {
            vm.dropDownDisplay(2);
          } else if (componentIsTrue == 1) {
            //页面显示下拉框
            vm.dropDownDisplay(3);
            //组件下拉框所有选项
            vm.dropDownComponentOption();
            //点击具体规则组件下拉框默认值显示
            vm.dropDownComponent[0].value = 0;
          }

          //================渲染年级性别 下拉框
          vm.dropDownModel.push(
            this.exchangeDropDown(finData.grade),
            finData.sex
          );
          //=================渲染输入框数据
          arrayFieldData.push(
            finData.startRange,
            finData.endRange,
            finData.originalScore,
            finData.weight,
            finData.level
          );
          for (let index = 0; index < arrayFieldData.length; index++) {
            vm.fieldValue.push({
              isTrue: "true",
              textValue: arrayFieldData[index]
            });
          }
          break;
      }
    },

    /**
     * @description: 点击加号加载页面
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月3日16:11:36
     */
    plusToThis() {
      let vm = this;

      //年级、性别下拉框赋默认值
      vm.dropDownModel.push(0, 0);

      //此模板所有输入组件信息
      let component = JSON.parse(
        sessionStorage.getItem("ruleSetting_componentInfo")
      );

      switch (component.length) {
        case 1:
          //case 1 : 1个组件 : 2个下拉框+5个输入框
          vm.dropDownDisplay(2);
          vm.fieldTextDisplay(5);
          break;
        case 2:
          //case2 ：2个组件 : 2个下拉框+4个输入框
          vm.dropDownDisplay(2);
          vm.fieldTextDisplay(4);
          break;
        default:
          //case3 ：3个组件 : 3个下拉框+5个输入框
          vm.dropDownDisplay(3);
          vm.dropDownComponent[0].value = 0;
          vm.dropDownComponentOption();
          vm.fieldTextDisplay(5);
          break;
      }
    },

    // =============================================渲染加载当前页面调用的方法===========================================

    /**
     * @description: 组件下拉框所有选项
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月3日16:11:36
     */
    dropDownComponentOption() {
      let vm = this;
      vm.$axios
        .get(
          queryTemplateComponent +
            "/{templateId}?templateId=" +
            sessionStorage.getItem("management_templateId")
        )
        .then(res => {
          switch (res.data.code) {
            case responseCode.SUCCESSCODE:
              //所有组件下拉框选项
              vm.dropDownOptionComponent = [];
              for (let index = 0; index < res.data.data.length; index++) {
                vm.dropDownOptionComponent.push({
                  text: res.data.data[index].title,
                  value: index,
                  id: res.data.data[index].id
                });
              }
              break;
          }
        });
    },

    /**
     * @description: 当前页面显示下拉框情况
     * @param ：{num：显示下拉框数量}
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月4日10:30:59
     */
    dropDownDisplay(num) {
      let vm = this;
      switch (num) {
        case 2:
          vm.dropDownComponent.isTrue = "false";
          break;
        default:
          vm.dropDownComponent[0].isTrue = "true";
          break;
      }
    },

    /**
     * @description: 当前页面显示文本框情况
     * @param ：{num：显示文本框数量}
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月4日10:31:03
     */
    fieldTextDisplay(num) {
      let vm = this;
      let i = 0;
      switch (num) {
        case 4:
          //显示4个文本框
          for (let index = 0; index < 5; index++) {
            if (index == 2) {
            } else {
              vm.fieldValue[index].isTrue = "true";
              i++;
            }
          }
          vm.fieldNumer = i;
          break;
        default:
          //显示所有文本框
          for (let index = 0; index < 5; index++) {
            vm.fieldValue[index].isTrue = "true";
            i++;
          }
          vm.fieldNumer = i;
          break;
      }
    },

    /**
     * @description: 将年级转换为数字标识
     * @param ：{grade：年级}
     * @return: {数字：年级标识}
     * @author: 付媛媛
     * @Date:2020年5月4日10:31:23
     */
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
    /**
     * @description: 将年级数字标识转换为年级
     * @param ：{num：年级标识}
     * @return: {字符串：年级}
     * @author: 付媛媛
     * @Date:2020年5月4日10:32:45
     */
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

    /**
     * @description: 判断文本框是否为空 与 限制文本框长度
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月4日10:33:47
     */
    isEmpty() {
      let vm = this;
      let empty = false;

      //当前模板组件信息
      let component = JSON.parse(
        sessionStorage.getItem("ruleSetting_componentInfo")
      );
      //vm.fieldNumer ：表示当前页面文本框的数量
      for (let index = 0; index < component.length; index++) {
        if (
          vm.fieldValue[index].textValue == undefined ||
          vm.fieldValue[index].textValue == ""
        ) {
          vm.$Notify({
            message: this.notifyInfo[0].boxEmpty,
            background: this.notifyInfo[1].orange,
            duration: this.notifyInfo[2].duration
          });
          return false;
        } else {
          if (vm.fieldValue[index].textValue.length > 11) {
            vm.$Notify({
              message: this.notifyInfo[0].boxInputLong,
              background: this.notifyInfo[1].orange,
              duration: this.notifyInfo[2].duration
            });
            return false;
          }
        }
      }
      return true;
    },
    /**
     * @description: 判断输入文本框是否为数字
     * @param ：无
     * @return: {boolean：文本框是否输入的数字}
     * @author: 付媛媛
     * @Date:2020年5月4日10:34:38
     */
    isNumber() {
      let vm = this;
      //当前模板组件信息
      let component = JSON.parse(
        sessionStorage.getItem("ruleSetting_componentInfo")
      );
      var numReg = /^[+-]?((\d*(\.\d{1,2})$)|(\d+$))/;
      var numRe = new RegExp(numReg);
      for (let index = 0; index < component.length - 1; index++) {
        if (!numRe.test(vm.fieldValue[index].textValue)) {
          vm.$Notify({
            message: this.notifyInfo[0].inputNumber,
            background: this.notifyInfo[1].orange,
            duration: this.notifyInfo[2].duration
          });
          return false;
        }
      }
      return true;
    },
    //=================================================页面路由跳转===================================================

    /**
     * @description: 抬头左侧跳转到组件管理
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月4日10:33:30
     */
    returnPage() {
      this.$router.push({ name: "ruleSetting" });
    },
    //=================================================判断当前页面数据是否修改===================================================
    notFocus() {
      vm.isModify = 1;
    },

    //=================================================保存当前页面===================================================

    /**
     * @description: 抬头右侧按钮保存页面数据
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date:2020年5月4日10:34:53
     */
    savePage() {
      let vm = this;

      let templateId = sessionStorage.getItem("management_templateId");
      let templateConId = sessionStorage.getItem(
        "ruleSetting_templateContentId"
      );
      //此模板所有输入组件信息
      let component = JSON.parse(
        sessionStorage.getItem("ruleSetting_componentInfo")
      );
      let ruleTemplateId;

      switch (sessionStorage.getItem("ruleSetting_addOrEditToRule")) {
        case "0":
          //0表示点击具体规则进入当前页面
          ruleTemplateId = sessionStorage.getItem("ruleSetting_ruleTemplateId");
          break;
        case "1":
          // 1表示点击加号进入当前页面
          ruleTemplateId = vm.resData;
          break;
      }
      let model = {
        endRange: this.fieldValue[1].textValue,
        grade: this.exchangeDropDownToNum(this.dropDownModel[0]),
        id: ruleTemplateId,
        isDelete: 0,
        level: this.fieldValue[4].textValue,
        operator: "admin",
        originalScore:
          component.length == 2 ? "" : this.fieldValue[2].textValue,
        sex: this.dropDownModel[1],
        startRange: this.fieldValue[0].textValue,
        templateContentId:
          this.dropDownComponent[0].isTrue == "true" ? templateConId : "",
        templateId: templateId,
        weight: this.fieldValue[3].textValue
      };

      //点击保存判断输入库内容是否符合规则
      if (vm.isEmpty() && vm.isNumber()) {
        //调用添加模板规则 接口
        vm.$axios.post(addTemplateRuleRecord, model).then(res => {
          switch (res.data.code) {
            case responseCode.SUCCESSCODE:
              vm.$Notify({
                message: this.notifyInfo[0].saveSucceed,
                background: this.notifyInfo[1].blue,
                duration: this.notifyInfo[2].duration
              });
              vm.resData = res.data.data;
              sessionStorage.setItem("ruleTemplate_leave", "0");
              break;
            default:
              vm.$Notify({
                message: this.notifyInfo[0].saveFailed,
                background: this.notifyInfo[1].orange,
                duration: this.notifyInfo[2].duration
              });
              break;
          }
        });
      }
    },

    // 默认不需要更改
    onConfirm() {
      this.$refs.item.toggle();
    }
  }
};
</script>
