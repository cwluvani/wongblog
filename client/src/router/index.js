import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
// import firebase from 'firebase/app';
import 'firebase/auth';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/blogs',
        name: 'Blogs'
    },
    {
        path: '/createPost',
        name: 'CreatePost',

    },
    {
        path: '/login',
        name: 'Login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;