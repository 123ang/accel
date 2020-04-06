import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import AddMeeting from '@/views/AddMeeting'
import EditMeeting from '@/views/EditMeeting'
import Login from '@/views/Login'
import Register from '@/views/Register'
import store from '../store' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/Index',
    name: 'Index',
    component: Index,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-meeting',
    name: 'AddMeeting',
    component: AddMeeting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/EditMeeting',
    name: 'EditMeeting',
    component: EditMeeting,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
