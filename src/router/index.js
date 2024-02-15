import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '@/views/playlists/CreatePlaylist.vue'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue'
import UserPlaylists from '@/views/playlists/UserPlaylists'

// route guard
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/playlists/create',
    name: 'createplaylist',
    component: CreatePlaylist, 
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'playlistdetails',
    component: PlaylistDetails, 
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/playlists/user',
    name: 'userplaylists',
    component: UserPlaylists, 
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
