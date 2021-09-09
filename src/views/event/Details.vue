<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<script>
// import EventService from '@/services/EventService.js'
export default {
  props: ['event']
}

/* Plus besoin depuis qu'on a fait le Layout, mais remplacer l'id par le prop 'event' qu'on reçoit en entier depuis le Layout et qu'on va envoyer à ce component.
  data() {
    return {
      event: null
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
} */
</script>
