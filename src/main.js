import { createApp, reactive } from 'vue'  // <--- importing reactive
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'

// Create a reactive object
const GStore = reactive({ flashMessage: '' })

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore) // provide this object so others can inject it
  .mount('#app')
