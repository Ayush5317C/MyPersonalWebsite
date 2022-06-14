<?php 
//Establishing connection
$server = "localhost";
$user = "root";
$password = "";
$db = "myPersonalWebsite";
$conn = mysqli_connect($server, $user, $password, $db);
if(!$conn)
    die("Error");

$name = mysqli_real_escape_string($conn, $_POST["viewerName"]);
$email = mysqli_real_escape_string($conn, $_POST["viewerEmail"]);
$msg = mysqli_real_escape_string($conn, $_POST["viewerMsg"]);
$insertQuery = "insert into `contactInfo` (`Name`, `Email`, `Message`) values ('$name', '$email', '$msg')";
if(mysqli_query($conn, $insertQuery))
    echo "Thanks for the submission";
else
    echo "Cannot submit the form, please try again later";
mysqli_close($conn);
?>