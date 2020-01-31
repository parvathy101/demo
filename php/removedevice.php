<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



 

 // get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';



$data = json_decode(file_get_contents("php://input"));

$database = new Database();
$db = $database->getConnection();



// make sure data is not empty

if(
    !empty($data->subscriber) 
){
	
$subscriber = htmlspecialchars(strip_tags($data->subscriber));
$deviceId = htmlspecialchars(strip_tags($data->deviceId));


 
	$sql = "delete from sptest_TeleHealthcareFlow__Device where deviceId=:deviceId and subscriber=:subscriber";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}


   




$stmt->bindParam(":deviceId", $deviceId,PDO::PARAM_STR);
$stmt->bindParam(":subscriber", $subscriber,PDO::PARAM_STR);

if($stmt->execute()){
      $sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "Removed device for subscriber"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 
    }
	else { $sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"error" => "Device cannot be removed"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); }
	// print_r($stmt->errorInfo()); 

}



?>
