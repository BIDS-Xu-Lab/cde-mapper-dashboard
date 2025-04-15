import { createWebHistory, createRouter } from 'vue-router'

import HomePage from './pages/Home.vue';
import DashboardPage from './pages/Dashboard.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/dashboard', component: DashboardPage },
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL
    ),
    routes,
})

export default router