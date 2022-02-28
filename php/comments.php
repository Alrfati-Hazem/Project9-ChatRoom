<?php

require_once "connection.php";

$url = $_SERVER['REQUEST_URI'];
$id = substr($url, strrpos($url, '/') + 1);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // For Add Comment
        $comment_content = $_POST['comment_content'];
        $post_id = $_POST['post_id'];
        $user_id = $_POST['user_id'];
        $sql = "INSERT INTO comments (comment_content , post_id , user_id ) values ('$comment_content' , $post_id  , $user_id )";
        if (mysqli_query($db, $sql)) {
            $sql = "SELECT * FROM comments INNER JOIN users ON (comments.user_id = users.user_id) ORDER BY comment_id DESC LIMIT 1";
            $result = mysqli_query($db, $sql);
            $obj = mysqli_fetch_object($result);
            http_response_code(201);
            echo json_encode($obj);
        } else {
            echo mysqli_error($db);
        }
        break;
    case 'GET':
        if ($id) {
            $sql = "SELECT * FROM comments INNER JOIN users ON (comments.user_id = users.user_id) where post_id = $id ";
            $result = mysqli_query($db, $sql);
            if ($result) {
                $comments = [];
                while ($row = mysqli_fetch_object($result)) {
                    array_push($comments, $row);
                }
                http_response_code(200);
                echo json_encode($comments);
            } else {
                echo mysqli_error($db);
            }
        }
        break;

    case 'DELETE':
        $sql = "DELETE FROM comments WHERE comment_id = '${id}' ";
        if (mysqli_query($db, $sql)) {
            http_response_code(200);
            echo $id;
        } else {
            mysqli_error($db);
        }
        break;
}
