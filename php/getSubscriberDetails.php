<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getSubscriberList($db,$sub){
     	$sql = "SELECT  emailId, name, phone, facilityName from sptest_TeleHealthcareFlow__Subscriber  where emailId like '". $sub . "%' order by name DESC";

	// echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$sub_arr=array();
		        //$sub_arr[]=array();
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
					
							
					$caretakers = getCareTakerDetails($db,$sub);
                                        $devices = getDevices($db,$sub);
			 		$facilityAddress = getFacilityDetails($db,$facilityName);
					$latitude = getFacilityLatitude($db,$facilityName);
					$longitude = getFacilityLongitude($db,$facilityName);
					








					$product_item=array(
    				"email" => $emailId,
				"name" => $name,
    				"phone" => $phone,
    				"facilityAddress" => $facilityAddress,
                    		"latitude"=>$latitude,
                    
				"longitude" => $longitude,
				"devices" => $devices,
				"caretakers" => $caretakers
			         );
	 
			         array_push($sub_arr, $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($sub_arr); 
     
}
}

function startsWith ($string, $startString) 
{ 
    $len = strlen($startString); 
    return (substr($string, 0, $len) === $startString); 
} 
  



function getFacilityDetails($db,$facilityName)
{
$details=array();
	//$eventHsty_arr=array();
	 $sql = "SELECT  facilityAddress, latitude, longitude from sptest_TeleHealthcareFlow__Facility  where facilityName like '". $facilityName . "%' order by facilityAddress ASC";

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
             $facilityAddress = substr($facilityAddress, 42);
$facilityAddress = str_replace('"', '', $facilityAddress) ;

$street1 = substr($facilityAddress, 9);
$street1 = strtok($street1, ',');


$street2 = substr($facilityAddress, strpos($facilityAddress, 'street2')+9);

if (strpos($street2, "pincode") === 0) { 
    $street2 = ""; 
}

else
{
$street2 = substr($facilityAddress, strpos($facilityAddress, 'street2')+8);
$street2 = strtok($street2, ',');
}

$pincode = substr($facilityAddress, strpos($facilityAddress, 'pincode')+8);
$pincode = strtok($pincode, ',');

$city = substr($facilityAddress, strpos($facilityAddress, 'city')+5);
$city = strtok($city, ',');

$state = substr($facilityAddress, strpos($facilityAddress, 'state')+6);
$state = strtok($state, ',');

$country = substr($facilityAddress, strpos($facilityAddress, 'country')+8);
$country = strtok($country, '}');


$facilityAddress = array(
    		"street1" => $street1,
		"street2" => $street2,
		"pincode" => $pincode,
		"city" => $city,
		"state" => $state,
		"country" => $country,
		
		    ); 
 
				$details = $facilityAddress;	
	 
			         //array_push($details, $facilityAddress);
				}
	}
		
	return $details;
}

function getFacilityLatitude($db,$facilityName)
{


	//$latitude_arr="";
	 $sql = "SELECT latitude from sptest_TeleHealthcareFlow__Facility  where facilityName like '". $facilityName . "%' order by latitude ASC";

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
			 
					/*$latitude_arr=array(
    				"latitude" => $latitude
					    );*/
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
$latitude_arr = $latitude;
				}
	}
		
	return $latitude_arr;
}

function getFacilityLongitude($db,$facilityName)
{


	//$longitude_arr="";
	 $sql = "SELECT longitude from sptest_TeleHealthcareFlow__Facility  where facilityName like '". $facilityName . "%' order by longitude ASC";

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
			 
					/*$longitude_arr=array(
    				"longitude" => $longitude
					);*/
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
$longitude_arr = $longitude;
				}

	}
		
	return $longitude_arr;
}

function getDevices($db,$sub)
{


	$devices =array();
	 $sql = "SELECT  deviceId, deviceType, tag, connectionKey from sptest_TeleHealthcareFlow__Device  where subscriber like '". $sub . "%' order by deviceId ASC";

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
			 
					$devices_arr=array(
    				"deviceId" => $deviceId,
					"deviceType" => $deviceType,
    				"tag" => $tag,
                                "connectionKey" => $connectionKey
					
			         );


	 
			         array_push($devices, $devices_arr);
				
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
				}
	}
		
	return $devices;
}

function getCareTakerDetails($db,$sub)
{


	$caretakers=array();
$act = "active";
	 $sql = "SELECT  aCaretakerId, caretaker, priority, type from sptest_TeleHealthcareFlow__AssignedCareTaker  where subscriber like '". $sub . "%' and ___smart_state___ like '". $act . "%' order by aCaretakerId ASC";

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

					$name = getCareTakerName($db,$caretaker);
					$email = getCareTakerEmail($db,$caretaker);
			 
					$caretaker_arr=array(
    				"name" => $name,
					"phone" => $caretaker,
    				"email" => $email,
				"priority" => $priority,
                                 "type" => $type,
				"acaretakerId"=> $aCaretakerId
			         );

array_push($caretakers, $caretaker_arr);
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
				}
	}
		
	return $caretakers;
}

function getCareTakerName($db,$caretaker)
{


	$caretakername_arr="";
	 $sql = "SELECT  name from sptest_TeleHealthcareFlow__CareTaker  where phone like '". $caretaker . "%' order by name ASC";

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

					$caretakername_arr = $name;
					
			         
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
				}
	}
		
	return $caretakername_arr;
}

function getCareTakerEmail($db,$caretaker)
{


	$caretakeremail_arr="";
	 $sql = "SELECT  email from sptest_TeleHealthcareFlow__CareTaker  where phone like '". $caretaker . "%' order by email ASC";

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

					
			 
					$caretakeremail_arr = $email;
			        
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
				}
	}
		
	return $caretakeremail_arr;
}

// required headers
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
getSubscriberList($db,$sub);
 
?>
