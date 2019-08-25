<?php require_once(dirname(__FILE__)."/config/global.php");?>
<?php

    //session_register("oper_id");
    
    $_METHOD =  $_GET ? $_GET["method"] : $_POST["method"];

    switch ($_METHOD) {

        case "login":
            $username  = $_POST["username"];
            $password  = $_POST["password"];
            $checkcode = $_POST["checkcode"];

            $msg="";
            $userid="";
            $flag=false;
            $errors=[];
            $sql_login="select user_id from hr_users where login_name='".$username."' and password='".$password."'";

            if($res = $DB->fetch_one_array($sql_login)){
                $_SESSION['oper_id'] = $res["user_id"];
                $userid = $res["user_id"];
                $flag = true;
            }else{
                $msg  = "帳號或密碼錯誤!";
                $errors[0]=array('id'=>'username', 'msg'=>'用户不存在');
                $errors[1]=array('id'=>'password', 'msg'=>'密码不正确');
                $flag = false;
            }
           
            $data = array('userid' => $userid, 'msg' => $msg
                , 'success' => $flag, 'flag' => $flag
                , 'errors' => $errors);
            $json = json_encode($data);
            header("Content-type:application/json; charset=UTF-8");
            echo $json;
            break;
        case "query":
            echo "method equals query";
            break;
        case "":
            echo "i equals 2";
            break;
    }


   
?>
