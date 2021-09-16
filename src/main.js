import { createApp } from 'vue' 
import App from './App.vue'
import router from './router'
import GStore from './store' // Now that it exists.
import 'nprogress/nprogress.css'

/* Create a reactive object allows us to store a global state. To set a value in one component and get access to that date in another. 
We can use it to set data from our router and later get access to that data from our component as a alternative to 'this', no need to access it.
However in order to get access to the GStore inside of our router, we need a constant to be in a separate file, so we can import it that's why we cut out the GStore const from here and go to the store directory even if we don't use VueX for now.*/

createApp(App)
  .use(router)
  .provide('GStore', GStore) // provide this object so others can inject it
  .mount('#app')
