const Home = {
  template:'#home',
  name : 'Home'
}

const SearchArticle = {
  template:'<h1>Search Article</h1>',
  name : 'SearchArticle'
}

const UserProfile = {
  template:'<h1>User Profile</h1>',
  name : 'UserProfile'
}

const router = new VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),

  routes : [
    { path: '/', component: Home, name : 'Home' },
    { path: '/search-article', component: SearchArticle, name : 'SearchArticle'},
    { path: '/user-profile', component: UserProfile, name : 'UserProfile' },
  ]
})

const app = Vue.createApp({})

app.use(router)
app.mount('#app')