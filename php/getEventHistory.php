<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getEventList($db,$sub){
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr from sptest_TeleHealthcareFlow__Event where where subscriber like '". $sub . "%' order by timeStr DESC";

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
			 
					$product_item=array(
				"eventKey" => $eventKey,
				"eventName" => $eventName,
				"eventDevice" => $eventDevice,
				"time" => $time,
                                "subscriber"=>$subscriber,
                                "timeStr" => $timeStr
			);
	 
			array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
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
