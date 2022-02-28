<?php

require_once "connection.php";

$id = "";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // For Register
        if (isset($_POST['name'])) {
            $user_email = $_POST['email'];
            $user_password = $_POST['password'];
            $user_name = $_POST['name'];
            $user_image = $_POST['image'];
            $sql = "INSERT INTO users (user_email , user_password , user_name , user_image) values('$user_email' , '$user_password' , '$user_name' , '$user_image') ";
            if (mysqli_query($db, $sql)) {
                $sql = "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1";
                $result = mysqli_query($db, $sql);
                $obj = mysqli_fetch_object($result);
                http_response_code(201);
                print json_encode($obj->user_id);
            } else {
                http_response_code(404);
            }
        }
        // For Login
        else {
            $user_email = $_POST['email'];
            $user_password = $_POST['password'];
            $sql = "SELECT * FROM users WHERE user_email = '$user_email' AND user_password = '$user_password' ";
            $result = mysqli_query($db, $sql);
            if (mysqli_num_rows($result) === 1) {
                $obj = mysqli_fetch_object($result);
                http_response_code(200);
                echo json_encode($obj);
            } else {
                http_response_code(404);
            }

        }

        break;

    case 'GET':
        $user_email = $_GET['email'];
        $user_password = $_GET['password'];
        $sql = "SELECT * FROM users WHERE user_email = '$user_email' AND user_password = '$user_password' ";
        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) === 1) {
            http_response_code(200);
        } else {
            http_response_code(404);
        }
        break;
}
