<!--
 * @Description:超链接上传
 * @Version: 1.0
 * @Autor: 白爱民
 * @Date: 2019年12月23日16:07:24
 * @LastEditors  : 杨晓尚
 * @LastEditTime : 2019-12-23 10:02:18
 功能：传递三个参数过来，默认有三个参数但是不打开此页面，并且此页面会将用户数据不点确定的情况下存储到sessionStorage中，方便用户下次进来直接显示值（sessionStorage值在浏览器关闭后自动删除）,如果点击取消则删除所有数据
 -->
<template>
  <div>
    <van-popup
      v-model="showmodel"
      round
      :style="{ height: '160px', width:'300px' }"
    >
      <span style="float:left">&nbsp;&nbsp;&nbsp;要显示的文本：</span>
      <van-field
        v-model="hyperlinktext"
        oninput="value=value.replace(/[/&quot;]/g,'')"
        :maxlength="linkTextMaxlength"
        placeholder="要显示的文本"
      />
      <span style="float:left">&nbsp;&nbsp;&nbsp;地址：</span>
      <van-field
        v-model="hyperlinkaddress"
        oninput="value=value.replace(/[/&quot;]/g,'')"
        :maxlength="linkAddressMaxlength"
        placeholder="地址"
      />
      <div class="btnner">
        <div
          class="cancel"
          @click="showCancel()"
        >
          取消
        </div>
        <div
          class="ok"
          @click="showOk()"
        >
          完成
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  props: {
    showModel: { default: false }, // 传递过来为true打开此弹框页面
    hyperLinkText: { default: '' }, // 传递过来的超链接抬头
    hyperLinkAddress: { default: '' } // 传递过来的超链接内容
  },
  data() {
    return {
      // 当前页面数据
      linkTextMaxlength: 20,
      linkAddressMaxlength: 100,

      // 用于接收
      showmodel: false, // 超链接框的显示情况
      hyperlinktext: '', // 超链接文本
      hyperlinkaddress: '', // 超链接地址

      // 用于临时存储
      recordLinkText: '', // 新输入超链接文本暂存--用于输入没有点击确定再次进入还存在
      recordLinkAddress: '' // 新输入超链接地址暂存--用于输入没有点击确定再次进入还存在

    }
  },

  // 监听事件，如果值有变化，这里马上执行--打开此弹窗页面
  watch: {
    // 监听接收父页面数据
    showModel(newVal) {
      if (newVal) {
        this.showmodel = newVal
        this.hyperlinktext = this.hyperLinkText // 超链接抬头
        this.hyperlinkaddress = this.hyperLinkAddress // 超链接地址

        // 进入页面如果有值表示点击超链接进来的，如果没有值则是点击按钮进来则将之前的值赋给他
        if (this.hyperlinktext == '') {
          this.hyperlinktext = sessionStorage.getItem('recordLinkText')
          this.hyperlinkaddress = sessionStorage.getItem('recordLinkAddress')
        }
      }
    },

    // 监听当前页面数据：监听showmodel，当值改变时候传递给父组件，解决点击空白地方此弹框消失--离开页面二
    showmodel(newVal) {
      this.linkStorage() // 将当前值存储到local里面，方便回来继续输入
      this.$emit('listenToChildEvent', this.showmodel) // 离开页面
    }
  },

  methods: {
    // 超链接框的取消事件--离开页面一
    showCancel() {
      // this.linkStorage(); // 将当前值存储到local里面，方便回来继续输入
      this.departureEvent() // 离开页面
      this.clear() // 清空内容
      this.removeStorage() // 清空此session
    },

    // 点击完成将获取的值返回给父组件，如果为空则直接关闭，有值将值传递过去--离开页面三
    showOk() {
      if (this.hyperlinktext !== '' && this.hyperlinkaddress !== '') {
        this.showmodel = false
        this.$emit(
          'listenToChildEvent',
          this.showmodel,
          this.hyperlinktext,
          this.hyperlinkaddress
        )
      } else {
        this.departureEvent() // 离开页面：处理事件
      }
      this.clear() // 离开页面：清空数据
      this.removeStorage() // 清空此session
    },

    // 离开页面：处理事件
    departureEvent() {
      this.showmodel = false
      this.$emit('listenToChildEvent', this.showmodel)
    },
    // 离开页面：清空数据
    clear() {
      this.hyperlinktext = ''
      this.hyperlinkaddress = ''
    },

    // 离开页面：将当前值存储到local里面--点击空白处退出时候存
    linkStorage() {
      sessionStorage.setItem('recordLinkText', this.hyperlinktext)
      sessionStorage.setItem('recordLinkAddress', this.hyperlinkaddress)
    },

    // 点击确定和取消时候清空此session
    removeStorage() {
      sessionStorage.removeItem('recordLinkText')
      sessionStorage.removeItem('recordLinkAddress')
    }
  }
}
</script>
<style scoped>
.btnner {
  position: relative;
}
/* 取消按钮 */
.cancel {
  /* display:inline-block; */
  margin-left: 30%;
  color: rgb(69, 129, 142);
}
/* 确定 */
.ok {
  position: absolute;
  display: inline-block;
  margin-left: 30%;
  top: -1%;
  color: rgb(69, 129, 142);
}
</style>
