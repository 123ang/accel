import Vue from 'vue'
import VueRouter from 'vue-router'
import Meeting from '@/views/Meeting.vue'
import AddMeeting from '@/views/AddMeeting'
import EditMeeting from '@/views/EditMeeting'
import ViewMeeting from '@/views/ViewMeeting'
import Group from '@/views/Group.vue'
import AddGroup from '@/views/AddGroup'
import EditGroup from '@/views/EditGroup'
import ViewGroup from '@/views/ViewGroup'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ForgotPassword from '@/views/ForgotPassword'
import store from '../store' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Meeting',
    component: Meeting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: Meeting,
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
    path: '/edit-meeting',
    name: 'EditMeeting',
    component: EditMeeting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view-meeting',
    name: 'ViewMeeting',
    component: ViewMeeting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/group',
    name: 'Group',
    component: Group,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-group',
    name: 'AddGroup',
    component: AddGroup,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-group',
    name: 'EditGroup',
    component: EditGroup,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view-group',
    name: 'ViewGroup',
    component: ViewGroup,
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
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
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
