<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/login"><font-awesome-icon icon="fa-solid fa-user" />Login</RouterLink>
      </nav>
    </div>
  </header>
  
  <RouterView />
  <footer>
    <div id="container-lien">
  <div id="lien"><RouterLink to ="/">Home</RouterLink></div> 
  <div id="lien"><RouterLink to ="/explore">Exploire</RouterLink></div>
  <div id="lien"><RouterLink to ="/login">Se connecter</RouterLink></div>
  </div> 
  <div id="info-text">
  © Sapes2022
  </div>
  </footer>
</template>

<style scoped>

</style>
