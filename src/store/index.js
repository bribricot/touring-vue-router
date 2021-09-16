// Create a reactive object allows us to store a global state instead of using VueX for now.

import { reactive } from 'vue' // <--- importing reactive

export default reactive({ flashMessage: '', event: null })
// Add also the event property, because it's where we'll store the data returned from our API, and where our component will look for the data.
