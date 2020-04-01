<template>
  <div id="app">
    <router-view />
    <bottomNav v-if="$route.meta.keepAlive"></bottomNav>
  </div>
</template>

<script>
// import bottomNav from "../src/components/bottomNav.vue";
export default {

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
