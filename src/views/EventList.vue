
<template>
  <h1>Events</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="pagination">
    <router-link
      id="page-prev"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >&#60; Previous
  </router-link>

    <router-link
      id="page-next"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      >Next &#62;
    </router-link>
</div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0 // Added this to store totalEvents
    }
  },
	created() {
		/* We simply allow it to wrap our API call. Now, */
	    watchEffect(() => {
	    	this.events = null // This is so when we load another page the current list of events is removed so the user knows that it’s loading. We could also have an animated spinner if we wanted. This will clear out the events on the page, so our user knows the API has been called.
	      EventService.getEvents(2, this.page)
	        .then(response => {
	          this.events = response.data
	          this.totalEvents = response.headers['x-total-count'] // Store totalEvents
	        })
        .catch(() => {
          this.$router.push({ name: 'NetworkError' })
        })
	    })
	  },
	  computed: {
    hasNextPage() {
      // First, calculate total pages
      var totalPages = Math.ceil(this.totalEvents / 2) // 2 is events per page

      // Then check to see if the current page is less than the total pages.
      return this.page < totalPages
	}
  }
}

</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
	display: flex;
	justify-content: space-around;
}

</style>