<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getEventList($db,$sub){
     	$sql = "SELECT  name, eventName, description, category, eventType, priority from sptest_TeleHealthcareFlow__SubscriberEventDef  where subscriber like '". $sub . "%' order by name DESC";

	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$eventHsty_arr=array();
		        $eventHsty_arr["records"]=array();
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
					
							
					$details = getEventDetails($db,$name);
			 
					$product_item=array(
    				"name" => $eventName,
					"description" => $description,
    				"category" => $category,
    				"eventType" => $eventType,
                    "priority"=>$priority,
                    
					"details" => $details
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventDetails($db,$name)
{
$details=array();
	//$eventHsty_arr=array();
	 $sql = "SELECT  betweenTime, deviceId, duration, eventName, frequency, generateEvent, id, sequence, tag, time, timeOut from sptest_TeleHealthcareFlow__SubscriberEventDetail  where belongsTo like '". $name . "%'";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	//echo $num;
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
             $betweenTime = substr($betweenTime, 58);

$betweenTime = str_replace('"', '', $betweenTime) ;
$startTime = substr($betweenTime, 11);
$startTime = strtok($startTime, ',');
$endTime = substr($betweenTime, 33);
$endTime = strtok($endTime, '}');
$betweenTime = array(
    		"startTime" => $startTime,
		"endTime" => $endTime
		    );
//echo $betweenTime;
//echo $endTime;
//$betweenTime = json_encode($eventHsty_arr); 
 
					$eventHsty_arr1=array(
    				"betweenTime" => $betweenTime,
					"deviceId" => $deviceId,
    				"duration" => $duration,
					"eventName"=> $eventName,
				"eventName"=> $eventName,
				"frequency"=> $frequency,
				"generateEvent"=> $generateEvent,
				"id"=> $id,
				"sequence"=> $sequence,
				"tag"=> $tag,
				"time"=> $time,
				"timeOut"=> $timeOut,
				"timeType"=> "TimePeriod"
			         );
	 
			         array_push($details, $eventHsty_arr1);
				}
	}

		
	return $details;
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
$sub =  $data->subscriber;

//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
getEventList($db,$sub);
 
?>
