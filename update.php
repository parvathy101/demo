<!DOCTYPE html>
<html>
<body>

<?php
echo "My first PHP script!";
echo $_SERVER['QUERY_STRING'];
//echo $_GET['name'];
echo "\r\n";
//echo $_GET['addr'];
echo "\r\n";
$mail= .$_GET['email'];
echo "\r\n";
echo "\r\nrest\r\n";
$servername = "localhost";
$username = "smarttest";
$password = "smarttest";
$dbname = "smarttest";
$fields ="";
$values = "";
$loop=0;
foreach($_GET as $key=>$value){
    echo $key, ' => ', $value, "<br/>";
if($key=="street1")
{
$street1=$value;
}
else if($key=="street2")
{
$street2=$value;
}
else if($key=="pincode")
{
$pincode=$value;
}
else if($key=="city")
{
$city=$value;
}
else if($key=="state")
{
$state=$value;
}
else if($key=="country")
{
$country=$value;
}
else if($key=="latitude")
{
$latitude=$value;
}
else if($key=="longitude")
{
$longitude=$value;
}
	
if($loop!=0) {
		$fields.=",";
		$values.=",";
	}





	$loop=1;
	$fields.="'";
	$fields.=$key;
	$fields.="'";
	
	$values.="'";
	$values.=$value;
	$values.="'";
}

echo $fields;
echo $values;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "connection to db failed!";
} 


$sql = "UPDATE sptest_TeleHealthcareFlow__Facility SET facilityAddress=."com.ithings.telehealthcare.data.Address:::{".street1:$street1,street2:$street2,pincode:$pincode,city:$city,state:$state,country:$country."}", latitude=$latitude, longitude=$longitude where facilityName=$mail."-facility"";


if ($conn->query($sql) === TRUE) {
    echo "New record updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

</body>
</html>
