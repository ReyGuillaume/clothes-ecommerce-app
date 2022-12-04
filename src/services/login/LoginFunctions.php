<?php

include "../global/connexion.php";

function checkAdminLogin($connexionPDO, $login) {
    $reqPrep = $connexionPDO->prepare('SELECT count(password) FROM `admin` WHERE `username`=:login');
    $bvc = $reqPrep->bindValue(':login', $login);
    $exe = $reqPrep->execute();
    $unLogin = $reqPrep->fetch();
    if($unLogin[0] != 0) {
        return true;
    }
    return false;
}

function CheckLogin($connexionPDO, $login) 
{
    $reqPrep = $connexionPDO->prepare('SELECT count(mail) FROM user WHERE mail=:login');
    $bvc = $reqPrep->bindValue(':login', $login);
    $exe = $reqPrep->execute();
    $unLogin = $reqPrep->fetch();

    if($unLogin[0] != 0)
    {
        $validLogin = true;
    }

    else
    {
        $validLogin = false;
    }

    return $validLogin;
}


function CheckPWD($pwd, $pwdBDD) {
    $validPwd = false;

    if(hash('sha256', $pwd) == $pwdBDD)
    {
        $validPwd = true;
    }

    return $validPwd;
}


function CheckUser($connexionPDO, $login, $pwd) {
    if (CheckLogin($connexionPDO, $login) == true) 
    {
        $reqPrep = $connexionPDO->prepare('SELECT * FROM user WHERE mail=:login');
        $bvc = $reqPrep->bindValue(':login', $login);
        $exe = $reqPrep->execute();
        $unLogin = $reqPrep->fetch();
        $pwdBDD = $unLogin[5];
        $checkPWD = CheckPWD($pwd, $pwdBDD);

        if($checkPWD) 
        {
            echo json_encode(array("message"=>'userOK', "id"=>$unLogin['id']));
        }

        else 
        {
            echo json_encode(array("message"=>'userNOKpwd', "id"=>null));
        }
    } elseif (checkAdminLogin($connexionPDO, $login)) {
        $reqPrep = $connexionPDO->prepare('SELECT * FROM `admin` WHERE `username`=:login');
        $bvc = $reqPrep->bindValue(':login', $login);
        $exe = $reqPrep->execute();
        $unLogin = $reqPrep->fetch();
        $pwdBDD = $unLogin['password'];
        if(hash('sha256', $pwd) == $pwdBDD){
            echo json_encode(array("message"=>'adminOK', "id"=>$unLogin['id']));
        }
    }
    else 
    {
        echo json_encode(array("message"=>'userNOKaddress', "id"=>null));
    }
}
?>