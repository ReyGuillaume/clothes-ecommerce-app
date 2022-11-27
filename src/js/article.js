
const { createApp } = Vue

createApp({
 data() {
  return {
    articles : [],

  }
 },
 methods: {
    
 },
 mounted() {
    await axios.get("services/sign-up/sign-up.php?function=emailExists&mail=" + this.mail)
            .then(response =>{
                return response.data
            })
    }
}).mount('#root')
