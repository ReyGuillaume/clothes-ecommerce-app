<?php

include "./connexion.php";

// ======================= Create Order =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `order`(`id_user`, `id_cart`, `number`, `street`, `city`, `country`, `id_status`, `date`) VALUES (:id_user, :id_cart, :number, :street, :city, :country, :id_status, :date)");

    $stm->bindValue(":id_user", $_GET["id_user"]);
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
    $stm->bindValue(":city", $_GET["city"]);
    $stm->bindValue(":country", $_GET["country"]);
    $stm->bindValue(":id_status", $_GET["id_status"]);
    $stm->bindValue(":date", $_GET["date"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Order Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `order` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Order Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `order`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Order =======================
function update($db) {
    $stm = $db->prepare("UPDATE `order` SET `id_user`=:id_user, `id_cart`=:id_cart,`number`=:number, `street`=:street, `city`=:city, `country`=:country, `id_status`=:id_status WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":id_user", $_GET["id_user"]);
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
    $stm->bindValue(":city", $_GET["city"]);
    $stm->bindValue(":country", $_GET["country"]);
    $stm->bindValue(":id_status", $_GET["id_status"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Order =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `order` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";