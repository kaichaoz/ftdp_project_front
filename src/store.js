
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

  //要设置的全局访问的state对象
  state: {
    token: '',//用户token
    managementDataList: [], // 模板管理management页面数据
    createNameDataList: {}, // 创建模板一：createName页面数据
  },
  //用于监听state的变化的
  getters: {

  },
  mutations: {

    // 存储createName中的数据
    setCreateNameDataList(state, createNameDataList) {
      state.createNameDataList = createNameDataList
    },
    // 存储token中的数据
    setToken(state, token) {
      state.token = token
    },
    //暂时不使用
    // getToken() {
    //   return state.token
    // }
  },
  actions: {

  }
})
export default store