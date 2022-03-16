import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import firebase from 'firebase/app';
import 'firebase/auth';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
            requiresAuth: false
        }
    },
    {
        path: '/blogs',
        name: 'Blogs',
        meta: {
            title: 'blogs',
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;