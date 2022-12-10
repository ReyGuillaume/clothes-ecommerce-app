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
        .get(`cart/cart.php?function=retrieveCartContent&id_user=${id_user}`)
        .then((res) => {
          this.articles = res.data
        });
    },

    updateData() {
      for (let article of this.articles) {
          this.total_price += article.price * article.quantity;
          this.total_quantity += article.quantity;
      }
    },

    async handleArticleRemove(id_cart, id_article, index){
      await axios
        .get(`cart/cart.php`, {
          params: {
            function: "removeArticleFromCart",
            id_cart: id_cart,
            id_article: id_article
          },
        })
        .then(this.articles.splice(index, 1));
    },

    async handleQuantityVariation(id_cart, id_article, id_size, quantity){
      await axios
        .get(`cart/cart.php`, {
          params: {
            function: "modifyQuantityOfCartArticle",
            id_cart: id_cart,
            id_article: id_article,
            id_size: id_size,
            quantity: quantity
          },
        })
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

    <div class="cart-container" v-if="articles.length">
      <div class="left-container">
        <h1>Panier</h1>

        <div class="article-card" v-for="(article, index) in articles">
          <router-link :to="{name : 'Article', params: { articleId: article.id_article }}">
            <img v-bind:src="article.image" class="article-img" alt="" />
          </router-link> 

          <div class="article-data">
            <h3 class="name">{{ article.article_name }}</h3>
            <div class="brand">{{ article.brand_name }}</div>
            <div class="size"> Taille : {{ article.size_name }}</div>
            <div class="quantity">
              Quantité : <input type="number" onkeydown="return false" v-on:change="handleQuantityVariation(article.id_cart, article.id_article, article.id_size, article.quantity)" name="quantity" v-bind:min="1" v-bind:max="article.max_quantity" v-model="article.quantity" v-bind:disabled="article.max_quantity == 1">
            </div>

            <div class="article-panel">
              <font-awesome-icon icon="fa-solid fa-trash" v-on:click="handleArticleRemove(article.id_cart, article.id_article, index)"/>
            </div>
          </div>

          <div class="article-price">
            {{ article.price * article.quantity }} €
          </div>
        </div>
      </div>

      <div class="right-container">
        <div class="cart-data">
          <h2>Récapitulatif</h2>
          <table>
            <tbody>
              <tr v-for="article in articles">
                <td>{{ article.article_name }} <span class="bold">x{{article.quantity}}</span></td>
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
  padding: 10px 0px;
  gap: 20px;
}

.article-price{
  margin-left: auto;
  font-weight: bold;
  font-size: 1.5rem;
}

.article-data{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.article-panel{
  margin-top: auto;
  font-size: 1.2rem;
}

.article-img{
  width: 150px;
  height: 150px;
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

.bold{
  font-weight: bold;
}
</style>
