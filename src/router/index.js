import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '../views/Home/index.vue';

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/summary',
            component: Home,
            children: [{
                path: '/summary',
                name: 'summary',
                component: () => import(/* webpackChunkName: "about" */ '../views/Summary/index.vue'),
            }, {
                path: '/select',
                name: 'select',
                component: () => import(/* webpackChunkName: "about" */ '../views/SelectPage/index.vue'),
            }]
        },
        {
            path: '/findWay',
            name: 'FindWay',
            component: Home,
            children: [{
                path: '/findWay/:type',
                name: 'find',
                component: () => import('../views/GetLost/FindWay/index.vue')
            }]
        },
        {
            path: '/:path(.*)*',
            name: 'ErrorPage',
            component: Home,
            children: [{
                path: '/:path(.*)*',
                name: '404',
                component: () => import('../views/GetLost/FindWay/index.vue')
            }]
        }
    ]
});

export default router;