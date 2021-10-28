/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: Users }
            ]
        }
    ]
})

// 掛載路由導航守衛
router.beforeEach((to, from, next) => {
    // to 將要訪問的路徑
    // from 代表從哪個路徑跳轉而來
    // next 是一個函數 表示放行
    // next() 放行 next('/login') 跳轉
    if (to.path === '/login') return next()
        // 獲取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router