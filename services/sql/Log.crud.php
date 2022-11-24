<?php

include "./connexion.php";

// ======================= Create Log =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `log`(`id_admin`, `action`) VALUES (:id_admin, :action)");

    $stm->bindValue(":id_admin", $_GET["id_admin"]);
    $stm->bindValue(":action", $_GET["action"]);
   
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Log Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `log` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Log Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `log` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Log Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `log` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Log =======================
function update($db) {
    $stm = $db->prepare("UPDATE `log` SET `id_admin`=:id_admin,`action`=:action WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":id_admin", $_GET["id_admin"]);
    $stm->bindValue(":action", $_GET["action"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Log =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `log` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";