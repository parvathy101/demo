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
$profileId = $data->email;
 $sql = "SELECT  * from sptest_TeleHealthcareFlow__Profile  where profileId like '". $profileId . "' limit 1";

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
    				"error" => "Already exist. Please register a new user"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 

		}


else
{


	//echo  json_encode(array("message" => "must fields are available"));
//$betweenTime = "com.ithings.telehealthcare.event.EventDetail$TimePeriod:::{\"startTime\":$startTime,\"endTime\":$endTime}";
//$emailId = $data->email;

$profileId = htmlspecialchars(strip_tags($data->email));
$name = htmlspecialchars(strip_tags($data->name));
$phone = htmlspecialchars(strip_tags($data->phone));

$role = htmlspecialchars(strip_tags($data->role));

$sql = "insert into sptest_TeleHealthcareFlow__Profile SET profileId=:profileId, name=:name, phone=:phone, role=:role, ___smart_state___= 'active'";
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
    				"message" => "Please check your email. Verify your email before proceeding."
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
    				"error" => "Already exist. Please register a new user"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 


}
	// print_r($stmt->errorInfo()); 
}

}

?>
