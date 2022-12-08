<script>
import axios from 'axios'

export default {
  data() {
    return {
      articles : [],
      idCart: null,
      number: 0,
      street: "",
      city: "",
      country: "",
    }
  },
  methods: {
    fetchCartContent(id_cart) {
      return axios
        .get(`cart/cart.php?function=retrieveCartContent&id_cart=${id_cart}`)
        .then(res => this.articles = res.data)
    },
    fetchCartContentLocal() {
      let params = [];
      JSON.parse(localStorage.getItem("cart_items")).forEach(article => {
        params.push(article[0])
      })
      console.log(params.join(','))
      return axios
        .get(`cart/cart.php?function=retrieveArticles&article_list=${article_list}`)
        .then(res => console.log(res))
    },
    fetchCartID(id) {
      return axios.get(`article/article.php?function=retrieveCartID&id_user=${id}`)
        .then(res => this.idCart = res.data[res.data.length -1].id)
    },

    createOrder() {
      const d = new Date()
      const day = d.getDate()
      const month = d.getMonth()
      const year = d.getFullYear()
      const date = `${year}-${month}-${day}`
      
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
    else{
      (async () => {
        console.log("bouuh il a pas de compte")
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

    <h2>A quelle adresse est déstinée cette commande ?</h2>
    <div class="address-form">
      <div>
        <label for="number">Numéro :</label>
        <input type="number" id="number" v-model="number" >
      </div>
      <div>
        <label for="street">Rue :</label>
        <input type="text" id="street" v-model="street" >
      </div>
      <div>
        <label for="city">Ville :</label>
        <input type="text" id="city" v-model="city" >
      </div>
      <div>
        <label for="country">Pays :</label>
        <input type="text" id="country" v-model="country" >
      </div>
    </div>

    <button @click="createOrder">Finaliser votre commande</button>
  </div>
</template>

<style>
</style>