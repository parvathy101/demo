<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getLookUpVal($db,$group,$key){

if($group=="Profile")
{
$res_arr=array();
$res_arr["responses"]=array();
     	$sql = "SELECT  profileId, name, phone, role from sptest_TeleHealthcareFlow__Profile  where profileId like '". $key . "%'";

	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$sub_arr=array();
		        $sub_arr["result"]=array();

				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);				
					
			 
					$product_item=array(
    				"profileId" => $profileId,
					"name" => $name,
    				"phone" => $phone,
				"role" => $role
   			         );
	 
			         array_push($sub_arr["result"], $product_item);
array_push($res_arr["responses"], $sub_arr);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($res_arr); 
     
}
}
else if($group=="ServiceProvider")
{
$res_arr=array();
$res_arr["responses"]=array();
     	$sql = "SELECT  providerId, providerName, address, primaryContact, ___smart_state___ from sptest_TeleHealthcareFlow__ServiceProvider  where providerId like '". $key . "%'";

	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$sub_arr=array();
		        $sub_arr["result"]=array();

				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);	


$address = substr($address, 42);
$address = str_replace('"', '', $address) ;

$street1 = substr($address, 9);
$street1 = strtok($street1, ',');


$street2 = substr($address, strpos($address, 'street2')+9);

if (strpos($street2, "pincode") === 0) { 
    $street2 = ""; 
}

else
{
$street2 = substr($address, strpos($address, 'street2')+8);
$street2 = strtok($street2, ',');
}

$pincode = substr($address, strpos($address, 'pincode')+8);
$pincode = strtok($pincode, ',');

$city = substr($address, strpos($address, 'city')+5);
$city = strtok($city, ',');

$state = substr($address, strpos($address, 'state')+6);
$state = strtok($state, ',');

$country = substr($address, strpos($address, 'country')+8);
$country = strtok($country, '}');


$address = array(
    		"street1" => $street1,
		"street2" => $street2,
		"pincode" => $pincode,
		"city" => $city,
		"state" => $state,
		"country" => $country
		
		    ); 
 
				//$details = $facilityAddress;	
	 
			         //array_push($details, $facilityAddress);


$primaryContact = substr($primaryContact, 42);
$primaryContact = str_replace('"', '', $primaryContact);

$name = substr($primaryContact, 6);
$name = strtok($name, ',');


$phone = substr($primaryContact, strpos($primaryContact, 'phone')+6);
$phone = strtok($phone, ',');

$email = substr($primaryContact, strpos($primaryContact, 'email')+6);
$email = strtok($email, '}');


$primaryContact = array(
    		"name" => $name,
		"phone" => $phone,
		"email"=> $email
		   ); 
 

			
					
			 
					$product_item=array(
    				"providerId" => $providerId,
					"providerName" => $providerName,
    				"address" => $address,
				"primaryContact" => $primaryContact,
				"___smart_state___" => $___smart_state___
   			         );
	 
			         array_push($sub_arr["result"], $product_item);

array_push($res_arr["responses"], $sub_arr);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($res_arr); 
     
}
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
$group =  $data->group;
$key =  $data->key;

//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
getLookUpVal($db,$group,$key);
 
?>
