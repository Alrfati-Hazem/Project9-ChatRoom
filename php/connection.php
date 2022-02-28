<?php

header("Access-control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header('Access-Control-Allow-Methods: GET, PUT , POST, DELETE , OPTIONS');
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "root";
$password = "";
$database = "project9";

// Create connection
$db = mysqli_connect($servername, $username, $password, $database);

// Check connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
