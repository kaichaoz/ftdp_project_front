<!--
*@描述:计算器
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
 * @说明：当前计算器只支持加减，没有添加键盘的判断操作，当计算完成后再次输入默认为加上这个值，除非清空后才可以。
 没有设置输入第一个加减后不能输入，但是如果输入多个默认为最后输入的内容

 输入等于后的值，然后输入值可以重新操作可以用如下办法：
 在值前面添加上“=”，然后判断如果有“=”字段就清空所有重新计算。

 不支持键盘输入，不会报错，只是清空或者不进行计算
-->
<template>
  <div class="about">
    <h1>这是个计算器你信吗</h1>
    <van-cell-group type="text">
      <van-field
        oninput="value=value.replace(/[^\d+(+)+(-)+(*)]/g, '').replace(/^0{1,}/g,'')"
        v-model="inputValue"
        placeholder="请输入数字"
      />
    </van-cell-group>
    <div style="margin-top:20%">
      <van-grid clickable :column-num="4" :gutter="10">
        <van-grid-item @click="onclick(i)" v-for="(num, i) in dataNum" :key="i" :text="dataNum[i]" />
      </van-grid>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Field } from 'vant'
export default {
  data () {
    return {
      // 数字加减乘除数组
      dataNum: [
        '+',
        '-',
        '*',
        '/',
        '1',
        '2',
        '3',
        '< X',
        '4',
        '5',
        '6',
        '=',
        '7',
        '8',
        '9',
        '0'
      ],
      inputValue: '', // input当前显示值
      inputStorage: '', // input输入值存储
      calculator: '', // 解析拿到的值

      temporaryVariables1: '', // 存储临时计算拼接值1
      temporaryVariables2: '', // 存储临时计算拼接值2
      temporaryOperator: '' // 存储临时运算符
    }
  },
  methods: {
    // 点击事件
    onclick (index) {
      this.parsing(index) // 解析当前的值
      this.judge() // 判断进行运算
    },

    // 解析当前拿到的值
    parsing (index) {
      // 暂时不能用，因为用调用方法等，可以暂时写进去，之后再判断数组中这数是啥
      // const math = ['+','-','*','/','1','2','3','X','4','5','6','']
      // const num = index;
      // this.calculator = math[index]


      switch (index) {
        case 4:
          this.calculator = '1'
          break
        case 5:
          this.calculator = '2'
          break
        case 6:
          this.calculator = '3'
          break
        case 8:
          this.calculator = '4'
          break
        case 9:
          this.calculator = '5'
          break
        case 10:
          this.calculator = '6'
          break
        case 12:
          this.calculator = '7'
          break
        case 13:
          this.calculator = '8'
          break
        case 14:
          this.calculator = '9'
          break
        case 15:
          this.calculator = '0'
          break
        case 0:
          this.calculator = '+'
          break
        case 1:
          this.calculator = '-'
          break
        case 2:
          this.calculator = '*'
          break
        case 3:
          this.calculator = '/'
          break
        case 11:
          this.calculator = '='
          break
        case 7:
          this.calculator = 'X'
          this.Clear()
          break
        default:
          break
      }

      //   this.outValue = this.calculator;
      //   this.inputBox();
      //   console.log(this.calculator);
    },

    // 判断是哪个运算符
    judge () {
      if (this.calculator === '=') {
        this.equal()
      } else if (this.calculator === 'X') {
        this.Clear()
      } else {
        this.showOn() // 显示当前的值
        this.calculation() // 计算当前的值
      }
    },

    // 计算当前的值
    calculation () {
      // 如果为空表示当前为第一个运算符,否则开始计算

      const vae = this.isNumber(this.calculator) // 判断当前输入值是否为数字
      if (this.temporaryOperator === '') {
        if (vae === false) {
          this.temporaryOperator = this.calculator // 存储当前计算值
        } else {
          this.temporaryVariables1 += this.calculator // 计算的值：加减触发前拼接的值
        }
      } else {
        if (vae === false) {
          this.temporaryVariables1 = this.Retrieval.retrieval(
            this.temporaryOperator,
            this.temporaryVariables1,
            this.temporaryVariables2
          ) // 如果当前有输入运算法调取加减乘除

          this.assignmentConversion() // 清空第二个数
          this.temporaryOperator = this.calculator // 计算完后保留当前的运算符
        } else {
          this.temporaryVariables2 += this.calculator // 继续第二个拼接
        }
      }
    },

    // 判断是否为数字：“12.3”等都为true， “哈哈”、“12.33”等都为false
    isNumber (val) {
      var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true
      } else {
        return false
      }
    },

    // 等于
    equal () {
      this.temporaryVariables1 = this.Retrieval.retrieval(
        this.temporaryOperator,
        this.temporaryVariables1,
        this.temporaryVariables2
      ) // 调取加减乘除
      this.assignmentConversion() // 清空第二个数
      this.inputValue = this.temporaryVariables1 // 将计算后的值显示在屏幕上
      this.inputStorage = '' // 清空之前存储的值
    },

    // 清空第二个数
    assignmentConversion () {
      this.temporaryVariables2 = '' // 第二个清空用来再次保留
    },

    // 清除显示的数据
    Clear () {
      this.inputValue = '' // 显示的值
      this.inputStorage = '' // input输入值存储
      this.calculator = '' // 解析拿到的值

      this.temporaryVariables1 = '' // 存储临时计算拼接值1
      this.temporaryVariables2 = '' // 存储临时计算拼接值2
      this.temporaryOperator = '' // 存储临时运算符
    },

    // 显示当前的值
    showOn () {
      this.inputValue = this.inputStorage // 之前存储先赋给要显示的
      this.inputValue += this.calculator // 要显示的值再次加上当前点击的值
      this.inputStorage = this.inputValue // 同步要存储的值
    }
  }
}
</script>

<style scoped>
div.inputAll {
  position: relative;
}

div.inputOne {
  position: absolute;
  top: 10%;
  /* border-bottom:1px solid gray; */
}

div.inputTwo {
  position: absolute;
  top: 15%;
}

div.inputLine {
  border-bottom: 1px solid gray;
  top: 12.5%;
  position: absolute;
}
</style>
