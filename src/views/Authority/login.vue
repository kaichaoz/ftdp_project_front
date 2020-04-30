<!--
*@描述:登陆
*@版本:V1.0
*@作者:白爱民
*@Date:2020年1月22日11:00:06
*@最后修改人:herry
*@LastEditTime:2020年1月22日11:00:12
*@说明：-->
<template>
  <div>
    <div class="pictureTop"></div>

    <div class="intermediate">
      <div class="userNameClass intermediatePublic">
        <img :src="telPicture" class="telImg" />
        <input v-model="userValue" maxlength="11" placeholder="请输入用户名" type="text" />
      </div>
      <div class="possWords intermediatePublic">
        <img :src="passPicture" class="passImg" />
        <input v-model="passValue" maxlength="20" placeholder="请输入密码" type="password" />
      </div>
      <div class="loginButton intermediatePublic" @click="login">
        <p style="margin-top:5%">登陆</p>
      </div>
    </div>
  </div>
</template>

<script>
import login from "../../api/Authority/login";
import { Toast } from "vant";
import { Notify } from "vant";
import { mapState } from "vuex";

// import notify from "../../../src/api/publicAll/notify";
export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["notifyInfo", ""])
  },
  data() {
    return {
      atLastUserName: "", // 用户最后输入最后用户名
      atLastPassWords: "", // 用户输入最后密码

      // 用户名和密码图片
      telPicture: require("../../assets/login/tel.png"),
      passPicture: require("../../assets/login/password.png"),

      // 用户输入数据
      userValue: "",
      passValue: "",

      // 正确的用户名和密码
      correctUserData: "1",
      correctPassData: "1"
    };
  },

  created() {
    this.enterLogin();
  },
  mounted() {
    this.retrieveData();
  },
  methods: {
    // 按下enter执行登陆
    enterLogin() {
      var _self = this;

      // 获取按下按钮，13表示enter
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          _self.login(); // 执行登陆方法
        }
      };
    },

    loginApi() {
      var vm = this;
      vm.$axios
        .post(login, {
          userValue: this.userValue,
          passValue: this.passValue
        })
        .then(res => {
          if (res.data.code === "0000") {
            d;
          }
        });
    },

    // 登陆判断进入
    login() {
      if (
        this.userValue == this.correctUserData &&
        this.passValue == this.correctPassData
      ) {
        this.prompt(1);
        this.sessionleave();
        this.saveData();
        this.$router.push({
          name: "library",
          params: {
            // userId: "herry"
          }
        });
      } else {
        this.prompt(0);
        this.userValue = "";
        this.passValue = "";
      }
    },
    // 需要开始存储到缓存：其他页面进行了判断
    sessionleave() {
      sessionStorage.setItem("setting_Leave", "0");
      sessionStorage.setItem("ruleTemplate_leave", "0");
    },

    // 用户输入数据存入
    saveData() {
      localStorage.setItem("userName", this.userValue);
      localStorage.setItem("passWord", this.passValue);
    },
    // 初始化获取
    retrieveData() {
      this.userValue = localStorage.getItem("userName");
      this.passValue = localStorage.getItem("passWord");
    },

    // 提示
    prompt(value) {
      if (value == "0") {
        const a = "用户名或密码错误";
        Toast.fail(a);
        Notify({
          message: this.notifyInfo[0].loginErr,
          background: this.notifyInfo[1].orange //红色：#ffelel   橘色：#FF976A
        });
      } else if (value == "1") {
        Toast.success("登陆成功");
        Notify({
          message: this.notifyInfo[0].loginOk,
          background: this.notifyInfo[1].blue //蓝色：#29B8DB   绿色：#8DC149
        });
      }
    }
  }
};
</script>

<style scoped>
input {
  border: 0px;
  margin-top: 15px;
}

.telImg {
  width: 9%;
  margin-right: 10px;
  /* height: 10px; */
  /* color: red; */
  /* background-color: wheat; */
  top: 10px;
  margin-top: 10px;
}

.passImg {
  width: 10%;
  margin-right: 10px;

  /* height: 10px; */
  /* color: red; */
  /* background-color: wheat; */
  top: 10px;
  margin-top: 10px;
}

.pictureTop {
  position: relative;
}

.intermediate {
  position: relative;
  z-index: 1;
  font-size: 15px;
}

.userNameClass {
  top: 200px;
  background-color: white;
}

.possWords {
  top: 275px;
  background-color: white;
}

.intermediatePublic {
  margin-left: 10%;
  margin-right: 10%;
  position: absolute;
  height: 50px;
  width: 300px;
  border-radius: 50px;
}

.loginButton {
  top: 350px;
  background-color: white;
  text-align: center;
}

.loginButton:active {
  border-width: 10px 10px 0 0;
  background-color: #e0e9ea;
}
</style>