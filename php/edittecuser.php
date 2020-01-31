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

$profileId = htmlspecialchars(strip_tags($data->email));
$name = htmlspecialchars(strip_tags($data->name));
$phone = htmlspecialchars(strip_tags($data->phone));

$role = htmlspecialchars(strip_tags($data->role));

	$sql = "update sptest_TeleHealthcareFlow__Profile SET  name=:name, phone=:phone, role=:role where profileId=:profileId";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}

   



$stmt->bindParam(":profileId", $profileId,PDO::PARAM_STR);
$stmt->bindParam(":name", $name,PDO::PARAM_STR);
$stmt->bindParam(":phone", $phone,PDO::PARAM_STR);
$stmt->bindParam(":role", $role,PDO::PARAM_STR);

if($stmt->execute()){
       //echo  json_encode(array("message" => "Please check your email. Verify your email before proceeding."));
$sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "User details edited successfully."
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
    				"error" => "Unable to edit user details"
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
