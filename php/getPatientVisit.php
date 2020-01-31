<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/maple/config/database.php';

function getPatientVisit($db,$patientid){
     	$sql = "SELECT Id, VisitUUID, CustomerUUID, PatientUUID, UserUUID, AppUUID, DevUUID, Date from Visit  where PatientUUID like '". $patient . "' order by Id DESC";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$measurement_arr=array();
		        $measurement_arr["records"]=array();
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
					
							
					
					$CustomerName = getCustomerName($db, $CustomerUUID);
					$PatientName = getPatientName($db, $PatientUUID);
					$UserName = getUserName($db, $UserUUID);
			 
					$product_item=array(
    				"id" => $Id,
				"visitid" => $VisitUUID,
				"customerid" => $CustomerUUID,
    				"patientid" => $PatientUUID,
				"customername" => $CustomerName,
				"userid" => $UserUUID,
				"username" => $UserName,
    				"patientname" => $PatientName,
    				"date" => $Date,
                    "deviceid"=>$DevUUID,
				"appid"=>$AppUUID,
				
			         );
	 
			         array_push($measurement_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($measurement_arr); 
     
}
}



function getPatientName($db,$PatientId)
{
	
         $PatientName="";
	 $sql = "SELECT  Name from Patient  where PatientId like '". $PatientId . "' limit 1";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
			 
						//echo $Name;
						$PatientName = $Name;
							
							
						
				}
	}
		
	return $PatientName;
}


function getCustomerName($db,$CustomerId)
{
	
         $CustomerName="";
	 $sql = "SELECT  Name from Customer  where CustomerUUId like '". $CustomerId . "' limit 1";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
			 
						//echo $Name;
						$CustomerName = $Name;
							
							
						
				}
	}
		
	return $CustomerName;
}


function getUserName($db,$UserId)
{
	
         $UserName="";
	 $sql = "SELECT  Name from User  where UserId like '". $UserId . "' limit 1";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
			 
						//echo $Name;
						$UserName = $Name;
							
							
						
				}
	}
		
	return $UserName;
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
$patientid =  $data->patientid;

//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
$headers = getallheaders();
//$sessionId = $headers['authorization'];
/*if(
    !empty($sessionId) 
){
$database->getSessionDetails($sessionId);*/
getPatientVisit($db,$patientid);
//}
 
?>
