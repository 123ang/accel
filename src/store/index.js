import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    isLoggedIn: false,
    Email: false,
    EditCaseID: false,
    GroupID: false
  },
  getters: {
    
  },
  mutations: {
    IsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    Email(state, data) {
      state.Email = data;
    },
    EditCaseID(state, data) {
      state.EditCaseID = data
    },
    GroupID(state,data) {
      state.GroupID = data
    }

  },
  actions: {

  },
  plugins: [new VuexPersistence().plugin]

})
export default store