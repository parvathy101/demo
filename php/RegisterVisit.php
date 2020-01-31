<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



 

 // get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/maple/config/database.php';
require $_SERVER['DOCUMENT_ROOT'].'/php/maple/lib/swift/swift_required.php';


$data = json_decode(file_get_contents("php://input"));
//echo  json_encode(array("message" => $data));

// echo $_SERVER['DOCUMENT_ROOT'];

//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();

$headers = getallheaders();
$sessionId = $headers['authorization'];

// make sure data is not empty

if(
    !empty($data->DateTime)
){
//$database->getSessionDetails($sessionId);

$Date = $data->DateTime;
 $sql = "SELECT  * from Visit  where Date like '". $Date . "' limit 1";

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
    				"error" => "Already exist. Please register a new Visit"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 

		}


else
{


$VisitUUID = $data->VisitUUID;
$PracticeUUID = $data->PracticeUUID;
$PatientUUID = $data->PatientUUID;
$PhysicianUUID = $data->PhysicianUUID;
$AppUUID = $data->AppUUID;
$DevUUID = $data->DevUUID;
$Date = $data->DateTime;





	$sql = "insert into Visit SET VisitUUID='". $VisitUUID . "',CustomerUUID='". $PracticeUUID . "', PatientUUID='". $PatientUUID . "', UserUUID='". $PhysicianUUID . "', AppUUID='". $AppUUID . "', DevUUID='". $DevUUID . "', Date='". $Date . "'";
   
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}


if($stmt->execute()){
       

$sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "Visit Registered Successfully"
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
    				"error" => "Registration failed"
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
