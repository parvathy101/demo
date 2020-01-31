<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 // get database connection
include_once '../php/config/database.php';
 
// instantiate device object
//include_once '../php/objects/event.php';
 
 echo "walcome";
// get posted data
$data = json_decode(file_get_contents("php://input"));

echo $data 
//$database = new Database();
//$db = $database->getConnection();
?>