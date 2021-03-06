
import Hosts from "./Hosts";
import Vue from 'vue'
import VueRouter from "vue-router";
import store from "./store/store";
import Zones from "./Zones";
import Time from "./Time";
import Password from "@/Password";
Vue.use(VueRouter)
const routes = [
    { path: '/password', component: Password , name:"password"},
    { path: '/hosts', component: Hosts , name:"hosts"},
    { path: '/zones', component: Zones , name:"zones"},
    { path: '/alarm', component: Time , name:"alarm"},
    { path: '/', redirect: { name: 'alarm' }}

]

const router= new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if(!store.getters.ip && to.name!=='hosts'&& to.name!=='password'){
        next({name:'hosts'})
    }
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // if the user is not authenticated, `next` is called twice
    next()
})
export default router
