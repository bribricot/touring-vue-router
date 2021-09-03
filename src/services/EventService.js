import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/bribricot/touring-vue-router',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
// First parameter is the events to return per page, and the second is the page we're on.
  getEvents(perPage, page) {
  return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
 // This string will be dded into baseURL
  },
  getEvent(id) {
    return apiClient.get("/events/" + id) //Happend the id we take in parameter 
  }
}