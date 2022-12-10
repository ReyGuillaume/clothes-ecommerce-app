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
    };
  },
  methods: {
    login: function () {
      if (this.mail == "") {
        if (this.password == "") {
          alert("Veuillez renseigner l'adresse mail et le mot de passe");
        } else {
          alert("Veuillez renseigner l'adresse mail");
        }
      } else {
        if (this.password == "") {
          alert("Veuillez renseigner le mot de passe");
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
          this.$router.push('/user')
          break;
        case "userNOKaddress":
          res = "Adresse incorrecte"
          break;
        case "userNOKpwd":
          res = "Mot de passe incorrect"
          break;
        case "adminOK":
          app.config.globalProperties.idAdmin = id
          this.$router.push('/admin')
          break;
        default:
          break;
      }
      if(res)
        alert(res)

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
        alert("Invalid e-mail format.");
        return;
      }

      if (!this.validatePhoneNumber(this.phone_number)) {
        alert("Invalid phone number.");
        return;
      }

      if (this.password != this.password_confirmation) {
        this.password = "";
        this.password_confirmation = "";
        alert("Passwords don't match.");
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
            alert("E-mail already used.");
            this.$forceUpdate();
            return;
          }
          app.config.globalProperties.idUser = response.data;
        }
      )
    },
  },
  mounted() {
    if (this.idUser) {
      this.$router.push('/user')
    } else if(this.idAdmin) {
      this.$router.push('/admin')
    }
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