import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import AddMeeting from '@/views/AddMeeting'
import EditMeeting from '@/views/EditMeeting'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Index',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-meeting',
    name: 'AddMeeting',
    component: AddMeeting,
  },
  {
    path: '/EditMeeting',
    name: 'EditMeeting',
    component: EditMeeting,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
]
  
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
