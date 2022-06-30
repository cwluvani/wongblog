import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import firebase from 'firebase/app';
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
            title: 'Home',
            requiresAuth: false,
        },
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
        meta: {
            title: 'Blogs',
            requiresAuth: false,
        }
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: CreatePost,
        meta: {
            title: 'Create Post',
            requiresAuth: true,
            requiresAdmin: false,
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login',
            requiresAuth: false,
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: 'Register',
            requiresAuth: false,
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            title: 'Forgot Password',
            requiresAuth: false,
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: 'Profile',
            requiresAuth: true,
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            title: 'Admin',
            requiresAuth: true,
            requiresAdmin: false,
        }
    },
    {
        path: '/post-preview',
        name: 'BlogPreview',
        component: BlogPreview,
        meta: {
            title: 'Preview Blog Post',
            requriesAuth: true,
            requiresAdmin: false,
        }
    },
    {
        path: '/view-blog/:blogid',
        name: 'ViewBlog',
        component: ViewBlog,
        meta: {
            title: "View Blog Post",
            requiresAuth: false,
        }
    },
    {
        path: '/edit-blog/:blogid',
        name: 'EditBlog',
        component: EditBlog,
        meta: {
            title: 'Edit Blog Post',
            requiresAuth: true,
            requiresAdmin: false,
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

router.beforeEach(async (to, from, next) => {
    let user = firebase.auth().currentUser;
    let admin = null;
    if (user) {
        let token = await user.getIdTokenResult()
                        .catch((err) => { 
                            console.log('get token error: ', err); 
                        });
        if (typeof (await token) === 'undefined') {
            return next();
        } else {
            admin = token.claims.admin;
        }
    }
    if (to.matched.some(res => res.meta.requiresAuth)) {
        if (user) {
            if (to.matched.some(res => res.meta.requiresAdmin)) {
                if (admin) {
                    return next();
                }
                return next({ name: 'Home' });
            }
            return next();
        }
        return next({ name: 'Home' });
    }
    return next();
});

export default router;