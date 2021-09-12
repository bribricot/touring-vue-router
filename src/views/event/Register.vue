<template>
    <p>Register</p>
    <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'], // Don't forget to inject here 
  methods: {
  	register() {
  	// Call to the API, if registered successfuly then redirect to Event Details, how do we trigger navigation programmatically? The push method helps navigate the user to this location.
      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
  	    this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
       })
	}
  }
}
</script>