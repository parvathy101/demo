<?php

$data = json_decode(file_get_contents("php://input"));
if(!empty($_GET['phone'] && $_GET['name'] && $_GET['mail'])){
    $phone =  $_GET['phone'];
$name =  $_GET['name'];
$mail =  $_GET['mail'];
    //echo $phone;
//echo $phone;
//echo $phone;
}

if(isset($_FILES['image'])){
    $errors= array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $phone = $_REQUEST["phone"];
   
   
    if ((strpos($file_name, 'jpg') == false)&&(strpos($file_name, 'jpeg') == false)&&(strpos($file_name, 'png') == false)) 
    {
        exit("Extension not allowed, please choose a JPEG  file");  
    }
   
    if($file_size > 2097152) {
        $errors[]='File size must be excately 2 MB';
    }
    $filesave = $phone . ".jpg";
    if(empty($errors)==true) {
        //move_uploaded_file($file_tmp,"../photos/".$file_name);
        move_uploaded_file($file_tmp,"../photos/" . $filesave);
$url='http://healthcare.iorbit-tech.com/?email='.$mail.'&name='.$name.'#/subscribergeneral';

   echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$url.'">';
       
        //exit("Success");
    }else{
        print_r($errors);
    }
}

?>

