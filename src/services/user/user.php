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

switch($_GET["function"]) {
    case 'retrieveUserInfos': retrieveUserInfos($db); break;
    case 'retrieveAllAddresses': retrieveAllAddresses($db); break;
    case 'retrieveAllOrders': retrieveAllOrders($db); break;
    default: echo "Not found!"; break;
}