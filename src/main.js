import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'

Vue.use(Vuetify)
Vue.config.productionTip = false
export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next)=>{
  const isLogin = localStorage.getItem('token') == 'ImLogin' ;
  if( isLogin ){
    next();
  } else {
    if( to.path !== '/')
      next('/');
    else
      next();
  }
});