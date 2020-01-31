<?php
// get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/maple/config/database.php';

function getMeasurementList($db,$searchval){
     	$sql = "SELECT  MUUID,CustomerId, PatientId, Date, ImageUrl, ColorImageUrl, DeviceId, AppId, Duration from MeasurementMaster  where PatientId like '". $searchval . "%' order by Id DESC";

	//echo $sql;
     $stmt =  $db->prepare($sql);
     $stmt->execute();
	
    $num = $stmt->rowCount();
	// echo  json_encode(array("message row count" => $num));
	// check if more than 0 record found
	if($num>0){
			// products array
				$measurement_arr=array();
		        $measurement_arr["records"]=array();
		 
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					// extract row
					// this will make $row['name'] to
					// just $name only
					extract($row);
					
							
					$details = getMeasurementDetails($db,$MUUID);
					$CustomerName = getCustomerName($db, $CustomerId);
					$PatientName = getPatientName($db, $PatientId);
			 
					$product_item=array(
    				"id" => $MUUID,
					"customerid" => $CustomerId,
    				"patientid" => $PatientId,
				"customername" => $CustomerName,
				"imageurl" => $ImageUrl,
				"colorimageurl" => $ColorImageUrl,
    				"patientname" => $PatientName,
    				"date" => $Date,
                    "deviceid"=>$DeviceId,
				"appid"=>$AppId,
				"duration"=>$Duration,
                    
					"details" => $details
			         );
	 
			         array_push($measurement_arr["records"], $product_item);
				}
		 
			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($measurement_arr); 
     
}
}



function getPatientName($db,$PatientId)
{
	
         $PatientName="";
	 $sql = "SELECT  Name from Patient  where PatientId like '". $PatientId . "' limit 1";

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
			 
						//echo $Name;
						$PatientName = $Name;
							
							
						
				}
	}
		
	return $PatientName;
}


function getCustomerName($db,$CustomerId)
{
	
         $CustomerName="";
	 $sql = "SELECT  Name from Customer  where CustomerUUId like '". $CustomerId . "' limit 1";

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
			 
						//echo $Name;
						$CustomerName = $Name;
							
							
						
				}
	}
		
	return $CustomerName;
}

function getMeasurementDetails($db,$Id)
{
//$details=array();
	
	 $sql = "SELECT  Visit,StartTime,ElapsedTime,MeasurementType,InstrumentLocation,Contractions,ActivePeriod,RestPeriod,CompareGroup,EnabledElectrodes,OverallAverage,OverallPeak,OverallOnset,OverallOffset,OverallRMS,Contr00Average,Contr00Peak,Contr00Onset,Contr00Offset,Contr00RMS,Contr01Average,Contr01Peak,Contr01Onset,Contr01Offset,Contr01RMS,Contr02Average,Contr02Peak,Contr02Onset,Contr02Offset,Contr02RMS,TimeStamp,Electode_RMS_1,Electode_RMS_2,Electode_RMS_3,Electode_RMS_4,Electode_RMS_5,Electode_RMS_6,Electode_RMS_7,Electode_RMS_8,Electode_RMS_9,Electode_RMS_10,Electode_RMS_11,Electode_RMS_12,Electode_RMS_13,Electode_RMS_14,Electode_RMS_15,Electode_RMS_16,Electode_RMS_17,Electode_RMS_18,Electode_RMS_18,Electode_RMS_19,Electode_RMS_20,Electode_RMS_21,Electode_RMS_22,Electode_RMS_23,Electode_RMS_24
FROM Measurement WHERE MeasurementId = '". $Id . "'";

//echo $sql;
	$st =$db->prepare($sql);
	$st-> execute();
	

    $num = $st->rowCount();
	if($num>0){
				$sub_arr=array();
		        //$sub_arr["measurement"]=array();

				while ($row = $st->fetch(PDO::FETCH_ASSOC)){
					extract($row);	
					
					$product_item=array(
				"Visit" => $Visit,
    				"StartTime" => $StartTime,
				"ElapsedTime" => $ElapsedTime,
    				"MeasuremenType" => $MeasurementType,
    				"InstrumentLocation" => $InstrumentLocation,
		
				"Contractions"  => $Contractions,
				"ActivePeriod" => $ActivePeriod,
				"RestPeriod" => $RestPeriod,
				"CompareGroup" => $CompareGroup,
				"EnabledElectrodes" => $EnabledElectrodes,
    				"OverallAverage"=> $OverallAverage,
    				"OverallPeak" =>$OverallPeak,
				"OverallOnset" => $OverallOnset,
				"OverallOffset" => $OverallOffset,
				"OverallRMS" => $OverallRMS,"Contr00Average"=> $Contr00Average,
				"Contr00Peak" => $Contr00Peak,"Contr00Onset" => $Contr00Onset,
				"Contr00Offset" => $Contr00Offset,"Contr00RMS" => $Contr00RMS,
				"Contr01Average" => $Contr01Average,"Contr01Peak"=> $Contr01Peak,
				"Contr01Onset" => $Contr01Onset,"Contr01Offset" =>$Contr01Offset,
				"Contr01RMS" => $Contr01RMS,"Contr02Average" => $Contr02Average,
				"Contr02Peak" => $Contr02Peak,"Contr02Onset" => $Contr02Onset,
				"Contr02Offset" => $Contr02Offset,"Contr02RMS" => $Contr02RMS,
				
				"TimeStamp" => $TimeStamp,
				"Electode_RMS_1" => $Electode_RMS_1,
				"Electode_RMS_2" => $Electode_RMS_2,
				"Electode_RMS_3" => $Electode_RMS_3,
				"Electode_RMS_4" => $Electode_RMS_4,
				"Electode_RMS_5" => $Electode_RMS_5,
				"Electode_RMS_6" => $Electode_RMS_6,
				"Electode_RMS_7" => $Electode_RMS_7,
				"Electode_RMS_8" => $Electode_RMS_8,
				"Electode_RMS_9" => $Electode_RMS_9,
				"Electode_RMS_10" => $Electode_RMS_10,
				"Electode_RMS_11" => $Electode_RMS_11,
				"Electode_RMS_12" => $Electode_RMS_12,
				"Electode_RMS_13" => $Electode_RMS_13,
				"Electode_RMS_14" => $Electode_RMS_14,
				"Electode_RMS_15" => $Electode_RMS_15,
				"Electode_RMS_16" => $Electode_RMS_16,
				"Electode_RMS_17" => $Electode_RMS_17,
				"Electode_RMS_18" => $Electode_RMS_18,
				"Electode_RMS_19" => $Electode_RMS_19,
				"Electode_RMS_20" => $Electode_RMS_20,
				"Electode_RMS_21" => $Electode_RMS_21,
				"Electode_RMS_22" => $Electode_RMS_22,
				"Electode_RMS_23" => $Electode_RMS_23,
				"Electode_RMS_24" => $Electode_RMS_24                     



    				
   			         );
	 
			         array_push($sub_arr, $product_item);
				}
		 
			
     
}

		
	return $sub_arr;
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
$headers = getallheaders();
//$sessionId = $headers['authorization'];
/*if(
    !empty($sessionId) 
){
$database->getSessionDetails($sessionId);*/
getMeasurementList($db,$searchval);
//}
 
?>
