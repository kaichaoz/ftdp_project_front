<!--
*@描述:模板管理
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:付媛媛
*@LastEditTime:2020年4月21日19:24:54
*@说明： 
-->
<template>
  <div>
    <div class="title commonColor">
      <!-- <div class="iocNameDiv"> -->
      <img @click="intoSetting()" class="iocName" :src="iocName" alt />
      <!-- </div> -->

      <div class="button" @click="intoModel()">组件管理</div>
      <div class="titleName">模板管理</div>
      <!-- <div class="iocName"> -->
    </div>

    <div class="body">
      <!-- 拖动组件 -->
      <vuedraggable v-model="managementDataList" :options="options">
        <!-- 多个模板类型 -->
        <div class="bodyDiv" v-for="(item ,index) in managementDataList ">
          <!-- 整个下拉框 -->
          <van-collapse
            class="publicClassification"
            v-model="managementDataList[index].activeNames"
            accordion
          >
            <!-- 下拉框和具体内容 -->
            <van-collapse-item
              v-if="managementDataList"
              class="collapseOne"
              :title="managementDataList[index].title"
              name="1"
            >
              <!-- 具体模板 -->
              <swipeCell
                @listenSwipeCellToManagement="deleteTemplateName"
                :groupIndexP="index"
                :titleP="managementDataList[index].comTitleList"
              ></swipeCell>
              <!-- 加号 -->
              <div>
                <img @click="plusNum(index)" class="addBut" :src="plus" alt />
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </vuedraggable>
    </div>
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

.title .iocName {
  /* background: none; */
  float: right;
  /* position: fixed; */
  width: 50px;
  height: 50px;
  /* left: 350px; */
}

.bodyDiv {
  margin-top: 50px;
  /* width: 80%; */
  /* margin: 10px auto 10px; */
  margin-left: 15px;
  margin-right: 15px;
}

/* 对应里面模板和组件名字大小和位置 */
>>> .van-cell {
  /* height: 100px; */
  text-align: left;
  font-size: 20px;
}

.publicClassification {
  margin-top: 20px;
}

.addBut {
  height: 40px;
  width: 40px;
  margin: 10px auto;
}
</style>
<script>
import vuedraggable from "vuedraggable";
import user from "../../../components/Super/library/userInfo/user";
import infoShow from "../../../components/Super/library/theMessageStates/infoShow";
import numberIndex from "../../../components/Super/library/enterInformation/numberIndex";
import swipeCell from "../../../components/Super/template/swipeCell";
import {
  queryByIsUsable,
  deleteTemplate,
  modifyTemplateGroup
} from "../../../api/Super/template/management"; //引入{根据isUsable查询模板，删除模板，修改模板分组}接口的后端地址
import { responseCode } from "../../../utils/responseCode"; //引入定义的状态码
import { mapState } from "vuex"; // 引入vuex用于将全局变量映射为页面变量
export default {
  computed: {
    ...mapState(["managementDataListStore"]), // 映射store变量managementDataListStore为当前页面变量，直接使用this即可
    ...mapState(["management_groupName_List"]) //映射store变量management_groupName_List为当前页面存储页面的分组项目变量，直接使用this即可
  },
  components: {
    user,
    infoShow,
    numberIndex,
    vuedraggable,
    swipeCell
  },
  data() {
    return {
      //  此页数据
      iocName: require("../../../assets/super/setting.png"), // 抬头右侧设置图片
      plus: require("../../../assets/super/plus.png"), // 底部加号图片

      // 长按后拖动
      options: {
        delayOnTouchOnly: true, //开启触摸延时
        direction: "vertical", //拖动方向
        delay: 500, //延时时长
        touchStartThreshold: 3, //防止某些手机过于敏感(3~5 效果最好)
        chosenClass: "chosen" //选中之后拖拽项添加的class名(用于选中时候添加样式)
      },

      // 初始化数据：
      // 模板名称,activeNames默认必须为1，title：management页面模板类名字，comTitleList为具体模板名字
      managementDataList: [
        {
          groupID: "",
          activeNames: "",
          title: "",
          comTitleList: [{ templateId: "", isUsable: "", templateName: "" }]
        }
      ]
    };
  },

  created() {},
  updated() {
    // 存储当前数据
    this.$store.commit("setManagementDataList", this.managementDataList);
  },
  mounted() {
    //初始化页面加载
    this.queryGroup();
  },
  beforeDestroy() {
    //退出页面保存当前分组模板位置
    this.modifyTemplateGroup();
  },
  methods: {
    // 初始化
    start() {
      this.managementDataList = []; // 当前有页面所有数据置空
    },
    // 抬头左侧按钮跳转到组件管理
    intoModel() {
      this.$router.push({ name: "library" });
    },
    // 抬头右侧按钮跳转到模板设置
    intoSetting() {
      this.$router.push({ name: "setting" });
    },

    /**
     * @description: 加号：跳转添加页面输入信息
     * @param :{index:分组索引}
     * @return: 无
     * @author: 付媛媛
     * @Date: 2020年4月20日19:47:27
     */
    plusNum(index) {
      const groupNameList = this.pushGroupNameList();
      this.$router.push({
        name: "createName",
        params: {
          managementEdit: "0", // 0表示点击加号进入
          groupNamePlus: index, // 当前分组名字，如index=0表示公共项目
          groupNameListPlus: groupNameList // 当前所有分组名字集合
        }
      });
    },

    /**
     * @description: 点击加号存储模板管理页所有分组模板
     * @param ：无
     * @return: 当前页面所有分组模板
     * @author: 付媛媛
     * @Date: 2020年4月20日19:57:00
     */
    pushGroupNameList() {
      let groupNameList = [];
      for (let i = 0; i < this.managementDataList.length; i++) {
        //将当前页面所有分组名字添加到数组
        groupNameList.push(this.managementDataList[i].title);
      }
      return groupNameList;
    },

    /**
     * @description: 进入模板管理页面存储模板管理页所有分组模板
     * @param ：无
     * @return: 无
     * @author: 付媛媛
     * @Date: 2020年4月20日19:59:05
     */
    startList() {
      let groupNameList = [];
      for (let i = 0; i < this.managementDataList.length; i++) {
        //将当前页面所有分组模板名字添加到数组
        groupNameList.push(this.managementDataList[i].title);
      }
      // 存储当前页面的所有分组模板名字
      this.$store.commit("setManagementGroupNameList", groupNameList);
    },

    /**
     * @description: 加载当前页面，根据isUsable查询模板
     * @param 无
     * @return: 无
     * @author: 付媛媛
     * @Date: 2020年4月20日20:06:20
     */
    queryGroup() {
      let vm = this;
      vm.managementDataList = [];
      vm.$axios.get(queryByIsUsable).then(res => {
        if (res.data.code == responseCode.SUCCESSCODE) {
          //遍历当前页面所有分组模板
          for (let index = 0; index < res.data.data.length; index++) {
            //加载当前页面的所有分组模板
            vm.managementDataList.push({
              groupID: res.data.data[index].templateGroupId, //分组模板Id
              activeNames: "1", //默认为 1
              title: res.data.data[index].templateGroupName, //所有分组模板名称
              comTitleList: [] //存放各分组模板的具体模板的数组
            });
            for (
              let i = 0;
              i < res.data.data[index].tempByIsUsableData.length;
              i++
            ) {
              //加载当前页面的所有分组模板的具体模板
              vm.managementDataList[index].comTitleList.push(
                {
                  templateName:
                    res.data.data[index].tempByIsUsableData[i].templateName,
                  templateId:
                    res.data.data[index].tempByIsUsableData[i].templateId,
                  isUsable: res.data.data[index].tempByIsUsableData[i].isUsable
                } //所有分组模板的具体模板名称/id/是否可用
              );
            }
          }
        } else if (res.data.code == responseCode.NULLCODE) {
          vm.$toast({
            message: "暂无数据",
            duration: 1000
          });
        } else {
          vm.$toast({
            message: "加载失败",
            duration: 1000
          });
        }
      });
    },

    /**
     * @description: 模板管理页面退出保存当前分组模板位置
     * @param 无
     * @return: 无
     * @author: 付媛媛
     * @Date: 2020年4月21日11:39:28
     */
    modifyTemplateGroup() {
      let vm = this;
      const modelData = [];
      for (let i = 0; i < this.managementDataList.length; i++) {
        modelData.push({
          groupSequence: i, //分组模板位置序号
          id: this.managementDataList[i].groupID, //分组模板id
          isUsable: "0", //是否可用，默认为0
          templateGroupName: this.managementDataList[i].title //分组模板名称
        });
      }
      this.$axios.post(modifyTemplateGroup, modelData);
    },

    /**
     * @description: 删除具体模板
     * @param ：{i:子页面传递过来的具体模板索引,index:子页面传递过来的分组模板索引}
     * @return: 无
     * @author: 付媛媛
     * @Date: 2020年4月21日10:03:20
     */
    deleteTemplateName(i, index) {
      let vm = this;
      vm.$axios
        .post(
          deleteTemplate +
            "/" +
            this.managementDataList[index].comTitleList[i].templateId
        )
        .then(res => {
          if (res.data.code == responseCode.SUCCESSCODE) {
            vm.$toast({
              message: "删除成功",
              duration: 1000
            });
          } else {
            vm.$toast({
              message: "删除失败",
              duration: 1000
            });
          }
        });
      this.managementDataList[index].comTitleList.splice(i, 1);
    }
  }
};
</script>
