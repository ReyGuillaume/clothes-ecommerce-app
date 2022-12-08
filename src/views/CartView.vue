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

    // fetchCartArticles() {
    //   let articles_id = [];
    //   JSON.parse(localStorage.getItem("cart_items")).forEach(article => {
    //     articles_id.push(article[0])
    //   })
    //   return axios
    //     .get(`cart/cart.php?function=retrieveArticles&articles_list=${articles_id.join(',')}`)
    //     .then(res => this.articles = res.data)
    // },

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