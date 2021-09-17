import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/bribricot/touring-vue-router/',
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
  getEvents(perPage, page) {
    return apiClient
      .get('/events?_limit=' + perPage + '&_page=' + page)
      .then(sleeper(1000))
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  }
}

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms))
  }
}
