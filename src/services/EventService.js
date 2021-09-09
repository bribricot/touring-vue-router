import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/bribricot/touring-vue-router',
  /*  
  The server uses this endpoint. In the documentation, we can send in an _limit parameter for how many items to return per page, and _page which tells our api which page to return. 
  For example : /events?_limit=2&_page=3 : means 2 per page and the events on page 3 so, it will return 2 events in json syntax. 
*/
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
// First parameter is the events to return per page, and the second is the current page we're on.
  getEvents(perPage, page) {
  	return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
 // This string will be added into baseURL
  },
  getEvent(id) {
    return apiClient.get("/events/" + id) //Happend the id we take in parameter 
  }
}