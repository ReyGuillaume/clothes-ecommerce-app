<?php

include "../global/connexion.php";

function retrieveCartContent($db){
    $request = "SELECT cart.id AS id_cart, cart_item.id_article, cart_item.quantity, stock.quantity AS max_quantity, article.name AS article_name, size.name AS size_name, size.id AS id_size, brand.name AS brand_name, gender.name AS gender_name, article.price, article.image FROM `cart`\n"
    . "INNER JOIN `cart_item` ON cart_item.id_cart = cart.id\n"
    . "INNER JOIN `article` ON article.id = cart_item.id_article\n"
    . "INNER JOIN `brand` ON brand.id = article.id_brand\n"
    . "INNER JOIN `gender` ON gender.id = article.id_gender\n"
    . "INNER JOIN `size` ON size.id = cart_item.id_size\n"
    . "INNER JOIN `stock` ON stock.id_article = cart_item.id_article AND stock.id_size = cart_item.id_size\n"
    . "WHERE cart.id_user = {$_GET['id_user']}";

   
    $stm = $db->prepare($request);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function removeArticleFromCart($db){
    $request = "DELETE FROM `cart_item`"
    . "WHERE id_cart = {$_GET['id_cart']} AND id_article = {$_GET['id_article']}";

    $stm = $db->prepare($request);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function modifyQuantityOfCartArticle($db){
    $request = "UPDATE `cart_item` SET `quantity`= {$_GET['quantity']} " 
    . "WHERE id_article = {$_GET['id_article']} AND id_size = {$_GET['id_size']}";

    echo($request);

    $stm = $db->prepare($request);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'retrieveCartContent': retrieveCartContent($db); break;
    case 'removeArticleFromCart': removeArticleFromCart($db); break;
    case 'modifyQuantityOfCartArticle': modifyQuantityOfCartArticle($db); break;
    default: echo "Not found!"; break;
}