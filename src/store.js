import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  //要设置的全局访问的state对象
  state: {
    token:''//用户token
  },
  //用于监听state的变化的
  getters: {

  },
  mutations: {
    setToken(state,token) {
      state.token=token
    },
    //暂时不使用
    getToken() {
      return state.token
    }
  },
  actions: {

  }
})
export default store