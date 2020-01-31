<?php
//This API is called to insert Event action notes.
//It creates enetry in Event action histrory
//ToDO :- Validate whether event exists
//ToDo :- Validate whether care taker esits
//Todo :- Add a field to store timeStr 
// required headers
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

//"name":"[[name]]","message":"[[message]]","startTime":"[[startTime]]","endTime":"[[endTime]]","timeOut":"[[timeOut]]","generateEvent":"[[generateEvent]]","email":"[[email]]"}'

// make sure data is not empty
if(
    !empty($data->name) &&
    !empty($data->message)&&
    !empty($data->startTime)&&
    !empty($data->endTime)&&
    !empty($data->timeOut)&&
    !empty($data->generateEvent)&&
    !empty($data->email)&&
    !empty($data->recipients)
){
	echo  json_encode(array("message" => "must fields are available"));
 
	$sql = "update sptest_TeleHealthcareFlow__ActionDefinition SET message=:message,recipients=:recipients where name=:name";
    
    $stmt = $db->prepare($sql);
	if (!$stmt) { 
		print_r($db->errorInfo()); 
	}

$startTime = $data->startTime;
$endTime = $data->endTime;

//$sdte = str_replace("/", "-", $data->startTime);
//$edte = str_replace("/", "-", $data->endTime);

//$startTime = strtotime($sdte);
//$endTime = strtotime($edte);
//echo($dte);
 
//$belongsTo = $data->belongsTo;
$betweenTime = "com.ithings.telehealthcare.event.EventDetail\$TimePeriod:::{\"startTime\":$startTime,\"endTime\":$endTime}";
$timeOut = $data->timeOut;
$generateEvent = $data->generateEvent;
//$email = $data->email;
$alertname = $data->name;
        $submail = $data->email;
        //$alertname .= $submail
        $belongsTo = $submail.":".$alertname;
//echo $finalTime;

 
	$sql1 = "update sptest_TeleHealthcareFlow__SubscriberEventDetail SET timeOut=:timeOut, betweenTime=:betweenTime, generateEvent=:generateEvent where belongsTo=:belongsTo";
$stmt1 = $db->prepare($sql1);
	if (!$stmt1) { 
		print_r($db->errorInfo()); 
	}

    $name = htmlspecialchars(strip_tags($data->name));
    
	$message = htmlspecialchars(strip_tags($data->message));
        $recipients=htmlspecialchars(strip_tags($data->recipients));
//$betweenTime = htmlspecialchars(strip_tags($betweenTime));
    $belongsTo = htmlspecialchars(strip_tags($belongsTo));
$timeOut = htmlspecialchars(strip_tags($timeOut));
    $generateEvent = htmlspecialchars(strip_tags($data->generateEvent));
	
	
   
    
	
//	echo  json_encode(array("message dev ID" => $eventKey));
//	echo  json_encode(array("message TimeStamp" => $timeStamp));
//	echo  json_encode(array("message Time" => $careTakerEmail));
//	echo  json_encode(array("message Time" => $tactionType));
//	echo  json_encode(array("message Action Type Desc" => $actionDesc));
	

    $stmt->bindParam(":name", $name,PDO::PARAM_STR);
    
	//$stmt->bindParam(":timeStr", $this->timeStr,PDO::PARAM_STR);
    $stmt->bindParam(":message", $message,PDO::PARAM_STR);
    
    $stmt->bindParam(":recipients", $recipients,PDO::PARAM_STR);
 $stmt1->bindParam(":betweenTime", $betweenTime,PDO::PARAM_STR);
    $stmt1->bindParam(":belongsTo", $belongsTo,PDO::PARAM_STR);
 $stmt1->bindParam(":timeOut", $timeOut,PDO::PARAM_STR);
    $stmt1->bindParam(":generateEvent", $generateEvent,PDO::PARAM_STR);
    
    
  
	 
    if($stmt->execute() && $stmt1->execute()){
       echo  json_encode(array("status" => "success\r\n"));
    }
	else { echo  json_encode(array("status" => "error\r\n"));}
	// print_r($stmt->errorInfo()); 
   
	

}

else if(
    !empty($data->name) &&
    !empty($data->message)&&
    !empty($data->startTime)&&
    !empty($data->endTime)&&
    !empty($data->timeOut)&&
    !empty($data->generateEvent)&&
    !empty($data->email)
    
){
	echo  json_encode(array("message" => "must fields are available"));
 
	$sql = "update sptest_TeleHealthcareFlow__ActionDefinition SET message=:message where name=:name";
    
    $stmt = $db->prepare($sql);
	if (!$stmt) { 
		print_r($db->errorInfo()); 
	}

$startTime = $data->startTime;
$endTime = $data->endTime;

//$sdte = str_replace("/", "-", $data->startTime);
//$edte = str_replace("/", "-", $data->endTime);

//$startTime = strtotime($sdte);
//$endTime = strtotime($edte);
//echo($dte);
 
//$belongsTo = $data->belongsTo;
$betweenTime = "com.ithings.telehealthcare.event.EventDetail\$TimePeriod:::{\"startTime\":$startTime,\"endTime\":$endTime}";
$timeOut = $data->timeOut;
$generateEvent = $data->generateEvent;
//$email = $data->email;
$alertname = $data->name;
        $submail = $data->email;
        //$alertname .= $submail
        $belongsTo = $submail.":".$alertname;
//echo $finalTime;

 
	$sql1 = "update sptest_TeleHealthcareFlow__SubscriberEventDetail SET timeOut=:timeOut, betweenTime=:betweenTime, generateEvent=:generateEvent where belongsTo=:belongsTo";
$stmt1 = $db->prepare($sql1);
	if (!$stmt1) { 
		print_r($db->errorInfo()); 
	}

    $name = htmlspecialchars(strip_tags($data->name));
    
	$message = htmlspecialchars(strip_tags($data->message));
        
//$betweenTime = htmlspecialchars(strip_tags($betweenTime));
    $belongsTo = htmlspecialchars(strip_tags($belongsTo));
$timeOut = htmlspecialchars(strip_tags($timeOut));
    $generateEvent = htmlspecialchars(strip_tags($data->generateEvent));


    $stmt->bindParam(":name", $name,PDO::PARAM_STR);
    
	//$stmt->bindParam(":timeStr", $this->timeStr,PDO::PARAM_STR);
    $stmt->bindParam(":message", $message,PDO::PARAM_STR);
    
    
 $stmt1->bindParam(":betweenTime", $betweenTime,PDO::PARAM_STR);
    $stmt1->bindParam(":belongsTo", $belongsTo,PDO::PARAM_STR);
 $stmt1->bindParam(":timeOut", $timeOut,PDO::PARAM_STR);
    $stmt1->bindParam(":generateEvent", $generateEvent,PDO::PARAM_STR);
    
    
  
	 
    if($stmt->execute() && $stmt1->execute()){
       echo  json_encode(array("status" => "success\r\n"));
    }
	else { echo  json_encode(array("status" => "error\r\n"));}
	// print_r($stmt->errorInfo()); 
   
	

}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("status" => "error\r\n"));
    echo json_encode(array("message" => "Unable to note. Data is incomplete. see example"));
   // echo json_encode(array("Examplee " => "{/"eventkey/":/"3d5a6dbe-ab5b-463e-8749-a07a65ffb91/",/"timeStamp/":/"788888890/","}//careTakerEmail" => "bmjo@ebirdonline.com","actionType" => "closed","actionDesc" => "He Slept more and missed break fast"));
}



?>
