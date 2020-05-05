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
    <titlePerPage
      :title="createNameTitle.title"
      :leftText="createNameTitle.leftText"
      :rightText="createNameTitle.rightText"
      @listenTitlePerPageLeftClick="returnPage"
      @listenTitlePerPageRightClick="nextStep"
    ></titlePerPage>
    <!-- <div class="title commonColor">
      <div class="buttonLeft" @click="returnPage()">返回</div>
      <div class="buttonRight" @click="nextStep()">下一步</div>
      <div class="titleName">编辑模板</div>
    </div>-->
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      :pulling-text="pullRefresh.pulling"
      :loosing-text="pullRefresh.lossing"
      :loading-text="pullRefresh.loading"
      :success-text="pullRefresh.success"
      @refresh="onRefresh"
    >
      <!-- 
       下拉刷新
       pulling：下拉显示内容，loosing：释放显示内容，loading:加载显示内容，success:刷新成功显示内容
       @refresh：事件
      -->

      <div class="body">
        <!-- 输入框： -->
        <div class="managementName">
          <van-cell-group>
            <van-field v-model="createNameDataList.managementNamevalue" placeholder="请输入模板名称" />
          </van-cell-group>
        </div>
        <!-- 下拉框：分组： :title="createNameDataList.title" @change="changeDevelop"-->
        <div class="managementName">
          <van-dropdown-menu active-color="#fecd2a">
            <van-dropdown-item
              v-model="createNameDataList.groupValue"
              :options="createNameDataList.groupOption"
            />
          </van-dropdown-menu>
        </div>
        <!-- 下拉框：使用者默认自己 -->
        <div class="managementName">
          <van-dropdown-menu active-color="#fecd2a">
            <van-dropdown-item
              v-model="createNameDataList.personValue"
              :options="createNameDataList.personOption"
            />
          </van-dropdown-menu>
        </div>
        <!-- 备注： -->
        <div class="remark">
          <div class="remarkLabel">表单备注:</div>
          <div
            id="editer"
            contenteditable="canEdit"
            class="remarkTxt"
            v-text="createNameDataList.remarkTxt"
          ></div>
        </div>
      </div>
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

import { insertTemplate } from "../../../api/Super/template/createName"; //引入编辑模板接口的后端地址
import { mapState } from "vuex"; // 引入vuex用于将全局变量映射为页面变量，可使用this.

import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import titlePerPage from "../../../components/publicAll/title_per_page"; // 引入title组件

export default {
  computed: {
    ...mapState(["management_groupName_List"]),
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["notifyInfo", "pullRefresh"])
  },
  components: {
    // 组件
    titlePerPage
  },
  data() {
    return {
      createNameTitle: {
        title: "编辑模板",
        leftText: "返回",
        rightText: "下一步"
      },
      // 当前页面所有数据
      createNameDataList: {
        templateId: "", //模板ID
        templateGroupId: "", // 分组ID
        managementNamevalue: "", // 模板名称输入框输入内容
        groupValue: "", // 分组选择后的分组value
        personValue: 0, //人员选择后的value
        // 所属分组
        groupOption: [
          { text: "", value: "", groupId: "" }, // text存储名字（公共项目），value存储下标（0,1,2）显示的时候使用value
          { text: "", value: "", groupId: "" },
          { text: "", value: "", groupId: "" }
        ],
        personOption: [{ text: "自己", value: 0 }], // 人员下拉框
        remarkTxt: "" //备注输入内容
      },
      isModify: 0
    };
  },

  created() {
    // this.start();
  },
  mounted() {
    // 上一级页面跳转进来传参
    this.jumpToPageLoading();
  },

  updated() {
    // 存储到vuex
    this.$store.commit("setCreateNameDataList", this.createNameDataList);
  },

  beforeDestroy() {
    //退出页面保存当前页面数据
    this.recallBackendPost();
  },

  methods: {
    /**
     * @description: 退出页面保存当前页面数据
     * @param ：无
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月27日09:38:22
     */
    recallBackendPost() {
      // ------------------把数据存储到数据库 -----------------------
      //存储分组ID
      const groupIdNow = this.substitution(this.createNameDataList.groupValue);
      const vm = this;
      const model = {
        groupSequence: "string", //分组位置
        isFinish: 0, //是否完成编辑（0完成，1未完成）
        isUsable: 0, //是否可用（0可用，1不可用）
        staffID: "", //人员
        id: this.createNameDataList.templateId, //模板id
        postscript: this.createNameDataList.remarkTxt, //备注
        templateGroupID: groupIdNow, //模板分组id
        templateName: this.createNameDataList.managementNamevalue //模板名称
      };
      vm.$axios.post(insertTemplate, model).then(res => {
        if (res.data.code == this.$responseCode.SUCCESSCODE) {
          sessionStorage.setItem("management_templateId", res.data.data);
        } else {
          this.$Notify({
            message: this.notifyInfo[0].sorry, // 提示：抱歉,,,
            background: this.notifyInfo[1].orange, // 橘色:#FF976A
            duration: this.notifyInfo[2].duration //定义时长,1s
          });
          // console.log("cuowu");
        }
      });

      // ------------------把数据存储到缓存 -----------------------
      // 各个参数前添加management的目的，清楚这个参数是从那个界面接收的，方便查询
      // 模板名称
      sessionStorage.setItem(
        "management_templateName",
        this.createNameDataList.managementNamevalue
      );

      // 当前分组i
      sessionStorage.setItem(
        "management_groupNameIndex",
        this.createNameDataList.groupValue
      );
      // 存储groupID
      sessionStorage.setItem("management_templateGroupId", groupIdNow);
      //备注
      sessionStorage.setItem(
        "management_postScript",
        this.createNameDataList.remarkTxt
      );
    },

    start() {},

    /**
     * @description: 根据value值返回groupID
     * @param ：{name:value值}
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月24日19:31:53
     */
    substitution(name) {
      const num = this.createNameDataList.groupOption;
      for (let index = 0; index < num.length; index++) {
        if (name == num[index].value) {
          return num[index].groupId;
        }
      }
      return -1;
    },

    /**
     * @description: 上一级页面跳转进来传参
     * @param ：{index:具体分组的索引}
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月24日19:31:53
     */
    jumpToPageLoading() {
      // ------------------获取上一页面数据 -----------------------
      // 获取ID
      this.createNameDataList.templateId = sessionStorage.getItem(
        "management_templateId"
      );
      // 接收模板名称
      this.createNameDataList.managementNamevalue = sessionStorage.getItem(
        "management_templateName"
      );
      // 接收当前分组i
      this.createNameDataList.groupValue = parseInt(
        sessionStorage.getItem("management_groupNameIndex")
      );
      // 接收页面从上到下的所有分组名字数组
      let groupNameListRoute = sessionStorage.getItem(
        "management_groupNameList"
      );
      // 字符串转数组：缓存存储字符串
      groupNameListRoute = groupNameListRoute.split(",");

      // 接收页面分组ID数组
      let groupIdList = sessionStorage.getItem("management_groupIdList");
      groupIdList = groupIdList.split(",");

      // 接收模板备注
      this.createNameDataList.remarkTxt = sessionStorage.getItem(
        "management_postScript"
      );

      // 接收management进入：0表示从加号，1表示从编辑--因为不调取后端当前无用
      const managementRoute = sessionStorage.getItem("management_route");

      // --------------------从缓存获取数据存储-----------------------
      // 将下拉框内容清空并存储
      this.createNameDataList.groupOption = [];
      for (let index = 0; index < groupNameListRoute.length; index++) {
        this.createNameDataList.groupOption.push({
          text: groupNameListRoute[index], // text存储名字（公共项目），
          value: index, // value存储下标（0,1,2）
          groupId: groupIdList[index] // 分组ID
        });
      }
    },

    /**
     * @description: 下一步，编辑模板拖拽页面
     * @param ：无
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年5月5日14:51:58
     */
    nextStep() {
      let vm = this;
      if (
        vm.createNameDataList.managementNamevalue == undefined ||
        vm.createNameDataList.managementNamevalue == ""
      ) {
        vm.$Notify({
          message: this.notifyInfo[0].boxEmpty,
          background: this.notifyInfo[1].orange,
          duration: this.notifyInfo[2].duration
        });
      } else {
        this.$router.push({ name: "makeForm" });
      }
    },

    /**
     * @description: 返回，模板管理页面
     * @param ：无
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月25日14:51:58
     */
    returnPage() {
      this.$router.push({ name: "management" });
    },

    /**
     * @description: 光标离开备注输入框执行存储
     * @param ：无
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月25日14:51:58
     */
    changeText() {
      this.createNameDataList.remarkTxt = this.storageTxtNode();
    },

    /**
     * @description: 将输入内容存储，需要转html格式，有些字符无法存数据库
     * @param ：无
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年4月25日14:51:58
     */
    storageTxtNode() {
      var temp = document.getElementById("editer").innerText; // 获取文本框内容
      temp = escape.htmlEncode(temp); // 将特殊字符转格式
      return temp;
    },

    /**
     * @description: 下拉刷新
     * @param ：无
     * @return: 无
     * @author: 张颖娟
     * @Date: 2020年5月5日14:51:58
     */
    onRefresh() {
      const vm = this;
      setTimeout(() => {
        vm.pullRefresh.isLoading = false; //刷新完成，关闭刷新功能
      }, 1000); //1000代表刷新时间
      this.jumpToPageLoading(); //重新加载页面
    }
  }
};
</script>
