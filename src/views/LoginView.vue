<script>
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
    <div class="sign-in" v-if="(model == 'sign-in')">
        <h1 class="login-title">Sign in</h1>
        <div class="form-elt">
          <label for="mail">Adresse e-mail</label>
          <input type="text" id="mail" class="input-login" placeholder="E-mail" v-model="mail">
        </div>
        <div class="form-elt">
          <label for="password">password</label>
          <input type="password" id="password" class="input-login" placeholder="Password" v-model="password">
        </div>
        <input type="submit" value="Sign-in" @click="login">
    </div>
    
    <div class="sign-up" v-else-if="(model == 'sign-up')">
      <h1 class="login-title">Sign up</h1>
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
      <input type="submit"  value="Sign up">
    </div>

    <p v-if="model == 'sign-in'">Vous n'avez pas de compte <a v-on:click="model = 'sign-up'">inscrivez-vous</a></p>
    <p v-if="model == 'sign-up'">Vous avez un compte <a v-on:click="model = 'sign-in'">connectez-vous</a></p>
  </div>

  <div v-if="idAdmin">
    <h1>Partie admin</h1>
    <p>admin id : {{this.idAdmin}}</p>
  </div>

  <div v-else-if="idUser && !idAdmin">
    <h1>Partie user</h1>
    <p>user id : {{this.idUser}}</p>
  </div>
</template>

<style>
    .login-container{
        width: 400px;
        margin: 40px auto;
        padding: 40px 0px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .login-form{
        display: flex;
        flex-direction: column;
        width: 80%;
        gap: 10px
    }

    input{
        padding: 10px 20px
    }

    input[type="submit"]{
        cursor: pointer;
        background-color: crimson;
        color:white;
        border: 1px solid black;

        border-radius: 10px;
    }

    p{
      font-size: 1rem;
    }
</style>