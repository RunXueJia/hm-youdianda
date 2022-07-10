import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vant'
import '@/style/index.less'
Vue.config.productionTip = false
Vue.filter('showImg', (url) => url ? "http://124.223.14.236:8060/" + url : null)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
