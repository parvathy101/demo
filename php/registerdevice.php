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
    !empty($data->deviceId) 
){
	$deviceId = $data->deviceId;
 $sql = "SELECT  * from sptest_TeleHealthcareFlow__Device  where deviceId like '". $deviceId . "' limit 1";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
		$sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"error" => "A device with the given deviceId is already registered"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 

		}


else
{


$subscriber = htmlspecialchars(strip_tags($data->subscriber));
$deviceId = htmlspecialchars(strip_tags($data->deviceId));
$deviceType = htmlspecialchars(strip_tags($data->deviceType));
$connectionKey = htmlspecialchars(strip_tags($data->connectionKey));
$tag = htmlspecialchars(strip_tags($data->tag));


 
	$sql = "insert into sptest_TeleHealthcareFlow__Device SET deviceId=:deviceId, subscriber=:subscriber, deviceType=:deviceType, connectionKey=:connectionKey, tag=:tag , ___smart_state___= 'active' ";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}


   




$stmt->bindParam(":deviceId", $deviceId,PDO::PARAM_STR);
$stmt->bindParam(":subscriber", $subscriber,PDO::PARAM_STR);
$stmt->bindParam(":deviceType", $deviceType,PDO::PARAM_STR);
$stmt->bindParam(":connectionKey", $connectionKey,PDO::PARAM_STR);
$stmt->bindParam(":tag", $tag,PDO::PARAM_STR);


if($stmt->execute()){
      $sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "Registered device for subscriber"
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
    				"error" => "A device with the given deviceId is already registered"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); }
	// print_r($stmt->errorInfo()); 

}
}


?>
