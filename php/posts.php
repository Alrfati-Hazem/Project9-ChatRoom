<?php

require_once "connection.php";

$id = "";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // For Add Post
        $post_content = $_POST['post_content'];
        $user_id = $_POST['user_id'];
        $sql = "INSERT INTO posts (post_content , user_id ) values ('$post_content'  , $user_id )";
        if (mysqli_query($db, $sql)) {
            $sql = "SELECT * FROM posts ORDER BY post_id DESC LIMIT 1 ";
            $result = mysqli_query($db, $sql);
            $obj = mysqli_fetch_object($result);
            http_response_code(201);
            echo json_encode($obj);
        } else {
            echo mysqli_error($db);
        }
        break;
    case 'GET':
        // For Get All Posts
        $sql = "SELECT * FROM posts INNER JOIN users ON (posts.user_id = users.user_id)";
        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) >= 1) {
            $posts = [];
            while ($row = mysqli_fetch_object($result)) {
                array_push($posts, $row);
            }
            http_response_code(200);
            echo json_encode($posts);
        } else {
            echo mysqli_error($db);
        }
        break;
    case 'DELETE':
        $url = $_SERVER['REQUEST_URI'];
        $lastWord = substr($url, strrpos($url, '/') + 1);
        $sql = "DELETE FROM posts WHERE post_id = '${lastWord}' ";
        if (mysqli_query($db, $sql)) {
            http_response_code(200);
        } else {
            mysqli_error($db);
        }
        break;
}
