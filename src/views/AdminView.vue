<script lang="js">

import app from '../main.js'
import axios from 'axios'

export default {
  data() {
  return {
    choice: null,
    categories: [],
  }
  },
  methods: {
    disconnectAdmin() {
        app.config.globalProperties.idAdmin = null
        this.$router.push('/login')
    },
    fetchCategories() {
      return axios.get("sql/Category.crud.php?function=readAllData")
        .then(res => this.categories = res.data)
    },
    removeCategory(id) {
      return axios.get(`sql/Category.crud.php?function=delete&id=${id}`)
    },
  },
  mounted() {
  if (!this.idAdmin) {
    this.$router.push('/login')
  }
  (async () => {
    await this.fetchCategories()

  })();
  },
}
</script>

<template>
  <main class="admin-container container">
    <button @click="disconnectAdmin" class="main-button">Deconnexion</button>

    <select v-model="choice">
      <option value="category">Category</option>
      <option value="subcategory">Subcategory</option>
      <option value="user">User</option>
      <option value="brand">Brand</option>
    </select>

    <div class="content">
      <div class="admin-category" v-if="choice === 'category'">
        <table>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
          <tr v-for="cat in categories">
            <td>{{cat.id}}</td>
            <td>{{cat.name}}</td>
            <td><font-awesome-icon icon="fa-solid fa-trash" v-on:click="removeCategory(cat.id)"/></td>
          </tr>
          <tr>
            <!-- <td><font-awesome-icon icon="fa-solid fa-plus" v-on:click="removeCategory(cat.id)"/></td> -->
            <!-- ============= TODO Add cat ============= -->
          </tr>
        </table>
      </div>
    </div>

  </main>
</template>

<style>
.admin-container > .main-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
</style>