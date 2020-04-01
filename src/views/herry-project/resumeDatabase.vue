<!--
*@Description:使用checkbox-list案例
*@Version:1.0
*@Author:herry
*@Date:herry
*@LastEditors:herry
*@LastEditTime:herry
-->
<template>
  <div>
    <!-- <div style="height:200px"> -->
    <checkboxList :listP="list" :canSelectListP="canSelectList" @listenToChildEvent="receiveCanSelectList">
    </checkboxList>
    <!-- </div> -->
    <!-- 推送按钮 -->
    <div>
      <van-button type="info" class="intermediateButton " @click="pushResumeTips">
        <p>推送</p>
      </van-button>
    </div>
  </div>
</template>

<script>
  import checkboxList from "../../components/checkbox-list";
  import {
    Dialog
  } from "vant";
  export default {
    components: {
      checkboxList
    },
    // inject:['reload'], // 注入页面刷新
    data() {
      return {
        list: [], // 定义接受简历的数组

        canSelectList: [] // 存放已挑选的简历

        // reload: this.reload  // 需要刷新的地方
      };
    },

    //页面初始化时显示的内容
    created() {
      this.loading();
    },

    // 组件销毁完毕后
    destroyed() {},

    //调后端方法
    methods: {
      loading() {
        this.list = ["我是独步青云", "我是杨过", "我是小龙女1d"];
      },

      receiveCanSelectList(canSelectList) {
        this.canSelectList = canSelectList
      },

      // 推送按钮事件-刘梦娇-2020-1-14 20:12:05
      pushResumeTips() {
        if (this.canSelectList.length == 0) {
          this.$toast("您还没有选择简历哦！");
        } else {
          //弹出提示框
          Dialog.confirm({
              message: "确定要挑选这些简历吗？"
            })
            .then(() => {
              //将简历和招聘绑定
              this.pushResumeSucceed();
              // on confirm
            })
            .catch(() => {});
        }
      },

      //推送弹出框中的确认事件-刘梦娇-2020-1-14 20:11:42
      pushResumeSucceed() {
        //简历和招聘绑定
        for (let index = 0; index < this.canSelectList.length; index++) {
          // 删除当前的下标内容，但是此下标内容为undefined，但是浏览器显示不了
          delete this.list[this.canSelectList[index]];
        }

        // 清空当前所有为undefined的下标
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i] == undefined) {
            // 删除当前下标
            this.list.splice(i, 1);
            i--;
          }
        }
        this.$toast("简历推送成功！");

        // 清空所有被选择的数据
        // for (let index = 0; index < this.list.length; index++) {
        //   console.dir(document.getElementById("input" + index));
        //   document.getElementById("input" + index)["checked"] = false;
        // }

        //将可选择简历数组置空
        this.canSelectList = [];
        // this.reload(); // 调用刷新的地方
      }
    }
  };
</script>
============================================================================================================
<style>
  p {
    color: black;
    /* top: -30px; */
    /* margin-top: -0px; */
    font-size: 17px;
  }

  .intermediateButton {
    margin-left: 10%;
    margin-right: 10%;
    /* position: absolute; */
    height: 50px;
    width: 300px;
    border-radius: 50px;
    top: 30px;
    background-color: white;
    text-align: center;
  }

  .intermediateButton:active {
    border-width: 1px 1px 0 0;
    background-color: #e0e9ea;
  }



  /*全部简历样式 */
  .AllResume {
    margin: 3% 3% 0 5%;
  }

  /*字体大小 */
  .labelFont {
    font-size: initial;
  }

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