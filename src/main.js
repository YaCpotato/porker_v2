import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import jQuery from 'jquery'
import Toasted from 'vue-toasted';
 
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

Vue.config.productionTip = false

Vue.use(ElementUI);
var options = {
  position: 'top-right',
  duration: 2000,
  type: 'info'
}
Vue.use(Toasted,options);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
