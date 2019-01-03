import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://35.194.134.133:6969'
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
router.beforeEach((to, from, next) => {
    const isLogin = sessionStorage.getItem('token') == 'ImLogin'
    if (isLogin) {
        console.log('true')
        next()
    } else {
        console.log('else')
        if (to.path !== '/')
            next('/')
        else
            next()
    }
    if (from.path === '/game') {
        eventBus.$emit('errorLog', '您已離開遊戲間')
        eventBus.$emit('exitRoom')
        console.log('您已離開遊戲間')
    }
    //from room to other page (except game) --> exit room
    if (from.path === '/room' && to.path !== '/game') {
        eventBus.$emit('errorLog', '您已離開遊戲間')
        eventBus.$emit('exitRoom')
        console.log('您已離開遊戲間')
    }
})