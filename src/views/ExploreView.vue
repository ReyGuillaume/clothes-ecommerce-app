<script>
import axios from 'axios';

export default {
    data() {
    return {
      articles: [],
      filtered_articles: [],
      brands: [],
      genders: [],
      categories: [],
      sub_categories: [],
      displayed_sub_categories: [],
      gender_key: 0,
      brand_key: 0,
      category_key: 0,
      sub_category_key: 0,
      loaded: false,
    };
  },
  methods: {
    fetchAllArticles() {
      axios
        .get("explore/explore.php?function=retrieveAllArticles")
        .then((response) => {
          this.articles = response.data;
          this.filtered_articles = response.data;
        });
    },

    fetchAllBrands() {
      axios
        .get("explore/explore.php?function=retrieveAllBrands")
        .then((response) => {
          this.brands = response.data;
        });
    },

    fetchAllGenders() {
      axios
        .get("explore/explore.php?function=retrieveAllGenders")
        .then((response) => {
          this.genders = response.data;
        });
    },

    fetchAllCategories() {
      axios
        .get(
          "explore/explore.php?function=retrieveAllCategories"
        )
        .then((response) => {
          this.categories = response.data;
        });
    },

    fetchAllSubCategories() {
      axios
        .get(
          "explore/explore.php?function=retrieveAllSubCategories"
        )
        .then((response) => {
          this.sub_categories = response.data;
          this.displayed_sub_categories = response.data;
        });
    },

    async handleFilterChange() {
      let url =
        "explore/explore.php?function=retrieveArticlesFiltered" +
        "&gender_key=" +
        (this.gender_key != 0 ? this.gender_key : "") +
        "&brand_key=" +
        (this.brand_key != 0 ? this.brand_key : "") +
        "&category_key=" +
        (this.category_key != 0 ? this.category_key : "") +
        "&subcategory_key=" +
        (this.sub_category_key != 0 ? this.sub_category_key : "");

      await axios.get(url).then((response) => {
        this.filtered_articles = response.data;
        console.log(response.data);
      });
    },

    handleCategoryChange() {
      let temp_displayed_sub_category = [];
      console.log(temp_displayed_sub_category)
      this.sub_category_key = 0;
      for(let sub_category of this.sub_categories) {
        if (sub_category.id_category == this.category_key) {
          temp_displayed_sub_category.push(sub_category);
        }
      }
      this.displayed_sub_categories = temp_displayed_sub_category;
      this.handleFilterChange();
    },

    handleResetFilters() {
      this.gender_key = 0;
      this.brand_key = 0;
      this.category_key = 0;
      this.sub_category_key = 0;
      this.filtered_articles = this.articles;
    },
  },
  mounted() {
    (async () => {
      await this.fetchAllArticles();
      await this.fetchAllBrands();
      await this.fetchAllGenders();
      await this.fetchAllCategories();
      await this.fetchAllSubCategories();
    })();

    this.loaded = true;
  },
}
</script>


<template>
    <div class="explore-container"  v-if="loaded">
        <div class="filters-container">
          <select name="gender" id="gender-select" @change="handleFilterChange()" v-model="gender_key">
            <option :value="0" selected>Universel</option>
            <option v-for="gender in genders" :value="gender.id">{{ gender.name }}</option>
          </select>
  
          <select name="brand" id="brand-key" @change="handleFilterChange()" v-model="brand_key">
            <option :value="0" selected>Toutes Marques</option>
            <option v-for="brand in brands" :value="brand.id">{{ brand.name }}</option>
          </select>
  
          <select name="category" id="category_select" @change="handleCategoryChange()" v-model="category_key">
            <option :value="0" selected>Toutes Catégories</option>
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
          </select>
  
          <select name="sub-category" id="sub-category-select" @change="handleFilterChange()" v-model="sub_category_key" v-if="category_key != 0">
            <option :value="0" selected>Toutes Sous Catégories</option>
            <option v-for="sub_category in displayed_sub_categories" :value="sub_category.id">{{ sub_category.name }}</option>
          </select>
  
          <button class="reset-filters" v-on:click="handleResetFilters">Reset</button>
        </div>
  
        <div class="articles-container">
          <div class="article-card" v-for="article in filtered_articles" v-bind:id="article.id">
            <router-link  :to="{name : 'Article', params: { articleId: article.id }}">
                <img v-bind:src="article.image" class="article-img" alt="">
                <h4 class="name">{{ article.name }}</h4>
                <h4 class="price">{{ article.price }} €</h4>
            </router-link>
          </div>
        </div>
      </div>
</template>

<style>
.articles-container{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.filters-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
  gap: 20px;
}

.article-card{
  border: 1px solid black;
  padding: 20px;
}

.article-card .article-img{
  display: block;
  width: 200px;
  height: 200px;
}

.reset-filters{
  background-color: red;
  color: white;
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>