<template>
  <div id="app">
    <router-view />
    <bottomNav v-if="$route.meta.keepAlive"></bottomNav>
    <!-- <loading v-if="isShowLoading!=true? false : true" /> -->
    <loading v-if="isShowLoading" />
  </div>
</template>

<script>
// import bottomNav from "../src/components/bottomNav.vue";
import loading from "../src/components/publicAll/loadingTemplate";
import { mapState } from "vuex"; // 全局调取：可使用this.

export default {
  computed: {
    // 展开运算符，将全局变量映射为自己界面的变量
    ...mapState(["isShowLoading", ""])
  },
  components: {
    loading
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // font-size: 32px;
  margin-bottom: 70px;
  // background-color: #E8E8E8;
}
</style>
