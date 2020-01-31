<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function gettecuser($db,$searchval){
      if($searchval==null)
       {
            	$sql = "SELECT  profileId, name, phone, role from sptest_TeleHealthcareFlow__Profile  where role='tecassessor' or role= 'techassistant' order by profileId ASC";
  
       }
      else
        {
     	$sql = "SELECT  profileId, name, phone, role from sptest_TeleHealthcareFlow__Profile  where profileId like '". $searchval . "%' or name like '". $searchval . "%' or phone like '". $searchval . "%' and (role='tecassessor' or role= 'techassistant') order by profileId ASC";
         }
	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$sub_arr=array();
		        $sub_arr["users"]=array();

				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);				
					
			 
					$product_item=array(
    				"email" => $profileId,
			        "name" => $name,
    				"phone" => $phone,
                                 "role" => $role
   			         );
	 
			         array_push($sub_arr["users"], $product_item);
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
gettecuser($db,$searchval);
 
?>
