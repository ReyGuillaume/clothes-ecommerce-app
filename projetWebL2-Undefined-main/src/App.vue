<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faCartShopping, faBagShopping, faHouse } from '@fortawesome/free-solid-svg-icons'

library.add(faCartShopping)
library.add(faBagShopping)
library.add(faHouse)
library.add(faUser)
</script>

<template>
  <header>
    <h1>Sapes.com</h1>
      <nav>
        <RouterLink class="nav-link" to="/"><font-awesome-icon icon="fa-solid fa-house" />Home</RouterLink>
        <RouterLink class="nav-link" to="/explore"><font-awesome-icon icon="fa-solid fa-bag-shopping" />Explore</RouterLink>
        <RouterLink class="nav-link" to="/cart"><font-awesome-icon icon="fa-solid fa-cart-shopping" />Cart</RouterLink>
        <RouterLink class="nav-link" to="/login" v-if="!idUser"><font-awesome-icon icon="fa-solid fa-user" />Login</RouterLink>
        <RouterLink class="nav-link" to="/user"  v-if="idUser"><font-awesome-icon icon="fa-solid fa-user" />My Account</RouterLink>
      </nav>
  </header>

  <RouterView />
  <footer>
    <div id="container-lien">
  <div id="lien"><RouterLink to ="/">Home</RouterLink></div> 
  <div id="lien"><RouterLink to ="/explore">Explore</RouterLink></div>
  <div id="lien"><RouterLink to ="/login">Se connecter</RouterLink></div>
  </div> 
  <div id="info-text">
  © Sapes2022
  </div>
  </footer>
</template>

<style scoped>

</style>
