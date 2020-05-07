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
      :title="ruleTemplate.title"
      :leftText="ruleTemplate.leftText"
      :rightText="ruleTemplate.rightText"
      @listenTitlePerPageLeftClick="returnPage"
      @listenTitlePerPageRightClick="savePage"
    ></titlePerPage>
    <!-- 下拉刷新 -->
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
        <div v-for="(item,i) in ruleTemplateInfo" v-if="ruleTemplateInfo[i].isTrue == 0 && i < 3">
          <div class="managementName">
            <van-dropdown-menu active-color="#fecd2a">
              <van-dropdown-item
                :options="ruleTemplateInfo[i].dropDownOptionList"
                v-model="ruleTemplateInfo[i].dropdownCurrentValue"
              />
            </van-dropdown-menu>
          </div>
        </div>
        <!-- 输入任意文本 -->
        <div
          style="margin-top:30px"
          v-for="(item,i) in ruleTemplateInfo"
          v-if="ruleTemplateInfo[i].isTrue ==0 && i >= 3"
        >
          <!-- oninput="value=value.replace(/^[+-]?((\d*(\.\d{1,})$)|(\d{1,3}$))/g,'')" -->
          <!--oninput：正则-只能输入数字和小数点, placeholder:文本框为空提示, clearable：启用清除控件, maxlength：文本框最大长度     -->
          <van-field
            oninput="value=value.replace(/[^\d.]/g, '')"
            placeholder="请输入数据"
            clearable
            maxlength="11"
            type="text"
            @blur="checkField"
            :error-message="errMsg.emptyTip"
            style="border-radius: 5px"
            v-model="ruleTemplateInfo[i].textValue"
            :label="ruleTemplateInfo[i].textName"
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
</style>
<script>
import titlePerPage from "../../../components/publicAll/title_per_page"; // title组件
import { mapState } from "vuex"; // vuex全局变量
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { Dialog, Loading } from "vant"; // 引用dialog弹出框

export default {
  components: {
    titlePerPage
  },
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["notifyInfo", "pullRefresh"])
  },
  data() {
    return {
      //title 属性
      ruleTemplate: {
        title: "规则设置",
        leftText: "返回",
        rightText: "保存"
      },

      errMsg: {
        emptyTip: ""
      },

      // ruleTemplate页面所有信息
      ruleTemplateInfo: [
        {
          isTrue: 0, // 是否显示当前数据
          position: 0, // 当前位置
          dropdownCurrentValue: 0, // 下拉框显示当前值的value(务必数字类型)
          // 当前下拉框内容
          dropDownOptionList: [
            { text: "组件一", value: 0 },
            { text: "组件二", value: 1 },
            { text: "组件三", value: 2 }
          ],
          textName: "", // 文本框显示内容
          textValue: "" // 文本框显示value
        },
        {
          isTrue: 0,
          position: 1,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "大一", value: 0 },
            { text: "大二", value: 1 },
            { text: "大三", value: 2 },
            { text: "大四", value: 3 }
          ],
          textName: "",
          textValue: ""
        },
        {
          isTrue: 0,
          position: 2,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "",
          textValue: ""
        },
        {
          isTrue: 0,
          position: 3,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "规则名字",
          textValue: "组件一大一男规则"
        },
        {
          isTrue: 0,
          position: 3.1,
          input:"/[^\d.]/g, ''",
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "开始范围",
          textValue: "3200"
        },
        {
          isTrue: 0,
          position: 4,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "结束范围",
          textValue: "4000"
        },
        {
          isTrue: 0,
          position: 5,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "原始得分",
          textValue: "30"
        },
        {
          isTrue: 0,
          position: 6,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "权重",
          textValue: "30"
        },
        {
          isTrue: 0,
          position: 7,
          dropdownCurrentValue: 0,
          dropDownOptionList: [
            { text: "男", value: 0 },
            { text: "女", value: 1 }
          ],
          textName: "评级",
          textValue: "优秀"
        }
      ]
    };
  },

  mounted() {},
  methods: {
    start() {},
    //下拉刷新
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
        this.start(); // 进入页面加载内容
      }, 1000); //1000代表刷新时间
    },
    // 抬头左侧按钮跳转到组件管理：需要做判断，如果更改了则提示是否保存
    returnPage() {
      this.$router.push({ name: "ruleSetting" });
    },
    // 初始化（非后端数据）
    initialization() {},

    // 抬头右侧按钮保存页面数据
    savePage() {},
    checkField() {
      if (!errMsg.emptyTip) {
        this.errMsg.emptyTip = "请输入数据";
        return false;
      }
    }

    // 默认不需要更改
    // onConfirm() {
    //   this.$refs.item.toggle();
    // }
  }
};
</script>
