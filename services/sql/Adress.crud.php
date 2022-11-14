<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2","root","root");

// ======================= Create Adress =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `adress`(`number`, `street`, `city` , `country`) VALUES (:number, :street, :city, :country)");

    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
	$stm->bindValue(":city", $_GET["city"]);
	$stm->bindValue(":country", $_GET["country"]);
   
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Adress Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `adress` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Adress =======================
function update($db) {
    $stm = $db->prepare("UPDATE `adress` SET `number`=:number,`street`=:street,`city`=:city,`country`=:country WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
	$stm->bindValue(":city", $_GET["city"]);
	$stm->bindValue(":country", $_GET["country"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Adress =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `adress` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'create': create($db); break;
    case 'read': read($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}