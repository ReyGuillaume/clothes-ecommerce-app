<script>
import app from "../main.js";
import axios from "axios";

export default {
  data() {
    return {
      model: "sign-in",
      mail: "",
      password: "",
      password_confirmation: "",
      firstname: "",
      lastname: "",
      phone_number: "",
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
      let res = null;
      switch (message) {
        case "userOK":
          app.config.globalProperties.idUser = id;
          break;
        case "userNOKaddress":
          res = "Adresse incorrecte";
          break;
        case "userNOKpwd":
          res = "Mot de passe incorrect";
          break;
        case "adminOK":
          app.config.globalProperties.idAdmin = id;
          break;
        default:
          break;
      }
      if (res) alert(res);
      this.$forceUpdate();
    },

    forceUpdate() {
      this.$forceUpdate();
    },

    validateEmail: function (email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },

    validatePhoneNumber: function (phone_number) {
      return String(phone_number).match(/\d+/g) && phone_number.length == 10;
    },

    handleSignUp: function () {
      if (!this.validateEmail(this.mail)) {
        console.log("Invalid e-mail format.");
        return;
      }

      if (!this.validatePhoneNumber(this.phone_number)) {
        console.log("Invalid phone number.");
        return;
      }

      if (this.password != this.password_confirmation) {
        this.password = "";
        this.password_confirmation = "";
        console.log("Passwords don't match.");
        return;
      }

      axios.get("login/signup.php", {
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
          alert("Congratulations, you can now log in.")
          this.model = "sign-in"
        });
    },
  },
  mounted() {},
};
</script>

<template>
  <div v-if="!this.idUser && !this.idAdmin">
    <div class="login-container sign-in" v-if="model == 'sign-in'">
      <h1 class="login-title">Sign in</h1>
      <div class="form-elt">
        <input
          type="text"
          id="mail"
          class="input-login"
          placeholder="E-mail"
          v-model="mail"
        />
      </div>
      <div class="form-elt">
        <input
          type="password"
          id="password"
          class="input-login"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <input type="submit" value="Sign-in" @click="login" />
      <p v-if="model == 'sign-in'">
        Vous n'avez pas de compte
        <a v-on:click="model = 'sign-up'">inscrivez-vous</a>.
      </p>
    </div>

    <div class="login-container sign-up" v-else-if="model == 'sign-up'">
      <h1 class="login-title">Sign up</h1>
      <div class="form-elt">
        <input
          type="text"
          id="Firstname"
          placeholder="Firstname"
          v-model="firstname"
        />
      </div>
      <div class="form-elt">
        <input
          type="text"
          id="Lastname"
          placeholder="Lastname"
          v-model="lastname"
        />
      </div>
      <div class="form-elt">
        <input
          type="text"
          id="mail"
          class="input-login"
          placeholder="E-mail"
          v-model="mail"
        />
      </div>
      <div class="form-elt">
        <input
          type="password"
          id="password"
          class="input-login"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form-elt">
        <input
          type="password"
          id="password_confirmation"
          class="input-login"
          placeholder="Password Confirmation"
          v-model="password_confirmation"
        />
      </div>
      <div class="form-elt">
        <input
          type="text"
          id="Phone-Number"
          placeholder="Phone Number"
          v-model="phone_number"
        />
      </div>
      <input type="submit" value="Sign up" @click="handleSignUp" />
      <p v-if="model == 'sign-up'">
        Vous avez un compte
        <a v-on:click="model = 'sign-in'">connectez-vous</a>.
      </p>
    </div>
  </div>

  <div v-if="idAdmin">
    <h1>Partie admin</h1>
    <p>admin id : {{ this.idAdmin }}</p>
  </div>

  <div v-else-if="idUser && !idAdmin">
    <h1>Partie user</h1>
    <p>user id : {{ this.idUser }}</p>
  </div>
</template>

<style scoped>
.login-container {
  width: 400px;
  margin: 40px auto;
  padding: 40px 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

input {
  padding: 10px 15px;
}

input[type="submit"] {
  cursor: pointer;
  background-color: crimson;
  color: white;
  border: 1px solid black;
  border-radius: 10px;
}

p {
  font-size: 1rem;
}
</style>
