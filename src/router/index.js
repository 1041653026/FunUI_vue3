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
            }]
        },
        {
            path: '/*',
            name: '404',
            redirect: '/',
        }
    ]
});

export default router;