import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vant'
import '@/style/index.less'
import '@/utils/day'
import '@/views/components/index.js'
Vue.config.productionTip = false
Vue.filter('showImg', (url) => url ? "http://122.51.249.55:8060/" + url : null)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
