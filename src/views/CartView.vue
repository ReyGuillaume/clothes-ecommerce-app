<script>
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
  },
  mounted() {
    (async () => {
      if (this.idUser){
        await this.fetchCartID(this.idUser)
        await this.fetchCartContent(this.idCart)
        console.log(this.articles)
      }
    })();
  },
}
</script>

<template>
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

    <button>Finaliser votre commande</button>
  </div>
</template>

<style>
</style>