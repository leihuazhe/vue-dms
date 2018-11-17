/* eslint-disable import/extensions */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/json/json.format.js'
import VJsoneditor from 'v-jsoneditor/src/index'
import "../static/css/common/index.scss"



Vue.use(VJsoneditor)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
