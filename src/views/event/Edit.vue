<template>
    <p>Edit</p>
</template>

<script>

export default {
  props: ['event'],
  data: function() {
    return {
      unsavedChanges: true  // <-- Flag gets set to true if anything is changed on the form
    }
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved changes!'
      )
      if (!answer) {
        return false // <-- Cancels the navigation, or you can return a path, a name path...
      }
    } 
  }
}

</script>