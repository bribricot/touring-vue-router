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
        component: EventEdit,
        meta: { requireAuth: true } //The value is just a simple JavaScript object with information about the route. It can be named anything and also have multiple properties. We can access this metafield inside a component but we can also access it inside our router.
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
  routes,
})


// For having a global progress bar

router.beforeEach((to, from) => {
  NProgress.start()
  const notAuthorized = true
  // If the meta for this route has 'requireAuth' and if it does we check to see if 'notAuthorized' is also true. Here we are using a constant for 'notAutorized' but in a fully flesh out application this would be a function that checks if the user is authorized, probably a function inside our authorization library. 
  if (to.meta.requireAuth && notAuthorized) {
  	GStore.flashMessage = 'Sorry, you are not authorized to view this page'
// Resetting the flash message.
  	setTimeout (() => {
  		GStore.flashMessage = ''
  	}, 3000)

  if (from.href) {
  	return false 
  } else {
  	return { path: '/' }
    }
  }
})
// It's when we access via link to an unauthorized route, we jump back in the events.

router.afterEach(() => {
  NProgress.done()
  window.scroll({
  top: 100,
  left: 100,
  behavior: 'smooth'
});
})
export default router
