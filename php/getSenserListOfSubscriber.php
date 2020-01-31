<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getSensorList($subscriber,$db){
     $sql = "select tag from  sptest_TeleHealthcareFlow__Device where subscriber like '" .$subscriber . "%'";
	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	
    $sensorList=array();
	//$sensorList["records"]=array();
     
     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
           extract($row);


        $sensor_item=array(
            "tag" => $tag
        );

        array_push($sensorList, $sensor_item);
    }
	
	// set response code - 200 OK
	http_response_code(200);
		 
	// show products data in json format
	echo json_encode($sensorList); 
     
}

/// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
//echo "walcome";
//get posted data
$data = json_decode(file_get_contents("php://input"));
$subscriber =  $data->email;


//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
getSensorList($subscriber,$db);
 
?>