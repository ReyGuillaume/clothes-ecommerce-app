
const { createApp } = Vue

createApp({
  data() {
    return {
        articles: [],
        name: "",
        id_size:1,
        id_subcategory:1,
        id_gender:1,
        id_brand:1,
        price:0,
        description:"",
        image:""
        
        
      }
  },
  methods: {
    // setArticle: function(){
    //   for (let article of this.articles){
    //     console.log(article)
    //     this.name=article["name"]
    //     this.id_size=article["id_size"]
    //     this.id_subcategory=article["id_subcategory"]
    //     this.id_gender=article["id_gender"]
    //     this.id_brand=article["id_brand"]
    //     this.price=article["price"]
    //     this.description=article["description"]
    //     this.image=article["image"]
    //    // console.log(this.name,id_size, id_subcategory, id_gender, id_brand, price, description, image)
    //   }
    // }
  },
  computed: {
  },
  mounted() {
    
    axios.get("services/sql/Article.crud.php?function=readall").then(response => {
      this.articles=response.data;
      //this.setArticle()
      console.log(response.data)
    });
  },
}).mount('#app')