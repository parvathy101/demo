<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



 

 // get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';



$data = json_decode(file_get_contents("php://input"));
//echo  json_encode(array("message" => $data));

// echo $_SERVER['DOCUMENT_ROOT'];

//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();



// make sure data is not empty


if(
    !empty($data->email) 
){

$aCaretakerId = htmlspecialchars(strip_tags($data->aCaretakerId));




	$sql = "delete from sptest_TeleHealthcareFlow__AssignedCareTaker where aCaretakerId=:aCaretakerId";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}


$stmt->bindParam(":aCaretakerId", $aCaretakerId,PDO::PARAM_STR);

if($stmt->execute()){
       //echo  json_encode(array("message" => "Please check your email. Verify your email before proceeding."));
$sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "CareTaker details removed successfully."
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 
    }
	else {  $sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"error" => "Unable to remove caretaker details"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 


}
	// print_r($stmt->errorInfo()); 
}



?>
