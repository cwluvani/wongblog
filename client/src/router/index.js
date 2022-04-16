import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
// import firebase from 'firebase/app';
import 'firebase/auth';

const Blogs = () => import('../pages/Blogs.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home'
        }
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
        name: 'Login'
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
    document.title = `${to.meta.title} | WongBlog`;
    next();
});

export default router;