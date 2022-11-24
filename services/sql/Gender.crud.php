<?php

include "./connexion.php";

// ======================= Create Gender =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `gender`(`name`) VALUES (:name)");

    $stm->bindValue(":name", $_GET["name"]);
   
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Gender Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `gender` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Gender Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `gender`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Gender =======================
function update($db) {
    $stm = $db->prepare("UPDATE `gender` SET `name`=:name WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Gender =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `gender` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";