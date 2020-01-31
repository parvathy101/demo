<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getCareTaker($db,$searchval,$subscriber){
     	
/*$sql = "SELECT  * from sptest_TeleHealthcareFlow__AssignedCareTaker  where aCaretakerId like '". $searchval . "%' or subscriber like '". $searchval . "%' or caretaker like '". $searchval . "%' or priority like '". $searchval . "%' or type like '". $searchval . "%'";*/

$sql = "SELECT  name, phone, email from sptest_TeleHealthcareFlow__CareTaker  where (name like '". $searchval . "%' or email like '". $searchval . "%') and phone NOT IN(select caretaker from sptest_TeleHealthcareFlow__AssignedCareTaker where subscriber like '". $subscriber . "')"; 

	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$sub_arr=array();
		        $sub_arr["caretakers"]=array();

				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);				
					
			 
					$product_item=array(
    				"name" => $name,
					"phone" => $phone,
    				"email" => $email
    				  );
	 
			         array_push($sub_arr["caretakers"], $product_item);
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
$subscriber = $data->subscriber;

//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
getCareTaker($db, $searchval, $subscriber);
 
?>
