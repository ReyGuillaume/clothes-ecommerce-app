<script lang="js">

import axios from 'axios'

export default {
  data() {
  return {

  }
  },
  methods: {

  },
  mounted() {
  if (!this.idAdmin) {
    this.$router.push('/login')
  }
  (async () => {
  })();
  },
}
</script>

<template>
<h2>admin</h2>
</template>

<style>

</style>