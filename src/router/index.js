import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView/HomeView.vue';

// Router
const router = createRouter(
    {
        history: createWebHistory( import.meta.env.BASE_URL ),
        routes: [
            {
                component: HomeView,
                name: 'home',
                path: '/',
            },
            {
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import( '@/views/AboutView/AboutView.vue' ),
                name: 'about',
                path: '/about',
            },
            {
                component: () => import( '@/views/ReadmeView/ReadmeView.vue' ),
                name: 'readme',
                path: '/readme',
            },
            {
                component: () => import( '@/views/ChallengeView/ChallengeView.vue' ),
                name: 'challenge',
                path: '/challenge',
            },
        ],
    }
);

export default router;
