import { createRouter, createWebHistory } from 'vue-router'
// import Dashboard from '@/views/Dashboard.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import Users from '@/views/Users/index.vue'
import EditUser from '@/views/Users/Edit/index.vue'

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Users
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignIn
  },

  {
    path: '/users',
    name: 'users',
    component: Users
  },

  {
    path: '/users/:uid',
    name: 'EditUser',
    component: EditUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
