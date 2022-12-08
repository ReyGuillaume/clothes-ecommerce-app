<?php

include "../global/connexion.php";

function retrieveCartContent($db){
    $request = "SELECT cart.id AS cart_id, cart_item.quantity, article.name AS article_name, size.name AS size_name, brand.name AS brand_name, gender.name AS gender_name, article.price, article.image FROM `cart`\n"
    . "INNER JOIN `cart_item` ON cart_item.id_cart = cart.id\n"
    . "INNER JOIN `article` ON article.id = cart_item.id_article\n"
    . "INNER JOIN `brand` ON brand.id = article.id_brand\n"
    . "INNER JOIN `gender` ON gender.id = article.id_gender\n"
    . "INNER JOIN `size` ON size.id = cart_item.id_size\n"
    . "WHERE cart.id_user = {$_GET['id_user']}";
   
    $stm = $db->prepare($request);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAddress($db){
    $request = "SELECT * FROM `address` \n" . "WHERE address.id_user = {$_GET['id_user']}";
    $stm = $db->prepare($request);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'retrieveCartContent': retrieveCartContent($db); break;
    case 'retrieveAddress': retrieveAddress($db); break;
    default: echo "Not found!"; break;
}