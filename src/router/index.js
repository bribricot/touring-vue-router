import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '@/views/event/NotFound.vue'
import NetworkError from '@/views/event/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js' // Remove from Layout.vue for Per-Route Guards
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    // Per-Route Guards, API call is here now. Be careful, we have no access to this anymore. Also add a return for the progress bar to wait until the API call is made. 
    beforeEnter: to => {
      return EventService.getEvent(to.params.id) // We have access to the target route, return and params.id
      .then(response => {
       GStore.event = response.data // (It's time for us to use the global store to store the event from our API call.
      })
      .catch(error => {
        if (error.response && error.response.status == 404) {
         //this.$router.push({}) Just return the path we want to redirect to. Same thing for 'else'.
         	return {
            name: '404Resource',
            params: { resource: 'event' }
          }
        } else {
          return { name: 'NetworkError' }
        }
      })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
      {
    path: '/event/:id',
    redirect: () => {
      return { name: 'EventDetails' }
    },
    children: [
      { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
      { path: 'edit', redirect: () => ({ name: 'EventEdit' }) }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// For having a global progress bar

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
