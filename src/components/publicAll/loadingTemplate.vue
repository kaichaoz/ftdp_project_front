<!--
 * @描述:加载界面
 * @版本: 
 * @作者: 白爱民
 * @Date: 2020年5月2日09:22:49
 * @最后修改人:
 * @LastEditTime: 
 -->
<template>
  <div>
    <img :src="load" />
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      load: require("../../assets/publicAll/load.gif")
    };
  }
};
</script>
<style scoped>
img {
  margin-top: 50%;
}
</style>