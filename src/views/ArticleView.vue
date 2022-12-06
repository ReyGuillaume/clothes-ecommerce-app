<script>
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
  <div class="article-container">
    <div class="main-container">
        <img v-bind:src="article.image" class="article-img" alt="">

        <div class="infos-container">
            <h2>{{ article.name }}</h2>
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
    </div>

    <div class="details-container">
        <p>{{ article.description }}</p>
    </div>
  </div>
</template>

<style>
.article-container{
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 40px auto;
  padding: 20px;
}

.article-container .main-container{
  display: flex;
  position: relative;
}

.article-container img{
  width: 50%;
  max-width: 300px;
}

.details-container{
  margin-top: 50px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
