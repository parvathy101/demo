<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getSensorList($subscriber,$db){
     	$sql = "SELECT  Id,deviceId,timeStamp,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory where subscriber like '" .$subscriber . "'";

     	//$sql = "SELECT  Id,deviceId,timeStamp,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory";
	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
			$sensTrigg_arr=array();
			$sensTrigg_arr["records"]=array();
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
			 
					$product_item=array(
						"deviceId" => $deviceId,
						"timeStamp" => $timeStamp,
						"tag" => $tag,
						"actionTypeDesc" => $actionTypeDesc,
						"actionValue" => $actionValue,
						"subscriber" => $subscriber,
						"facilityName" => $facilityName
					);
			 
					array_push($sensTrigg_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sensTrigg_arr); 
     
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
getSensorList($sub,$db);
 
?>
