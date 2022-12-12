import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ArticleView from '@/views/ArticleView.vue';
import LoginView from '@/views/LoginView.vue';
import ExploreView from '@/views/ExploreView.vue';
import CartView from '@/views/CartView.vue';
import OrderView from '@/views/OrderView.vue';
import UserView from '@/views/UserView.vue';
import AdminView from '@/views/AdminView.vue';
import RedirectView from '@/views/404View.vue';

const routes = [
    {
        name : 'Home',
        path : '/',
        component : HomeView,
    }, {
        name : 'Article',
        path : '/article:articleId',
        component : ArticleView,
        props: true 
    }, {
        name : 'Login',
        path : '/login',
        component : LoginView,
    }, {
      name : 'Explore',
      path : '/explore',
      component : ExploreView,
    }, {
        name : 'Cart',
        path : '/cart',
        component : CartView,
    }, {
        name : 'Order',
        path : '/order',
        component : OrderView,
    }, {
        name : 'User',
        path : '/user',
        component : UserView,
    }, {
        name : 'Admin',
        path : '/admin',
        component : AdminView,
    }, {
        name : 'Redirect',
        path : '/redirect',
        component : RedirectView,
    },
];

const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router;