<?php

include "../global/connexion.php";

// ======================= Read Article Data =======================
function retrieveArticle($db) {
    $stm = $db->prepare("SELECT * FROM `article` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetch());
}

// ======================= Read Stocks Data with id_article =======================
function retrieveStock($db) {
    $stm = $db->prepare("SELECT * FROM `stock` WHERE id_article = :id_article");
    $stm->bindValue(":id_article", $_GET["id_article"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Sizes Data with id =======================
function retrieveSizes($db) {
    $stm = $db->prepare("SELECT * FROM `size` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetch());
}

switch($_GET["function"]) {
    case 'retrieveArticle': retrieveArticle($db); break;
    case 'retrieveStock': retrieveStock($db); break;
    case 'retrieveSizes': retrieveSizes($db); break;
    default: echo "Not found!"; break;
}