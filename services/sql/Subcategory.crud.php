<?php

include "./connexion.php";

// ======================= Create Subcategory =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `subcategory`(`name`, `id_category`) VALUES (:name, :id_category)");

    $stm->bindValue(":name", $_GET["name"]);
    $stm->bindValue(":id_category", $_GET["id_category"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Subcategory Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `subcategory` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Subcategory Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `subcategory`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Subcategory Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `subcategory`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Subcategory =======================
function update($db) {
    $stm = $db->prepare("UPDATE `subcategory` SET `name`=:name,`id_category`=:id_category WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);
    $stm->bindValue(":id_category", $_GET["id_category"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Subcategory =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `subcategory` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";