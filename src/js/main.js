const { createApp } = Vue

createApp({
  data() {
    return {
        mail: "",
        password: "",
        articles: {},        
      }
  },
  methods: {

    //récupère le nombre de questions
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
          axios.get("services/sql/Login.php?mail="+this.mail+"&password="+this.password).then(
            response => 
            {
              window.alert(response.data);
            }
          );
        }
      }
    }

  },
  computed: {
  },
  mounted() {
  },
}).mount('#app')