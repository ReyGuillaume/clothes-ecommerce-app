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

function retrieveArticlesFiltered($db) {
    $gender_key = $_GET['gender_key'];
    $brand_key = $_GET['brand_key'];
    $category_key = $_GET['category_key'];
    $subcategory_key = $_GET['subcategory_key'];

    $query = "SELECT article.*, subcategory.name AS sub_cat_name, category.name AS cat_name FROM article \n"
    . "JOIN subcategory ON id_subcategory = subcategory.id \n"
    . "JOIN category ON subcategory.id_category = category.id";

    $conditions = array();

    if(!empty($gender_key)) {
      $conditions[] = "id_gender='$gender_key'";
    }
    if(! empty($brand_key)) {
      $conditions[] = "id_brand='$brand_key'";
    }
    if(empty($subcategory_key) && !empty($category_key)) {
      $conditions[] = "category.id = $category_key";
    }
    if(!empty($subcategory_key)){
      $conditions[] = "id_subcategory = $subcategory_key";
    }

    $sql = $query;
    if (count($conditions) > 0) {
      $sql .= " WHERE " . implode(' AND ', $conditions);
    }

    $stm = $db->prepare($sql);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}


switch($_GET["function"]) {
    case 'retrieveAllArticles': retrieveAllArticles($db); break;
    case 'retrieveAllBrands': retrieveAllBrands($db); break;
    case 'retrieveAllGenders': retrieveAllGenders($db); break;
    case 'retrieveAllCategories': retrieveAllCategories($db); break;
    case 'retrieveAllSubCategories': retrieveAllSubCategories($db); break;
    case 'retrieveArticlesFiltered': retrieveArticlesFiltered($db); break;
    default: echo "Not found!"; break;
}

?>