import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
// import firebase from 'firebase/app';
import 'firebase/auth';

const Blogs = () => import('../pages/Blogs.vue');
// const Login = () => import('../pages/Login.vue');
import Login from '../pages/Login.vue';
const Register = () => import('../pages/Register.vue');
const ForgotPassword = () => import('../pages/ForgotPassword.vue');
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home'
        },
        alias: '/home'
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
        meta: {
            title: 'Blogs'
        }
    },
    {
        path: '/createPost',
        name: 'CreatePost',

    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/viewblog',
        name: 'ViewBlog'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// global navigation guard
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title || 'welcome'} | WongBlog`;
    next();
});

export default router;