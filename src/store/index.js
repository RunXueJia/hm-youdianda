
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const userKey = 'YOUDIANDA-USER'
export default new Vuex.Store({
  state: {
    userToken: getItem(userKey) || {},
    index: getItem('YOUDIANDA-INDEX-INFO') || {}
  },
  getters: {
    token: (state) => state.userToken.token
  },
  mutations: {
    //保存登陆状态token
    setUserKey(state, data) {
      state.userToken = data
      setItem(userKey, data)
    },
    //退出
    quit(state) {
      state.userToken = {}
      setItem(userKey, {})
    },
    //setIndex
    setIndex(state, data) {
      setItem('YOUDIANDA-INDEX-INFO', data)
      state.index = data
    }
  },
  actions: {
  },
  modules: {
  }
})
