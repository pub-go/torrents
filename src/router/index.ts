import format from '@/util/format'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const __ = (a: string) => a // mark

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: __('Home'),
      component: HomeView
    },
    {
      path: '/create',
      name: __('Create'),
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/edit',
      name: __('View/Edit'),
      component: () => import('../views/EditView.vue')
    },
    {
      path: '/about',
      name: __('About'),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

const gettext = await import('../i18n/gettext')

router.afterEach((to) => {
  const __ = gettext.__
  const _x = gettext._x
  const title = __('Online Torrent Creator/Editor')
  if (to.name) {
    document.title = format(_x('page title', '{0} :: {1}'), __(to.name.toString()), title)
  } else {
    document.title = title
  }
})

export default router
