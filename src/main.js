import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import drizzleVuePlugin from "@drizzle/vue-plugin"
import drizzleOptions from "./drizzleOptions"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.use(drizzleVuePlugin, { store, drizzleOptions })

require("@/assets/main.scss");
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
