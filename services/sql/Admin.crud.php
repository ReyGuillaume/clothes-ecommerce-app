<?php

include "./connexion.php";


// ======================= Create Admin =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `admin`(`username`, `password`) VALUES (:username, :password)");

    $stm->bindValue(":username", $_GET["username"]);
    $stm->bindValue(":password", $_GET["password"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Admin Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `admin` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Admin Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `admin`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Admin =======================
function update($db) {
    $stm = $db->prepare("UPDATE `admin` SET `username`=:username,`password`=:password WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":username", $_GET["username"]);
    $stm->bindValue(":password", $_GET["password"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Admin =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `admin` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";