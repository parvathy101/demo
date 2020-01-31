<?php

$data = json_decode(file_get_contents("php://input"));
if(!empty($_GET['phone'])){
    $phone =  $_GET['phone'];
    echo $phone;
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
       
        exit("Success");
    }else{
        print_r($errors);
    }
}

?>
<html>
   <body>
      
      <form action = "" method = "POST" enctype = "multipart/form-data">
         <input type = "file" name = "image" />
        
         <input type = "hidden" name = "phone" value = "<?php echo htmlspecialchars($phone); ?>" />
         <input type = "submit"/>
			
			
      </form>
      
   </body>
</html>