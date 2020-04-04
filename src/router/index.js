import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import AddMeeting from '@/views/AddMeeting'
import EditMeeting from '@/views/EditMeeting'

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
    path: '/edit-meeting/:meeting_id',
    name: 'EditMeeting',
    component: EditMeeting
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
