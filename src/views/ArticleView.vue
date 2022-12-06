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
  },
  mounted() {
    (async () => {
      await this.fetchArticle()
      await this.fetchStocks()
      this.fetchSizes()
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
                <input type="radio" :id="size.name" name="size" :value="size.id" >
                <label :for="size.name">{{size.name}}</label>
              </div>

            </div>

            <button><i class="fa-solid fa-plus"></i> Ajouter au panier</button>
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
