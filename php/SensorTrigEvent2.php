<?php
class SensorTrigEvent2{

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
	
    public function __construct($conn){
        $this->connection= $conn;
		//echo  json_encode(array("message" => "event construct ....."));
    }

    //C
    public function create(){
		
	
	$query = "INSERT INTO
                " . $this->table_name . "
            SET
                deviceId=:deviceId,timeStamp=:timeStamp, timeStr=:timeStr,actionTypeId=:actionTypeId, actionTypeDesc=:actionTypeDesc, actionValue=:actionValue, subscriber=:subscriber,facilityName=:facilityName";
			echo $query;
	
    $stmt = $this->connection->prepare($query);
	if (!$stmt) { 
		print_r($this->connection->errorInfo()); 
	}
	
    echo  json_encode(array("message before" => $this->deviceId));
	echo  json_encode(array("messageb before" => $this->timeStamp));
	
    $this->deviceId=htmlspecialchars(strip_tags($this->deviceId));
    $this->timeStamp=htmlspecialchars(strip_tags($this->timeStamp));
    $this->actionTypeId=htmlspecialchars(strip_tags($this->actionTypeId));
    $this->actionTypeDesc=htmlspecialchars(strip_tags($this->actionTypeDesc));
    $this->actionValue=htmlspecialchars(strip_tags($this->actionValue));
    $this->subscriber=htmlspecialchars(strip_tags($this->subscriber));
    $this->facilityName=htmlspecialchars(strip_tags($this->facilityName));
    $this->timeStr=htmlspecialchars(strip_tags($this->timeStr));
	
	echo  json_encode(array("message dev ID" => $this->deviceId));
	echo  json_encode(array("message" => $this->timeStamp));
	echo  json_encode(array("message" => $this->actionTypeId));
	echo  json_encode(array("message" => $this->actionTypeDesc));
	echo  json_encode(array("message" => $this->actionValue));
	echo  json_encode(array("message" => $this->subscriber));
	echo  json_encode(array("message Facility" => $this->facilityName));
	echo  json_encode(array("message Time" => $this->timeStr));

    $stmt->bindParam(":deviceId", $this->deviceId,PDO::PARAM_STR);
    $stmt->bindParam(":timeStamp", $this->timeStamp,PDO::PARAM_INT);
    $stmt->bindParam(":actionTypeId", $this->actionTypeId,PDO::PARAM_STR);
    $stmt->bindParam(":actionTypeDesc", $this->actionTypeDesc,PDO::PARAM_STR);
    $stmt->bindParam(":actionValue", $this->actionValue,PDO::PARAM_STR);
    $stmt->bindParam(":subscriber", $this->subscriber,PDO::PARAM_STR);
    $stmt->bindParam(":facilityName", $this->facilityName,PDO::PARAM_STR);
    $stmt->bindParam(":timeStr", $this->timeStr,PDO::PARAM_STR);
	 
	
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
	// echo  json_encode(array("message row count" => $num));
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
						"timeStamp" => $timeStamp,
						"actionTypeId" => $actionTypeId,
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
	
	 public function read($topN,$sub){
		//echo  json_encode(array("message row count" => "prep query"));
		//FROM_UNIXTIME(timeStamp/1000,'%Y-%M-%d %H:%i:%s %f')
	$query = "SELECT  Id,deviceId,timeStr,actionTypeId,actionTypeDesc,actionValue,subscriber,facilityName from sptest_TeleHealthcareFlow__SensorTrigHistory where subscriber like '" .$sub . "%' order by Id DESC limit " . $topN;
       
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
