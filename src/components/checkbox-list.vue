<!--
*@描述:复选框
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2020年02月17日20:16:31
*@说明：-->
<template>
  <div>
    <div class="allDiv">
      <div class="divStyle" v-for="(item, index) in labellist" :key="index">
        <label @click="checkResumeDetails(index)" :id="'label' + index" class="labelStyle"> {{labellist[index]}}</label>
        <input :id="'input' + index" @change="checkboxChange(index)" name="inputName" class="icon-span"
          type="checkbox" />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // inject:['reload'], // 注入页面刷新
    props: {
      listP: {
        default: []
      },
      canSelectListP: {
        default: []
      }
    },
    data() {
      return {
        labellist: ["我是"], // 定义接受简历的数组
        canSelectList: [] // 存放已挑选的简历

        // reload: this.reload  // 需要刷新的地方
      };
    },
    watch: {
      listP(newVal) {
        const vm = this;
        // vm.labellist = [];
        // for (let index = 0; index < newVal.length; index++) {
        //   vm.labellist.push(newVal[index]);

        // }
        vm.labellist = newVal;
        this.canSelectList = []

        // 清空所有被选择的数据
        for (let index = 0; index < vm.labellist.length; index++) {
          console.dir(document.getElementById("input" + index));
          document.getElementById("input" + index)["checked"] = false;
        }
      }
    },
    // 组件销毁完毕后
    destroyed() {},
    mounted() {
      this.receiveData(); //接收recruitmentDetails界面传过来的值
    },
    methods: {
      //接收recruitmentDetails界面传过来的值
      receiveData() {
        const vm = this;
        vm.labellist = this.listP;
      },

      // 复选框选择后存储，选过的取消，没有选过的添加
      checkboxChange(index) {
        // 查找当前传入值是否再数组中存在，存在为0，不存在为-1
        const a = this.canSelectList.findIndex(obj => obj == index);
        if (a >= 0) {
          this.delete(index);
        } else {
          this.canSelectList.push(index); // 存添加到数组
          this.$emit("listenToChildEvent", this.canSelectList)
        }
      },

      // 根据传入值找到当前数组中的位置，然后删除当前的位置
      delete(i) {
        var index = this.canSelectList.indexOf(i); // 查找位置
        this.canSelectList.splice(index, 1); // 删除当前位置一位，后面自动往前补齐
        this.$emit("listenToChildEvent", this.canSelectList)
      },

      // 点击文字，显示简历详情--何静芳--2020年1月22日09:24:03
      checkResumeDetails(index) {
        this.$router.push({
          name: "login",
          params: {
            resumeId: "login"
          }
        });
      }
    }

  };
</script>
<style scoped>
  .labelStyle {
    display: inline-block;
    font-size: 18px;
    color: #3796fa;
    margin-left: 10px;
    margin-top: 0px;
    margin-bottom: 13px;
  }

  .inputStyle {
    float: right;
    -webkit-appearance: radio;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    /* // 0表示透明 */
    /* opacity: 1;   */
    margin-top: 6px;
    transform: rotate(-45deg);
  }

  .HorizontalTop {
    margin-top: 6px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #ebf1fb;
    height: 1px;
    border: none;
  }

  .divStyle {
    margin-top: 10px;
  }

  .allDiv {
    border: 1px solid #a9a9a9;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  /* //对号样式 */
  .icon-span {
    display: inline-block;
    background-color: #fff;
    border-radius: 4px;
    border: 2px solid #7f7f7f;
    position: relative;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    border-radius: 40%;
    /* -webkit-appearance: radio; */
    float: right;
    margin-right: 22px;
    width: 24px;
    height: 24px;
    margin-top: -2px;
  }

  .icon-span::after {
    /* -webkit-appearance: radio; */
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    content: " ";
    top: 2px;
    left: 5px;
    position: absolute;
    width: 4px;
    height: 8px;
    -webkit-transform: rotate(45deg) scale(0);
    transform: rotate(45deg) scale(0);
    -webkit-transition: -webkit-transform 0.2s;
    transition: -webkit-transform 0.2s;
    transition: transform 0.2s;
    transition: transform 0.2s, -webkit-transform 0.2s;
  }

  .icon-span-select {}

  .icon-span-select::after {
    border-color: #fff;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
  }
</style>