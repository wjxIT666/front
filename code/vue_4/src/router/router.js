import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/index',
            name: 'index',
            component: () => import('../views/Index.vue')
        },
        {
            path: '/index2',
            name: 'index2',
            component: () => import('../views/Index2.vue')
        },
        {
            path: '/index3',
            name: 'index3',
            component: () => import('../views/Index3.vue')
        },
        {
            path: '/index4',
            name: 'index4',
            component: () => import('../views/Index4.vue')
        },
        {
            path: '/index5',
            name: 'index5',
            component: () => import('../views/Index5.vue')
        },
        {
            path: '/index6',
            name: 'index6',
            component: () => import('../views/Index6.vue')
        },
        {
            path: '/index7',
            name: 'index7',
            component: () => import('../views/Index7.vue')
        }
    ]
});

export default router;