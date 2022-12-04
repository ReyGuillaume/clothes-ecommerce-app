<?php

include "../global/connexion.php";

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

        if($checkPWD == true) 
        {
            echo 'Connexion réussie !';
        }

        else 
        {
            echo 'Mot de passe incorrect';
        }
    }

    else 
    {
        echo 'Adresse mail incorrecte';
    }
}
?>