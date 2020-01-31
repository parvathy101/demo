<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getSubscribers($db,$searchval){
     	$sql = "SELECT  emailId, name, phone from sptest_TeleHealthcareFlow__Subscriber  where emailId like '". $searchval . "%' or name like '". $searchval . "%' or phone like '". $searchval . "%'  order by emailId ASC";

	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$sub_arr=array();
		        $sub_arr["subscribers"]=array();

				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);				
					
			 
					$product_item=array(
    				"email" => $emailId,
					"name" => $name,
    				"phone" => $phone
   			         );
	 
			         array_push($sub_arr["subscribers"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 
     
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
$searchval =  $data->searchval;

//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
getSubscribers($db,$searchval);
 
?>
