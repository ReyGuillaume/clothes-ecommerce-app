<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create CartItem =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `cart_item`(`id_cart`, `id_article`, `quantity`) VALUES (:id_cart, :id_article, :quantity)");

    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":quantity", $_GET["quantity"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read CartItem Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `cart_item` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All CartItem Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `cart_item` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update CartItem =======================
function update($db) {
    $stm = $db->prepare("UPDATE `cart_item` SET `id_cart`=:id_cart, `id_article`=:id_article,`quantity`=:quantity WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":quantity", $_GET["quantity"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete CartItem =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `cart_item` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'create': create($db); break;
    case 'readall': readAll($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}