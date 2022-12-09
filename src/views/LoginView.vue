<script lang="js">
import app from '../main.js'
import axios from 'axios'

export default {
    data() {
    return {
      model: "sign-in",
      mail: "",
      password: "",
      firstname : "",
      lastname : "",
      phone_number : "",
    };
  },
  methods: {
    login: function () {
      if (this.mail == "") {
        if (this.password == "") {
          window.alert("Veuillez renseigner l'adresse mail et le mot de passe");
        } else {
          window.alert("Veuillez renseigner l'adresse mail");
        }
      } else {
        if (this.password == "") {
          window.alert("Veuillez renseigner le mot de passe");
        } else {
          axios.get("login/Login.php?mail="+this.mail+"&password="+this.password).then(
            response => 
            {
              this.showAlert(response.data.message, response.data.id)
            }
          )
        }
      }
    },

    showAlert(message, id) {
      let res = null
      switch (message) {
        case "userOK":
          app.config.globalProperties.idUser = id
          break;
        case "userNOKaddress":
          res = "Adresse incorrecte"
          break;
        case "userNOKpwd":
          res = "Mot de passe incorrect"
          break;
        case "adminOK":
          app.config.globalProperties.idAdmin = id
          break;
        default:
          break;
      }
      if(res)
        alert(res)
      this.$forceUpdate()
    }, 
    forceUpdate() {
      this.$forceUpdate();
    },

    handleSignUp : function(){

    }
  },
  mounted() {

  },
}
</script>

<template>
  <div class="login-container container" v-if="(!this.idUser && !this.idAdmin)">
    <div class="sign-in login-form" v-if="(model == 'sign-in')">
        <h1 class="login-title">Sign in</h1>
        <div class="form">
          <div class="form-elt">
            <label for="mail">Adresse e-mail</label>
            <input type="text" id="mail" class="input-login" placeholder="E-mail" v-model="mail">
          </div>
          <div class="form-elt">
            <label for="password">password</label>
            <input type="password" id="password" class="input-login" placeholder="Password" v-model="password">
          </div>
        </div>
        <input type="submit" class="full-button" value="Sign-in" @click="login">
    </div>
    
    <div class="sign-up login-form" v-else-if="(model == 'sign-up')">
      <h1 class="login-title">Sign up</h1>
      <div class="form">
        <div class="form-elt">
          <label for="mail">Adresse e-mail</label>
          <input type="text" id="mail" class="input-login" placeholder="E-mail" v-model="mail">
        </div>
        <div class="form-elt">
          <label for="Firstname">Firstname</label>
          <input type="text" id="Firstname" placeholder="Firstname">
        </div>
        <div class="form-elt">
          <label for="Lastname">Lastname</label>
          <input type="text" id="Lastname" placeholder="Lastname">
        </div>
        <div class="form-elt">
          <label for="Phone-Number">Phone Number</label>
          <input type="text" id="Phone-Number" placeholder="Phone Number">
        </div>
      </div>
      <input type="submit" class="full-button" value="Sign up">
    </div>

    <p v-if="model == 'sign-in'">Vous n'avez pas de compte ? <a v-on:click="model = 'sign-up'">Inscrivez-vous ici</a></p>
    <p v-if="model == 'sign-up'">Vous avez déjà un compte ? <a v-on:click="model = 'sign-in'">Connectez-vous ici</a></p>
  </div>

  <div  class="admin-container container"  v-if="idAdmin">
    <h1>Partie admin</h1>
    <p>admin id : {{this.idAdmin}}</p>
  </div>

  <div  class="user-container container"  v-else-if="idUser && !idAdmin">
    <h1>Partie user</h1>
    <p>user id : {{this.idUser}}</p>
  </div>
</template>

<style>
.login-form {
  margin: auto;
  width: 25rem;
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: .75rem;
  overflow: hidden;
  border-radius: 5%;
  transition: .25s ease-in;
  box-shadow: #5e5e5e 1px 1px 1px ;
  background-color: #5e5e5e02;
  margin-bottom: 1rem;
}
.login-form > .form {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: .9rem;
}
.login-form > .form > .form-elt {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.login-form > .form input {
  padding: .5rem;
  outline: #5e5e5e 2px;
  font-size: 1.05rem;
}
.login-form .main-button {
  margin: auto;
}
.login-container > p {
  margin-left: 10vw;
}
.login-container > p > a {
  display: inline-block;
  padding: 1rem;
  transform: scale(1.15);
  transition: .5s ease-in-out;
}
.login-container > p > a:hover {
  transform: scale(1.05);
}

</style>