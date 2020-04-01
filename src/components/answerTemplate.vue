<!--
 * @Description:白板输入内容模板
 * @Version: 1.0
 * @Autor: 白爱民
 * @Date: 2019年12月31日18:54:28
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-02 15:15:58
 -->
<template>
  <!-- <div style="margin-top:30px"> -->
  <div
    id="app"
    class="contentAll"
    style="text-align:center;"
  >
    <!-- 作答页面框里面的内容 -->
    <div
      v-show="txtDataShow"
      id="editer"
      class="txtcontent allContent"
    >
      {{ txtNode }}
    </div>

    <!-- 存储超链接 -->
    <div
      v-show="linkDataShow"
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
      </div>
    </div>

    <!-- 存储图片 -->
    <div
      v-show="pictureDataShow"
      id="editerPicture"
      class="pictureContent allContent"
    >
      <div>
        <van-grid
          :gutter="10"
          :column-num="3"
        >
          <van-grid-item
            v-for="(item, index) in pictureNode"
            :key="index"
          >
            <van-image
              :id="'image' + index"
              :src="item.imgURL"
            />
            <div>{{ item.imgDesc }}</div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    txtNodeP: { default: '' }, // 父组件传值文本框值
    linkNodeP: { default: [''] }, // 父组件传值超链接值
    pictureNodeP: { default: [''] } // 父组件传值图片值
  },

  data() {
    return {
      txtNode: '', // 存储输入数据
      pictureNode: [], // 存储图片数据
      linkNode: [], // 存储超链接

      txtDataShow: true, // 控制是否显示文本，默认显示，没有数据不显示
      linkDataShow: true, // 控制是否显示超链接，默认不显示，有数据显示
      pictureDataShow: true // 控制是否显示图片，默认不显示，有数据显示
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

    asyncArray: function() {
      this.$nextTick(function() {
        const textheigth = document.getElementById('editer').scrollHeight // 获取文本内容高度
        const linkNowHeight = textheigth + 75
        document.getElementById('editerLink').heigth = linkNowHeight + 'px'
      })
    }

    // 当文本框数据变化后
    // txtNode(newVal) {
    //   const textheigth = document.getElementById("editer").scrollHeight; // 获取文本内容高度
    //   const linkNowHeight = textheigth + 75;
    //   document.getElementById("editerLink").heigth = linkNowHeight + "px";
    // }
  },

  mounted() {
    this.showData()
  },

  methods: {
    // 显示数据
    showData() {
      this.txtNode = this.txtNodeP
      this.pictureNode = this.pictureNodeP
      this.linkNode = this.linkNodeP
    },

    // 打开超链接
    openLink(index, linktext, linkurl) {
      window.location.href = linkurl
    }
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
  /* position: absolute; */
  background-color: white;
  text-align: inherit;
  /* margin: auto; */
  /* top: 30px; */
  left: 10px;
  right: 10px;
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
  /* min-height: 80px; */
  padding: 0 3px 0 10px;
  top: 75px;
}
/* 链接框样式 */
.linkContent {
  /* min-height: 100px; */
  top: 155px;
}
/* 图片框样式 */
.pictureContent {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  /* min-height: 100px; */
  top: 255px;
}

/* 上传后显示图片样式大小 */
>>> .van-image__img {
  width: 65%;
  margin-left: 17px;
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
  max-height: 400px;
  /* 有滚轮 */
  overflow: auto;
}
</style>
