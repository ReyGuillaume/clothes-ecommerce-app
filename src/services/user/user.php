<?php

include "../global/connexion.php";

function retrieveUserInfos($db) {
    $stm = $db->prepare("SELECT * FROM `user` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllAddresses($db) {
    $stm = $db->prepare("SELECT * FROM `address` WHERE id_user = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllOrders($db) {
    $stm = $db->prepare("SELECT o.date, os.status, ci.quantity, o.number, o.street, o.city, o.country, a.name as 'articleName', a.price, a.image, s.name as 'sizeName' from `order` o join order_status os on id_status = os.id join cart c on o.id_cart = c.id join cart_item ci on ci.id_cart = c.id join article a on ci.id_article = a.id join size s on ci.id_size = s.id join brand b on a.id_brand = b.id join user u on o.id_user = u.id where u.id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function updateMail($db) {
    $stm = $db->prepare("UPDATE `user` SET mail = :mail WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":mail", $_GET["mail"]);
    $stm->execute();
}

function updatePhoneNumber($db) {
    $stm = $db->prepare("UPDATE `user` SET phone_number = :phone_number WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":phone_number", $_GET["phone_number"]);
    $stm->execute();
}

function addAddress($db) {
    $stm = $db->prepare("INSERT INTO `address` (number, street, city, country, id_user) VALUES (:number, :street, :city, :country, :id)");
    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
    $stm->bindValue(":city", $_GET["city"]);
    $stm->bindValue(":country", $_GET["country"]);
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
}

switch($_GET["function"]) {
    case 'retrieveUserInfos': retrieveUserInfos($db); break;
    case 'retrieveAllAddresses': retrieveAllAddresses($db); break;
    case 'retrieveAllOrders': retrieveAllOrders($db); break;
    case 'updateMail': updateMail($db); break;
    case 'updatePhoneNumber': updatePhoneNumber($db); break;
    case 'addAddress': addAddress($db); break;
    default: echo "Not found!"; break;
}