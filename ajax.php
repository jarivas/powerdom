<?php
$curdate = date("Y/m/d H:i:s");
$tmp = array('id' => 'content', 'data' => $curdate);
echo json_encode($tmp);
?>
