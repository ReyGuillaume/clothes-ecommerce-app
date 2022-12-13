<script lang="js">

import app from '../main.js'
import axios from 'axios'

export default {
    data() {
    return {
        userInfos: [],
        addresses: [],
        orders: [],
        number: "",
        street: "",
        city: "",
        country: "",
        loaded: false,
        alert1: false,
        alert2: false,
        alert3: false,
        alert4: false,
        alert5: false,
    };
  },
  methods: {
    fetchUserInfos() {
      axios
        .get("user/user.php?function=retrieveUserInfos&id="+this.idUser)
        .then((response) => {
          this.userInfos = response.data;
        });
    },

    fetchAllAddresses() {
      axios
        .get("user/user.php?function=retrieveAllAddresses&id="+this.idUser)
        .then((response) => {
          this.addresses = response.data;
        });
    },

    fetchAllOrders() {
      axios
        .get("user/user.php?function=retrieveAllOrders&id="+this.idUser)
        .then((response) => {
          this.orders = response.data;
        });
    },

    updateMail(mail) {
      this.mail = 
      axios
        .get("user/user.php?function=updateMail&id="+this.idUser+"&mail="+mail)
        .then((response) => {
          if(response.data != null)
          {
            this.alert1 = true
            setTimeout(() =>  this.alert1 = false, 5000);
          }
          else
          {
            this.alert2 = true
            setTimeout(() =>  this.alert2 = false, 5000);
          }
        });
    },

    updatePhoneNumber(phone_number) {
      axios
        .get("user/user.php?function=updatePhoneNumber&id="+this.idUser+"&phone_number="+phone_number)
        .then((response) => {
          if(response.data != null)
          {
            this.alert3 = true
            setTimeout(() =>  this.alert3 = false, 5000);
          }
          else
          {
            this.alert4 = true
            setTimeout(() =>  this.alert4 = false, 5000);
          }
        });
    },

    addAddress(number, street, city, country) {
      if (number != null && street != null && city != null && country != null)
      {
        axios
        .get("user/user.php?function=addAddress&id="+this.idUser+"&number="+number+"&street="+street+"&city="+city+"&country="+country)
        .then(() => this.fetchAllAddresses())
        this.number = ""
        this.street = ""
        this.city = ""
        this.country = ""
      }
      
      else
      {
        this.alert5 = true
        setTimeout(() =>  this.alert5 = false, 5000);
      }
    },


    disconnectUser() {
        app.config.globalProperties.idUser = null
        this.$router.push('/login')
    }
  },
  mounted() {
    if (!this.idUser) {
        this.$router.push('/login')
    }
    (async () => {
      await this.fetchUserInfos();
      await this.fetchAllAddresses();
      await this.fetchAllOrders();
      this.loaded = true;
    })();
  },
}
</script>

<template>
  <div class="alert-popup" v-if="alert1">Le mail a été modifié avec succès</div>
  <div class="alert-popup" v-if="alert2">Le mail n'a pas pu être modifié</div>
  <div class="alert-popup" v-if="alert3">Le numéro de téléphone a été modifié avec succès</div>
  <div class="alert-popup" v-if="alert4">Le numéro de téléphone n'a pas pu être modifié</div>
  <div class="alert-popup" v-if="alert5">Veuillez remplir tous les champs avant de valider</div>
  <div class="userPage-container container">
    
    <div class="user-container">
        <div class="userInfo" v-for="user in userInfos">
            <h3>{{user.firstname}} {{user.lastname}}</h3>
            <div class="form-user-container">
              <div class="form-user">
                <label for="mail">E-mail : </label>
                <input type="text" id="mail" class="input-user" placeholder="mail" v-model="user.mail">
                <input type="submit" class="button-user" value="Modifier" @click="updateMail(user.mail)">
              </div>
              <div class="form-user">
                <label for="phone_number">N° de téléphone : </label>
                <input type="text" id="phone_number" class="input-user" placeholder="phone number" v-model="user.phone_number">
                <input type="submit" class="button-user" value="Modifier" @click="updatePhoneNumber(user.phone_number)">
              </div>
            </div>
        </div>
        <div class="address">
            <div class="address-list">
              <h3>ADRESSES</h3>
              <div class="list">
                <ul>
                  <li v-for="address in addresses">
                    <p>{{address.number}} {{address.street}} {{address.city}} en {{address.country}}</p>
                  </li>
                </ul>
              </div> 
            </div>
            <div class="form-address-container">
              <div class="form-address">
                <input type="text" id="number" class="input-address" placeholder="number" v-model="number">
                <input type="text" id="street" class="input-address" placeholder="street" v-model="street">
                <input type="text" id="city" class="input-address" placeholder="city" v-model="city">
                <input type="text" id="country" class="input-address" placeholder="country" v-model="country">
              </div>
              <input type="submit" class="button-address" value="Ajouter" @click="addAddress(number, street, city, country)">
            </div>
        </div>
    </div>

    <div class="order-container">
        <div class="order" v-for="order in orders">
            <div class="order-img">
                <img v-bind:src="order.image" class="article-img" alt="">
            </div>

            <div class="order-infos">
                <h3>{{order.articleName}} - {{order.sizeName}}</h3>
                <p>Commandé en {{order.quantity}} exemplaire(s) le {{order.date}}</p>
                <p>Livré au {{order.number}} {{order.street}} {{order.city}} {{order.country}}</p>
            </div>
        </div>
    </div>

    <div class="disconnect-container"> <button @click="disconnectUser" class="disconnect-button">Deconnexion</button> </div>

  </div>
</template>

<style>

    .userPage-container
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 20px;
    }

    .userPage-container .user-container
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70%;
        min-height: 200px;  
        gap: 20px;
    }

    .userPage-container .userInfo
    {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-bottom: 4px solid black;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 100%;
        min-height: 200px;
        height: 200px;
        padding: 20px;
        gap: 20px;
    }

    .userPage-container .address
    {
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom: 4px solid black;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 100%;
        min-height: 300px;
        height: 300px;
        padding: 20px;
        gap: 20px;
    }

    .userPage-container .order-container
    {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 20px;
        width: 70%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .userPage-container .order
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
        border-left: 4px solid black;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 100%;
        min-height: 150px;
        padding: 20px;
        gap: 20px;
    }

    .userPage-container .order-infos
    {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .userPage-container .form-address-container
    {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 20px;
      width: 80%;
    }

    .userPage-container .address-list
    {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .userPage-container .list
    {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 20px;
    }

    .userPage-container .form-address
    {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .userPage-container .input-address
    {
      width: 99%;
      margin: 5px;
      height: 30px;
    }

    .userPage-container .button-address
    {
      width: 100%;
      height: 30px;
      border: none;
      background-color: #343434;
      color: #fff;
      cursor: pointer;
    }
    
    .userPage-container .form-user-container
    {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }

    .userPage-container .form-user
    {
      display: flex;
      justify-content: end;
      align-items: center;
      width: 100%;
      gap: 20px;
    }

    .userPage-container .input-user
    {
      height: 30px;
    }

    .userPage-container .button-user
    {
      width: 20%;
      height: 30px;
      border: none;
      background-color: #343434;
      color: #fff;
      cursor: pointer;
    }

    .userPage-container .disconnect-button
    {
      background-color: red;
      color: white;
      border: none;
      height: 30px;
      width: 100px;
      font-weight: bold;
    }

</style>