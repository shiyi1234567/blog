import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName:"",
    userId:""
  },
  mutations: {
    updateUser(state,user){
      state.userName = user.userName || "";
      state.userId = user.userId || "";
    }
  },
  actions: {
  },
  modules: {
  }
})
