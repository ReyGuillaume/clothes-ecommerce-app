<?php

include "../global/connexion.php";

function retrieveAllAdress($db) {
    $stm = $db->prepare("SELECT * FROM `address` WHERE id_user = :id_user");
    $stm->bindValue(":id_user", $_GET["id_user"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllUserInfos($db) {
    $stm = $db->prepare("SELECT * FROM `user` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'retrieveAllAdress': retrieveAllAdress($db); break;
    case 'retrieveAllUserInfos': retrieveAllUserInfos($db); break;
    default: echo "Not found!"; break;
}

?>