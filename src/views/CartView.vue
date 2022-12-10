<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
      idCart: null,
      total_price : 0,
      total_quantity : 0,
    };
  },
  methods: {
    fetchCartContentOfUser(id_user) {
      return axios
        .get(`order/order.php?function=retrieveCartContent&id_user=${id_user}`)
        .then((res) => (this.articles = res.data));
    },

    updateData() {
      for (let article of this.articles) {
          this.total_price += article.price * article.quantity;
          this.total_quantity += article.quantity;
      }
    }

    // fetchCartContentLocal(){
    //   for(let cart_item of JSON.parse(localStorage.getItem("cart_items"))){
    //     let item = []
    //     item["id_article"] = cart_item[0]
    //     item["id_size"] = cart_item[1]
    //     item["quantity"] = cart_item[2]
    //     this.articles.push(item)
    //   }
    //   console.log(this.articles)
    // },
  },

  mounted() {
    if (this.idUser) {
      (async () => {
        await this.fetchCartContentOfUser(this.idUser);
        this.updateData();
      })();
    } else if (!(localStorage.getItem("cart_items") === null)) {
      (async () => {
        await this.fetchCartContentLocal();
      })();
    }
    console.log(this.articles.length);
  },
};
</script>

<template>
  <main>

    <div v-if="articles.length == 0" class="empty-cart">
      <h1>Panier</h1>
      <h2>Oh noooon.. Votre panier est vide.</h2>
      <router-link to="/explore">
        <button class="cart-redirect">Explorer notre catalogue</button>
      </router-link>
    </div>

    <div class="cart-container" v-else>
      <div class="left-container">
        <h1>Panier</h1>

        <div class="article-card" v-for="article in articles">
          <img v-bind:src="article.image" class="article-img" alt="" />

          <div class="article-data">
            <h3 class="name">{{ article.article_name }}</h3>
            <div class="brand">{{ article.brand_name }}</div>
            <div class="size"> Taille : {{ article.size_name }}</div>
            <div class="quantity">Quantité : {{ article.quantity }}</div>
          </div>

          <div class="article-end">
            <h3 class="price bold">{{ article.price * article.quantity }} €</h3>
            <font-awesome-icon icon="fa-solid fa-trash" />
          </div>
        </div>
      </div>

      <div class="right-container">
        <div class="cart-data">
          <h2>Récapitulatif</h2>
          <table>
            <tbody>
              <tr v-for="article in articles">
                <td>{{ article.article_name }}</td>
                <td>{{ article.price * article.quantity }} €</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Articles</td>
                <td>{{ total_quantity }}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{{ total_price }} €</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <router-link to="/order" v-if="this.idUser">
          <button class="cart-redirect">Passer commande</button>
        </router-link>
        <router-link to="/login" v-else>
          <button class="cart-redirect">Connectez-vous</button>
        </router-link>
      </div>

      
    </div>
  </main>
</template>

<style scoped>
main{
  width: 90%;
  min-height: 80vh;
  margin: auto;
}

h1, h2{
  font-weight: bold;
  margin-bottom: 10px;
}
.empty-cart{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}

.cart-container{
  display: flex;
}

.cart-container .left-container{
  flex: 3;
  margin-top: 30px;
  padding: 0px 20px;
}

.cart-container .right-container{
  flex: 1;
  margin-top: 30px;
  padding: 20px 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.article-card{
  border-bottom: 1px solid black;
  display: flex;
}

.article-img{
  width: 150px;
}

.cart-redirect{
  padding: 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.cart-redirect:hover{
  background-color: rgb(48, 48, 48);
  scale: 1.05;
}

table{
  width: 100%;
  border-collapse: collapse;
}

table{
  width: 100%;
}

tfoot tr td{
  font-weight: bold;
}
</style>
