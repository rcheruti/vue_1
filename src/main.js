import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { VueHammer } from 'vue2-hammer'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(VueHammer)
Vue.use(VueMaterial)
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
