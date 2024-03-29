import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import RequestsView from '../views/RequestsView.vue';
import SettingsView from '../views/SettingsView.vue';
import CreateRequestView from '../views/CreateRequestView.vue';
import UsersView from '../views/UsersView.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
    path: '/', name: 'home', component: LoginView
}, {
    path: '/login', component: LoginView
}, {
    path: '/register', component: RegisterView
}, {
    path: '/dashboard', component: DashboardView
}, {
    path: '/requests', component: RequestsView
}, {
    path: '/requests/create', component: CreateRequestView
}, {
    path: '/settings', component: SettingsView
}, {
    path: '/users', component: UsersView
}, {
    path: '*', component: () => import('../views/NotFoundView.vue')
}]

const router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})

export default router;
