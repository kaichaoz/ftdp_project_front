// 引入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 这里需要use一下,固定写法,记住即可
Vue.use(Vuex)

// 直接导出 一个 Store 的实例
export default new Vuex.Store({
    // 类似 vue 的 data
    state: {
        name: 'oldName'
    },
    // 类似 vue 里的 mothods(同步方法)
    mutations: {
        updateName(state) {
            state.name = 'newName'
        }
    }
})




// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// const createNameStore = new Vuex.Store({
//     // 要设置的全局访问的state对象
//     state: {
//         createNameDataList: {}
//     },
//     getters: {

//     },

//     mutations: {
//         setToken(state, createNameDataList) {
//             state.createNameDataList = createNameDataList
//         },
//         getToken() {
//             return state.createNameDataList
//         }
//     },
//     actions: {

//     }

// })


// export default createNameStore