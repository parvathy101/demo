<?php
/// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

 // get database connection
require $_SERVER['DOCUMENT_ROOT'].'/php/config/database.php';
// echo $_SERVER['DOCUMENT_ROOT'];
// instantiate device object
require $_SERVER['DOCUMENT_ROOT'].'/php/objects/SensorTrigEventNew.php';
 
//get posted data
$data = json_decode(file_get_contents("php://input"));
//echo $data;

//echo  json_encode(array("message" => "connected ....."));
$database = new Database();
$db = $database->getConnection();

//echo  json_encode(array("message" => "connected db"));

$event = new SensorTrigEvent($db);
 
//echo  json_encode(array("message" => "event created"));
 
// make sure data is not empty
if(
   !empty($data->sensorTag) &&
   !empty($data->dateStr)
)
{
  // echo  json_encode(array("message" => "sensorTag and dateStr available"));
   $event->readEx4($data->subscriber,$data->sensorTag,$data->dateStr,$data->page);
   $event->outAsJSON();
}
else if(
   !empty($data->sensorTag) &&
   empty($data->dateStr)
   ){
	   //echo  json_encode(array("message" => "sensor available"));
	   $event->readExSensor($data->subscriber,$data->sensorTag,$data->page);
	   $event->outAsJSON();
   }
else if(
    empty($data->sensorTag) &&
   !empty($data->dateStr)
   ){
	   //echo  json_encode(array("message" => "Date Str available"));
	   $event->readExDate($data->subscriber,$data->dateStr,$data->page);
	   $event->outAsJSON();
   }
else{
	
	//echo  json_encode(array("message" => "fetching top"));
	//echo  json_encode(array("message" => "Start Time and end time not available"));
	$event->read($data->subscriber,$data->page);
        //echo "read completed";
	//echo  json_encode(array("message" => "Display top"));
	$event->outAsJSON();
	//echo "json completed";
}
?>
