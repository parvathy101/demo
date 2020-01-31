<?php
class EventHistory{

    // Connection instance
    private $connection;
    private $statment;

    // table name sptest_TeleHealthcareFlow__Event
    private $table_name = "sptest_TeleHealthcareFlow__Event"; //todo BMJO need to construct from the tenant logged in

    // table columns
    public $eventKey ;
    public $eventDevice;
    public $eventName;
    public $time;

	
    public function __construct($conn){
        $this->connection= $conn;
		//echo  json_encode(array("message" => "event construct ....."));
    }

  public function outAsJSON(){	
	// query products
	
	$stmt = $this->statment;
	$num = $stmt->rowCount();
	
	
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
	 
			$product_item=array(
				"eventKey" => $eventKey,
				"eventName" => $eventName,
				"eventDevice" => $eventDevice,
				"time" => $time
			);
	 
			array_push($eventHsty_arr["records"], $product_item);
		}
	 
		// set response code - 200 OK
		http_response_code(200);
	 
		// show products data in json format
		echo json_encode($eventHsty_arr); 
	}
	}
	
	public function read($topN){
		
	$query = "SELECT  eventKey,eventName,eventDevice,time from sptest_TeleHealthcareFlow__Event;
        //echo  $query ;
	$stmt = $this->connection->prepare($query);
        $stmt->execute();
	$this->statment = $stmt;
        return $stmt;
        }
	

	public function readExSensor($subscriber,$sensorTag,$topN){
	//echo  $query ;
	$query = "SELECT  Id,deviceId,timeStr,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
        where subscriber like '". $subscriber . "%' and tag like '" . $sensorTag . "%' order by Id DESC 		limit " . $topN;
        //echo  $query ;
	$stmt = $this->connection->prepare($query);
        $stmt->execute();
	$this->statment = $stmt;
        return $stmt;
    	}
	
	public function readExDate($subscriber,$dateStr,$topN){
	//echo  $query ;
	$query = "SELECT  Id,deviceId,timeStr,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
	where subscriber like '". $subscriber . "%' and timeStr like '" . $dateStr . "%' order by Id 	  DESC 	limit " . $topN;
        //echo  $query ;
	$stmt = $this->connection->prepare($query);
        $stmt->execute();
	$this->statment = $stmt;
        return $stmt;
    	}

	public function readEx4($subscriber,$sensorTag,$dateStr,$topN){
	//echo  $query ;
	$query = "SELECT  Id,deviceId,timeStr,tag,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory 
	where  subscriber like '". $subscriber . "%' and timeStr like '" . $dateStr ."%' and tag like '" . $sensorTag . "%' order by Id 	  DESC 	limit " . $topN;
        //echo  $query ;
	$stmt = $this->connection->prepare($query);
        $stmt->execute();
	$this->statment = $stmt;
        return $stmt;
    	}
    //U
    public function update(){}
    //D
    public function delete(){}
}

?>
