<script lang="js">

import app from '../main.js'
import axios from 'axios'

export default {
  data() {
  return {

  }
  },
  methods: {
    disconnectAdmin() {
        app.config.globalProperties.idAdmin = null
        this.$router.push('/login')
    },
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
  <button @click="disconnectAdmin" class="main-button">Deconnexion</button>
  <h2>admin</h2>
</template>

<style>

</style>