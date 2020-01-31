<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';
function getCateTakerPhone($data,$db){
     $sql = "select phone from sptest_TeleHealthcareFlow__CareTaker where email like '" . $data->email . "%'";
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	 $phoneNum="";
	 //echo $sql;
     
     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
       extract($row);
       $phoneNum= $phone;
       //echo $phoneNum;
    }
     return $phoneNum;
 }
 
  function getCareUserList( $phoneNum,$db){
     $sql = "select subscriber from sptest_TeleHealthcareFlow__AssignedCareTaker where caretaker like '" .$phoneNum . "%'";
	 
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	//echo $sql;
    $careUser_arr=array();
	//$careUser_arr["records"]=array();
     
     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
           extract($row);


        $careuser_item=array(
            "subscriberID" => $subscriber
        );

        array_push($careUser_arr, $subscriber);
    }
	
	$sql2 = "select name,phone,emailId from  sptest_TeleHealthcareFlow__Subscriber where emailId like '";
	$careTaker_arr=array();
	
	
	foreach ($careUser_arr as &$value) {
		//echo "\r\nrec->";
		//echo $value;
		//echo $sql2;
		$sqlToExec = $sql2 . $value . "%'";
		//echo $sqlToExec;
		$stmt =  $db->prepare($sqlToExec);
		$stmt->execute();
		
	   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
           extract($row);


        $careuser_item=array(
            "name" => $name,
			"phone" => $phone,
			"emailId" => $emailId,
			"imageurl" =>"http://" . $_SERVER['SERVER_ADDR']. "//php//photos//" . $phone . ".jpg"
        );

        array_push($careTaker_arr, $careuser_item);
	   }
	}
	
	// set response code - 200 OK
	http_response_code(200);
		 
	// show products data in json format
	echo json_encode($careTaker_arr); 
     
}
/// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
//echo "Test starts now";

 
//echo "walcome";
//get posted data
$data = json_decode(file_get_contents("php://input"));
//echo $data->email;


//echo test();
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
$phoneNum= getCateTakerPhone($data,$db);

getCareUserList($phoneNum,$db);

 
?>