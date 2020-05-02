import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Inkline from '@inkline/inkline'
import vuetify from './plugins/vuetify';
import "vuetify/dist/vuetify.min.css";

Vue.use(Inkline);
Vue.use(vuetify);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
