<script lang="js">

import app from '../main.js'
import axios from 'axios'

export default {
  data() {
    return {
      model: "sign-in",
      mail: "",
      password: "",
      password_confirmation: "",
      firstname : "",
      lastname : "",
      phone_number : "",
      alert1: false,
      alert2: false,
      alert3: false,
      alert4: false,
      alert5: false,
      alert6: false,
      alert7: false,
      alert8: false,
      alert9: false,
    };
  },
  methods: {
    login: function () {
      if (this.mail == "") {
        if (this.password == "") {
        this.alert1 = true
        setTimeout(() =>  this.alert1 = false, 5000);
        } else {
        this.alert2 = true
        setTimeout(() =>  this.alert2 = false, 5000);
        }
      } else {
        if (this.password == "") {
          this.alert3 = true
          setTimeout(() =>  this.alert3 = false, 5000);
        } else {
          axios
            .get(
              "login/Login.php?mail=" + this.mail + "&password=" + this.password
            )
            .then((response) => {
              this.showAlert(response.data.message, response.data.id);
            });
        }
      }
    },

    showAlert(message, id) {
      switch (message) {
        case "userOK":
          app.config.globalProperties.idUser = id
          this.$router.push('/user')
          break;
        case "userNOKaddress":
          this.alert7 = true
          setTimeout(() =>  this.alert7 = false, 5000);
          break;
        case "userNOKpwd":
          this.alert8 = true
          setTimeout(() =>  this.alert8 = false, 5000);
          break;
        case "adminOK":
          app.config.globalProperties.idAdmin = id
          this.$router.push('/admin')
          break;
        default:
          break;
      }

    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    validatePhoneNumber(phone_number) {
      return String(phone_number).match(/\d+/g) && phone_number.length == 10;
    },

    handleSignUp() {
      if (!this.validateEmail(this.mail)) {
        this.alert4 = true
        setTimeout(() =>  this.alert4 = false, 5000);
        return;
      }

      if (!this.validatePhoneNumber(this.phone_number)) {
        this.alert5 = true
        setTimeout(() =>  this.alert5 = false, 5000);
        return;
      }

      if (this.password != this.password_confirmation) {
        this.password = "";
        this.password_confirmation = "";
        this.alert6 = true
        setTimeout(() =>  this.alert6 = false, 5000);
        return;
      }

      axios
        .get("login/signup.php", {
          params: {
            firstname: this.firstname,
            lastname: this.lastname,
            mail: this.mail,
            password: this.password,
            phone_number: this.phone_number,
          },
        })
        .then((response) => {
          if(response.data == "EAU"){
            this.alert9 = true
            setTimeout(() =>  this.alert9 = false, 5000);
            this.$forceUpdate();
            return;
          }
          if(response.data != null){
            app.config.globalProperties.idUser = response.data.user
            if (!(localStorage.getItem("cart_items") === null)){
              this.dumpCartLocalInDB(response.data.cart);
            }
          }
          this.$router.push('/user')
        }
      )
    },

        
    async dumpCartLocalInDB(id_cart){
      let cart_items = JSON.parse(localStorage.getItem("cart_items"));
      for(let eachArticle of cart_items){
        await axios.get(`article/article.php?function=createCartItem&id_cart=${id_cart}&id_article=${eachArticle[0]}&id_size=${eachArticle[1]}&quantity=${eachArticle[2]}`)
            .then(() => {
              localStorage.removeItem("cart_items")
              this.$forceUpdate();
            })
      }
    }
  },
  mounted() {
    if (this.idUser) {
      this.$router.push('/user')
    } else if(this.idAdmin) {
      this.$router.push('/admin')
    }

  }
};
</script>

<template>
  <div class="alert-popup" v-if="alert1">Veuillez renseigner l'adresse mail et le mot de passe</div>
  <div class="alert-popup" v-if="alert2">Veuillez renseigner l'adresse mail</div>
  <div class="alert-popup" v-if="alert3">Veuillez renseigner le mot de passe</div>
  <div class="alert-popup" v-if="alert4">Invalid e-mail format</div>
  <div class="alert-popup" v-if="alert5">Invalid phone number</div>
  <div class="alert-popup" v-if="alert6">Passwords don't match</div>
  <div class="alert-popup" v-if="alert7">Adresse incorrecte</div>
  <div class="alert-popup" v-if="alert8">Mot de passe incorrecte</div>
  <div class="alert-popup" v-if="alert9">Adresse e-mail déjà utilisée</div>

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
      <p>Vous n'avez pas de compte ? <a v-on:click="model = 'sign-up'">Inscrivez-vous ici</a></p>
    </div>
    
    <div class="sign-up login-form" v-else-if="(model == 'sign-up')">
      <h1 class="login-title">Sign up</h1>
      <div class="form">
        <div class="form-elt">
          <label for="Firstname">Firstname</label>
          <input
            type="text"
            id="Firstname"
            placeholder="Firstname"
            v-model="firstname"
          />
        </div>
        <div class="form-elt">
          <label for="Lastname">Lastname</label>
          <input
            type="text"
            id="Lastname"
            placeholder="Lastname"
            v-model="lastname"
          />
        </div>
        <div class="form-elt">
          <label for="mail">mail</label>
          <input
            type="text"
            id="mail"
            class="input-login"
            placeholder="E-mail"
            v-model="mail"
          />
        </div>
        <div class="form-elt">
          <label for="password">password</label>
          <input
            type="password"
            id="password"
            class="input-login"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="form-elt">
          <label for="password_confirmation">Confirm your password</label>
          <input
            type="password"
            id="password_confirmation"
            class="input-login"
            placeholder="Password Confirmation"
            v-model="password_confirmation"
          />
        </div>
        <div class="form-elt">
          <label for="Phone-Number">Phone number</label>
          <input
            type="text"
            id="Phone-Number"
            placeholder="Phone Number"
            v-model="phone_number"
          />
        </div>
        <input type="submit" class="full-button" value="Sign up" @click="handleSignUp" />
      </div>
      <p>Vous avez déjà un compte ? <a v-on:click="model = 'sign-in'">Connectez-vous ici</a></p>
    </div>
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
