<?php

include "../global/connexion.php";

// ======================= Read All Article Data =======================
function retrieveAllArticles($db) {
    $stm = $db->prepare("SELECT * FROM `article`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllBrands($db) {
    $stm = $db->prepare("SELECT * FROM `brand`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllGenders($db) {
    $stm = $db->prepare("SELECT * FROM `gender`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllCategories($db) {
    $stm = $db->prepare("SELECT * FROM `category`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function retrieveAllSubCategories($db) {
    $stm = $db->prepare("SELECT * FROM `subcategory`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'retrieveAllArticles': retrieveAllArticles($db); break;
    case 'retrieveAllBrands': retrieveAllBrands($db); break;
    case 'retrieveAllGenders': retrieveAllGenders($db); break;
    case 'retrieveAllCategories': retrieveAllCategories($db); break;
    case 'retrieveAllSubCategories': retrieveAllSubCategories($db); break;
    default: echo "Not found!"; break;
}