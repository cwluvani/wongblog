import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
// import firebase from 'firebase/app';
import 'firebase/auth';

const Blogs = () => import('../pages/Blogs.vue');
// const Login = () => import('../pages/Login.vue');
import Login from '../pages/Login.vue';
const Register = () => import('../pages/Register.vue');
const ForgotPassword = () => import('../pages/ForgotPassword.vue');
const Profile = () => import('../pages/Profile.vue');
const Admin = () => import('../pages/Admin.vue');
const CreatePost = () => import('../pages/CreatePost.vue');
const BlogPreview = () => import('../pages/BlogPreview.vue');
const ViewBlog = () => import('../pages/ViewBlog.vue');
const EditBlog = () => import('../pages/EditBlog.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home'
        },
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
        path: '/create-post',
        name: 'CreatePost',
        component: CreatePost,
        meta: {
            title: 'Create Post',
            requiresAuth: true,
            requiresAdmin: true
        }

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
        component: ForgotPassword,
        meta: {
            title: 'Forgot Password'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: 'Profile'
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            title: 'Admin'
        }
    },
    {
        path: '/post-preview',
        name: 'BlogPreview',
        component: BlogPreview,
        meta: {
            title: 'Preview Blog Post',
            requriesAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/view-blog/:blogid',
        name: 'ViewBlog',
        component: ViewBlog,
        meta: {
            title: "View Blog Post",
            requiresAuth: false
        }
    },
    {
        path: '/edit-blog/:blogid',
        name: 'EditBlog',
        component: EditBlog,
        meta: {
            title: 'Edit BLog Post',
            requiresAuth: true,
            requiresAdmin: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// global navigation guard
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title || 'welcome'} | WongBlog`;
    next();
});

// remember to check meta info
// router.beforeEach((to, from, next) => {

// });

export default router;