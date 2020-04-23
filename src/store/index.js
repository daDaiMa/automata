import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    calcuInstruction: null, // 计算器中输入的语法和选择的操作
    calcuOutput: null // 计算结果
  },
  mutations,
  actions,
  modules: {
  }
})
