<template>
  <div>
    <select class="dropDownDiv">
      <option style="width:auto" class="optionList" value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "DropDownList",
  data() {
    return {
    
    };
  },

  directives: {

  },
  methods: {
  },
  computed: {
  
  }
};
</script>


<style scoped>
.dropDownDiv {
  margin-left: -50px;
  width: 150px;
  height: 30px;
  text-align: center;
  border-radius: 5px;

  /* // 去除样式 */
  /* appearance: none;   */
  /* Firefox */
  /* -moz-appearance: none; */
  /* Safari 和 Chrome */
  /* -webkit-appearance: none;  */

  overflow: hidden;
}
</style>