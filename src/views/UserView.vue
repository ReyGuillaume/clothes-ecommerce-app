<script lang="js">
import app from '../main.js'
import axios from 'axios'

export default {
    data() {
    return {
        userInfos: "",
        addresses: "",
        loaded: false,
    };
  },
  methods: {
    fetchUserInfos() {
      axios
        .get("user/user.php?function=retrieveUserInfos&id="+1)
        .then((response) => {
          this.userInfos = response.data;
        });
    },

    fetchAllAddresses() {
      axios
        .get("user/user.php?function=retrieveAllAddresses&id="+1)
        .then((response) => {
          this.addresses = response.data;
        });
    },
  },
  mounted() {
    (async () => {
      await this.fetchUserInfos();
      await this.fetchAllAddresses();
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
            <p v-for="address in addresses">{{address.number}} {{address.street}} {{address.city}} {{address.country}}</p>
        </div>
    </div>

    <div class="order-container">
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
        <div class="order">
            <p>f</p>
        </div>
    </div>

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
        background-color: #eee;
        box-shadow: rgba(0, 0, 0, 0.23) 0px 3px 8px;
        width: 70%;
        min-height: 200px;
        padding: 20px;
        gap: 20px;
    }

    .address
    {
        display: flex;
        flex-direction: column;
        background-color: #eee;
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
        gap: 50px;
        width: 70%;
        min-height: 200px;
    }

    .order
    {
        background-color: #eee;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 30%;
        min-height: 200px;
        padding: 20px;
    }

</style>