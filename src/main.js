import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import LifeGrid from './components/LifeGrid.vue';

Vue.config.productionTip = false

Vue.component('LifeGrid', LifeGrid);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
