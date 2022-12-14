<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Sapes.com</h1>
    <nav>
      <RouterLink class="nav-link" to="/"><font-awesome-icon icon="fa-solid fa-house" />Accueil</RouterLink>
      <RouterLink class="nav-link" to="/explore"><font-awesome-icon icon="fa-solid fa-bag-shopping" />Catalogue</RouterLink>
      <RouterLink class="nav-link" to="/cart"><font-awesome-icon icon="fa-solid fa-cart-shopping" />Panier</RouterLink>
      <RouterLink class="nav-link" to="/login"><font-awesome-icon icon="fa-solid fa-user" />Se connecter</RouterLink>
    </nav>
  </header>

  <RouterView />

  <footer>
    <div class="container-lien">
      <div class="lien"><RouterLink to ="/">Accueil</RouterLink></div> 
      <div class="lien"><RouterLink to ="/explore">Catalogue</RouterLink></div>
      <div class="lien"><RouterLink to ="/login">Se connecter</RouterLink></div>
      <div class="lien"><RouterLink to ="/">Mentions légales</RouterLink></div> 
    </div> 
    <div class="info-text">© Sapes2022</div>
  </footer>
</template>

<style scoped>

</style>
