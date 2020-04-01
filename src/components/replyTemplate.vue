<!--
 * @Description:白板输入内容模板
 * @Version: 1.0
 * @Autor: 白爱民
 * @Date: 2019年12月31日18:54:28
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-02 15:15:58
 -->
<template>
  <div>
    <div
      id="app"
      class="contentAll"
      style="text-align:center;"
    >
      <!-- 作答页面框里面的内容 -->
      <div
        id="editer"
        contenteditable="canEdit"
        class="txtcontent allContent"
        v-text="txtNode"
        @blur="changeText($event)"
      />

      <!-- 存储超链接 -->
      <div
        id="editerLink"
        class="linkContent allContent linkStyle"
      >
        <div
          v-for="(item, index) in linkNode"
          :id="'linkImgDiv' + index"
          :key="index"
          class="linkImgClass"
        >
          <div
            :id="'link' + index"
            :v-model="item.linkText"
            :href="item.linkURL"
            @click="openLink(index, item.linkText, item.linkURL)"
          >
            {{ item.linkText }}
          </div>
          <img
            :id="'linkImg' + index"
            :alt="index"
            :src="crossImg"
            class="imgLinkCross"
            @click="removeLinkNode(index)"
          >
        </div>
      </div>

      <!-- 存储图片 -->
      <div
        id="editerPicture"
        class="pictureContent allContent"
      >
        <div
          v-for="(item, index) in pictureNode"
          :key="index"
        >
          <van-grid :column-num="2">
            <van-grid-item>
              <img
                :id="'picture' + index"
                :src="crossImg"
                class="imgPictureCross"
                :alt="index"
                @click="removePictureNode(index)"
              >
              <van-image
                :id="'image' + index"
                :src="item.imgURL"
              />
              <form>
                <input
                  :id="'inputDesc' + index"
                  v-model="item.imgDesc"
                  oninput="value=value.replace(/[/&quot;]/g,'')"
                  class="annotate"
                  type="text"
                  maxlength="10"
                  placeholder="请添加图片注释"
                  @blur="inputOnBlur(index)"
                >
              </form>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import hyperlinks from '../joinbrainstorm/reply/Hyperlinks'
export default {
  // components: { hyperlinks },
  props: {
    txtNodeP: { default: '' }, // 父组件传值文本框值
    linkNodeP: { default: [] }, // 父组件传值超链接值
    pictureNodeP: { default: [] } // 父组件传值图片值
  },

  data() {
    return {
      crossImg: require("../assets/reply/cross.png"),
      txtNode: this.txtNodeP, // 存储输入数据
      linkNode: this.linkNodeP,
      pictureNode: this.pictureNodeP,

      // canEditT: this.canEdit,

      inputImgDesc: '', // input框注释输入值
      srcLink: require('../assets/reply/link.png'), // 显示超链接图片
      // 图片
      file: this.file,

      // 弹出框是否显示
      show: true,
      // 按钮隐藏
      showbutton: false,
      // 折叠层显示情况`
      showcontent: false,
      // 超链接框的显示情况
      showmodel: false,
      // // div输入框
      // innerText: this.vue,
      // isLocked: false,

      linkIndex: '', // 临时存储当前linkId--修改使用
      hyperlinktext: '', // 临时存储超链接文本--修改使用
      hyperlinkaddress: '', // 临时存储超链接地址--修改使用

      txtNode: '', // 存储输入数据
      pictureNode: [], // 存储图片数据
      linkNode: [], // 存储超链接
      // allNode: [], // 存储所有内容

      allNode: '' // 向后端存储，存储所有内容
    }
  },

  watch: {
    // 接收当进入页面数据
    txtNodeP(newVal) {
      this.txtNode = newVal // 存储输入数据
    },
    linkNodeP(newVal) {
      this.linkNode = newVal
    },
    pictureNodeP(newVal) {
      this.pictureNode = newVal
    },

    txtNode(newVal) {
      this.$emit('listenToChildTxt', newVal) // 离开页面
    },
    linkNode(newVal) {
      this.$emit('listenToChildLink', newVal) // 离开页面
    },
    pictureNode(newVal) {
      this.$emit('listenToChildPicture', newVal) // 离开页面
    }
  },
  mounted() {
    document.getElementById('editer').contentEditable = true
  },
  methods: {
    // 已经写入超链接重新编辑
    openLink(index, linkTextT, linkURLT) {
      this.showmodel = true // 显示书写超链接弹出框

      // this.linkIndex = index; // 将当前的需要更改的id保存下来方便修改
      // this.hyperlinktext = linkTextT; // 将当前连接抬头传递给子组件
      // this.hyperlinkaddress = linkURLT; // 将当前连接地址传递给子组件
      this.$emit(
        'listenToTemplateLink',
        this.showmodel,
        index,
        linkTextT,
        linkURLT
      ) // 离开页面
      // this.linkIndex = "";
    },
    // 图片注释input框，失去焦点触发
    inputOnBlur(index) {
      const vm = this
      const inputDescValue = document.getElementById('inputDesc' + index).value
      this.pictureNode[index].imgDesc = inputDescValue
    },

    // -------------------------清理数组方法-----------------------
    // 删除数组指定下标方法--可以使用二
    // removePictureNode() {
    //   const vm = this;
    //   var test = vm.pictureNode;
    //   test = test.filter(t => t != vm.pictureNode[index]);
    //   vm.pictureNode = [];
    //   vm.pictureNode = test;

    //    // vm.pictureNode = vm.pictureNode.splice(t => t != test);
    // },

    // 删除数组指定下标方法--可以使用一
    removePictureNode(index) {
      const vm = this
      vm.pictureNode.splice(index, 1)
    },

    removeLinkNode(index) {
      const vm = this
      vm.linkNode.splice(index, 1)
    },

    // -------------------------清理数组方法-----------------------

    // 作答页面内容时刻变化
    changeText(event) {
      this.storageTxtNode()
    },

    // 将输入内容存储到数组
    storageTxtNode() {
      var temp = document.getElementById('editer').innerText // 获取文本框内容
      // temp = this.htmlEncode(temp); // 将特殊字符转格式
      this.txtNode = temp // 将转格式后的内容存入到数组
    }
    //  --------------------------作答页面----------------------------
  }
}
</script>
<style scoped>
.linkImgClass {
  height: 30%;
}
/* 超链接叉号 */
.imgLinkCross {
  position: relative;
  height: 20px;
  width: 20px;
  left: 92%;
  top: -20px;
  z-index: 1;
}

/* 图片叉号图片 */
.imgPictureCross {
  position: relative;
  height: 14%;
  width: 14%;
  float: 38%;
  left: 45%;
  top: 14%;
  z-index: 1;
}

/* 添加注释文本框的样式 */
.annotate {
  /* width: 100%; */
  text-align: center; /*placeholder文字居中*/
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  border-bottom-style: 1px solid;
  margin-bottom: 1%;
}

/* ----------------- 白色输入框整体样式 -----------------------*/
.allContent {
  position: absolute;
  background-color: white;
  text-align: inherit;
  /* margin: auto; */
  /* top: 100px; */
  left: 3px;
  right: 3px;
  font-size: 13px;
  font-style: inherit;
  /* line-height: 30px; */
  letter-spacing: 1px;
  overflow: auto;
  word-break: break-all;
  outline: none;
  -webkit-user-select: text;
  user-select: text;
  white-space: pre-line;
  text-align: left;
  /* /* padding-bottom: 10%; */
}
/* div文本框 */
.txtcontent {
  font-size: 16px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  height: 25%;
  padding: 0 3px 0 10px;
  top: 102px;
}
/* 链接框样式 */
.linkContent {
  height: 15%;
  top: 38%;
}
/* 图片框样式 */
.pictureContent {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 25%;
  top: 52%;
}

/* 上传后显示图片样式大小 */
>>> .van-image__img {
  width: 65%;
  margin-left: 29px;
}
.uploadImg {
  width: 50px;
}

.txtcontent:empty::before {
  content: attr(placeholder);
  font-size: 16px;
  color: #bbb;
}
.txtcontent:focus:before {
  content: none;
}

/* ----------------- 白色输入框整体样式 -----------------------*/
/* // 设置超链接存放是一列存放 */
.linkStyle {
  font-size: 16px;
  /* 超链接下面一条横线 */
  text-decoration: underline;
  padding: 0 0 0 10px;
  text-align: left;
  color: red;
  /* display: flex; */
  /* flex-direction: column; */
  /* margin-bottom: 25px; */
}

/* 文字、超链接、图片总div */
.contentAll {
  max-height: 450px;
  /* 有滚轮 */
  overflow: auto;
}
</style>
