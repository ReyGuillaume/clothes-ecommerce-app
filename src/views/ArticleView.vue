<script lang="js">

import axios from 'axios';

export default{
    props: {
      articleId: String
    },
    data() {
    return {
      article: [],
      stock: [],
      sizes: [],
      idCart: null,
      selectedSize: null,
      quantity: null,
      alert1: false,
      alert2: false,
    };
  },
  methods: {
    async fetchArticle() {
      axios
        .get("article/article.php?function=retrieveArticle&id=" + this.articleId)
        .then((response) => {
          this.article = response.data;
        }
      )
    },
    fetchStocks() {
      return axios
        .get("article/article.php?function=retrieveStock&id_article=" + this.articleId)
        .then((response) => {
          this.stock = response.data;
        }
      )
    },
    fetchSizes() {
      this.stock.forEach(elt => this.fetchSize(elt.id_size))
    }, 
    fetchSize(id) {
      axios
        .get("article/article.php?function=retrieveSizes&id=" + id)
        .then((response) => {
          const arr = [...this.sizes]
          arr.push(response.data)
          this.sizes = arr
        }
      )
    },

    fetchCartID(id) {
      return axios.get(`article/article.php?function=retrieveCartID&id_user=${id}`)
        .then(res => this.idCart = res.data[res.data.length -1].id)
    },

    handleAddToCart() {
      if (this.quantity && this.selectedSize && this.articleId) {
        if(this.idUser){
            axios
            .get(`article/article.php?function=createCartItem&id_cart=${this.idCart}&id_article=${this.articleId}&id_size=${this.selectedSize}&quantity=${Math.floor(this.quantity)}`)
            .then(() => alert("Article ajouté au panier"))
        }
        else{
            //Si l'user n'est pas connecté on stocke le produit dans le local storage du browser.
            let cart_items = [];
            if(!(localStorage.getItem("cart_items") === null)){
              cart_items = JSON.parse(localStorage.getItem("cart_items"));

              for(let index in cart_items){
                if(cart_items[index][0] == this.articleId && cart_items[index][1] == this.selectedSize){
                  //Si l'article est déjà dans le panier on incrémente simplement la quantité
                  
                  cart_items[index][2] += this.quantity;
                  localStorage.setItem("cart_items", JSON.stringify(cart_items))
                  return;
                }
              }
            }
          cart_items.push([this.articleId, this.selectedSize, this.quantity])
          localStorage.setItem("cart_items", JSON.stringify(cart_items))
        }
      } else {
          alert("Choisir une taille et une quantité")
      }
    }
  },
  mounted() {
    (async () => {
      await this.fetchArticle()
      await this.fetchStocks()
      this.fetchSizes()
      if (this.idUser)
        this.fetchCartID(this.idUser)
    })();
  },
}
</script>

<template>
  <div class="alert-popup ok" v-if="alert2">Article ajouté au panier</div>
  <div class="alert-popup" v-if="alert1">Choisir une taille et une quantité</div>
  <div class="article-container container">
    <h2>
      <RouterLink class="back-button" to="/explore">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </RouterLink>
      {{ article.name }}
    </h2>
    <div>
      <img v-bind:src="article.image" class="article-img" alt="Image de l'article">

      <div class="article-info">
        <div>
          <p class="price">{{ article.price }}€</p>
          
          <div class="sizes">
            <h3>Tailles disponibles en stock :</h3>
            <div v-for="size in sizes">
              <input type="radio" :id="size.name" name="size" :value="size.id" v-model="selectedSize" >
              <label :for="size.name">{{size.name}}</label>
            </div>

            <div v-if="selectedSize">
              <h3><label for="quantity">Combien en voulez-vous ?</label></h3>
              <input type="number" id="quantity" v-model="quantity" >
            </div>
          </div>

          <button class="full-button" @click="handleAddToCart" v-if="(this.sizes.length > 0)">
            <font-awesome-icon icon="fa-solid fa-plus" />
            Ajouter au panier
          </button>
          <p class="no-stock" v-if="(this.sizes.length === 0)">Cet article n'est pas disponible en stock</p>
        </div>
        <p>{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-container{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: minmax(85vw,45rem);
  margin: auto;
}
.article-container > * {
  width: 100%;
  max-width: 55rem;
}
.article-container > h2 {
  display: flex;
  align-items: center;
}
.article-container .back-button {
  font-size: 1.8rem;
  padding: 1rem;
  transition: .35s ease-in-out;
}
.article-container > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  height: 80%;
}
.article-container > div > * {
  width: 45%;
  min-width: 23rem;
  box-shadow: #5e5e5e 1px -1px 1px ;
  border-radius: .4rem;
  height: 100%;
}
.article-container .article-img {
  box-shadow: #5e5e5e -1px 1px 1px ;
  padding: 1.5rem;
  max-height: 35rem;
}
.article-container .article-info {
  display: flex;
  gap: 2.2rem;
  flex-direction: column;
  padding: 1.5rem;
}
.article-container .article-info > * {
  text-align: center;
}
.article-container .article-info > div:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.article-container .article-info .price {
  font-size: 1.8rem;
  text-align: right;
  font-weight: bold;
}
.article-container .article-info .full-button {
  margin: 1rem auto;
  text-align: center;
}
.article-container .article-info .second-button {
  text-align: center;
  margin: 1rem auto;
  transition: .25s ease-in-out;
  border: #5e5e5e 2px solid;
}
.article-container .article-info .second-button:hover {
  border: #fff 2px solid;
}
.article-container .article-info .no-stock {
  border: #dc143c 2px solid;
  color: #dc143c;
}

.article-container .article-info > p {
  text-align: left;
  font-style: italic;
  height: 20%;
}
@media screen and (min-width: 820px) {
  .article-container > div {
    flex-direction: row;
  }
}
</style>
