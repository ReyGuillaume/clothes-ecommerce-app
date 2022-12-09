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

switch($_GET["function"]) {
    case 'retrieveUserInfos': retrieveUserInfos($db); break;
    case 'retrieveAllAddresses': retrieveAllAddresses($db); break;
    default: echo "Not found!"; break;
}