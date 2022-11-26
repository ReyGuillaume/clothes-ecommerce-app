<?php

include "./connexion.php";

// ======================= Create Stock =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `stock`(`id_article`, `id_size`, `quantity`) VALUES (:id_article, :id_size, :quantity)");

    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":id_size", $_GET["id_size"]);
    $stm->bindValue(":quantity", $_GET["quantity"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Stock Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `stock` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Stock Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `Stock` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Stock Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `stock`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Stock =======================
function update($db) {
    $stm = $db->prepare("UPDATE `stock` SET `id_article`=:id_article, `id_size`=:id_size, `quantity`=:quantity  WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->bindValue(":id_size", $_GET["id_size"]);
    $stm->bindValue(":quantity", $_GET["quantity"]);


    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Stock =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `stock` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";