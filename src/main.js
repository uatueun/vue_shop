/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 載入全局樣式表
import './assets/css/global.css'
// 載入axios
import axios from 'axios'
// 配置請求的根路徑
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 最後必須return config
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')