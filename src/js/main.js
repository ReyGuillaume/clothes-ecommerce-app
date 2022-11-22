const { createApp } = Vue

createApp({
 data() {
  return {

    // ----- Variables d'affichage de page -----
    displayPages : {
      appLaunching : false,
      accueil : false,
      articleList : false, 
      article : false, 
      cart : false
    }, 

    // ----- Page article -----
    currentArticle : {}, 
    currentSubcategory:{}, 
    currentCategory:{}, 
    currentBrand:{}, 

    // ----- Page liste d'article -----
    articleList:[], 

  }
 },
 methods: {

  // ================ Display pages ================

  displayAccueil() {
    Object.keys(this.displayPages).forEach(key => this.displayPages[key] = false)
    this.displayPages.accueil = true
  }, 

  displayArticleListPage() {
    Object.keys(this.displayPages).forEach(key => this.displayPages[key] = false)
    this.displayPages.articleList = true
  }, 

  async displayArticlePage(idArticle) {
    Object.keys(this.displayPages).forEach(key => this.displayPages[key] = false)
    this.displayPages.article = true

    await this.setCurrentArticle(idArticle)
    this.setCurrentBrand(this.currentArticle.id_brand)
    await this.setCurrentSubcategory(this.currentArticle.id_subcategory)
    await this.setCurrentCategory(this.currentSubcategory.id_category)
  }, 

  // ================ Page Liste article ================

  getAllArticleId() {
    return fetch('./services/sql/Article.crud.php?function=readAll')
    .then(res => res.json())
    .then(res => {
        const arr = []
        res.forEach(element => arr.push(element.id))
        this.articlesId = arr
    })
  }, 

  getAllArticles() {
    return fetch('./services/sql/Article.crud.php?function=readAllData')
    .then(res => res.json())
    .then(res => this.articleList = res)
  }, 

  // ================ Page Article ================

  setCurrentArticle(id) {
    this.currentArticleID = id
    return fetch(`./services/sql/Article.crud.php?function=read&id=${id}`)
    .then(res => res.json())
    .then(res => [this.currentArticle] = res)
  }, 

  setCurrentSubcategory(id) {
    return fetch(`./services/sql/Subcategory.crud.php?function=read&id=${id}`)
    .then(res => res.json())
    .then(res => [this.currentSubcategory] = res)
  }, 

  setCurrentCategory(id) {
    return fetch(`./services/sql/Category.crud.php?function=read&id=${id}`)
    .then(res => res.json())
    .then(res => [this.currentCategory] = res)
  }, 

  setCurrentBrand(id) {
    return fetch(`./services/sql/Brand.crud.php?function=read&id=${id}`)
    .then(res => res.json())
    .then(res => [this.currentBrand] = res)
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
    this.displayPages = {
      appLaunching : true,
      accueil : false,
      articleList : false, 
      article : false, 
      cart : false
    }
    await this.getAllArticleId()
    await this.getAllArticles()
    await setTimeout(() => this.displayAccueil(), 1000)
  })()
 }
}).mount('#root')