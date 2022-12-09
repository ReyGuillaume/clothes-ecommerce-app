<script>
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default {
    data() {
    return {
      loaded: false,
      idTest: 1,
      userInfos: "",
      addresses : ""
    };
  },
  methods: {
    fetchAllAddress() {
      axios
        .get("user/user.php?function=retrieveAllAdress&id_user=" + this.idUser)
        .then((response) => {
          this.addresses = response.data;
        }
      )
    },

    fetchAllUserInfos() {
      axios
        .get("user/user.php?function=retrieveAllUserInfos&id=" + this.idUser)
        .then((response) => {
          this.userInfos = response.data;
        }
      )
    },
  },
  mounted() {
    (async () => {
      await this.fetchAllAddress();
      await this.fetchAllUserInfos();
    })();
    this.loaded = true;
  },
}
</script>


<template>
    <div class="user-container"  v-if="loaded">

      <div class="infos-container">
        <div class="userInfos-container"  v-if="loaded" v-for="user in userInfos">
          <div class="user-cards">
            <h1>{{user.lastname}} {{user.firstname}}</h1>
          </div>

          <div class="user-cards">
            <h3>Mail</h3>
            <p>{{user.mail}}</p>
          </div>

          <div class="user-cards">
            <h3>Phone number</h3>
            <p>{{user.phone_number}}</p>
          </div>
        </div>

        <div class="addresses-container"  v-if="loaded">
          <h1>Addresses</h1>
          <div class="address-card" v-for="address in addresses">
            <li>
              <ul><p>{{address.number}} {{address.street}} {{address.city}} {{address.country}}</p></ul>
            </li>
          </div>
        </div>
      </div>

      <div class="orders-container">
        <p>TEST TEST</p>
      </div>

    </div>

    
</template>

<style>
  .user-container
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 50px;
  }

  .infos-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 20px;
    width: 100%;
    background-color: red;
  }

  .userInfos-container
  {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;
    height: 250px;
    background-color: #eee;
    box-shadow: 0px 0px 8px black;
    padding: 20px;
  }

  .addresses-container
  {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 250px;
    gap: 20px;
    padding: 20px;
    background-color: #eee;
    box-shadow: 0px 0px 8px black;
  }

  .orders-container
  {
    background-color: blue;
  }

</style>