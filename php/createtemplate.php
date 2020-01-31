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

$headers = getallheaders();
$sessionId = $headers['authorization'];

// make sure data is not empty


if(
    !empty($data->name) &&
    !empty($sessionId) 
){
$database->getSessionDetails($sessionId);
$name = $data->name;
 $sql = "SELECT  * from sptest_TeleHealthcareFlow__EventDefinition  where name like '". $name . "' limit 1";

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
    				"error" => "Already exist. Please create a new template"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 

		}


else
{




$name = htmlspecialchars(strip_tags($data->name));
$description = htmlspecialchars(strip_tags($data->description));
$eventType = htmlspecialchars(strip_tags($data->eventType));
$category = htmlspecialchars(strip_tags($data->category));
$appliesTo = htmlspecialchars(strip_tags($data->appliesTo));
$actionName = htmlspecialchars(strip_tags($data->actionName));
$tags = htmlspecialchars(strip_tags($data->tag));
$eventDetails = $data->eventDetails; 
 
//echo $eventDetails;





	$sql = "insert into sptest_TeleHealthcareFlow__EventDefinition SET name=:name, description=:description, eventType=:eventType, category=:category, appliesTo=:appliesTo, actionName=:actionName, tag=:tags, ___smart_state___='active'";
//$sql = "insert into sptest_TeleHealthcareFlow__Subscriber SET emailId='".$emailId."', name='".$name."', phone='".$phone."', facilityName='".$facilityName."'";
//echo $sql;
    
    $stmt = $db->prepare($sql);
	if(!$stmt) { 
		print_r($db->errorInfo()); 
	}




    foreach($eventDetails as $row){
$str=rand(); 
$id = md5($str);
$nameval = $row->name;
$startTime =  $row->startTime;
$endTime = $row->endTime;
$eventName= htmlspecialchars(strip_tags($data->name));

$betweenTime = "com.ithings.telehealthcare.event.EventDetail\$TimePeriod:::{\"startTime\":$startTime,\"endTime\":$endTime}";
//echo $betweenTime; exit("hii");
$timeOut = $row->timeOut;
$generateEvent = $row->generateEvent;
$sequence = $row->sequence;

$tag = $row->tag;
//echo $sequence."---".$tag;
$sql1 = "insert into sptest_TeleHealthcareFlow__EventDetail SET id='$id', name='$nameval', eventName='$eventName', sequence='$sequence', betweenTime='$betweenTime', tag='$tag', timeOut='$timeOut', generateEvent='$generateEvent', ___smart_state___='active'";
$stmt1 = $db->prepare($sql1);
	if(!$stmt1) { 
		print_r($db->errorInfo()); 
	}
/*$stmt1->bindParam(":id", $id,PDO::PARAM_STR);
$stmt1->bindParam(":tag", $tag,PDO::PARAM_STR);
$stmt1->bindParam(":name", $nameval,PDO::PARAM_STR);
$stmt1->bindParam(":eventName", $eventName,PDO::PARAM_STR);
$stmt1->bindParam(":sequence", $sequence,PDO::PARAM_STR);
$stmt1->bindParam(":betweenTime", $betweenTime,PDO::PARAM_STR);
$stmt1->bindParam(":timeOut", $timeOut,PDO::PARAM_STR);*/

if($stmt1->execute()){
       
/*$sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "Template part1 created successfully."
   			         ); 
	 
			         array_push($sub_arr["responses"], $product_item);*/
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			//echo json_encode($sub_arr); 
    }
	else {  $sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"error" => "Can't create a new template"
   			         );
	 
			         array_push($sub_arr["responses"], $product_item);
				
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 


}
	// print_r($

}



    
    
 


$stmt->bindParam(":name", $name,PDO::PARAM_STR);
$stmt->bindParam(":description", $description,PDO::PARAM_STR);
$stmt->bindParam(":eventType", $eventType,PDO::PARAM_STR);
$stmt->bindParam(":category", $category,PDO::PARAM_STR);
$stmt->bindParam(":appliesTo", $appliesTo,PDO::PARAM_STR);

$stmt->bindParam(":actionName", $actionName,PDO::PARAM_STR);
$stmt->bindParam(":tags", $tags,PDO::PARAM_STR);


if($stmt->execute()){
       
$sub_arr=array();
		        $sub_arr["responses"]=array();

						 
					$product_item=array(
    				"message" => "Template created successfully."
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
    				"error" => "Already exist. Please create a new template"
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
