const { createApp } = Vue

createApp({
  data() {
    return {
        articles: {},
        
      }
  },
  methods: {
  },
  computed: {
  },
  mounted() {
    axios.get("././services/Article.crud.php").then(response => {
      this.article = response.data;
      console.log("article :")
      
    });
  },
}).mount('#app')