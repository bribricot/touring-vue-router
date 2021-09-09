import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
    // http://localhost:8080/?page=2
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [  // <-----   // Nest these child components
      {
        path: '',// Find them at the root path of the parent
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
      },
        {
    path: '/about',
    name: 'About',
    component: About
  }
    ]
  },
  /*
   Before it was complicated and redondant nested routes with the template in each file.

  {
    path: '/event/:id/register',
    name: 'EventRegister',
    props: true,
    component: EventRegister
  },
  {
    path: '/event/:id/edit',
    name: 'EventEdit',
    props: true,
    component: EventEdit
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: Details
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
