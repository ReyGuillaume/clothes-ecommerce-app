<script lang="js">

import emailjs from 'emailjs-com';
import axios from "axios";

export default {
    data() {
        return {
            articles: [],
            addresses: [],
            userInfos: [],
            idCart: null,
            address_number: "",
            address_street: "",
            address_city: "",
            address_country: "",
            total_price: 0,
            total_quantity: 0,
            selectedAddress: 0,
            alert1: false,
            alert2: false,
        };
    },

    methods: {
        fetchCartContentOfUser(id_user) {
            return axios
                .get(`cart/cart.php?function=retrieveCartContent&id_user=${id_user}`)
                .then((res) => (this.articles = res.data));
        },

        fetchUserInfos() {
            return axios.get("user/user.php?function=retrieveUserInfos&id="+this.idUser).then(res => [this.userInfos] = res.data)
        },

        fetchAddresses(id_user) {
            return axios
                .get(`order/order.php?function=retrieveAddress&id_user=${id_user}`)
                .then((res) => (this.addresses = res.data));
        },

        fetchIDCart (id_user) {
            return axios
                .get(`article/article.php?function=retrieveCartID&id_user=${id_user}`)
                .then(res => this.idCart = res.data[res.data.length - 1].id);
        },

        initializeData() {
            for (let article of this.articles) {
                this.total_price += article.price * article.quantity;
                this.total_quantity += article.quantity;
            }
        },

        createOrder() {
          if([this.address_number, this.address_street, this.address_city, this.address_country].includes("")) {
            this.alert2 = true
            setTimeout(() =>  this.alert2 = false, 5000)
          } else {
            const d = new Date()
            const day = d.getDate()
            const month = d.getMonth()
            const year = d.getFullYear()
            const date = `${year}-${month}-${day}`
            axios.get(`order/order.php?function=create&id_user=${this.idUser}&id_cart=${this.idCart}&number=${this.number}&street=${this.street}&city=${this.city}&country=${this.country}&id_status=1&date=${date}`)
                .then(() => axios.get(`sql/Cart.crud.php?function=create&id_user=${this.idUser}`))
                .then(() => this.sendOrderMail())
                .then(() => this.fetchCartContentOfUser(this.idUser))
                .then(() => {
                    this.alert1 = true
                    setTimeout(() =>  this.alert1 = false, 5000);
                })
                .then(() => {
                    this.address_number = ""
                    this.address_street = ""
                    this.address_city = ""
                    this.address_country = ""
                })
          }
        },

        sendOrderMail() {
            let message = ""
            this.articles.forEach(elt => {
                message +=  `${elt.quantity}x ${elt.article_name} (${elt.price}€) : ${(elt.price * elt.quantity).toFixed(2)}€\n`
            })
            message += `Total : ${this.total_price.toFixed(2)}€`
            try {
                emailjs.send("service_ilge38j","template_fsdt2cx",{
                    to_name: this.userInfos.firstname,
                    from_name: "Sapes.com",
                    message: message,
                    email: this.userInfos.mail,
                    },
                    "x0Qag2m_m9Yx7QCGW"
                )
            } catch(error) {
                console.log({error})
            }
        },
    },

    mounted() {
        if (this.idUser) {
            (async () => {
                await this.fetchCartContentOfUser(this.idUser);
                await this.fetchAddresses(this.idUser);
                await this.fetchUserInfos(this.idUser);
                await this.fetchIDCart(this.idUser);
                this.initializeData();
            })();
        }
    },
};
</script>

<template>
  <div class="alert-popup ok" v-if="alert1">Votre commande a bien été prise en compte<br>Un mail de confirmation vous a été envoyé</div>
  <div class="alert-popup" v-if="alert2">L'un des champs est vide</div>
    <main class="order-container container">
        <div class="main-container">
            <div class="data-container">
                <h1 class="container-title">Adresse</h1>
                <form>
                    <div class="address-card" v-for="address in addresses" @click="(selectedAddress = address.id)" :class="{'focus': selectedAddress === address.id}">
                        <input type="radio" name="address" :value="address.id" v-model="selectedAddress"/>
                        <div>
                            <div class="bold">
                                {{ address.number }} - {{ address.street }}
                            </div>
                            <div>{{ address.city }}</div>
                            <div>{{ address.country }}</div>
                        </div>
                    </div>

                    <div class="address-card" @click="selectedAddress = 0" :class="{'focus': selectedAddress === 0}">
                        <input type="radio" name="address" value="0" v-model="selectedAddress"/>
                        <div class="address-custom-container">
                            <input type="text" id="address_number" class="input-address" placeholder="N°"
                                v-model="address_number" :disabled="!(selectedAddress == 0)"/>
                            <input type="text" id="address_street" class="input-address" placeholder="Rue"
                                v-model="address_street" :disabled="!(selectedAddress == 0)"/>
                            <input type="text" id="address_city" class="input-address" placeholder="Ville"
                                v-model="address_city" :disabled="!(selectedAddress == 0)"/>
                            <input type="text" id="address_country" class="input-address" placeholder="Pays"
                                v-model="address_country" :disabled="!(selectedAddress == 0)"/>
                        </div>
                    </div>
                </form>
            </div>
            <button class="main-button" @click="createOrder">
                Valider et payer
            </button>
        </div>

        <div class="cart-container">
            <h2>Ticket de caisse</h2>
            <div class="article-card" v-for="article in articles">
                <img v-bind:src="article.image" class="article-img" alt="" />
                <div class="article-infos">
                    <h3 class="name">{{ article.article_name }}</h3>
                    <h4 class="brand">{{ article.brand_name }}</h4>
                    <h4 class="size"> Taille : {{ article.size_name }}</h4>
                    <h4 class="quantity">Quantité : {{ article.quantity }}</h4>
                    <h3 class="price bold">{{ (article.price * article.quantity).toFixed(2) }} €</h3>
                </div>
            </div>
            <div class="order-details">
                <h3>Détails Commande</h3>
                <table>
                    <tr>
                        <td>Articles</td>
                        <td>{{ total_quantity }}</td>
                    </tr>
                    <tr>
                        <td class="bold">Total</td>
                        <td class="bold">{{ total_price.toFixed(2) }} €</td>
                    </tr>
                </table>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 50%;
    margin: auto;
    padding: 40px 0px;
    display: flex;
    justify-content: center;
    position: relative;
    min-height: 80vh;
}

.main-container {
    display: flex;
    width: 60%;
    min-width: 400px;
    flex-direction: column;
    gap: 30px;
}

.container-title{
    font-weight: bold;
    margin: 20px 0px;
}

.data-container {
    display: flex;
    padding: 20px 20px;
    justify-content: center;
    gap: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

form{
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.address-card{
    display: flex;
    padding: 10px 20px;
    gap: 20px;
    cursor: pointer;
    border-radius: 5px;
}

.focus{
    background-color: rgba(216, 216, 216, 0.245);
}

.address-custom-container{
    display: flex;
    gap: 10px;
    flex-direction: column;
}

.address-custom-container input{
    padding: 10px 15px;
    border-radius: 5px;
}


.cart-container {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    width: 30%;
    height: 75%;
    position: fixed;
    right: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.cart-container h2 {
    font-weight: bold;
    margin: 0px auto;
    padding-top: 10px;
}

.article-card {
    padding: 10px 0px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    width: 90%;
}

.article-infos {
    margin-left: 10px;
}

.article-card .article-img {
    width: 40%;
}

.order-details {
    padding: 10px 0px;
}

td {
    padding: 0px 10px;
}

.bold {
    font-weight: bold;
}
</style>
