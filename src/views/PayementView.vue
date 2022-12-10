<template>
<div id="box">
    
    <form method="POST" action="href">
        <h3>Formulaire de Payement</h3>
        <label><input type="text" name="Name" placeholder="Name" /></label>
        <label><input type="email" name="mail" placeholder="Email" /></label>
        <label><input type="text" name="credit-card" placeholder="Number_card"/></label>
        <label><input type="date" name="date" /></label>
        <label><input type="text" name="ccv" placeholder="CCV"/></label>
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
    background-color: rgb(248, 247, 238);
    box-shadow:  -5px -5px 10px #cecece,
             5px 5px 10px #f2f2f2;
    border-radius: 25px;
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
    width: 130px;
    border-radius: 6px;
    border: solid 1px black;
}
h3{
    margin: 1ch;
}
</style>