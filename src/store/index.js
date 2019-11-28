import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/Auth'
import snackbar from './modules/Snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    snackbar
  }
})