<template>
  <div>
    <div class="body1" v-text="showName" @click="onDropDown()"></div>

    <div :id="'dropDown'+idP" class="dropDown">
      <div style="border:2px solid #d4d4d4 ; margin-bottom:5px"></div>
      <table
        class="dropTable"
        height="30"
        width="220"
        border="0"
        cellspacing="0"
        cellpadding="0"
        align="center"
      >
        <tbody v-for="(item,i) in tbodyList">
          <tr>
            <td @click="onNameShow(i)" v-text="tbodyList[i]"></td>
          </tr>
          <hr />
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.body1 {
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
    idP: { default: "" },
    dropDownShowP: { default: "" }, // 接收当前显示的内容排序，只是初始化显示
    dropDownListP: { default: [] } // 接收当前显示的内容排序
  },
  data() {
    return {
      showName: "", // 下拉框选择后显示的内容
      tbodyList: [] // 底部下拉框显示的内容排序
    };
  },
  watch: {
    dropDownShowP(newVal) {
      this.showName = newVal;
    },
    dropDownListP(newVal) {
      this.tbodyList = [];
      // this.tbodyList = newVal;
      for (let index = 0; index < newVal.length; index++) {
        this.tbodyList.push(newVal[index].infoTitle);
      }
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    // 初始化内容
    start() {
      this.showName = this.dropDownShowP; // 下拉框显示内容
      this.tbodyList = [];

      // this.tbodyList = this.dropDownListP;
      for (let index = 0; index < this.dropDownListP.length; index++) {
        this.tbodyList.push(this.dropDownListP[index].infoTitle);
      }
    },
    // 点击抬头是否显示下拉框
    onDropDown() {
      const dropdown = document.getElementById("dropDown" + this.idP);
      const dropdownDisplay = dropdown.style.display;
      const ta = drop(dropdownDisplay);
      dropdown.style.display = ta;
    },

    // 显示当前抬头内容
    onNameShow(i) {
      // 关闭所有的下拉框
      for (let index = 0; index < this.tbodyList.length; index++) {
        let dropdown = document.getElementById("dropDown" + index);
        dropdown.style.display = "none";
      }

      // 将当前勾选的内容显示到上面
      this.showName = this.tbodyList[i];
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


