import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import AddMeeting from '@/views/AddMeeting'
import EditMeeting from '@/views/EditMeeting'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-meeting',
    name: 'AddMeeting',
    component: AddMeeting
  },
  {
    path: '/EditMeeting',
    name: 'EditMeeting',
    component: EditMeeting
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
