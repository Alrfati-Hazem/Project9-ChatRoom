<?php

require_once "connection.php";

$method = $_SERVER['REQUEST_METHOD'];

$comment_id = $_POST['comment_id'];
$comment_content = $_POST['comment_content'];

$sql = "UPDATE comments SET comment_content = '${comment_content}' WHERE comment_id = '${comment_id}' ";
if (mysqli_query($db, $sql)) {
    http_response_code(200);
    $sql = "SELECT * from comments INNER JOIN users on (comments.user_id = users.user_id) WHERE comment_id = '${comment_id}' ";
    $result = mysqli_query($db, $sql);
    $obj = mysqli_fetch_object($result);
    echo json_encode($obj);
} else {
    mysqli_error($db);
}
