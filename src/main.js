import Vue from 'vue'
import App from './App.vue'
import store from "./store/store";
import router from "./router";
Vue.config.productionTip = false
import vuetify from './plugins/vuetify' // path to vuetify export

new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')

