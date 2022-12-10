<template>
<div id="box">
    
    <form method="POST" action="href">
        <h3>Payement</h3>
        <label><input type="text" name="Name" placeholder="Name" required/></label>
        <label><input type="email" name="mail" placeholder="Email" required/></label>
        <label><input type="text" name="credit-card" placeholder="Credit cart number" required/></label>
        <div id="date">
            <label><input type="number" name="date" min="01" max ="12" required  placeholder="MM"/></label>
            <label><input type="number" name="date" min="2022" max ="2100" required placeholder="YYYY" /></label>
        </div>
        <label><input type="text" name="ccv" placeholder="CCV" required/></label>
        <label><input type="submit" name="payer" value="Payer" id="bouton"/></label>
    </form>
</div>
</template>

<style>
#box{
    display: flex;
    align-items: center;
    justify-content: center;
}
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px black;
    background-color: rgb(236, 236, 234);
    box-shadow:-7px -7px 26px #f2f2f2;
    border-radius: 8px;
    padding: 1em;
    width: auto;
    height: auto;
}
input{
    margin:1ch;
    text-align: center;
}

#bouton{
    padding: 3px;
    width: 200px;
    height: 35px;
    border-radius: 3px;
    text-align: justify;
    background-color: rgb(236, 236, 234);
    border: solid 1px black;
}
h3{
    margin: 1ch;
}

#date{
    display: flex;
    align-items: center;

}
</style>