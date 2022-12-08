<script>
import axios from "axios";

export default {
    data() {
        return {
            articles: [],
            addresses: [],
            total: 0,
            idCart: null,
            address_number: "",
            address_street: "",
            address_city: "",
            address_country: "",
            total_price: 0,
            total_quantity: 0,
            selectedAddress: 0,
        };
    },

    methods: {
        fetchCartContentOfUser(id_user) {
            return axios
                .get(`order/order.php?function=retrieveCartContent&id_user=${id_user}`)
                .then((res) => (this.articles = res.data));
        },

        fetchAddresses(id_user) {
            return axios
                .get(`order/order.php?function=retrieveAddress&id_user=${id_user}`)
                .then((res) => (this.addresses = res.data));
        },

        initializeData() {
            for (let article of this.articles) {
                this.total_price += article.price * article.quantity;
                this.total_quantity += article.quantity;
            }
        },

        // createOrder() {
        //   const d = new Date()
        //   const day = d.getDate()
        //   const month = d.getMonth()
        //   const year = d.getFullYear()
        //   const date = `${year}-${month}-${day}`

        //   if(![this.street, this.city, this.country].includes("")) {
        //     axios.get(`sql/Order.crud.php?function=create&id_user=${this.idUser}&id_cart=${this.idCart}&number=${this.number}&street=${this.street}&city=${this.city}&country=${this.country}&id_status=1&date=${date}`)
        //     .then(() => axios.get(`sql/Cart.crud.php?function=create&id_user=${this.idUser}`))
        //     .then(() => alert("Redirection vers un système de paiement"))
        //   }
        // }
    },

    mounted() {
        if (this.idUser) {
            (async () => {
                await this.fetchCartContentOfUser(this.idUser);
                await this.fetchAddresses(this.idUser);
                this.initializeData();
                console.log(this.addresses);
            })();
        }
    },
};
</script>

<template>
    <main>
        <div class="order-container">
            <h2>Validation Commande</h2>
            <div class="address-container">
                <form>
                    <div class="address-card" v-for="address in addresses">
                        <input type="radio" name="address" :value="address.id" v-model="selectedAddress"/>
                        <div>
                            <div class="bold">
                                {{ address.number }} - {{ address.street }}
                            </div>
                            <div>{{ address.city }}</div>
                            <div>{{ address.country }}</div>
                        </div>
                    </div>

                    <div class="address-card">
                        <input type="radio" name="address" value="0" v-model="selectedAddress"/>
                        <div>
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
        </div>

        <div class="cart-container">
            <h2>Ticket de caisse</h2>
            <div class="article-card" v-for="article in articles">
                <img v-bind:src="article.image" class="article-img" alt="" />
                <div class="article-infos">
                    <h3 class="name">{{ article.article_name }}</h3>
                    <h4 class="brand">{{ article.brand_name }}</h4>
                    <h4 class="quantity">Quantité : {{ article.quantity }}</h4>
                    <h3 class="price">{{ article.price * article.quantity }} €</h3>
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
                        <td class="bold">{{ total_price }} €</td>
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
    display: flex;
    flex-grow: 1;
    position: relative;
}

.order-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}


.address-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.address-card:first-of-type {
    margin-top: 20px;
}

.address-card {
    padding: 20px;
    display: flex;
    gap: 15px;
    width: 400px;
    margin-bottom: 20px;
}

.address-card {
    border-radius: 10px;
    background-color: rgba(198, 198, 198, 0.35);
}

.input-address{
    padding: 10px 15px;
    border-radius: 5px;
    width: 100%;
}

.input-address:not(:first-of-type){
    margin-top: 10px;
}

.cart-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    width: 400px;
    position: fixed;
    right: 20px;
   margin-top: 20px;
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
