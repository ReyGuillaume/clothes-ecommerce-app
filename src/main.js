import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faCartShopping, faBagShopping, faHouse , faTrash, faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faCartShopping)
library.add(faBagShopping)
library.add(faHouse)
library.add(faUser)
library.add(faTrash)
library.add(faPlus)
library.add(faChevronLeft)

// axios.defaults.baseURL = "http://localhost/projetWebL2-Undefined/src/services";
axios.defaults.baseURL = "./src/services";

const app = createApp(App)
app.use(router)
app.config.globalProperties.idUser = null;
app.config.globalProperties.idAdmin = null;
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

export default app;