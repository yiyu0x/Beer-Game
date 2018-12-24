import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path: '/lobby',
        name: 'lobby',
        component: () => import( /* webpackChunkName: "about" */ './views/Lobby.vue')
    },
    {
        path: '/game',
        name: 'game',
        component: () => import( /* webpackChunkName: "about" */ './views/Game.vue')
    },
    {
        path: '*',
        redirect: '/'
    }
    ]
})