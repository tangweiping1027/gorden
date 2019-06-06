import Vue from 'vue'
import Vuex from 'vuex'
import { navSide } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    nav: {
      navSide: navSide
    }
  },
  mutations: {
    changeIsCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  }
})
