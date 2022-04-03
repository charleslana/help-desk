import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: LoginView
    }, {
        path: '/login',
        component: () => import('../views/LoginView.vue')
    }, {
        path: '/register',
        component: RegisterView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;
