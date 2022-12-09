import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import './assets/main.css'

axios.defaults.baseURL = "http://localhost/projetWebL2-Undefined-main/src/services";

const app = createApp(App)
app.use(router)
app.config.globalProperties.idUser = null;
app.config.globalProperties.idAdmin = null;
app.mount('#app')

export default app;