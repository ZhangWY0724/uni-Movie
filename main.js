import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

// Api地址
//Vue.prototype.ServerUrl = "http://127.0.0.1:6677/api"  //本地
Vue.prototype.ServerUrl = "http://121.5.249.207/api"  //线上api

// 静态资源地址
Vue.prototype.ServerContent = "http://121.5.249.207"
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
