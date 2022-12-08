<script>
import axios from 'axios'

export default {
  data() {
    return {
      articles : [],
      idCart: null
    }
  },
  methods: {
    fetchCartContent(id_cart) {
      return axios
        .get(`cart/cart.php?function=retrieveCartContent&id_cart=${id_cart}`)
        .then(res => this.articles = res.data)
    },

    fetchCartContentLocal(){
      for(let cart_item of JSON.parse(localStorage.getItem("cart_items"))){
        let item = []
        item["id_article"] = cart_item[0]
        item["id_size"] = cart_item[1]
        item["quantity"] = cart_item[2]
        this.articles.push(item)
      }
      console.log(this.articles)
    },

    fetchCartID(id) {
      return axios.get(`article/article.php?function=retrieveCartID&id_user=${id}`)
        .then(res => this.idCart = res.data[res.data.length -1].id)
    },

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
  <h2 v-if="!this.idUser">Connectez-vous pour pouvoir faire vos achats en ligne</h2>
  <div>
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
  </div>
</template>

<style>
</style>