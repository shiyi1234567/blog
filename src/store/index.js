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
      this.state.userName = user.userName || "";
      this.state.userId = user.userId || "";
    }
  },
  actions: {
  },
  modules: {
  }
})
