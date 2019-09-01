<?php

    //session_register("oper_id");
    
    $_METHOD =  $_GET ? $_GET["method"] : $_POST["method"];

    switch ($_METHOD) {

        case "query":
            $rows  = [];
            $rows[0] = array('id' => 1, 'comNum' => '3301', 'comName' => '南昌集电1', 'comAddress' => '火炬大道1号');
            $rows[1] = array('id' => 2, 'comNum' => '3302', 'comName' => '南昌集电2', 'comAddress' => '火炬大道2号');
            $rows[2] = array('id' => 3, 'comNum' => '3303', 'comName' => '南昌集电3', 'comAddress' => '火炬大道3号');
            $rows[3] = array('id' => 4, 'comNum' => '3304', 'comName' => '南昌集电4', 'comAddress' => '火炬大道4号');
            $rows[4] = array('id' => 5, 'comNum' => '3305', 'comName' => '南昌集电5', 'comAddress' => '火炬大道5号');
            $rows[5] = array('id' => 6, 'comNum' => '3306', 'comName' => '南昌集电6', 'comAddress' => '火炬大道6号');
            $rows[6] = array('id' => 7, 'comNum' => '3307', 'comName' => '南昌集电7', 'comAddress' => '火炬大道7号');
            $rows[7] = array('id' => 8, 'comNum' => '3308', 'comName' => '南昌集电8', 'comAddress' => '火炬大道8号');
            $rows[8] = array('id' => 9, 'comNum' => '3309', 'comName' => '南昌集电9', 'comAddress' => '火炬大道9号');
            $rows[9] = array('id' => 10, 'comNum' => '33010', 'comName' => '南昌集电10', 'comAddress' => '火炬大道10号');
            $rows[10] = array('id' => 11, 'comNum' => '33011', 'comName' => '南昌集电11', 'comAddress' => '火炬大道11号');
            $rows[11] = array('id' => 12, 'comNum' => '33012', 'comName' => '南昌集电12', 'comAddress' => '火炬大道12号');
            $rows[12] = array('id' => 13, 'comNum' => '33013', 'comName' => '南昌集电13', 'comAddress' => '火炬大道13号');
            $rows[13] = array('id' => 14, 'comNum' => '33014', 'comName' => '南昌集电14', 'comAddress' => '火炬大道14号');
            $rows[14] = array('id' => 15, 'comNum' => '33015', 'comName' => '南昌集电15', 'comAddress' => '火炬大道15号');
            $errors= [];
            $data  = array('results' => 15, 'rows' => $rows
                , 'success' => true, 'errors' => $errors);
            $json  = json_encode($data);
            header("Content-type:application/json; charset=UTF-8");
            echo  $json;
            break;
      
        case "":
            echo "i equals 2";
            break;
    }


   
?>
