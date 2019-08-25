<?php
   //$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
   //echo json_encode($arr);

   $user = array('user_id' => '1', 'msg' => '', 'flag' => 'true');
   $arr = array('result' => $user);
   header("Content-type:application/json");
   echo json_encode($arr);

	define('INIT_DIR', getcwd());
	echo "<br/>";

	putenv('SSH_CLIENT=deleted');
	putenv('SSH_AUTH_SOCK=deleted');
	putenv('SSH_TTY=deleted');
	putenv('SSH_CONNECTION=deleted');
	putenv('FILE_DIR='.INIT_DIR);

	$environment = getenv();
	print_r($environment);
?>