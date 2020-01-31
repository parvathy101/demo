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
$emailId = $data->email;
 $sql = "SELECT  * from sptest_TeleHealthcareFlow__Profile  where profileId like '". $emailId . "' limit 1";

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
    				"error" => "Already exist. Please register a new caregiver"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 

		}


else
{


$email = htmlspecialchars(strip_tags($data->email));
$profileId = htmlspecialchars(strip_tags($data->email));
$name = htmlspecialchars(strip_tags($data->name));
$phone = htmlspecialchars(strip_tags($data->phone));
$caretaker = htmlspecialchars(strip_tags($data->phone));
$subscriber = htmlspecialchars(strip_tags($data->subscriber));
$type = htmlspecialchars(strip_tags($data->type));
$priority = htmlspecialchars(strip_tags($data->priority));
$str=rand(); 
$aCaretakerId = md5($str);
$role = "caretaker"; 



	$sql = "insert into sptest_TeleHealthcareFlow__AssignedCareTaker SET aCaretakerId=:aCaretakerId, subscriber=:subscriber, caretaker=:caretaker, priority=:priority, type=:type, ___smart_state___= 'active'";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}

$sql1 = "insert into sptest_TeleHealthcareFlow__CareTaker SET name=:name, phone=:phone, email=:email";
    
    $stmt1 = $db->prepare($sql1);
	if(!$stmt1) { 
		print_r($db->errorInfo()); 
	}

$sql2 = "insert into sptest_TeleHealthcareFlow__Profile SET profileId=:profileId, name=:name, phone=:phone, role=:role, ___smart_state___= 'active'";
    $stmt2 = $db->prepare($sql2);
	if(!$stmt2) { 
		print_r($db->errorInfo()); 
	}

   


$stmt->bindParam(":aCaretakerId", $aCaretakerId,PDO::PARAM_STR);
$stmt->bindParam(":subscriber", $subscriber,PDO::PARAM_STR);
$stmt->bindParam(":caretaker", $caretaker,PDO::PARAM_STR);
$stmt->bindParam(":type", $type,PDO::PARAM_STR);
$stmt->bindParam(":priority", $priority,PDO::PARAM_STR);

$stmt1->bindParam(":email", $email,PDO::PARAM_STR);
$stmt1->bindParam(":name", $name,PDO::PARAM_STR);
$stmt1->bindParam(":phone", $phone,PDO::PARAM_STR);



$stmt2->bindParam(":profileId", $profileId,PDO::PARAM_STR);
$stmt2->bindParam(":name", $name,PDO::PARAM_STR);
$stmt2->bindParam(":phone", $phone,PDO::PARAM_STR);
$stmt2->bindParam(":role", $role,PDO::PARAM_STR);

if($stmt->execute() && $stmt1->execute() && $stmt2->execute()){
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
    				"error" => "Already exist. Please register a new caretaker"
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
