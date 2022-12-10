<script lang="js">
import axios from 'axios'

export default {
  data() {
    return {
      articles : [],
      idCart: null,
    }
  },
  methods: {
    fetchCartContent(id_cart) {
      return axios
        .get(`cart/cart.php?function=retrieveCartContent&id_cart=${id_cart}`)
        .then(res => this.articles = res.data)
    },
    fetchCartID(id) {
      return axios.get(`article/article.php?function=retrieveCartID&id_user=${id}`)
        .then(res => this.idCart = res.data[res.data.length -1].id)
    },
    fetchCartContentLocal(){
      for(let cart_item of JSON.parse(localStorage.getItem("cart_items"))){
        let item = []
        item["id_article"] = cart_item[0]
        item["id_size"] = cart_item[1]
        item["quantity"] = cart_item[2]
        this.articles.push(item)
      }
    },
    createOrder() {
      const d = new Date()
      const day = d.getDate()
      const mounth = d.getMonth()
      const year = d.getFullYear()
      const date = `${year}-${mounth}-${day}`
      
      if(![this.street, this.city, this.country].includes("")) {
        axios.get(`sql/Order.crud.php?function=create&id_user=${this.idUser}&id_cart=${this.idCart}&number=${this.number}&street=${this.street}&city=${this.city}&country=${this.country}&id_status=1&date=${date}`)
        .then(() => axios.get(`sql/Cart.crud.php?function=create&id_user=${this.idUser}`))
        .then(() => alert("Redirection vers un système de paiement"))
      }
    }
  },
  mounted() {
    if(this.idUser){
      (async () => {
        await this.fetchCartID(this.idUser)
        await this.fetchCartContent(this.idCart)
      })();
    }
    else if(!(localStorage.getItem("cart_items") === null)){
      (async () => {
        await this.fetchCartContentLocal()
      })();
    }
  },
}
</script>

<template>
  <div class="cart-container container">
    <h2 v-if="!this.idUser">Connectez-vous pour pouvoir faire vos achats en ligne</h2>
    <div v-if="this.idUser">
      <h2>Contenu de votre panier</h2>

      <table>
        <tr>
          <th>id_article</th>
          <th>id_size</th>
          <th>quantity</th>
        </tr>
        <tr v-for="art in articles">
          <td>{{art.id_article}}</td>
          <td>{{art.id_size}}</td>
          <td>{{art.quantity}}</td>
        </tr>
      </table>

    <router-link to="/order">Passer commande</router-link>
     <!-- <button @click="createOrder">Finaliser votre commande</button>  -->
     <RouterLink to ="/payement" @click="createOrder">Passer au payement</RouterLink>
    
    </div>
  </div>
</template>

<style>
</style>