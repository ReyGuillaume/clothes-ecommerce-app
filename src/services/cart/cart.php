<?php

include "../global/connexion.php";

// ======================= Read Article Data =======================
function retrieveCartContent($db) {
    $stm = $db->prepare("SELECT * FROM `cart_item` WHERE id_cart = :id_cart");
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'retrieveCartContent': retrieveCartContent($db); break;
    default: echo "Not found!"; break;
}