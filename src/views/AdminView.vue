<script lang="js">

import app from '../main.js'
import axios from 'axios'

export default {
  data() {
  return {
    choice: null,
    categories: [],
    newCatName: "",
    brands: [],
    newBrandName: "",
  }
  },
  methods: {
    disconnectAdmin() {
        app.config.globalProperties.idAdmin = null
        this.$router.push('/login')
    },

    // ============ Category ================

    fetchCategories() {
      return axios.get("sql/Category.crud.php?function=readAllData")
        .then(res => this.categories = res.data)
    },
    async removeCategory(id) {
      await axios.get(`sql/Category.crud.php?function=delete&id=${id}`)
      this.fetchCategories()
    },
    async createCategory() {
      if ([this.newCatName].includes("")) {
        alert("L'un des champs est vide")
      } else {
        await axios.get(`sql/Category.crud.php?function=create&name=${this.newCatName}`)
        this.newCatName = ""
        this.fetchCategories()
      }
    },

    // ============ Brand ================

    fetchBrands() {
      return axios.get("sql/Brand.crud.php?function=readAllData")
        .then(res => this.brands = res.data)
    },
    async removeBrand(id) {
      await axios.get(`sql/Brand.crud.php?function=delete&id=${id}`)
      this.fetchBrands()
    },
    async createBrand() {
      if ([this.newBrandName].includes("")) {
        alert("L'un des champs est vide")
      } else {
        await axios.get(`sql/Brand.crud.php?function=create&name=${this.newBrandName}`)
        this.newBrandName = ""
        this.fetchBrands()
      }
    },
  },
  mounted() {
  if (!this.idAdmin) {
    this.$router.push('/login')
  }
  (async () => {
    await this.fetchCategories()
    await this.fetchBrands()
  })();
  },
}
</script>

<template>
  <main class="admin-container container">
    <button @click="disconnectAdmin" class="main-button">Deconnexion</button>

    <select name="admin select" v-model="choice">
      <option value="category">Category</option>
      <!-- <option value="subcategory">Subcategory</option> -->
      <!-- <option value="user">User</option> -->
      <option value="brand">Brand</option>
    </select>

    <div class="content">
      <div class="admin-null" v-if="choice == null">
        <h2>Selectionner une liste délément à modifier</h2>
      </div>

      <div class="admin-category" v-if="choice === 'category'">
        <table>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>action</th>
          </tr>
          <tr v-for="cat in categories">
            <td>{{cat.id}}</td>
            <td>{{cat.name}}</td>
            <td class="action"><button v-on:click="removeCategory(cat.id)"><font-awesome-icon icon="fa-solid fa-trash"/></button></td>
          </tr>
          <tr>
            <td></td>
            <td><input type="text" v-model="newCatName"></td>
            <td class="action"><button v-on:click="createCategory"><font-awesome-icon icon="fa-solid fa-plus"/></button></td>
          </tr>
        </table>
      </div>

      <div class="admin-brand" v-if="choice === 'brand'">
        <table>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>action</th>
          </tr>
          <tr v-for="brand in brands">
            <td>{{brand.id}}</td>
            <td>{{brand.name}}</td>
            <td class="action"><button v-on:click="removeBrand(brand.id)"><font-awesome-icon icon="fa-solid fa-trash"/></button></td>
          </tr>
          <tr>
            <td></td>
            <td><input type="text" v-model="newBrandName"></td>
            <td class="action"><button v-on:click="createBrand"><font-awesome-icon icon="fa-solid fa-plus"/></button></td>
          </tr>
        </table>
      </div>
    </div>

  </main>
</template>

<style>
.admin-null {
  color: #bebebe;
}
.admin-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3.5rem;
}
.admin-container > .main-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
.admin-container > select {
  font-size: 1rem;
  padding: .5rem;
}
.admin-container .content {
  font-size: 1.08rem;
}
.admin-container th,
.admin-container td {
  border: 1px #000 solid;
  padding: .2rem;
  margin: none;
}
.admin-container .action {
  display: flex;
  align-items: center;
  justify-content: center;
}
.admin-container .action > button {
  color: crimson;
  width: 100%;
}


</style>