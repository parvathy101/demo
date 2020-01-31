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
 $sql = "SELECT  * from sptest_TeleHealthcareFlow__Subscriber  where emailId like '". $emailId . "' limit 1";

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
    				"error" => "Already exist. Please register a new subscriber"
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
$emailId = htmlspecialchars(strip_tags($data->email));
$profileId = htmlspecialchars(strip_tags($data->email));
$name = htmlspecialchars(strip_tags($data->name));
$phone = htmlspecialchars(strip_tags($data->phone));
$street1 = htmlspecialchars(strip_tags($data->street1));
$street2 = htmlspecialchars(strip_tags($data->street2));
$pincode = htmlspecialchars(strip_tags($data->pincode));
$city = htmlspecialchars(strip_tags($data->city));
$state = htmlspecialchars(strip_tags($data->state));
$country = htmlspecialchars(strip_tags($data->country));
$latitude = htmlspecialchars(strip_tags($data->latitude));
$longitude = htmlspecialchars(strip_tags($data->longitude));


$facilityName = $emailId."-facility";
$facilityName = htmlspecialchars(strip_tags($facilityName));

$role = "subscriber";
$facilityAddress = "com.ithings.telehealthcare.data.Address:::{\"street1\":\"$street1\",\"street2\":\"$street2\",\"pincode\":\"$pincode\",\"city\":\"$city\",\"state\":\"$state\",\"country\":\"$country\"}";


 
	$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId=:emailId, name=:name, phone=:phone, facilityName=:facilityName";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}

$sql1 = "insert into sptest_TeleHealthcareFlow__Facility SET facilityName=:facilityName, facilityAddress=:facilityAddress, latitude=:latitude, longitude=:longitude";
    
    $stmt1 = $db->prepare($sql1);
	if(!$stmt1) { 
		print_r($db->errorInfo()); 
	}

$sql2 = "insert into sptest_TeleHealthcareFlow__Profile SET profileId=:profileId, name=:name, phone=:phone, role=:role";
    $stmt2 = $db->prepare($sql2);
	if(!$stmt2) { 
		print_r($db->errorInfo()); 
	}

   




$stmt->bindParam(":emailId", $emailId,PDO::PARAM_STR);
$stmt->bindParam(":name", $name,PDO::PARAM_STR);
$stmt->bindParam(":phone", $phone,PDO::PARAM_STR);
$stmt->bindParam(":facilityName", $facilityName,PDO::PARAM_STR);
$stmt1->bindParam(":facilityName", $facilityName,PDO::PARAM_STR);
$stmt1->bindParam(":facilityAddress", $facilityAddress,PDO::PARAM_STR);
$stmt1->bindParam(":latitude", $latitude,PDO::PARAM_STR);
$stmt1->bindParam(":longitude", $longitude,PDO::PARAM_STR);
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
    				"error" => "Already exist. Please register a new subscriber"
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
