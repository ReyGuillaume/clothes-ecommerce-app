<?php

include "../global/connexion.php";

function retrieveArticles($db){
   
    $request = "SELECT * FROM `article` WHERE id IN (" . $_GET['articles_list'] . ")";
    $stm = $db->prepare($request);
    $stm->execute();
    echo json_encode($stm->fetchAll());
    
    // echo $request;
    // $stm = $db->prepare("");
    // $stm->execute();
    // echo json_encode($stm->fetchAll());
}

// ======================= Read Cart Data =======================
function retrieveCartContent($db) {
    $stm = $db->prepare("SELECT * FROM `cart_item` WHERE id_cart = :id_cart");
    $stm->bindValue(":id_cart", $_GET["id_cart"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'retrieveCartContent': retrieveCartContent($db); break;
    case 'retrieveArticles': retrieveArticles($db); break;
    default: echo "Not found!"; break;
}