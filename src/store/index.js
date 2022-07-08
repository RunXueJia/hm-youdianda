
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const userKey = 'YOUDIANDA-USER'
export default new Vuex.Store({
  state: {
    userToken: getItem(userKey) || {}
  },
  getters: {
    token: (state) => state.userToken.token
  },
  mutations: {
    setUserKey(state, data) {
      state.userToken = data
      setItem(userKey, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
