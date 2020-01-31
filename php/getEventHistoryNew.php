<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';

function getEventList($db,$sub,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
					$alertStatus = getAlertStatus($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"alertStatus" => $alertStatus,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getAlertStatus($db,$eventKey)
{
	
         $alertStatus="";
	 $sql = "SELECT  status from sptest_TeleHealthcareFlow__Alerts  where eventId like '". $eventKey . "%' limit 1";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
			 
					if($status==0)
						{
						$alertStatus = "Not Sent";
						}
					else if($status==1)
						{
{
						$alertStatus = "Sent";
						}
}
					else if($status==2)
						{
{
						$alertStatus = "Delivered";
						}
}
					else if($status==3)
						{
{
						$alertStatus = "Opened";
						}
}
					else if($status==4)
						{
{
						$alertStatus = "Not Delivered";
						}
}
					else if($status==5)
						{
{
						$alertStatus = "Closed";
						}
}
					else
						{
{
						$alertStatus = "Status Unknown";
						}	
}							
						
				}
	}
		
	return $alertStatus;
}

function getEventNotes($db,$eventKey)
{
	
         $eventAction="";
	 $sql = "SELECT  assignedTo,actionStatus,actionNote, assignedTime from sptest_TeleHealthcareFlow__EventActionHistory  where eventKey like '". $eventKey . "%' order by assignedTime DESC limit 1";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();

	
    $num = $stmt->rowCount();
	
	
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
			 
					$eventAction=array(
    				"assignedTo" => $assignedTo,
					"assignedStatus" => $actionStatus,
    				"actionNote" => $actionNote,
					"assignedTime"=> $assignedTime
			         );
	 
			     //    array_push($eventHsty_arr["records"], $product_item);
				}
	}
		
	return $eventAction;
}


function getEventList1($db,$sub,$start,$evtname,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and timeStr like '" . $start . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}


function getEventList2($db,$sub,$start,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and timeStr like '" . $start . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}


function getEventList3($db,$sub,$evtname,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList4($db,$sub,$end,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and endTimeStr like '" . $end . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}
function getEventList5($db,$sub,$end,$evtname,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and endTimeStr like '" . $end . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList6($db,$sub,$end,$start,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;


     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and DATE(timeStr) between '" . $start . "%' and '" . $end . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList7($db,$sub,$end,$start,$evtname,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and DATE(timeStr) between '" . $start . "%' and '" . $end . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList8($db,$sub,$start,$evtname,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and timeStr like '" . $start . "%' and status like '" . $status . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}


function getEventList9($db,$sub,$start,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and timeStr like '" . $start . "%' and status like '" . $status . "%'order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}


function getEventList10($db,$sub,$evtname,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and status like '" . $status . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList11($db,$sub,$end,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and endTimeStr like '" . $end . "%' and status like '" . $status . "%'order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}
function getEventList12($db,$sub,$end,$evtname,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and endTimeStr like '" . $end . "%' and status like '" . $status . "%'order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList13($db,$sub,$end,$start,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and DATE(timeStr) between '" . $start . "%' and '" . $end . "%' and status like '" . $status . "%' order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList14($db,$sub,$end,$start,$evtname,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and eventName like '%" . $evtname . "' and DATE(timeStr) between '" . $start . "%' and '" . $end . "%' and status like '" . $status . "%'order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
			         );
	 
			         array_push($eventHsty_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($eventHsty_arr); 
     
}
}

function getEventList15($db,$sub,$status,$pageno){
$no_of_records_per_page = 10;
        $offset = ($pageno-1) * $no_of_records_per_page;
     	$sql = "SELECT  eventKey,eventName,eventDevice,time,subscriber,timeStr,endTimeStr,status from sptest_TeleHealthcareFlow__Event where subscriber like '". $sub . "%' and status like '" . $status . "%'order by timeStr DESC LIMIT $offset, $no_of_records_per_page";

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
					
					$findme   = ':';
					$strpos = strpos( $eventName, $findme);
					$eventNamePart = substr($eventName,$strpos+1);
					
					$eventAction = getEventNotes($db,$eventKey);
			 
					$product_item=array(
    				"eventKey" => $eventKey,
					"eventName" => $eventNamePart,
    				"eventDevice" => $eventDevice,
    				"time" => $time,
                    "subscriber"=>$subscriber,
                    "timeStr" => $timeStr,
					"endTimeStr" => $endTimeStr,
					"eventStatus" => $status,
					"eventAction" => $eventAction
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
$pageno =  $data->page;
$start =  $data->start;
$end =  $data->end;
$evtname =  $data->evtname;
$status =  $data->status;
$pageno =  $data->page;



//echo $subscriber;
//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();
if(
   !empty($data->start) &&
   !empty($data->evtname)&&
   empty($data->end)&&
   empty($data->status)
)
{
  // echo  json_encode(array("message" => "sensorTag and dateStr available"));
   getEventList1($db,$sub,$start,$evtname,$pageno);
}
else if(
   !empty($data->start) &&
   empty($data->evtname)&&
   empty($data->end)&&
   empty($data->status)
   ){
	  getEventList2($db,$sub,$start,$pageno);
   }
else if(
    empty($data->start) &&
   !empty($data->evtname)&&
    empty($data->end)&&
   empty($data->status)
   ){
	   getEventList3($db,$sub,$evtname,$pageno);
   }
else if(
    empty($data->start) &&
    empty($data->evtname)&&
    !empty($data->end)&&
   empty($data->status)
   ){
	   getEventList4($db,$sub,$end,$pageno);
   }
else if(
    empty($data->start) &&
    !empty($data->evtname)&&
    !empty($data->end)&&
   empty($data->status)
   ){
	   getEventList5($db,$sub,$end,$evtname,$pageno);
   }
else if(
    !empty($data->start) &&
    empty($data->evtname)&&
    !empty($data->end)&&
   empty($data->status)
   ){
	   getEventList6($db,$sub,$end,$start,$pageno);
   }
else if(
    !empty($data->start) &&
    !empty($data->evtname)&&
    !empty($data->end)&&
   empty($data->status)
   ){
	   getEventList7($db,$sub,$end,$start,$evtname,$pageno);
   }
else if(
   !empty($data->start) &&
   !empty($data->evtname)&&
   empty($data->end)&&
   !empty($data->status)
)
{
  // echo  json_encode(array("message" => "sensorTag and dateStr available"));
   getEventList8($db,$sub,$start,$evtname,$status,$pageno);
}
else if(
   !empty($data->start) &&
   empty($data->evtname)&&
   empty($data->end)&&
   !empty($data->status)
   ){
	  getEventList9($db,$sub,$start,$status,$pageno);
   }
else if(
    empty($data->start) &&
   !empty($data->evtname)&&
    empty($data->end)&&
   !empty($data->status)
   ){
	   getEventList10($db,$sub,$evtname,$status,$pageno);
   }
else if(
    empty($data->start) &&
    empty($data->evtname)&&
    !empty($data->end)&&
   !empty($data->status)
   ){
	   getEventList11($db,$sub,$end,$status,$pageno);
   }
else if(
    empty($data->start) &&
    !empty($data->evtname)&&
    !empty($data->end)&&
   !empty($data->status)
   ){
	   getEventList12($db,$sub,$end,$evtname,$status,$pageno);
   }
else if(
    !empty($data->start) &&
    empty($data->evtname)&&
    !empty($data->end)&&
   !empty($data->status)
   ){
	   getEventList13($db,$sub,$end,$start,$status,$pageno);
   }
else if(
    !empty($data->start) &&
    !empty($data->evtname)&&
    !empty($data->end)&&
   !empty($data->status)
   ){
	   getEventList14($db,$sub,$end,$start,$evtname,$status,$pageno);
   }
else if(
    empty($data->start) &&
    empty($data->evtname)&&
    empty($data->end)&&
   !empty($data->status)
   ){
	   getEventList15($db,$sub,$status,$pageno);
   }
else{
	getEventList($db,$sub,$pageno);
}


 
?>
