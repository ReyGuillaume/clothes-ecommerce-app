const { createApp } = Vue;

createApp({
  data() {
    return {
      articles: [],
      filtered_articles : [],
      brands: [],
      genders: [],
      categories: [],
      sub_categories: [],
      gender_key : 0,
      brand_key : 0,
      category_key : 0,
      sub_category_key : 0,
      loaded : false,
    };
  },
  methods: {
    fetchAllArticles(){
        axios
        .get("services/search_page/search_page.php?function=retrieveAllArticles")
        .then((response) => {
          this.articles = response.data;
          this.filtered_articles = response.data;
        }); 
    },

    fetchAllBrands(){
      axios
      .get("services/search_page/search_page.php?function=retrieveAllBrands")
      .then((response) => {
        this.brands = response.data;
      });
    },

    fetchAllGenders(){
      axios
      .get("services/search_page/search_page.php?function=retrieveAllGenders")
      .then((response) => {
        this.genders = response.data;
      });
    },

    fetchAllCategories(){
      axios
      .get("services/search_page/search_page.php?function=retrieveAllCategories")
      .then((response) => {
        this.categories = response.data;
      });
    },

    fetchAllSubCategories(){
      axios
      .get("services/search_page/search_page.php?function=retrieveAllSubCategories")
      .then((response) => {
        this.sub_categories = response.data;
      });
    },

    handleFilterChange(){
      temp_filtered_articles = []

      filters = [this.brand_key, this.gender_key]
      console.log(filters)

      for(article of this.articles){
        id(article.id_brand != 0){
          
        }

        if(article.id_brand == this.brand_key){
            temp_filtered_articles.push(article)
          }
      }
      this.filtered_articles = temp_filtered_articles;
    },
    
  },
  mounted() {
    (async () => {
      await this.fetchAllArticles()
      await this.fetchAllBrands()
      await this.fetchAllGenders()
      await this.fetchAllCategories()
      await this.fetchAllSubCategories()
    })();

    setTimeout(() => this.loaded = true, 1000);
  },
}).mount("#app");
