<?php
class SensorTrigEvent{

    // Connection instance
    private $connection;
    private $statment;

    // table name sptest_TeleHealthcareFlow__Event
    private $table_name = "sptest_TeleHealthcareFlow__SensorTrigHistory"; //todo BMJO need to construct from the tenant logged in

    // table columns
    public $deviceId ;
    public $timeStamp;
    public $actionTypeId;
    public $actionTypeDesc;
    public $actionValue;
    public $subscriber;
    public $facilityName;
    public $timeStr;
	public $sensorName;
	public $desc;
	
	public function getSensorNameFromDB($sensorID){
	      $sql = "select tag from  sptest_TeleHealthcareFlow__Device where deviceId like '" .$sensorID . "%'";
	    
	     $stmt =  $this->connection->prepare($sql);
	     $stmt->execute();
	     $sensor_item="";
	     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	     
	     extract($row);
	     
	     $sensor_item= $tag;
	     
	     }
	    
	    return $sensor_item;
	}
	
	
    public function __construct($conn){
        $this->connection= $conn;
		//echo  json_encode(array("message" => "event construct ....."));
    }

    //C
    public function create(){
	$query = "INSERT INTO
                " . $this->table_name . "
            	SET deviceId=:deviceId,timeStamp=:timeStamp, timeStr=:timeStr,actionTypeId=:actionTypeId, actionTypeDesc=:actionTypeDesc, actionValue=:actionValue, subscriber=:subscriber,facilityName=:facilityName,tag=:tag";
	echo $query;
	

    $stmt = $this->connection->prepare($query);
	if (!$stmt) { 
		print_r($this->connection->errorInfo()); 
	}
	
	
    $this->deviceId = htmlspecialchars(strip_tags($this->deviceId));
    $this->timeStamp = htmlspecialchars(strip_tags($this->timeStamp));
	$this->timeStr = htmlspecialchars(strip_tags($this->timeStr));
	$this->actionTypeId = htmlspecialchars(strip_tags($this->actionTypeId));
	$this->actionTypeDesc=htmlspecialchars(strip_tags($this->actionTypeDesc));
    $this->actionValue=htmlspecialchars(strip_tags($this->actionValue));
    $this->subscriber=htmlspecialchars(strip_tags($this->subscriber));
    $this->facilityName=htmlspecialchars(strip_tags($this->facilityName));
	$this->sensorName=htmlspecialchars(strip_tags($this->sensorName));
	$this->desc=htmlspecialchars(strip_tags($this->desc));
	//$this->tag=htmlspecialchars(strip_tags($this->tag));
    
	
	echo  json_encode(array("message dev ID" => $this->deviceId));
	echo  json_encode(array("message TimeStamp" => $this->timeStamp));
	echo  json_encode(array("message Time" => $this->timeStr));
	echo  json_encode(array("message Time" => $this->actionTypeId));
	echo  json_encode(array("message Action Type Desc" => $this->actionTypeDesc));
	echo  json_encode(array("message action Val" => $this->actionValue));
	echo  json_encode(array("message subscriber" => $this->subscriber));
	echo  json_encode(array("message Facility" => $this->facilityName));
	
	$this->sensorName = $this->getSensorNameFromDB( $this->deviceId);
	echo "Sensor Name ->" . $this->sensorName;
	//echo  json_encode(array("message Tag" => $this->tag));

	if($sensorNameLoc==null) $sensorNameLoc = $this->sensorName;

    $stmt->bindParam(":deviceId", $this->deviceId,PDO::PARAM_STR);
    $stmt->bindParam(":timeStamp", $this->timeStamp,PDO::PARAM_INT);
	$stmt->bindParam(":timeStr", $this->timeStr,PDO::PARAM_STR);
    $stmt->bindParam(":actionTypeId", $this->actionTypeId,PDO::PARAM_STR);
    $stmt->bindParam(":actionTypeDesc", $this->actionTypeDesc,PDO::PARAM_STR);
    $stmt->bindParam(":actionValue", $this->actionValue,PDO::PARAM_STR);
    $stmt->bindParam(":subscriber", $this->subscriber,PDO::PARAM_STR);
    $stmt->bindParam(":facilityName", $this->facilityName,PDO::PARAM_STR);
    $stmt->bindParam(":tag", $sensorNameLoc,PDO::PARAM_STR);
    
	 
	
    if($stmt->execute()){
        return true;
    }
	 echo  json_encode(array("message before" => "sql exec failed\r\n"));
	 print_r($stmt->errorInfo()); 
    
    return false;
    
    }
  
  public function outAsJSON(){	
	// query products
	
	$stmt = $this->statment;
	$num = $stmt->rowCount();
	
	
	// check if more than 0 record found
	if($num>0){
		// products array
		$sensTrigg_arr=array();
		$sensTrigg_arr["records"]=array();
	 
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			// extract row
			// this will make $row['name'] to
			// just $name only
			extract($row);
	 
			$product_item=array(
				"deviceId" => $deviceId,
				"Time" => $timeStr,
				"timeStamp" => $timeStamp,
				"tag" => $tag,
				"actionTypeDesc" => $actionTypeDesc,
				"actionValue" => $actionValue,
				"subscriber" => $subscriber,
				"facilityName" => $facilityName
			);
	 
			array_push($sensTrigg_arr["records"], $product_item);
		}
	 
		// set response code - 200 OK
		http_response_code(200);
	 
		// show products data in json format
		echo json_encode($sensTrigg_arr); 
	}
	}
	
	
	public function read($subscriber,$topN){
$no_of_records_per_page = 10;
        $offset = ($topN-1) * $no_of_records_per_page;
	$query = "SELECT  Id,deviceId,timeStr,timeStamp,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
        where subscriber like '". $subscriber . "%' order by Id DESC LIMIT $offset, $no_of_records_per_page";
       // echo  $query ;
	$stmt = $this->connection->prepare($query);
    $stmt->execute();
	$this->statment = $stmt;
    return $stmt;
    }
	

	public function readExSensor($subscriber,$sensorTag,$topN){
	$no_of_records_per_page = 10;
        $offset = ($topN-1) * $no_of_records_per_page;
	$deviceID = "test";//getSensorId($subscriber,$sensorTag)
	$query = "SELECT  Id,deviceId,timeStr,timeStamp,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
        where subscriber like '". $subscriber . "%' and tag like '" . $sensorTag . "%' order by Id DESC LIMIT $offset, $no_of_records_per_page";
    
	$stmt = $this->connection->prepare($query);
    $stmt->execute();
	$this->statment = $stmt;
    return $stmt;
	}
	
	public function readExDate($subscriber,$dateStr,$topN){
	//echo  $query ;
$no_of_records_per_page = 10;
        $offset = ($topN-1) * $no_of_records_per_page;
	$query = "SELECT  Id,deviceId,timeStr,timeStamp,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
	where subscriber like '". $subscriber . "%' and timeStr like '" . $dateStr . "%' order by Id 	  DESC 	LIMIT $offset, $no_of_records_per_page";
        //echo  $query ;
	$stmt = $this->connection->prepare($query);
    $stmt->execute();
	$this->statment = $stmt;
    return $stmt;
	}

	public function readEx4($subscriber,$sensorTag,$dateStr,$topN){
	//echo  $query ;
$no_of_records_per_page = 10;
        $offset = ($topN-1) * $no_of_records_per_page;
	$query = "SELECT  Id,deviceId,timeStr,timeStamp,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
	where  subscriber like '". $subscriber . "%' and timeStr like '" . $dateStr ."%' and tag like '" . $sensorTag . "%' order by Id 	  DESC 	LIMIT $offset, $no_of_records_per_page";
        //echo  $query ;
	$stmt = $this->connection->prepare($query);
        $stmt->execute();
	$this->statment = $stmt;
        return $stmt;
    	}
	
	
    	public function testFn(){
    	    
    	}
}

?>
