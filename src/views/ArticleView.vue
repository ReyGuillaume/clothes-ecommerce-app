<script lang="js">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft)

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
      if (this.quantity && this.selectedSize && this.idCart && this.articleId) {
        axios
        .get(`article/article.php?function=createCartItem&id_cart=${this.idCart}&id_article=${this.articleId}&id_size=${this.selectedSize}&quantity=${Math.floor(this.quantity)}`)
        .then(() => alert("Article ajouté au panier"))
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
  <div class="article-container container">
    <div class="main-container">
      
      <div class="infos-container">
        <h2>
          <RouterLink class="back-button" to="/explore">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </RouterLink>
          {{ article.name }}
        </h2>
        <h2>{{ article.price }}€</h2>
        
        <div class="sizes">
          <h3>Tailles disponibles en stock :</h3>
          <div v-for="size in sizes">
            <input type="radio" :id="size.name" name="size" :value="size.id" v-model="selectedSize" >
            <label :for="size.name">{{size.name}}</label>
          </div>

          <div v-if="selectedSize">
            <label for="quantity">Combien en voulez-vous ?</label>
            <input type="number" id="quantity" v-model="quantity" >
          </div>
        </div>

        <button @click="handleAddToCart" v-if="(this.idUser && this.sizes.length > 0)"><i class="fa-solid fa-plus"></i> Ajouter au panier</button>
        <RouterLink to="/login" v-if="!this.idUser">Se connecter pour ajouter cet article au Panier</RouterLink>
        <p v-if="(this.sizes.length === 0)">Cet article n'est pas disponible en stoque</p>
      </div>
      <img v-bind:src="article.image" class="article-img" alt="">
    </div>
    
    <div class="details-container">
      <p>{{ article.description }}</p>
    </div>
  </div>
</template>

<style>
.article-container{
}

.article-container > .main-container{
  padding: 0 ;
}

.article-container .article-img{
}

.details-container{
}
</style>
