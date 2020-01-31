<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';
 echo $_SERVER['DOCUMENT_ROOT'];
 require $_SERVER['DOCUMENT_ROOT'].'/php/objects/CreateDevicedb.php';
 
 $data = json_decode(file_get_contents("php://input"));
 echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();

echo  json_encode(array("message" => "connected db"));

$event = new sptest_TeleHealthcareFlow__Device($db);
 
 echo  json_encode(array("message" => "event created"));

// get posted data


// make sure data is not empty
if(!empty($data->deviceId)&&!empty($data->deviceType) &&
    !empty($data->subscriber) &&!empty($data->tag))
	
	

{ 


	

    	$event->deviceId = $data->deviceId;
    	
    	$event->deviceType = $data->deviceType;
    	$event->subscriber = $data->subscriber;
		$event->tag = $data->tag;
		 if($event->update()){
 
        // set response code - 201 created
        //http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Update Sucessfully"));
    }
}
?>