<?php

switch($_GET["function"]) {
    case 'create': create($db); break;
    case 'read': read($db); break;
    case 'readAll': readAll($db); break;
    case 'readAllData': readAllData($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}