<!--
 * @Description:作答
 * @Version: 1.0
 * @Autor: 苏超凡
 * @Date: 2019-09-18 10:25:04
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-02 17:54:52
 -->
<template>
  <div style="background-color: rgb(224, 233, 234)">
    <!-- 导航栏 -->
    <van-nav-bar
      class="titlecolorreply"
      title="作答"
      left-arrow
      @click-left="btnback"
    />
    <!-- 题目详情的显示 -->
    <div class="brainDetail">
      <van-dropdown-menu>
        <van-dropdown-item v-model="selectcontent" :title="selectcontent">
          <!-- 此处修改一下接收值即可 -->
          <answerTemplate
            :txt-node-p="brainTxtNode"
            :link-node-p="brainLinkNode"
            :picture-node-p="brainPictureNode"
          />
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <!-- 作答页面框里面的内容 -->
    <replyTemplage
      :txt-node-p="txtNode"
      :link-node-p="linkNode"
      :picture-node-p="pictureNode"
      @listenToChildTxt="listenToChildTxt"
      @listenToChildLink="listenToChildLink"
      @listenToChildPicture="listenToChildPicture"
      @listenToTemplateLink="listenToTemplateLink"
    />
    <!-- 底部提交和图片超链接等 -->
    <div>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '100px', background: '#eeeeee' }"
        :overlay="false"
      >
        <!-- 弹出层:提交-->
        <div
          style="text-align:center;margin-top: 0%;background-color:rgb(224, 233, 234)"
        >
          <van-button
            class="van-button-danger"
            round
            size="normal"
            style="width:100%"
            type="primary"
            @click="btnCreat"
          >
            提交
          </van-button>
        </div>

        <!-- 下面四个图片功能 -->
        <div style="text-align:center;margin-top:7.5px">
          <div class="filereply">
            <!-- 上传作答图片 -->
            <localPicture @listenToChildEvent="receiveLocalPicture" />

            <!-- 相机图片 -->
            <camera @listenToChildEvent="receiveCamera" />

            <!-- 上传文件 -->
            <uploadFiles @listenToChildEvent="receiveUploadFiles" />

            <!-- 超链接显示图片  -->
            <img
              :src="srcLink"
              style="margin-top:3px;margin-left:55px;"
              @click="showModelTrue()"
            />
            <!-- 超链接内容 -->
            <hyperlinks
              :show-model="showmodel"
              :hyper-link-text="hyperlinktext"
              :hyper-link-address="hyperlinkaddress"
              @listenToChildEvent="receiveHyperlinks"
            />
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import escape from "../../api/escape.js"; // 引入校验
import answerTemplate from "../../components/answerTemplate"; // 引入只读答题
import replyTemplage from "../../components/replyTemplate"; // 引入答题模板
import localPicture from "../../components/reply/LocalPicture"; // 引入上传图片
import camera from "../../components/reply/Camera"; // 引入相机图片
import uploadFiles from "../../components/reply/UploadFiles"; // 引入上传文件
import hyperlinks from "../../components/reply/Hyperlinks"; // 引入超链接
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  components: {
    answerTemplate,
    replyTemplage,
    localPicture,
    camera,
    uploadFiles,
    hyperlinks
  },

  data() {
    return {
      // 题目详情处的题目
      // selectcontent: this.selectcontent,
      selectcontent: "题目",
      // 题目内容
      content: "",
      // 图片
      file: this.file,
      // 用户名
      // name: storage.get('UserInfo').userName,

      // 题目详情展示
      showphoto: false,

      // 弹出框是否显示
      show: true,

      // 超链接框的显示情况
      showmodel: false,

      // 超链接文本
      hyperlinktext: "",
      // 超链接地址
      hyperlinkaddress: "",

      // 地址
      address: "",
      // 超链接数组
      list: [],

      // ===================guoqian
      srcLink: require("../../assets/reply/link.png"), // 显示超链接图片

      linkIndex: "", // 临时存储当前linkId--修改使用
      // 头脑风暴详情的内容接收
      brainTxtNode: "这里传入数据即可", // 头脑风暴详情的文本数据
      brainPictureNode: [], // 头脑风暴详情的存储图片数据
      brainLinkNode: [], // 头脑风暴详情的存储超链接
      // 回答的内容接收
      txtNode: "", // 存储输入数据
      pictureNode: [], // 存储图片数据
      linkNode: [], // 存储超链接
      // allNode: [], // 存储所有内容
      allNode: "" // 向后端存储，存储所有内容
    };
  },
  watch: {},
  // 页面加载数据
  mounted() {
    this.receiveData();
    this.titleContentData(); // 加载题目内容
  },
  methods: {
    // 编辑器接收数据方法
    receiveData() {
      this.txtNode =
        "六、懂得让步的人是聪明的，在感情对抗中，赢了面子就输了情分，往往死撑到底的人，都成孤家寡人。其实，弯腰不是认输，只是为了拾起丢掉的幸福。七、我宁愿坦然的、不完美的过一辈子，也不要一辈子都假装自己很完美。不羡慕繁华，不刻意雕琢，你若总是看到比自己优秀的人，那就说明你正在走上坡路；若总是看到和自己差不多的人，说明你差不多在混日子。与其去埋怨这世界，不如改变自己。做好自己的事，那就是比什么都强的。";
      this.linkNode = [
        {
          linkText: "我是link1",
          linkURL: "https://www.cnblogs.com/qinqiu/p/5088241.html"
        },
        {
          linkText: "我是link2",
          linkURL: "https://youzan.github.io/vant/#/zh-CN/grid"
        }
      ];
      this.pictureNode = [
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片一"
        },
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片二"
        },
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片三"
        },
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片四"
        }
      ];
    },

    // 加载题目内容
    titleContentData() {
      this.brainTxtNode = "请加载";
      this.brainLinkNode = [
        {
          linkText: "我是link1",
          linkURL: "https://www.cnblogs.com/qinqiu/p/5088241.html"
        },
        {
          linkText: "我是link2",
          linkURL: "https://youzan.github.io/vant/#/zh-CN/grid"
        }
      ];
      this.brainPictureNode = [
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片一"
        },
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片二"
        },
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片三"
        },
        {
          imgURL:
            "http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg",
          imgDesc: "我是图片四"
        }
      ];
    },

    // 返回上一级
    btnback() {
      this.$router.go(-1);
    },

    // 提交作答内容
    btnCreat() {
      this.txtNode = escape.htmlEncode(this.txtNode); // 存库前转义字符
    },

    // 超链接弹出框显示
    showModelTrue() {
      this.showmodel = true; // 显示书写超链接弹出框
    },

    // ---------------------文本框数据同步---------
    listenToChildTxt(txt) {
      this.txtNode = txt;
    },
    listenToChildLink(link) {
      this.linkNode = link;
    },
    listenToChildPicture(picture) {
      this.pictureNode = picture;
    },
    // ---------------------文本框数据同步---------

    // 接收页面传递过来的图片，当前子组件里面传递过来的假数据
    receiveLocalPicture(imgUrl) {
      this.pictureNode.push({
        imgURL: imgUrl, // 接收图片子页面图片数据
        imgDesc: ""
      });
    },

    // 接收照相机
    receiveCamera(imgUrl) {
      this.pictureNode.push({
        imgURL: imgUrl, // 接收照相机子页面图片数据
        imgDesc: ""
      });
    },

    // 接收文件
    receiveUploadFiles(imgUrl) {
      this.pictureNode.push({
        imgURL: imgUrl, // 接收文本子页面图片数据
        imgDesc: ""
      });
    },

    // 接收父组件传递的超链接和地址，如果没有则不显示，有值则显示
    receiveHyperlinks(showmodel, hyperlinktext, hyperlinkaddress) {
      const vm = this;
      this.showmodel = showmodel;
      this.hyperlinktext = hyperlinktext;
      this.hyperlinkaddress = hyperlinkaddress;

      if (hyperlinktext !== undefined && hyperlinkaddress !== undefined) {
        if (vm.linkIndex !== "") {
          vm.linkNode[vm.linkIndex].linkText = vm.hyperlinktext; // 存入已有的超链接文本
          vm.linkNode[vm.linkIndex].linkURL = vm.hyperlinkaddress; // 存入已有的超链接文本

          vm.linkIndex = ""; // 将当前的需要更改的id保存下来方便修改，使用完清空
        } else {
          this.linkNode.push({
            linkText: vm.hyperlinktext, // 点击下面图片按钮存入新的超链接内容
            linkURL: vm.hyperlinkaddress // 点击下面图片按钮存入新的超链接地址
          });
        }
      }
    },

    // 接收replyTemplate传递的link数据
    listenToTemplateLink(
      tempShowModel,
      tempIndex,
      tempLinkTextT,
      tempLinkURLT
    ) {
      this.showmodel = tempShowModel; // 显示书写超链接弹出框
      this.linkIndex = tempIndex; // 将当前的需要更改的id保存下来方便修改
      this.hyperlinktext = tempLinkTextT; // 将当前连接抬头传递给子组件
      this.hyperlinkaddress = tempLinkURLT; // 将当前连接地址传递给子组件
    }
  }
};
</script>
<style scoped>
/* 题目详情 */
.brainDetail {
  margin-top: 1%;
  /* margin: 5px; */
}
.brainDetail >>> .van-dropdown-menu__title {
  /* padding: 5px 16px; */
  font-size: 16px;
  font-style: left;
  width: 92%;
  padding: 3px;
}

/* 照相机大小 */
.camera {
  width: 9%;
}
/* 加入班课导航栏背景颜色 */
.titlecolorreply {
  background-color: rgb(69, 129, 142);
  color: cornsilk;
}
/* 加入班课导航栏和返回图标字体颜色 */
.van-nav-bar,
.van-icon {
  color: white;
}
/* 提交按钮样式 */
.van-button-danger {
  background-color: #45818e;
  border: 1px solid rgb(127, 180, 201);
  width: 96%;
}

/* 题目详情中照片的样式 */
.photo {
  float: left;
}

.filereply >>> .van-icon {
  color: #b6b7b8;
}
</style>
