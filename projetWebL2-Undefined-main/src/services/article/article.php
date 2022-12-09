<?php

include "../global/connexion.php";

// ======================= Read Article Data =======================
function retrieveArticle($db) {
    $stm = $db->prepare("SELECT * FROM `article` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetch());
}

// ======================= Read Stocks Data with id_article =======================
function retrieveStock($db) {
    $stm = $db->prepare("SELECT * FROM `stock` WHERE id_article = :id_article");
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Sizes Data with id =======================
function retrieveSizes($db) {
    $stm = $db->prepare("SELECT * FROM `size` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetch());
}

// ======================= Read all Cart of id_user =======================
function retrieveCartID($db) {
    $stm = $db->prepare("SELECT * FROM `cart` WHERE id_user = :id_user");
    $stm->bindValue(":id_user", $_GET["id_user"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Create Cart-Item =======================
function createCartItem($db) {
    $stm = $db->prepare("INSERT INTO `cart_item`(`id_cart`, `id_article`, `id_size`, `quantity`) VALUES (:id_cart, :id_article, :id_size, :quantity)");
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":id_size", $_GET["id_size"]);
    $stm->bindValue(":quantity", $_GET["quantity"]);
    $stm->execute();
}

switch($_GET["function"]) {
    case 'retrieveArticle': retrieveArticle($db); break;
    case 'retrieveStock': retrieveStock($db); break;
    case 'retrieveSizes': retrieveSizes($db); break;
    case 'retrieveCartID': retrieveCartID($db); break;
    case 'createCartItem': createCartItem($db); break;
    default: echo "Not found!"; break;
}