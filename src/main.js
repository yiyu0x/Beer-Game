import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:6969',
}))

Vue.use(Vuetify)
// Vue.use(VueSocketio, 'http://localhost:6969/');
Vue.config.productionTip = false
export const eventBus = new Vue()
export var userList = []

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

//check login status
router.beforeEach((to, from, next)=>{
    const isLogin = localStorage.getItem('token') == 'ImLogin' 
    if( isLogin ){
        next()
    } else {
        if( to.path !== '/')
            next('/')
        else
            next()
    }
})