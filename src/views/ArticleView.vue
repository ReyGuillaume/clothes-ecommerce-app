<script>
import axios from 'axios';

export default{
    props: {
      articleId: String
    },
    data() {
    return {
      article: [],
    };
  },
  methods: {
    async fetchArticle() {
      await axios
        .get("article/article.php?function=retrieveArticle&id=" + this.articleId)
        .then((response) => {
          this.article = response.data;
        });
    },
  },
  mounted() {
    (async () => {
      await this.fetchArticle();
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
