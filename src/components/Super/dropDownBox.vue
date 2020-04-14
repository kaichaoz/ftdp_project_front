<!--
*@描述:dropDownBox(底部下拉框和true组合) 此页面自己for循环，需要接受数据，每次更改后立即传递给父页面
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月25日16:49:10
*@最后修改人:herry
*@LastEditTime:2020年3月25日16:49:10
*@说明：-->


<template>
  <div>
    <!-- 下拉框和是否为true当个组件 -->
    <div v-for="(item,index) in dropDownBoxList" class="dropDownBoxBody">
      <!-- 下拉框组件 -->
      <div class="displayDiv">
        <!-- 下拉框显示部分 -->
        <div
          :id="'dropDownShow' + index"
          class="dropDownShow"
          v-text="dropDownBoxList[index].infoTitle"
          @click="onDropDown(index)"
        ></div>
        <!-- 下拉框部分 -->
        <div :id="'dropDown' +index" class="dropDown">
          <!-- 粗线 -->
          <div style="border:2px solid #d4d4d4 ; margin-bottom:5px"></div>
          <!-- 下拉框数据 -->
          <table
            class="dropTable"
            height="30"
            width="220"
            border="0"
            cellspacing="0"
            cellpadding="0"
            align="center"
          >
            <tbody v-for="(item,i) in dropDownBoxList[index].infoList">
              <tr>
                <td @click="onNameShow(i,index)" v-text="dropDownBoxList[index].infoList[i]"></td>
              </tr>
              <hr style="display:inline-block" />
            </tbody>
          </table>
        </div>
      </div>
      <!-- isTrue组件 -->
      <div class="trueDiv displayDiv">
        <van-switch v-model="dropDownBoxList[index].isTrue" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.dropDownBoxBody {
  margin-top: 20px;
}
.displayDiv {
  display: inline-block;
}
.trueDiv {
  float: right;
  margin-top: 2px;
  margin-right: 15px;
  margin-left: 15px;
}
.dropDownShow {
  font-size: 20px;
  text-align: center;
  width: 200px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
}
.dropDown {
  margin-top: 10px;
  width: 200px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  display: none;
}
</style>
<script>
export default {
  props: {
    siteInfoShowListP: {
      type: Array,
      default: () => [
        {
          isTrue: true,
          infoTitle: "某某得分",
          infoNum: "110",
          infoList: ["某某得分", "某某信息", "评分"]
        },
        {
          isTrue: true,
          infoTitle: "某某信息",
          infoNum: "119",
          infoList: ["某某得分", "某某信息", "评分"]
        },
        {
          isTrue: true,
          infoTitle: "评分",
          infoNum: "120",
          infoList: ["某某得分", "某某信息", "评分"]
        }
      ]
    }
  },
  data() {
    return {
      dropDownBoxList: [] // 页面所有数据
    };
  },
  watch: {
    // 监听传递过来的当前页面所有数据，如果变化则全部重新赋值
    siteInfoShowListP(newVal) {
      this.dropDownBoxList = [];
      this.dropDownBoxList = newVal;
    }
  },

  // 挂载完毕
  mounted() {
    this.start(); // 初始化
  },

  // 数据更新
  updated() {
    // 数据变更时则返回父页面数据
    this.$emit("litenDropDownBox", this.dropDownBoxList);
    // console.log(this.dropDownBoxList);
  },

  // 页面即将销毁
  beforeDestroy() {
    // 关闭所有的下拉框
    this.closeAlldropDownbox();
  },
  methods: {
    // 初始化内容
    start() {
      // 接收传递过来的数据
      this.dropDownBoxList = [];
      this.dropDownBoxList = this.siteInfoShowListP;
    },
    // 点击抬头是否显示下拉框
    onDropDown(index) {
      // console.log(index);
      console.log(this.dropDownBoxList[index]);

      if (this.dropDownBoxList[index].isTrue == false) {
        return;
      }
      // 获取当前的ID
      const dropdown = document.getElementById("dropDown" + index);
      // 获取当前Id的css属性display
      const dropdownDisplay = dropdown.style.display;

      // 点击打开/关闭下拉框
      const ta = drop(dropdownDisplay);
      dropdown.style.display = ta;
    },

    // 显示当前抬头内容: i为当前下拉框选择的内容位置，ind为当前显示的内容位置
    onNameShow(i, ind) {
      // console.log(i);
      // console.log(ind);
      // 记录当前的值
      const c = this.dropDownBoxList[ind].infoTitle;

      // 将当前勾选的内容显示到上面
      this.dropDownBoxList[ind].infoTitle = this.dropDownBoxList[ind].infoList[
        i
      ];

      // 判断当前值是否有相同的，相同给的则置换
      const b = this.swapPosition(this.dropDownBoxList[ind].infoTitle);
      if (b != -1) {
        this.dropDownBoxList[b].infoTitle = c;
      }

      // 关闭所有的下拉框
      this.closeAlldropDownbox();
    },

    // 关闭所有的下拉框
    closeAlldropDownbox() {
      for (let index = 0; index < this.dropDownBoxList.length; index++) {
        let dropdown = document.getElementById("dropDown" + index);
        dropdown.style.display = "none";
      }
    },

    // 当前值如果和其他显示的框的值相同，则返回其他相同值的下标,否则返回-1
    swapPosition(value) {
      for (let index = 0; index < this.dropDownBoxList.length; index++) {
        const a = document.getElementById("dropDownShow" + index).innerText;
        if (value == a) {
          return index;
        }
      }
      return -1;
    }
  }
};

// 替换的switch，根据左边数据返回右边数据
function drop(name) {
  let names = {
    none: "block",
    block: "none",
    "": "block"
  };
  return names[name] || names["default"];
}
</script>


