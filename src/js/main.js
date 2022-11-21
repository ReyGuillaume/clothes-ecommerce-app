const { createApp } = Vue

createApp({
 data() {
  return {
    displayPages : {
      articleList : true, 
      article : false, 
      cart : false
    }, 
    article : {}, subcategory:{}, 
  }
 },
 methods: {

  getAllArticles() {
    return this.articlesId.forEach(id => {
      fetch(`./services/sql/Article.crud.php?function=read&id=${id}`)

    })
    
    .then(res => res.json())
    .then(res => {
        const arr = []
        res.forEach(element => arr.push(element.id))
        this.articlesId = arr
    })
  }, 

  setArticle(id) {
    this.currentArticleID = id
    return fetch(`./services/sql/Article.crud.php?function=read&id=${id}`)
    .then(res => res.json())
    .then(res => [this.article] = res)
  }, 

  setSubcategory(id) {
    fetch(`./services/sql/Subcategory.crud.php?function=read&id=${id}`)
    .then(res => res.json())
    .then(res => [this.subcategory] = res)
    return
  }, 

  getAllArticleId() {
    return fetch('./services/sql/Article.crud.php?function=readall')
    .then(res => res.json())
    .then(res => {
        const arr = []
        res.forEach(element => arr.push(element.id))
        this.articlesId = arr
    })
  }, 

  displayArticleListPage() {
    this.displayPages.articleList = true
    this.displayPages.article = false
    this.displayPages.cart = false
  }, 

  displayArticlePage(id) {
    this.displayPages.articleList = false
    this.displayPages.article = true
    this.displayPages.cart = false
    this.setArticle(id)
    this.setSubcategory(this.article.id_subcategory)
    console.log(this.subcategory)
  }, 
  deleteFromCart(id) {
    alert("supprimé")
  }, 
  addToCart(id) {
    alert("ajouté")
  }

 },
 computed: {
 },
 mounted() {
  (async () => {
    await this.getAllArticleId()
    await this.getAllArticles()
  })()
 }
}).mount('#root')