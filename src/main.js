import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueInputAutowidth from 'vue-input-autowidth'

Vue.config.productionTip = false
Vue.use(VueInputAutowidth)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
