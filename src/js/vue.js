const Home = {
  template:'#home',
  name : 'Home'
}

const SearchArticle = {
  template:'#search-page',
  name : 'SearchArticle',
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
        .get(
          "services/search_page/search_page.php?function=retrieveAllArticles"
        )
        .then((response) => {
          this.articles = response.data;
          this.filtered_articles = response.data;
        });
    },

    fetchAllBrands() {
      axios
        .get("services/search_page/search_page.php?function=retrieveAllBrands")
        .then((response) => {
          this.brands = response.data;
        });
    },

    fetchAllGenders() {
      axios
        .get("services/search_page/search_page.php?function=retrieveAllGenders")
        .then((response) => {
          this.genders = response.data;
        });
    },

    fetchAllCategories() {
      axios
        .get(
          "services/search_page/search_page.php?function=retrieveAllCategories"
        )
        .then((response) => {
          this.categories = response.data;
        });
    },

    fetchAllSubCategories() {
      axios
        .get(
          "services/search_page/search_page.php?function=retrieveAllSubCategories"
        )
        .then((response) => {
          this.sub_categories = response.data;
          this.displayed_sub_categories = response.data;
        });
    },

    async handleFilterChange() {
      url = "services/search_page/search_page.php?function=retrieveArticlesFiltered"
              + "&gender_key=" + (this.gender_key != 0 ? this.gender_key : "")
              + "&brand_key=" + (this.brand_key != 0 ? this.brand_key : "")
              + "&category_key=" + (this.category_key != 0 ? this.category_key : "")
              + "&subcategory_key=" + (this.sub_category_key != 0 ? this.sub_category_key : "");

      await axios.get(url)
      .then((response) => {
        this.filtered_articles = response.data;
      });
    },

    handleCategoryChange() {
      temp_displayed_sub_category = [];
      this.sub_category_key = 0;
      for (sub_category of this.sub_categories) {
        if (sub_category.id_category == this.category_key) {
          temp_displayed_sub_category.push(sub_category);
        }
      }
      this.displayed_sub_categories = temp_displayed_sub_category;
      this.handleFilterChange();
    },

    handleResetFilters(){
      this.gender_key = 0;
      this.brand_key = 0; 
      this.category_key = 0; 
      this.sub_category_key = 0;
      this.filtered_articles = this.articles;
    }
  },
  mounted() {
    (async () => {
      await this.fetchAllArticles();
      await this.fetchAllBrands();
      await this.fetchAllGenders();
      await this.fetchAllCategories();
      await this.fetchAllSubCategories();
    })();

    this.loaded = true
  }
}

const ArticlePage = {
  template:'#article',
  name : 'ArticlePage',
  data() {
    return {
      id_article : this.$route.params.id,
      article : [],
    };
  },
  methods: {
    async fetchArticle(){
      await axios.get("services/article_page/article.php?function=retrieveArticle&id=" + this.id_article)
        .then((response) => {
          console.log(response.data)
          this.article = response.data;
        });
    }
  },
  mounted() {
    (async () => {
      await this.fetchArticle();
      console.log(this.article)
    })();
  }
}

const UserProfile = {
  template:'#user-profile',
  name : 'UserProfile',
  data() {
    return {
      mail: "",
      password: "",
      id_article : this.$route.params.id,
      article : [],
    };
  },
  methods: {
    Login: function()
    {
      if(this.mail == "")
      {
        if(this.password == "")
        {
          window.alert("Veuillez renseigner l'adresse mail et le mot de passe")
        }

        else
        {
          window.alert("Veuillez renseigner l'adresse mail")
        }    
      }

      else
      {
        if(this.password == "")
        {
          window.alert("Veuillez renseigner le mot de passe")
        }

        else
        {;
          axios.get("services/login/Login.php?mail="+this.mail+"&password="+this.password).then(
            response => 
            {
              window.alert(response.data);
            }
          );
        }
      }
    }
  },
  mounted() {

  }
}

const router = new VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),

  routes : [
    { path: '/', component: Home, name : 'Home' },
    { path: '/search-article', component: SearchArticle, name : 'SearchArticle'},
    { path: '/article/:id', component: ArticlePage, name : 'ArticlePage'},
    { path: '/user-profile', component: UserProfile, name : 'UserProfile' },
  ]
})

const app = Vue.createApp({})

app.use(router)
app.mount('#app')