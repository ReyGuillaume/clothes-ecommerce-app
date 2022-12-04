<script>
export default {
    data() {
    return {
      model: "login",
      mail: "",
      password: "",
      firstname : "",
      lastname : "",
      phone_number : "",
    };
  },
  methods: {
    Login: function () {
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
              "services/login/Login.php?mail=" +
                this.mail +
                "&password=" +
                this.password
            )
            .then((response) => {
              window.alert(response.data);
            });
        }
      }
    },


    handleSignUp : function(){

    }

  },
  mounted() {},
}
</script>

<template>
    <div class="login-container">   
        <h1 class="login-title">Sign in</h1>
        <div class="login-form">
            <input type="text" id="mail" class="input-login" name="mail" placeholder="E-mail" v-model="mail">
            <input type="text" placeholder="Firstname" v-if="model == 'sign-up'">
            <input type="text" placeholder="Lastname" v-if="model == 'sign-up'">
            <input type="text" placeholder="Phone Number" v-if="model == 'sign-up'">

            <input type="password" id="password" class="input-login" name="password" placeholder="Password" v-model="password">
            <input type="submit" value="Login" v-if="model == 'login'">
            <input type="submit"  value="Sign up" v-if="model == 'sign-up'">
        </div>
        <p v-if="model == 'login'">Vous n'avez pas de compte <a v-on:click="model = 'sign-up'">inscrivez-vous</a></p>
        <p v-if="model == 'sign-up'">Vous avez un compte <a v-on:click="model = 'login'">connectez-vous</a></p>
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
    
    a{
      color: crimson;
    }
</style>