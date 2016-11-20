<?php
include 'ChromePhp.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"));
$rating = $data->rating;
$suggestion = $data->suggestion;
$user_id = $data->user_id;

$conn = mysqli_connect('localhost', 'giuliogallerini', 'Hous3H@nt3r*^536', 'househunter');
if (!$conn) {
    ChromePhp::log("Connection failed: " . $conn->connect_error);
}
if(!$db)
    ChromePhp::log('Impossible select Database');

ChromePhp::log("I am here")
$qry = 'INSERT INTO feedback (rating, suggestion, user_id) values (' . $rating . ',"' . $suggestion . '","' . $user_id . '")';
$qry_res = mysql_query($qry);
if ($qry_res) {
    $arr = array('msg' => "Feedback Created Successfully!!!", 'error' => '');
    $jsn = json_encode($arr);
    print_r($jsn);
} else {
    $arr = array('msg' => "", 'error' => 'Error in inserting record');
    $jsn = json_encode($arr);
    print_r($jsn);
}
?>
