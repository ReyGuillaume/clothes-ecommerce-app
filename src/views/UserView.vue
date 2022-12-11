<script lang="js">

import app from '../main.js'
import axios from 'axios'

export default {
    data() {
    return {
        userInfos: "",
        addresses: "",
        orders: "",
        loaded: false,
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
          window.alert(order);
        });
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
  <div class="userPage-container">
    
    <div class="user-container">
        <div class="userInfo" v-for="user in userInfos">
            <h3>{{user.firstname}} {{user.lastname}}</h3>
            <div>
                <p>Mail</p>
                <p>{{user.mail}}</p>
            </div>
            <div>
                <p>Phone number</p>
                <p>{{user.phone_number}}</p>
            </div>
        </div>
        <div class="address">
            <h3>ADRESSES</h3>
            <p v-for="address in addresses">{{address.number}} {{address.street}} {{address.city}} en {{address.country}}</p>
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

    <div class="disconnect-container"> <button @click="disconnectUser" class="main-button">Deconnexion</button> </div>

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

    .user-container
    {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 70%;
        min-height: 200px;  
        gap: 20px;
    }

    .userInfo
    {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-bottom: 4px solid black;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 70%;
        min-height: 200px;
        padding: 20px;
        gap: 20px;
    }

    .address
    {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-bottom: 4px solid black;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 70%;
        min-height: 200px;
        padding: 20px;
        gap: 20px;
    }

    .order-container
    {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 20px;
        width: 70%;
        min-height: 200px;
        max-height: 700px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #343434;
    }

    .order
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

    .order-infos
    {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

</style>