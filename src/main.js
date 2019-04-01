import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';

import * as Utils from './assets/utils';

Vue.mixin({
  methods: {
    ...Utils
  }
});

import './assets/css/index.scss';
import './assets/proto-css/index.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuelidate);

new Vue({
  render: h => h(App)
}).$mount('#app');
