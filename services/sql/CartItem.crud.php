<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create CartItem =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `cart_item`(`id_cart`, `id_article`, `id_size`, `quantity`) VALUES (:id_cart, :id_article, :id_size, :quantity)");

    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":id_size", $_GET["id_size"]);
    $stm->bindValue(":quantity", $_GET["quantity"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read CartItem Data =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `cart_item`");
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

// ======================= Update CartItem =======================
function update($db) {
    $stm = $db->prepare("UPDATE `cart_item` SET `id_cart`=:id_cart, `id_article`=:id_article,`id_size`=:id_size, `quantity`=:quantity WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":id_size", $_GET["id_size"]);
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
    case 'readAll': readAll($db); break;
    case 'read': read($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}