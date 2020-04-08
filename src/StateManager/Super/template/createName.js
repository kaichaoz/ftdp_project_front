const store = new Vuex.Store({
    state: {
        isTrueList: ''
    },
    getters: {

    },

    mutations: {
        setToken(isTrueList) {
            state.isTrueList = isTrueList
        },
        getToken() {
            return state.isTrueList
        }
    },
    actions: {

    }

})


export default store