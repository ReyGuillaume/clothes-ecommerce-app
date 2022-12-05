<?php

include "../global/connexion.php";

// ======================= Read Article Data =======================
function retrieveArticle($db) {
    $stm = $db->prepare("SELECT * FROM `article` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetch());
}

switch($_GET["function"]) {
    case 'retrieveArticle': retrieveArticle($db); break;
    default: echo "Not found!"; break;
}